# Arnés de Regresión — Visión General

El arnés de regresión de ReactOS Gaming es un conjunto de herramientas Python y scripts de arranque que permite ejecutar suites de pruebas en un invitado QEMU headless y validar que el núcleo, los controladores y los subsistemas no introduzcan regresiones.

## Propósito

El arnés existe para responder a una pregunta concreta: ¿este cambio rompe algo que antes funcionaba? Sirve como puerta de calidad antes de tocar el hardware real (GT 710) y como puerta de integración para cambios de contratos del kernel (migración NT 5.2 → NT 6.0, etapas 4 y 5 del plan).

## Componentes del Arnés

El arnés no es un único archivo. Está formado por herramientas Python en `tools/nt6/`, fixtures de arranque, tests de modo usuario y de modo kernel, y JSONs de línea base.

### Motor del arnés (`tools/nt6/`)

| Archivo | Propósito |
|---------|-----------|
| `regtest.py` | Arnes principal. Arranca la ISO en QEMU headless, lee el puerto serie por socket Unix, responde al depurador del kernel (`kdb:>`), parsea resúmenes de suites y emite JSON de resultados. |
| `smoke.py` | Prueba de humo. Arranca una ISO en QEMU y clasifica el log serie: busca `BOOT DRIVERS LOADED` + marcadores de userland, rechaza `Fatal System Error`, `*** STOP`, `KeBugCheck`, `Assertion failed`, `kdb:>`. |
| `baseline.py` | Registra una línea base reproducible: configura (cmake), construye (ninja), recopila artefactos con SHA256/tamaño, ejecuta el smoke y escribe un manifiesto JSON. |
| `inventory.py` | Inventario de componentes y superficie ABI NT 6.x: cuenta targets CMake, exports/stubs de `.spec`, syscalls NT 5.2/6.0 y hotspots de estructuras kernel. |
| `pe.py` | Parser/desensamblador ligero de PE (RVA → offset de fichero, nombres de sección, desensamblado con capstone). |
| `compare_sessions.py` | Compara dos logs de serie (baseline vs candidato) a nivel de sesión. |
| `apprun.py` / `audiorun.py` | Ejecuta scripts personalizados sobre la imagen instalada en QEMU. |
| `ndis6abi/ndis6abi.py` | Valida el ABI de estructuras NDIS 6 de ReactOS frente al WDK (sizeof/offsetof para x86/amd64, NDIS 6.0/6.1/6.20). |

### Fixtures de arranque

| Archivo | Propósito |
|---------|-----------|
| `boot/bootdata/livecd/nt6regtest.cmd` | Script lanzador de suites. Se ejecuta en el invitado vía `Run` del registro. Emite `dbgprint NT6SUITE <nombre>` antes de cada suite y lanza cada test con `dbgprint --process --timeout 180 <binario>`. Protege suites WDDM por la existencia de `dxgkrnl.sys` / `wddm_dod.sys`. Termina con `dbgprint NT6REGTEST-DONE`. |
| `boot/bootdata/livecd/nt6regtest.inf` | Registro del LiveCD: activa `HKLM\Software\ReactOS\LiveCD\Headless` (modo desatendido) y registra `NT6RegTest` en `HKLM\...\Run`. |
| `boot/bootdata/bootcd_regtest_nt6.ini` | INI de arranque desatendido: `DefaultOS=Setup`, `TimeOut=0`, depuración por COM1 (`/DEBUG /DEBUGPORT=COM1 /BAUDRATE=115200 /SOS`). |

### Tests que ejecuta el arnés

| Tipo | Ruta | Descripción |
|------|------|-------------|
| Modo usuario (apitests) | `modules/rostests/apitests/` | Tests de API de modo usuario (kernel32, advapi32, dxgkrnl, gdi32, apisets, psapi, win32u, wddmvulkan, etc.). Cada suite es un `.exe` que imprime su resumen por `dbgprint`. |
| Modo kernel (kmtests) | `modules/rostests/kmtests/` | Tests de modo kernel. Los kmtest cargan un driver `.sys` que valida contratos del kernel (estructuras, offsets, syscalls) y un ejecutable de usuario que lo dispara. |

### Documentos del arnés

| Documento | Propósito |
|-----------|-----------|
| `docs/nt6/REGTEST.md` | Manual del arnés de regresión instalado: cómo se construye la imagen, cómo funciona, fixtures, uso, resultados y limitaciones. |
| `docs/nt6/BASELINE.md` | Línea base reproducible NT 5.2/6.0: configuraciones, comandos de build, criterio de arranque, artefactos. |
| `docs/nt6/CONTRATOS-NT6.md` | Catálogo de contratos NT 5.2 → NT 6.0 (versión de producto, layouts de estructuras, syscalls, loader, shim KSE). |
| `docs/nt6/ESTADO-ACTUAL.md` | Estado vigente del proyecto (fuente de verdad). |

### Configuraciones JSON

| Archivo | Propósito |
|---------|-----------|
| `docs/nt6/regtest-baseline.json` | Resultados de referencia del arnés: claves con suites, tests, fallos y duraciones. |
| `docs/nt6/baseline-0x502.json` | Manifiesto de línea base NT 5.2 (config, toolchain, artefactos SHA256, resultado del smoke). |
| `docs/nt6/baseline-0x502-nt6.json` | Manifiesto de línea base NT 5.2 con versión de producto 6.0. |
| `docs/nt6/baseline-0x600.json` | Manifiesto de línea base NT 6.0 (exports 0x600). |
| `docs/nt6/inventory.json` | Salida JSON del inventario (targets, specs, syscalls, dependencias, hotspots). |

## Requisitos del Entorno

- **RosBE-Unix** en `/home/demox/RosBE` (GCC 8.4.0, CMake 3.17.2-ReactOS, Ninja).
- CMake correcto: `/home/demox/RosBE-CI/bin/cmake` (el del sistema falla con `winnt.h` ausente).
- **QEMU**: `qemu-system-i386` con KVM cuando `/dev/kvm` es accesible.
- **`ENABLE_ROSTESTS=1`** es obligatorio (sin él no se construyen los ejecutables de apitest y el arnés informa suites perdidas en silencio).
