# I/O Manager y Plug and Play

El I/O Manager (`Io`) gestiona todas las operaciones de entrada/salida en el sistema, incluyendo el acceso a dispositivos, archivos, redes y la pila de controladores.

## Estructura de la Pila de Controladores

Cada dispositivo en el sistema está representado por una pila de controladores:

| Tipo de Controlador | Responsabilidad |
|---------------------|-----------------|
| Bus Driver | Detecta y enumera dispositivos en un bus (PCI, USB, ACPI). |
| Function Driver | Controla la funcionalidad principal del dispositivo. |
| Filter Driver | Intercepta y modifica operaciones de E/S para un dispositivo. |

## Objetos de Dispositivo

| Tipo | Descripción |
|------|-------------|
| FDO (Function Device Object) | Representa un dispositivo funcional en la pila. |
| PDO (Physical Device Object) | Representa un dispositivo físico detectado por el bus. |
| Filter Device Object | Intercepta IRPs para un dispositivo. |

## IRP (I/O Request Packet)

El IRP es la estructura fundamental para todas las operaciones de E/S:

- Contiene el tipo de operación (lectura, escritura, control, etc.).
- Incluye parámetros específicos de la operación.
- Se propaga a través de la pila de controladores.
- Cada controlador puede completar el IRP o pasarlo al siguiente.

## Plug and Play (PnP)

PnP permite la detección automática y configuración de dispositivos:

| IRP de PnP | Descripción |
|------------|-------------|
| IRP_MN_START_DEVICE | Inicializa un dispositivo tras la detección de recursos. |
| IRP_MN_STOP_DEVICE | Detiene temporalmente un dispositivo. |
| IRP_MN_REMOVE_DEVICE | Elimina un dispositivo del sistema. |
| IRP_MN_QUERY_DEVICE_RELATIONS | Obtiene relaciones entre dispositivos (padre, hijo, objetivo). |
| IRP_MN_QUERY_CAPABILITIES | Obtiene capacidades del dispositivo (energía, despertar, etc.). |

## Gestión de Energía (PnP + Power)

| IRP de Energía | Descripción |
|----------------|-------------|
| IRP_MN_SET_POWER | Cambia el estado de energía del dispositivo (D0-D3). |
| IRP_MN_QUERY_POWER | Consulta el estado de energía actual o posible. |

## Implementación en ReactOS Gaming

| Componente | Estado | Detalle |
|------------|--------|---------|
| Gestor de E/S (`Io`) | Implementado | Operaciones de lectura/escritura y control de dispositivos. |
| PnP Manager | Implementado | Detección y enumeración de dispositivos PCI y ACPI. |
| Controlador PCI | Implementado | Enumeración de dispositivos PCI y asignación de recursos. |
| Controlador ACPI | Implementado | Dispositivos enumerados mediante tablas ACPI. |
| Controlador USB | Parcial | UHCI, OHCI, EHCI implementados; xHCI pendiente. |

## Secuencia de Inicialización de un Dispositivo

1. El bus driver detecta el dispositivo y crea un PDO.
2. El PnP Manager asigna recursos (IRQ, memoria, puertos de E/S).
3. Se carga el function driver adecuado.
4. Se envía `IRP_MN_START_DEVICE` para inicializar el dispositivo.
5. El dispositivo está listo para aceptar operaciones de E/S.
