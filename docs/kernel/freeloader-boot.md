# FreeLoader, Arranque y ACPI

## FreeLoader

FreeLoader es el gestor de arranque de ReactOS. Es responsable de:

1. Leer la configuración de arranque desde `freeldr.ini`.
2. Cargar el núcleo (`ntoskrnl.exe`) en memoria.
3. Cargar el HAL (`hal.dll`) y los controladores de arranque críticos.
4. Transferir el control al punto de entrada del núcleo.

### Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `freeldr.ini` | Entradas de arranque, opciones del kernel, partición activa |
| `boot.ini` (opcional) | Compatibilidad con formato de arranque de Windows NT |

### Opciones de Arranque Relevantes

- `/DEBUG`: Activa la salida de depuración por puerto serie.
- `/DEBUGPORT=COM1`: Configura el puerto de depuración.
- `/BAUDRATE=115200`: Velocidad del puerto serie de depuración.
- `/SOS`: Muestra los controladores cargados durante el arranque.

## Arranque en Modo Legacy BIOS

En sistemas con BIOS tradicional, el proceso de arranque sigue esta secuencia:

1. POST del firmware.
2. Carga del sector de arranque (MBR/VBR).
3. Ejecución de FreeLoader.
4. Carga del núcleo y HAL.
5. Inicialización de gestores del kernel.
6. Inicio de `smss.exe` y subsistemas de usuario.

## Arranque en Modo UEFI

El soporte UEFI está en desarrollo. Actualmente se prioriza el arranque Legacy BIOS para validación en hardware real (H81MHV3).

## ACPI (Advanced Configuration and Power Interface)

ACPI proporciona al sistema operativo una interfaz estandarizada para:

- Enumeración de dispositivos no Plug and Play.
- Gestión de energía y estados de suspensión.
- Tablas de descripción de hardware (FACP, MADT, XSDT).
- Temporizadores y control de interrupciones.

### Implementación en ReactOS Gaming

| Componente | Estado | Detalle |
|------------|--------|---------|
| HAL ACPI (`halacpi`) | Implementado | Soporte para tablas ACPI v5.0 |
| APIC | Implementado | Controlador de interrupciones multiprocesador |
| Temporizador ACPI | Implementado | Temporizador de fondo para gestión de energía |
| PnP ACPI | Parcial | Enumeración de dispositivos mediante tablas ACPI |

### Tablas ACPI Soportadas

| Tabla | Descripción | Estado |
|-------|-------------|--------|
| XSDT | Extended System Description Table | Implementado |
| FACP | Fixed ACPI Description Table | Implementado |
| MADT | Multiple APIC Description Table | Implementado |
| DSDT | Differentiated System Description Table | Parcial |

## Secuencia de Inicialización del Núcleo

1. `KiSystemStartup`: Punto de entrada principal del núcleo.
2. `HalInitializeProcessor`: Inicialización del procesador de arranque (BSP).
3. `MmInitSystem`: Inicialización del gestor de memoria.
4. `ObInitSystem`: Inicialización del gestor de objetos.
5. `ExInitSystem`: Inicialización del gestor ejecutivo.
6. `IoInitSystem`: Inicialización del gestor de E/S y PnP.
7. `PspInitSystem`: Inicialización de procesos y hilos del sistema.
8. `SmssStart`: Lanzamiento del Session Manager.
