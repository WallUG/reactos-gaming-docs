# Compatibilidad WDM

Esta página documenta la compatibilidad con controladores binarios de Windows (WDM — Windows Driver Model) en ReactOS Gaming.

## Visión General

ReactOS Gaming busca ser compatible con controladores de modo kernel escritos para Windows NT 5.2 (Server 2003 / XP) y NT 6.x (Vista / 7+). Esto permite usar controladores de hardware originales de Windows en lugar de depender únicamente de controladores nativos de ReactOS.

## Modelo de Controlador WDM

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Carga de controladores `.sys` | Implementado | El cargador de controladores del kernel puede cargar controladores WDM. |
| Dispatch routines | Implementado | `IRP_MJ_CREATE`, `IRP_MJ_CLOSE`, `IRP_MJ_READ`, `IRP_MJ_WRITE`, `IRP_MJ_DEVICE_CONTROL`, etc. |
| PnP (Plug and Play) | Implementado | `IRP_MN_START_DEVICE`, `IRP_MN_STOP_DEVICE`, `IRP_MN_REMOVE_DEVICE`, etc. |
| Gestión de energía | Parcial | `IRP_MN_SET_POWER`, `IRP_MN_QUERY_POWER` parcialmente implementados. |
| WMI | Parcial | Soporte limitado para instrumentación de administración de Windows. |
| NDIS 6 | Implementado | Miniports de red compatibles con NDIS 6.0. |
| WDDM | Parcial | Miniports de pantalla WDDM (NVIDIA 365.19) en desarrollo activo. |

## Arquitectura de Carga de Controladores

```
Archivo .sys (modo kernel)
    ↓
Cargador de controladores del kernel (ntoskrnl)
    ↓
DriverEntry del controlador
    ↓
Registro de MajorFunctions y objeto de dispositivo
    ↓
PnP y enumeración de dispositivos
    ↓
Dispositivo listo para operaciones de E/S
```

## Compatibilidad de APIs del Kernel

| API | Estado | Detalle |
|-----|--------|---------|
| `IoCreateDevice` | Implementado | Creación de objetos de dispositivo. |
| `IoCreateSymbolicLink` | Implementado | Creación de enlaces simbólicos de dispositivo. |
| `IoRegisterDeviceInterface` | Parcial | Registro de interfaces de dispositivo. |
| `IoGetDeviceObjectPointer` | Implementado | Obtención de puntero a objeto de dispositivo. |
| `IoBuildDeviceIoControlRequest` | Implementado | Construcción de solicitudes de control de dispositivo. |
| `IoCallDriver` | Implementado | Envío de IRP al siguiente controlador en la pila. |
| `IoCompleteRequest` | Implementado | Finalización de una solicitud de E/S. |
| `IoAllocateIrp` / `IoFreeIrp` | Implementado | Asignación y liberación de IRPs. |
| `IoAllocateMdl` / `IoFreeMdl` | Implementado | Gestión de listas de descriptores de memoria. |
| `MmProbeAndLockPages` | Implementado | Bloqueo de páginas en memoria para acceso directo. |
| `MmMapLockedPagesSpecifyCache` | Implementado | Mapeo de páginas bloqueadas con atributo de caché. |
| `KeInitializeSpinLock` | Implementado | Inicialización de bloqueos de giro. |
| `KeAcquireSpinLock` / `KeReleaseSpinLock` | Implementado | Adquisición y liberación de bloqueos de giro. |
| `ExAcquireResourceExclusive` | Implementado | Adquisición exclusiva de recursos. |
| `KeGetCurrentIrql` | Implementado | Obtención del nivel de prioridad de interrupción actual. |
| `KeRaiseIrql` / `KeLowerIrql` | Implementado | Cambio del nivel de prioridad de interrupción. |

## Limitaciones Conocidas

- Algunos controladores de Windows modernos (Windows 10/11) pueden no cargar debido a diferencias en la ABI del núcleo.
- Los controladores que requieren características de NT 6.x no implementadas pueden fallar.
- No hay soporte para controladores de firma digital obligatoria (driver signature enforcement).
- Algunos controladores de video modernos requieren WDDM 1.3+, que no está completamente implementado.

## Pruebas de Compatibilidad

| Prueba | Estado | Detalle |
|--------|--------|---------|
| `ndis6abi.py` | Implementado | Valida estructuras NDIS 6 contra el WDK (tamaños y offsets). |
| `inventory.py` | Implementado | Valida la tabla de syscalls y exports del kernel. |
| `kmtests` | Implementado | Tests de modo kernel para validar estructuras y contratos. |
| `apitests` | Implementado | Tests de modo usuario para validar APIs de Win32. |

## Cómo Cargar un Controlador Externo

1. Coloque el archivo `.sys` en `C:\ReactOS\System32\drivers\`.
2. Registre el controlador en el registro bajo `HKLM\SYSTEM\CurrentControlSet\Services\<Nombre>`.
3. Inicie el servicio mediante el Administrador de Dispositivos o `sc start <Nombre>`.
4. Verifique en el log de serie que el controlador cargó sin errores.
