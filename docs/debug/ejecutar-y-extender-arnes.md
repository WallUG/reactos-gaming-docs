# Ejecutar y Extender el Arnés de Regresión

Esta página documenta los comandos reales de compilación y ejecución del arnés de regresión, y cómo los colaboradores pueden añadir nuevos tests.

## 1. Comandos de Compilación

### Requisitos Previos

- **RosBE-Unix** en `/home/demox/RosBE` (GCC 8.4.0, CMake 3.17.2-ReactOS, Ninja).
- CMake correcto: `/home/demox/RosBE-CI/bin/cmake` (el del sistema falla con `winnt.h` ausente).
- **QEMU**: `qemu-system-i386` con KVM cuando `/dev/kvm` es accesible.
- **`ENABLE_ROSTESTS=1`** es obligatorio (sin él no se construyen los ejecutables de apitest y el arnés informa suites perdidas en silencio).

### Build de la Imagen de Regresión NT 5.2 (Sistema Instalado, Dos Etapas)

```bash
export PATH=/home/demox/RosBE/i386/bin:/home/demox/RosBE/bin:$PATH

/home/demox/RosBE-CI/bin/cmake -G Ninja -S . -B /home/demox/build-gaming-debug \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-gcc.cmake -DARCH=i386 \
  -DCMAKE_BUILD_TYPE=Debug -DENABLE_CCACHE=0 -DDLL_EXPORT_VERSION=0x502 \
  -DENABLE_ROSTESTS=1 -DENABLE_ROSAPPS=1 -DNT6_REGTEST=ON

ninja -C /home/demox/build-gaming-debug bootcdregtest
```

### Build de la Variante NT 6.0 (Versión de Producto 6.0, Exports 0x600)

```bash
/home/demox/RosBE-CI/bin/cmake -G Ninja -S . -B /home/demox/build-gaming-debug \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-gcc.cmake -DARCH=i386 \
  -DCMAKE_BUILD_TYPE=Debug -DENABLE_CCACHE=0 -DDLL_EXPORT_VERSION=0x600 \
  -DENABLE_ROSTESTS=1 -DENABLE_ROSAPPS=1 -DNT6_PRODUCT_VERSION=ON \
  -DNT6_REGTEST=ON

ninja -C /home/demox/build-gaming-debug bootcdregtest
```

## 2. Comandos de Ejecución

### Smoke Test (Validación Obligatoria Antes de PC Real)

```bash
python3 tools/nt6/smoke.py --iso <ruta-a-tu-iso> --timeout 180
```

Con versión esperada:

```bash
python3 tools/nt6/smoke.py \
  --iso /home/demox/build-nt6-502-nt6/bootcd.iso \
  --timeout 180 \
  --expect-nt-version 6.0 \
  --profile session
```

El smoke debe cumplir:
- `BOOT DRIVERS LOADED` presente.
- Marcador de userland presente.
- Ausencia de `Fatal System Error`, `*** STOP`, `KeBugCheck`, `Assertion failed`, `kdb:>`.

### Ejecutar las Suites de Regresión

```bash
python3 tools/nt6/regtest.py \
  --iso /home/demox/build-gaming-debug/bootcdregtest.iso \
  --two-stages \
  --json /home/demox/docs/nt6/regtest.json \
  --suite-timeout 240 \
  --kdb-stack
```

El comando devuelve:
- `0` si todas las suites pasan.
- `1` si alguna falla o hay suites sin resumen.
- `2` si la tanda no llegó a terminarse.

### Registrar una Línea Base

```bash
python3 tools/nt6/baseline.py --build-dir /home/demox/build-nt6-502 \
  --version 0x502 --smoke
```

### Ejecutar el Inventario (con Validación de Syscalls)

```bash
python3 tools/nt6/inventory.py --check --strict
```

### Validar el ABI NDIS 6 frente al WDK

```bash
python3 tools/nt6/ndis6abi/ndis6abi.py \
  --wdk "<WDK>/Include" \
  --src /home/demox/reactos-gaming \
  --build /home/demox/build-gaming-debug \
  --rosbe /home/demox/RosBE \
  --emit-asserts /tmp/ndis6_asserts.h
```

## 3. Cómo Añadir un Nuevo Test al Arnés

### Paso 1: Crear el Test de Modo Usuario (apitest)

1. Cree un nuevo ejecutable en `modules/rostests/apitests/<nombre>/`.
2. Use `wine/test.h` (`ok()`, `ok_eq_int()`, `trace()`) para validar el comportamiento.
3. Imprima el resumen al final:
   ```c
   printf("%s: %d tests executed (%d marked as todo, %d failures), %d skipped.\n",
          "mi_nueva_suite", total, todo, failures, skipped);
   ```
4. Añada el target CMake en el `CMakeLists.txt` correspondiente para que se construya con `ENABLE_ROSTESTS=1`.

### Paso 2: Crear el Test de Modo Kernel (kmtest)

1. Cree un driver `.sys` en `modules/rostests/kmtests/<subsistema>/` que valide estructuras, offsets o syscalls usando `FIELD_OFFSET`, `sizeof` y `C_ASSERT`.
2. Cree el ejecutable de usuario que dispara el driver.
3. Registre ambos en el `CMakeLists.txt` del subsistema.
4. Proteja el test con la existencia del driver `.sys` en `nt6regtest.cmd` si es necesario.

### Paso 3: Registrar la Suite en el Lanzador

1. Añada la llamada a la suite en `boot/bootdata/livecd/nt6regtest.cmd`:
   ```
   dbgprint NT6SUITE mi_nueva_suite
   dbgprint --process --timeout 180 "%WINDIR%\bin\kmtest.exe mi_nueva_suite"
   ```
2. Si la suite requiere WDDM, proteja con la existencia de `dxgkrnl.sys` / `wddm_dod.sys`.

### Paso 4: Verificar en el Arnés

1. Construya la ISO de regresión con `-DNT6_REGTEST=ON`.
2. Ejecute `regtest.py` y verifique que la suite aparezca en el JSON de resultados.
3. Compare contra la línea base con `compare_sessions.py` si es relevante.

## 4. Estructura de los Marcadores en el Log Serie

| Marcador | Significado |
|----------|-------------|
| `NT6SUITE <nombre>` | Inicio de una suite de prueba. |
| `NT6REGTEST-DONE` | Fin de todas las suites. |
| `NT6KDB-CMD <comando>` | Comando para el depurador del kernel. |
| `<nombre>: <n> tests executed (...)`, `<n> skipped.` | Resumen de una suite (parseado por `SUMMARY_RE`). |

## 5. Limitaciones Conocidas

- Sin `ENABLE_ROSTESTS=1`, el arnés informa suites perdidas en silencio.
- El banco QEMU con `pci-testdev` no sirve para validar arreglos del driver NVIDIA.
- Las suites de modo kernel requieren que el driver `.sys` se cargue correctamente en el invitado.
