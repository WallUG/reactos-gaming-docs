# Benchmarks

Esta página documenta la metodología de pruebas y las comparativas de rendimiento en ReactOS Gaming.

## Metodología de Pruebas

### Entorno de Pruebas

| Componente | Especificación |
|------------|----------------|
| Placa base | BIOSTAR H81MHV3 |
| CPU | Intel i3-4170 (1 core, 2 hilos lógicos) |
| GPU | NVIDIA GeForce GT 710 (10de:128b) |
| RAM | 3,556 MB |
| Almacenamiento | FAT32 / NTFS |
| Sistema operativo | ReactOS Gaming (rama feat/nt6-integration) |

### Métricas Medidas

| Métrica | Descripción |
|---------|-------------|
| FPS | Frames por segundo en aplicaciones 3D. |
| Tiempo por draw | Tiempo promedio de ejecución de cada comando de dibujado. |
| Tiempo de presentación | Tiempo que tarda `D3DKMTPresent` en completar. |
| Uso de CPU | Porcentaje de uso del procesador durante la ejecución. |
| Estabilidad | Número de crashes o asserts por sesión de prueba. |

### Herramientas de Prueba

| Herramienta | Propósito |
|-------------|-----------|
| `d3dwine` fps-meter | Mide presents y draws por frame en aplicaciones Direct3D. |
| `smoke.py` | Valida que el sistema arranque y llegue a userland sin errores críticos. |
| `regtest.py` | Ejecuta suites de regresión en modo invitado headless. |
| `bench-nvidia.py` | Banco QEMU con `pci-testdev` presentado como GT 710. |

## Resultados de Rendimiento

### Halo Combat Evolved

| Escenario | Draws por frame | FPS | Tiempo por draw |
|-----------|-----------------|-----|-----------------|
| Escena ligera | ~200 | ~60 | ~0.5 ms |
| Escena media | ~400 | ~30 | ~0.5 ms |
| Escena pesada | ~1000 | ~20 | ~0.5 ms |

### Presentación de Pantalla

| Métrica | Valor | Detalle |
|---------|-------|---------|
| Tiempo de present | <1 ms | Vía GL, inocente en el tiempo total. |
| Bloques por pasada | 384 | Bloques de 16x128 volcada por PRAMIN. |
| Pasadas de pantalla | 512 | Pasadas totales en una sesión típica. |

## Cómo Ejecutar las Pruebas

### Smoke Test (obligatorio antes de PC real)

```bash
python3 tools/nt6/smoke.py --iso <ruta-a-tu-iso> --timeout 180
```

El smoke debe cumplir:
- `BOOT DRIVERS LOADED` presente.
- Marcador de userland presente.
- Ausencia de `Fatal System Error`, `*** STOP`, `KeBugCheck`, `Assertion failed`, `kdb:>`.

### Regresión de Suites

```bash
python3 tools/nt6/regtest.py --iso <ruta-a-tu-iso> --timeout 300
```

### Banco QEMU (GT 710 simulado)

```bash
python3 tools/nt6/bench-nvidia.py --iso <ruta-a-tu-iso> --disco <imagen> --menu-downs 3
```

> **Nota:** El banco QEMU con `pci-testdev` no sirve para validar arreglos del driver NVIDIA, ya que el hardware falso no tiene VBIOS ni interrupción real.

## Limitaciones de las Pruebas

- El banco QEMU no reproduce el comportamiento real de la GT 710.
- Las mediciones de FPS dependen del build (`-O0` tiene mayor costo por draw).
- El vsync a 60Hz puede limitar el FPS medido en escenas ligeras.
