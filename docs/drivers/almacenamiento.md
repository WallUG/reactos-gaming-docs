# Almacenamiento ATA / AHCI / NVMe

Esta página documenta los controladores de almacenamiento en ReactOS Gaming, incluyendo interfaces ATA/ATAPI, AHCI/SATA y NVMe.

## Visión General

| Interfaz | Estado | Detalle |
|----------|--------|---------|
| ATA / ATAPI | Implementado | Discos duros y unidades ópticas IDE/PATA. |
| AHCI / SATA | Implementado | Controladores SATA modernos en modo AHCI. |
| NVMe | Implementado | Unidades de estado sólido NVMe sobre PCIe. |
| RAID | No implementado | Configuraciones RAID por hardware o software no soportadas. |

## ATA / ATAPI

| Componente | Archivo | Estado | Detalle |
|------------|---------|--------|---------|
| Controlador ATA | `drivers/storage/atapath/` | Implementado | Soporte para canales IDE primario y secundario. |
| Controlador ATAPI | `drivers/storage/atapi/` | Implementado | Unidades ópticas (CD/DVD) mediante ATAPI. |
| DMA | `drivers/storage/atadisk/` | Implementado | Transferencia directa de memoria para discos ATA. |
| PIO | `drivers/storage/atadisk/` | Implementado | Modo de entrada/salida por programa como fallback. |

### Modos de Transferencia Soportados

| Modo | Ancho | Velocidad máxima | Estado |
|------|-------|------------------|--------|
| PIO 0 | 16 bits | 3.3 MB/s | Implementado |
| PIO 1 | 16 bits | 5.2 MB/s | Implementado |
| PIO 2 | 16 bits | 8.3 MB/s | Implementado |
| PIO 3 | 16 bits | 11.1 MB/s | Implementado |
| PIO 4 | 16 bits | 16.7 MB/s | Implementado |
| UDMA 0 | 16 bits | 16.7 MB/s | Implementado |
| UDMA 1 | 16 bits | 25.0 MB/s | Implementado |
| UDMA 2 | 16 bits | 33.3 MB/s | Implementado |
| UDMA 3 | 16 bits | 44.4 MB/s | Implementado |
| UDMA 4 | 16 bits | 66.7 MB/s | Implementado |
| UDMA 5 | 16 bits | 100.0 MB/s | Implementado |
| UDMA 6 | 16 bits | 133.3 MB/s | Implementado |

## AHCI / SATA

| Componente | Archivo | Estado | Detalle |
|------------|---------|--------|---------|
| Controlador AHCI | `drivers/storage/ahci/` | Implementado | Soporte para puertos SATA en modo AHCI. |
| Hotplug | `drivers/storage/ahci/` | Parcial | Detección de unidades conectadas en caliente limitada. |
| NCQ | `drivers/storage/ahci/` | Parcial | Native Command Queuing parcialmente soportado. |
| Puertos multiplos | `drivers/storage/ahci/` | Implementado | Hasta 32 puertos SATA por controlador. |

## NVMe

| Componente | Archivo | Estado | Detalle |
|------------|---------|--------|---------|
| Controlador NVMe | `drivers/storage/nvme/` | Implementado | Soporte para unidades SSD sobre interfaz PCIe. |
| Colas de submission/completion | `drivers/storage/nvme/` | Implementado | Gestión de colas de comandos NVMe. |
| Namespaces | `drivers/storage/nvme/` | Implementado | Soporte para múltiples namespaces por unidad. |
| Salud SMART | `drivers/storage/nvme/` | Parcial | Lectura parcial de atributos SMART. |

## Implementación en Hardware Real

| Controlador | Modelo | Estado | Detalle |
|-------------|--------|--------|---------|
| SATA AHCI | Intel chipset series 8 | Implementado | Funcionando en placa BIOSTAR H81MHV3. |
| NVMe | Varios fabricantes | Implementado | Pruebas limitadas en hardware real. |
| ATA IDE | Disco duro mecánico | Implementado | Compatible con unidades legacy. |

## Limitaciones Conocidas

- No hay soporte para configuraciones RAID (ni hardware ni software).
- El hotplug de unidades SATA tiene soporte limitado; puede requerir reinicio para detectar nuevas unidades.
- NCQ está parcialmente implementado; el rendimiento en unidades SSD puede no ser óptimo.
- No hay soporte para cifrado de unidades (BitLocker, etc.).

## Flujo de Acceso a Almacenamiento

```
Aplicación
    ↓
Sistema de archivos (NTFS, FAT32, etc.)
    ↓
Gestor de I/O (Io)
    ↓
Controlador de almacenamiento (atadisk, ahci, nvme)
    ↓
Controlador de bus (PCI, ACPI)
    ↓
Hardware de almacenamiento (disco, SSD, unidad óptica)
```
