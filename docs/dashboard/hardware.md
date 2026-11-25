# Dashboard: Soporte de Hardware

Esta página documenta la matriz de soporte de hardware probada en la plataforma de desarrollo real y en entornos de virtualización.

## Hardware de la Placa de Desarrollo

<table>
  <thead>
    <tr><th>Componente</th><th>Modelo</th><th>IDs</th><th>Estado</th><th>Notas Técnicas</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Placa base</strong></td>
      <td>BIOSTAR H81MHV3</td>
      <td>—</td>
      <td>Funcional</td>
      <td>ACPI SMP + AHCI DMA funcionando. BIOS actualizada.</td>
    </tr>
    <tr>
      <td><strong>CPU</strong></td>
      <td>Intel i3-4170</td>
      <td>—</td>
      <td>Funcional</td>
      <td>Mononúcleo UP. Kernel ntoskrnlmp para pruebas SMP.</td>
    </tr>
    <tr>
      <td><strong>GPU</strong></td>
      <td>NVIDIA GeForce GT 710</td>
      <td>10de:128b</td>
      <td>Parcial</td>
      <td>Driver WDDM 365.19 cargado. Ejecuta Fill y copia VRAM→VRAM. No lee RAM del sistema.</td>
    </tr>
    <tr>
      <td><strong>Red</strong></td>
      <td>Realtek RTL8136</td>
      <td>10ec:8136</td>
      <td>Funcional</td>
      <td>Driver rtlh86.sys NDIS 6. Funcional en QEMU y placa real.</td>
    </tr>
    <tr>
      <td><strong>Audio</strong></td>
      <td>Realtek ALC662</td>
      <td>10ec:0662</td>
      <td>Funcional</td>
      <td>RTKVHDA.sys + portcls.sys WaveRT. Sin Código 10 en placa real.</td>
    </tr>
    <tr>
      <td><strong>RAM</strong></td>
      <td>—</td>
      <td>—</td>
      <td>Funcional</td>
      <td>3,556 MB detectados. Máximo soportado: 4 GB con PAE.</td>
    </tr>
    <tr>
      <td><strong>Almacenamiento</strong></td>
      <td>—</td>
      <td>—</td>
      <td>Funcional</td>
      <td>FAT32, NTFS, Btrfs, ATA, AHCI, NVMe.</td>
    </tr>
    <tr>
      <td><strong>USB</strong></td>
      <td>—</td>
      <td>—</td>
      <td>Parcial</td>
      <td>UHCI, OHCI, EHCI. xHCI / USB 3.0 pendiente.</td>
    </tr>
  </tbody>
</table>

---

## Detalle por Categoría

### GPU — Aceleración 3D

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Driver WDDM cargado | Implementado | nvlddmkm.sys 365.19, DriverModel is 0x1300 |
| DxgkDdiStartDevice | Implementado | Llega correctamente |
| Ejecución de comandos (Fill) | Implementado | Escribe patrones en VRAM mapeada |
| Copia VRAM → VRAM | Implementado | Dentro del rango mapeado (~192 KB) |
| Interrupciones tipo 1 / DPC | Implementado | Llegan, cercas avanzan |
| Lectura de RAM del sistema | Faltante | Bloqueo Paso 15, ErrorType=0x2c |
| Presentación por GPU | Faltante | Scanout por CPU vía PRAMIN |
| OpenGL ICD | Faltante | nvoglv32.dll llega a Render pero falla en Render #2 |

Rango de VRAM mapeado para la GPU: 0x300000 a 0x318000 (~192 KB). La pantalla completa requiere 3 MB (1024×768×4).

### Audio — WDM / HDAudio / AC97

| Componente | Estado | Detalle |
|------------|--------|---------|
| RTKVHDA.sys (Realtek ALC662) | Implementado | Sin Código 10 en placa real |
| portcls.sys WaveRT | Implementado | Streaming de audio funcional |
| wdmaud.drv | Implementado | Mezclador de audio de Windows |
| mmixer | Implementado | Controles de volumen y rutas de audio |
| hdaudbus.sys | Implementado | Bus HD Audio enumerando codecs |

### Red — TCP/IP y NDIS

| Componente | Estado | Detalle |
|------------|--------|---------|
| rtlh86.sys (Realtek RTL8136) | Implementado | NDIS 6.0 miniport |
| lwIP | Implementado | Pila TCP/IP ligera |
| Winsock | Implementado | API de sockets de Windows |
| NDIS 6 | Implementado | Miniport y filtros |

### Almacenamiento

| Tipo | Estado | Detalle |
|------|--------|---------|
| FAT32 | Implementado | Lectura y escritura |
| NTFS | Parcial | Lectura y escritura experimental |
| Btrfs | Implementado | Soporte experimental |
| Ext2/3/4 | Implementado | Lectura |
| ATA / ATAPI | Implementado | Discos ópticos y duros IDE |
| AHCI / SATA | Implementado | Controladores AHCI funcionando |
| NVMe | Implementado | Soporte básico |

### USB

| Versión | Estado | Detalle |
|---------|--------|---------|
| UHCI | Implementado | USB 1.1 |
| OHCI | Implementado | USB 1.1 |
| EHCI | Implementado | USB 2.0 |
| xHCI / USB 3.0 | Faltante | Pendiente de implementar |

---

## Compatibilidad con Máquinas Virtuales

| Hipervisor | Aceleración 3D | Estado | Notas |
|------------|---------------|--------|-------|
| QEMU / KVM | No (pci-testdev) | Parcial | Sirve para pruebas de arranque, no para GPU real |
| VirtualBox | No | Parcial | Guest additions no disponibles |
| VMware | No | Parcial | SVGÁ no acelerado para WDDM |

Nota: El banco QEMU con pci-testdev presentado como GT 710 no sirve para validar arreglos del driver NVIDIA, ya que el hardware falso no tiene VBIOS ni interrupción real. Todas las validaciones de GPU se hacen en la placa real (H81MHV3 + GT 710).
