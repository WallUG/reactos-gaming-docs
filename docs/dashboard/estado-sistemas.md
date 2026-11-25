# Dashboard: Estado de Sistemas

<ProgressBars />

<ChartBars title="Progreso por Subsistema" />

---

## Resumen Ejecutivo

<table>
  <thead>
    <tr><th>Métrica</th><th>Valor</th><th>Tendencia</th></tr>
  </thead>
  <tbody>
    <tr><td>Progreso global promedio</td><td>68%</td><td>Ascendente</td></tr>
    <tr><td>Subsistemas implementados</td><td>8 de 11</td><td>Completo</td></tr>
    <tr><td>Subsistemas parciales</td><td>3 de 11</td><td>En progreso</td></tr>
    <tr><td>Subsistemas faltantes</td><td>0 de 11</td><td>Ninguno</td></tr>
    <tr><td>Bloqueos activos</td><td>1 (Paso 15)</td><td>Critico</td></tr>
  </tbody>
</table>

---

## Detalle por Subsistema

Cada tarjeta muestra el porcentaje de avance, el estado semántico y una descripción técnica del estado actual en la rama feat/nt6-integration.

### Núcleo Core (NT 5.2 / NT 6.x) — 85%

Gestor de memoria (Mm), gestor de procesos e hilos (Ps), I/O Manager (Io), Object Manager (Ob) y Configuration Manager (Cm)/Registro. La capa NT 6.x está integrada junto al núcleo clásico NT 5.2 para permitir drivers y juegos modernos.

Estado: Funcional en mononúcleo y multinúcleo. Pendiente: estabilización x64.

### Multinúcleo SMP / Mononúcleo UP — 100%

Soporte completo para sistemas con múltiples procesadores (SMP) y un solo procesador (UP). Validado en hardware real con i3-4170 (1 core) y testeado en QEMU con SMP.

Estado: Sin bloqueos conocidos.

### HAL — Capa de Abstracción de Hardware — 90%

ACPI, APIC, temporizadores, enrutamiento de interrupciones y gestión de energía a nivel de hardware. Funcionando en placa real BIOSTAR H81MHV3.

Estado: Estable. Pendiente: soporte de más chipsets y UEFI completo.

### WDDM — Miniport NVIDIA 365.19 — 60%

El driver propietario nvlddmkm.sys carga como miniport WDDM, llega a DxgkDdiStartDevice, ejecuta comandos (Fill, copia VRAM→VRAM) y genera interrupciones tipo 1. Sin embargo, la GPU no puede leer la RAM del sistema, bloqueando la presentación por GPU y OpenGL.

Estado: Bloqueado en Paso 15 (ROBUST_CHANNEL_GR_FAULT_DURING_CTXSW).

### OpenGL ICD (nvoglv32) — 10%

nvoglv32.dll carga sin fallos de imports (ETW resuelto) y llega a DxgkDdiRender, pero Render #2 falla sistemáticamente con 0xc00000e8 debido al fallo de contexto GR.

Estado: No funcional para aplicaciones 3D.

### DirectX Core — 40%

DirectDraw activado mediante ddraw.dll y ddraw16.dll. Direct3D 8/9/10/11 en camino a través de la capa WineD3D.

Estado: Parcial. Solo DDraw funcional.

### Audio WDM / HDAudio / AC97 — 85%

RTKVHDA (Realtek ALC662), portcls.sys con WaveRT, wdmaud.drv, mmixer. Funcionando en placa real sin Código 10.

Estado: Estable.

### Red TCP/IP y NDIS — 90%

Pila de red con lwIP, NDIS 6, Winsock y controlador rtlh86.sys para Realtek RTL8136. Funcional en QEMU y placa real.

Estado: Estable.

### Sistemas de Archivos y Almacenamiento — 75%

FAT32 (lectura/escritura), NTFS (lectura/escritura experimental), Btrfs, Ext2/3/4, ATA/ATAPI, AHCI/SATA, NVMe.

Estado: Funcional. Pendiente: optimizaciones de rendimiento.

### Pila USB — 60%

UHCI, OHCI, EHCI implementados. xHCI / USB 3.0 pendiente.

Estado: Parcial. Funciona para dispositivos USB 1.1/2.0.

### win32k.sys — GDI y USER — 80%

Escritorio funcional a 1024x768x32, GDI dibuja en sombra, presentación por CPU vía PRAMIN, swizzle de bloques de NVIDIA corregido.

Estado: Estable con presentación por CPU.

### Arnés de Regresión Propio — 90%

Arnés personalizado para validar estructuras, APIs, sistemas y subsistemas NT 5.2 / 6.x. Incluye smoke tests, regtests y validación de layouts.

Estado: Operativo. Ver página de Depuración → Arnés de Regresión.

---

## Bloqueo Activo: Paso 15

<div class="callout bad">

### ROBUST_CHANNEL_GR_FAULT_DURING_CTXSW — Error 0x2c (Xid 44)

Síntoma: DxgkDdiRender(ctx=0xd560003 ...) FALLO 0xc00000e8 repetido en cada intento de renderizado 3D.

Evidencia del GPU fault:
- MMU unidad 0: inst=0x7f5a0000 va=0x0 tipo=0x440 motivo=0 cliente=4 gpc=0 hub=1 escritura=0
- MMU unidades 1-31: inst=0xce6fd6e000 va=0xdbb865000 tipo=013b03c7 motivo=7 cliente=3 gpc=1 hub=1 escritura=1

Interpretación: La VA 0xdbb865000 (memoria del sistema) no tiene PTE válida en el VAS GPU durante el switch de contexto GR. El GPFIFO se lee y las cercas avanzan, pero el motor GR falla al cargar/guardar el buffer de contexto.

Próximos pasos:
1. Identificar por qué 0xdbb865000 no tiene PTE en el VAS GPU.
2. Mapear el buffer de contexto GR antes del switch.
3. Invalidar el TLB tras escribir nuevas PTEs.

</div>

---

## Últimos 4 Commits

| Commit | Área | Descripción |
|--------|------|-------------|
| 9fad9f1af4a | drivers/wddm/dxgkrnl/dxgwddm.c | Copiar UserCommandBuffer completo en DxgWddmRender para evitar 0xc00000e8 |
| f296676fada | kernel32 | DeleteFiber invoca cada callback FLS con su propio dato |
| 0427aa9c297 | docs/nt6 | Decodificar RC 0x2c = GR_FAULT_DURING_CTXSW (Paso 15) |
| b129ff861d0 | ntoskrnl | Corregir ABI de IoInitializeWorkItem e IoQueueWorkItemEx |
