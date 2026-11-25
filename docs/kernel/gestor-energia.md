# Power Manager (Po)

El Power Manager (`Po`) gestiona los estados de energía del sistema y de los dispositivos individuales en ReactOS Gaming.

## Estados de Energía del Sistema (S-States)

| Estado | Nombre | Descripción |
|--------|--------|-------------|
| S0 | Working | Sistema completamente encendido y operativo. |
| S1 | Sleep | CPU detenida, RAM mantenida, dispositivos de bajo consumo. |
| S2 | Sleep | CPU sin energía, RAM mantenida. |
| S3 | Suspend to RAM | Solo RAM mantenida, resto sin energía. |
| S4 | Hibernate | Contenido de RAM escrito a disco, sistema apagado. |
| S5 | Soft Off | Sistema apagado, requiere reinicio completo. |

## Estados de Energía de Dispositivos (D-States)

| Estado | Nombre | Descripción |
|--------|--------|-------------|
| D0 | Fully On | Dispositivo completamente operativo. |
| D1 | Low Power | Bajo consumo, tiempo de recuperación corto. |
| D2 | Sleep | Consumo menor, tiempo de recuperación mayor. |
| D3 | Off | Dispositivo apagado, requiere reinicialización. |

## IRPs de Energía

| IRP | Descripción |
|-----|-------------|
| `IRP_MN_SET_POWER` | Cambia el estado de energía de un dispositivo. |
| `IRP_MN_QUERY_POWER` | Consulta el estado de energía actual o posible. |
| `IRP_MN_WAIT_WAKE` | Permite que un dispositivo despierte el sistema. |

## Implementación en ReactOS Gaming

| Componente | Estado | Detalle |
|------------|--------|---------|
| Gestión de estados del sistema | Parcial | S0 y S5 implementados; S1-S4 en desarrollo. |
| Gestión de estados de dispositivo | Parcial | D0 y D3 implementados; D1-D2 pendientes. |
| `PoStartNextPowerIrp` | Implementado | Procesamiento de IRPs de energía en secuencia. |
| `PoRequestPowerIrp` | Implementado | Solicitud de cambio de estado de energía. |
| Callbacks de energía | Parcial | Registro de controladores para notificaciones de energía. |

## Flujo de Cambio de Energía de Dispositivo

1. El PnP Manager o el sistema solicita un cambio de estado de energía.
2. Se crea un `IRP_MN_SET_POWER` con el estado destino.
3. El IRP se envía a través de la pila de controladores del dispositivo.
4. Cada controlador puede aceptar, modificar o rechazar el cambio.
5. El IRP se completa y el dispositivo entra en el nuevo estado.

## Consideraciones para WDDM y GPU

Los controladores de pantalla WDDM (como `nvlddmkm.sys`) deben manejar correctamente los IRPs de energía para:

- Ahorrar energía cuando la pantalla está apagada.
- Restaurar el estado de renderizado al reactivar la pantalla.
- Manejar eventos de despertar por usuario o temporizador.
