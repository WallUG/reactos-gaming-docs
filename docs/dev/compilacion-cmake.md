# Compilación con CMake

Esta página documenta cómo compilar ReactOS Gaming con CMake, Ninja, GCC/MinGW y MSVC.

## Configuración de CMake

### Comando de Configuración (Linux/WSL con RosBE)

```bash
export PATH=/home/demox/RosBE/i386/bin:/home/demox/RosBE/bin:$PATH

/home/demox/RosBE-CI/bin/cmake -G Ninja \
  -S /home/demox/reactos-gaming -B /home/demox/build-gaming-debug \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-gcc.cmake -DARCH=i386 \
  -DCMAKE_BUILD_TYPE=Debug -DENABLE_CCACHE=0 -DDLL_EXPORT_VERSION=0x600 \
  -DNT6_PRODUCT_VERSION=ON -DNT6_NVIDIA_DRIVER=ON \
  -DENABLE_ROSTESTS=1 -DENABLE_ROSAPPS=1
```

### Opciones de CMake Importantes

| Opción | Valor por defecto | Descripción |
|--------|-------------------|-------------|
| `-DCMAKE_TOOLCHAIN_FILE` | `toolchain-gcc.cmake` | Archivo de herramienta de compilación (GCC o MSVC). |
| `-DARCH` | `i386` | Arquitectura objetivo (i386, amd64). |
| `-DCMAKE_BUILD_TYPE` | `Debug` | Tipo de compilación (Debug, Release, RelWithDebInfo). |
| `-DENABLE_CCACHE` | `0` | Habilitar ccache para compilaciones incrementales. |
| `-DDLL_EXPORT_VERSION` | `0x600` | Versión de exportación de DLLs (0x600 = Windows Vista/7). |
| `-DNT6_PRODUCT_VERSION` | `ON` | Habilitar versión de producto NT 6.0. |
| `-DNT6_NVIDIA_DRIVER` | `ON` | Incluir el driver NVIDIA en la ISO y registrar su `.inf`. |
| `-DENABLE_ROSTESTS` | `1` | Habilitar compilación de rostests (obligatorio para el arnés de regresión). |
| `-DENABLE_ROSAPPS` | `1` | Habilitar compilación de aplicaciones de ReactOS. |

## Compilación

### Compilar la ISO de Arranque

```bash
ninja -C /home/demox/build-gaming-debug bootcd -j8
```

### Compilar Solo el Kernel

```bash
ninja -C /home/demox/build-gaming-debug ntoskrnl -j8
```

### Compilar Solo el Driver WDDM

```bash
ninja -C /home/demox/build-gaming-debug dxgkrnl -j8
```

### Compilar Solo Win32k

```bash
ninja -C /home/demox/build-gaming-debug win32k -j8
```

## Salida de la Compilación

| Artefacto | Ruta | Descripción |
|-----------|------|-------------|
| ISO de arranque | `build-gaming-debug/bootcd.iso` | Imagen de CD bootable. |
| Kernel | `build-gaming-debug/bootcd/reactos/ntoskrnl.exe` | Núcleo del sistema. |
| Driver WDDM | `build-gaming-debug/bootcd/reactos/system32/drivers/dxgkrnl.sys` | Miniport WDDM de NVIDIA. |
| Win32k | `build-gaming-debug/bootcd/reactos/system32/win32k.sys` | Subsistema gráfico y de usuario. |

## Problemas Comunes

| Problema | Solución |
|----------|----------|
| `winnt.h` ausente | Usar `/home/demox/RosBE-CI/bin/cmake`, no el cmake del sistema. |
| ninja no recompila | El reloj de WSL2 puede invertir mtimes. Verificar por `strings`, no por hash ni fecha. Forzar con `touch` ante duda. |
| `ENABLE_ROSTESTS=1` olvidado | El arnés de regresión informa suites perdidas en silencio. |

## Compilación con MSVC

ReactOS también soporta compilación con MSVC en Windows. Use `toolchain-msvc.cmake` en lugar de `toolchain-gcc.cmake`.

```bash
cmake -G Ninja -S . -B build-msvc \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-msvc.cmake -DARCH=i386 \
  -DCMAKE_BUILD_TYPE=Debug
```
