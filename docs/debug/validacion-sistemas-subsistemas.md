# Validación de Sistemas y Subsistemas

Esta página documenta cómo el arnés de regresión valida la integración de subsistemas y detecta regresiones automáticas en ReactOS Gaming.

## Suites del Arnés

El arnés ejecuta suites tanto de modo usuario como de modo kernel. Cada suite se lanza en el invitado QEMU y su resultado se captura desde el puerto serie.

### Suites de Modo Usuario (apitests)

Las suites de modo usuario son ejecutables `.exe` ubicados en `modules/rostests/apitests/`. Cada suite imprime su resumen por `dbgprint` y `regtest.py` lo parsea.

| Área | Suites representativas | Estado |
|------|------------------------|--------|
| kernel32 | APIs de kernel, procesos, hilos | Implementado |
| advapi32 | Registro, seguridad, servicios | Implementado |
| dxgkrnl | Operaciones de kernel de video | Parcial |
| gdi32 | Dibujado GDI | Implementado |
| apisets | Redirección de API sets | Implementado |
| psapi | Información de procesos | Implementado |
| win32u | APIs de usuario de ventana | Implementado |
| wddmvulkan | WDDM + Vulkan | No implementado |

### Suites de Modo Kernel (kmtests)

Las suites de modo kernel cargan un driver `.sys` que valida contratos del kernel y un ejecutable de usuario que lo dispara.

| Área | Suites representativas | Estado |
|------|------------------------|--------|
| ntos_ps | Layout de ETHREAD/EPROCESS/KTHREAD/KPROCESS | Implementado |
| ntos_ke | Numeración de procesadores | Implementado |
| ntos_lpc | Layouts de estructuras ALPC | Implementado |

## Flujo de Ejecución del Arnés

1. Se construye la ISO de regresión con `-DNT6_REGTEST=ON`.
2. `nt6regtest.inf` activa el modo headless y registra `NT6RegTest` en `Run`.
3. Al iniciar el invitado, `nt6regtest.cmd` lanza cada suite con `dbgprint --process --timeout 180 <binario>`.
4. Cada suite emite `dbgprint NT6SUITE <nombre>` antes de ejecutarse.
5. `regtest.py` lee el puerto serie, atribuye resultados a cada suite y emite un JSON.

## Detección de Regresiones

`regtest.py` compara los resultados actuales contra una línea base y detecta:

- **Suites perdidas:** suites lanzadas que no imprimen resumen.
- **Nuevos fallos:** suites que antes pasaban y ahora fallan.
- **Crasheses:** `Unhandled exception` + código de excepción.
- **Estancamiento:** puerto serie sin actividad por más de `STALL_TIMEOUT` (300 s).
- **Depurador del kernel:** entrada a `kdb:>` (se responde automáticamente con `i` = Ignore).

## Formato del Resultado JSON

El arnés emite un JSON con la siguiente estructura:

```json
{
  "suite_nombre": {
    "total": 100,
    "todo": 5,
    "failures": 2,
    "skipped": 0
  }
}
```

Los JSONs de línea base se almacenan en:
- `docs/nt6/regtest-baseline.json`
- `docs/nt6/baseline-0x502.json`
- `docs/nt6/baseline-0x502-nt6.json`
- `docs/nt6/baseline-0x600.json`

## Comparación de Sesiones

`tools/nt6/compare_sessions.py` compara dos logs de serie (baseline vs candidato) a nivel de sesión: cuenta marcadores (`SMSS`, `winlogon.exe`, `KSE: version lie`...) y errores.

## Comandos de Ejecución

### Build de la imagen de regresión NT 5.2

```bash
export PATH=/home/demox/RosBE/i386/bin:/home/demox/RosBE/bin:$PATH

/home/demox/RosBE-CI/bin/cmake -G Ninja -S . -B /home/demox/build-gaming-debug \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-gcc.cmake -DARCH=i386 \
  -DCMAKE_BUILD_TYPE=Debug -DENABLE_CCACHE=0 -DDLL_EXPORT_VERSION=0x502 \
  -DENABLE_ROSTESTS=1 -DENABLE_ROSAPPS=1 -DNT6_REGTEST=ON

ninja -C /home/demox/build-gaming-debug bootcdregtest
```

### Build de la variante NT 6.0

```bash
/home/demox/RosBE-CI/bin/cmake -G Ninja -S . -B /home/demox/build-gaming-debug \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-gcc.cmake -DARCH=i386 \
  -DCMAKE_BUILD_TYPE=Debug -DENABLE_CCACHE=0 -DDLL_EXPORT_VERSION=0x600 \
  -DENABLE_ROSTESTS=1 -DENABLE_ROSAPPS=1 -DNT6_PRODUCT_VERSION=ON \
  -DNT6_REGTEST=ON

ninja -C /home/demox/build-gaming-debug bootcdregtest
```

### Ejecutar las suites de regresión

```bash
python3 tools/nt6/regtest.py \
  --iso /home/demox/build-gaming-debug/bootcdregtest.iso \
  --two-stages \
  --json /home/demox/docs/nt6/regtest.json \
  --suite-timeout 240 \
  --kdb-stack
```

Opciones clave:
- `--iso`: ruta a la ISO de regresión (`bootcdregtest.iso`).
- `--timeout`: segundos totales por arranque (default 300).
- `--json`: ruta del JSON de salida con los resultados.
- `--two-stages`: hace tres arranques (instalación, OOBE, sesión) — las suites corren sobre el sistema instalado.
- `--kdb-stack`: al entrar al depurador del kernel, imprime el stack antes de reanudar.
- `--suite-timeout`: segundos que puede tardar una suite antes de parar el guest (default 240).
- `--sound-card`: tarjeta de sonido emulada (default `ac97`).

El comando devuelve:
- `0` si todas las suites pasan.
- `1` si alguna falla o hay suites sin resumen.
- `2` si la tanda no llegó a terminarse.

## Limitaciones Conocidas

- El arnés requiere `ENABLE_ROSTESTS=1`; sin él no se construyen los ejecutables de apitest y el arnés informa suites perdidas en silencio.
- Algunas suites WDDM están protegidas por la existencia de `dxgkrnl.sys` / `wddm_dod.sys`.
- El banco QEMU con `pci-testdev` no sirve para validar arreglos del driver NVIDIA (no tiene VBIOS ni interrupción real).
