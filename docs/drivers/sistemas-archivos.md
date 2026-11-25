# Sistemas de Archivos

Esta página documenta los sistemas de archivos soportados en ReactOS Gaming, sus capacidades, estado de implementación y limitaciones.

## Visión General

| Sistema de archivos | Lectura | Escritura | Estado | Notas |
|-------------------|---------|-----------|--------|-------|
| FAT32 | Sí | Sí | Implementado | Sistema de archivos principal para arranque y LiveCD. |
| NTFS | Sí | Sí | Parcial | Soporte experimental de lectura/escritura; puede haber corrupción en volúmenes complejos. |
| Btrfs | Sí | No | Experimental | Soporte experimental, principalmente de lectura. |
| Ext2/3/4 | Sí | No | Implementado | Lectura de sistemas de archivos Linux. |
| ISO9660 | Sí | No | Implementado | Lectura de medios ópticos (CD/DVD). |
| UDF | Sí | No | Parcial | Lectura parcial de discos DVD/Blu-ray. |

## Implementación por Componente

| Componente | Archivo | Estado | Detalle |
|------------|---------|--------|---------|
| Controlador FAT | `drivers/filesystems/fat/` | Implementado | Soporte completo para FAT12, FAT16 y FAT32. |
| Controlador NTFS | `drivers/filesystems/ntfs/` | Parcial | Lectura/escritura experimental; sin soporte completo de compresión ni cifrado. |
| Controlador Btrfs | `drivers/filesystems/btrfs/` | Experimental | Soporte inicial de lectura; en desarrollo activo. |
| Controlador Ext2/3/4 | `drivers/filesystems/ext2fs/` | Implementado | Lectura de volúmenes Ext2, Ext3 y Ext4. |
| Controlador CDFS | `drivers/filesystems/cdfs/` | Implementado | Lectura de sistemas de archivos ISO9660. |
| Controlador UDF | `drivers/filesystems/udf/` | Parcial | Lectura de UDF para medios ópticos modernos. |

## Características por Sistema

### FAT32

| Característica | Estado | Detalle |
|--------------|--------|---------|
| Longitudes de nombre de archivo (LFN) | Implementado | Soporte para nombres largos de archivo. |
| Clústeres de 4 KB a 32 KB | Implementado | Tamaños de clúster configurables. |
| Sistema de archivos de arranque | Implementado | ReactOS arranca desde particiones FAT32. |
| Acceso simultáneo | Implementado | Manejo básico de bloqueo de archivos. |

### NTFS

| Característica | Estado | Detalle |
|--------------|--------|---------|
| Lectura de archivos y directorios | Implementado | Acceso de lectura a volúmenes NTFS. |
| Escritura de archivos | Parcial | Escritura básica sin soporte de compresión ni cifrado. |
| MFT (Master File Table) | Implementado | Lectura y análisis de la tabla maestra de archivos. |
| Atributos extendidos | Parcial | Soporte parcial de atributos de archivo. |
| Compresión NTFS | No implementado | Archivos comprimidos no soportados. |
| Cifrado EFS | No implementado | Archivos cifrados no soportados. |
| Puntos de reparseo | No implementado | Enlaces simbólicos y puntos de montaje no soportados. |

### Btrfs

| Característica | Estado | Detalle |
|--------------|--------|---------|
| Lectura de subvolúmenes | Experimental | Soporte inicial y limitado. |
| Copy-on-Write | No implementado | No se admite escritura en volúmenes Btrfs. |
| Instantáneas | No implementado | No se pueden crear ni montar instantáneas. |
| RAID | No implementado | Solo volúmenes de un solo dispositivo. |

### Ext2/3/4

| Característica | Estado | Detalle |
|--------------|--------|---------|
| Lectura de archivos y directorios | Implementado | Acceso de lectura a volúmenes Ext. |
| Jornaleo (Ext3/4) | No implementado | Los volúmenes con jornaleo deben montarse como Ext2. |
| Atributos extendidos | No implementado | Atributos extendidos de Linux no soportados. |
| Cifrado | No implementado | Volúmenes cifrados no soportados. |

## Limitaciones Conocidas

- La escritura en NTFS puede causar corrupción en volúmenes con características avanzadas (compresión, cifrado, puntos de reparseo).
- Btrfs es de solo lectura y está en desarrollo activo; no se recomienda para producción.
- Los volúmenes Ext3/4 con jornaleo activo deben montarse como Ext2 para evitar daños.
- No hay soporte para volúmenes dinámicos de Windows (LDM).

## Montaje y Acceso

Los sistemas de archivos se montan automáticamente durante el arranque según la configuración del registro y los dispositivos detectados. Los puntos de montaje se exponen como letras de unidad (C:, D:, etc.) en el namespace de objetos de Windows (`\DosDevices`).
