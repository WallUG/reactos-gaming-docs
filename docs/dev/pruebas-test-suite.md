# Pruebas y Test Suite

Esta página documenta cómo ejecutar los rostests oficiales de ReactOS junto con el arnés de regresión propio de ReactOS Gaming.

## Tipos de Pruebas

| Tipo | Ruta | Descripción |
|------|------|-------------|
| Rostests oficiales | `modules/rostests/` | Tests oficiales del proyecto ReactOS. |
| Apitests (modo usuario) | `modules/rostests/apitests/` | Tests de API de modo usuario (kernel32, advapi32, etc.). |
| Kmtests (modo kernel) | `modules/rostests/kmtests/` | Tests de modo kernel (estructuras, offsets, syscalls). |
| Arnés de regresión | `tools/nt6/` | Herramientas Python para ejecutar suites en QEMU. |

## Pruebas Obligatorias Antes de un PR

Antes de enviar cualquier Pull Request, debe ejecutarse el arnés de regresión y obtener `PASS`.

### Smoke Test

```bash
python3 tools/nt6/smoke.py --iso <ruta-a-tu-iso> --timeout 180
```

El smoke debe cumplir:
- `BOOT DRIVERS LOADED` presente.
- Marcador de userland presente.
- Ausencia de `Fatal System Error`, `*** STOP`, `KeBugCheck`, `Assertion failed`, `kdb:>`.

### Regresión de Suites

```bash
python3 tools/nt6/regtest.py \
  --iso <ruta-a-tu-iso> \
  --two-stages \
  --json /ruta/salida.json \
  --suite-timeout 240 \
  --kdb-stack
```

## Ejecutar Rostests Oficiales

Los rostests oficiales se construyen con `ENABLE_ROSTESTS=1` y `ENABLE_ROSAPPS=1`:

```bash
ninja -C /home/demox/build-gaming-debug bootcd -j8
```

Luego se ejecutan en el invitado QEMU a través del arnés de regresión (`regtest.py`).

## Ejecutar el Inventario de ABI

```bash
python3 tools/nt6/inventory.py --check --strict
```

Este comando valida que `sysfuncs.h` y `sysfuncs.lst` describan la misma tabla de syscalls (297 NT 5.2 + 22 NT 6.0).

## Interpretar Resultados

| Código de salida | Significado |
|----------------|-------------|
| 0 | Todas las suites pasaron. |
| 1 | Alguna suite falló o hay suites sin resumen. |
| 2 | La tanda no llegó a terminarse. |

## Líneas Base

Los resultados de referencia se almacenan en:
- `docs/nt6/regtest-baseline.json`
- `docs/nt6/baseline-0x502.json`
- `docs/nt6/baseline-0x502-nt6.json`
- `docs/nt6/baseline-0x600.json`

Para registrar una nueva línea base:

```bash
python3 tools/nt6/baseline.py --build-dir /home/demox/build-nt6-502 \
  --version 0x502 --smoke
```

## Limitaciones Conocidas

- Sin `ENABLE_ROSTESTS=1`, el arnés informa suites perdidas en silencio.
- El banco QEMU con `pci-testdev` no sirve para validar arreglos del driver NVIDIA.
- Algunas suites WDDM están protegidas por la existencia de `dxgkrnl.sys` / `wddm_dod.sys`.
