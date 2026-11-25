# Optimizaciones Gaming

Esta página documenta los ajustes de latencia, prioridad de hilos y scheduler realizados en ReactOS Gaming para mejorar el rendimiento en juegos.

## Ajustes del Scheduler

| Ajuste | Estado | Detalle |
|--------|--------|---------|
| `csmt=0` | Implementado | Command Stream Single-Threaded: desactiva el handoff entre hilos por draw, reduciendo la sobrecarga de sincronización. |
| Prioridad de hilos | Implementado | Hilos de juego con prioridad elevada para reducir latencia de frame. |
| Quantum de CPU | Implementado | Ajuste del quantum de ejecución para juegos en modo ventana y fullscreen. |

## Optimizaciones del Núcleo

| Ajuste | Archivo | Estado | Detalle |
|--------|---------|--------|---------|
| `KiTrap07Handler` | `ntoskrnl/ke/i386/traphdlr.c` | Implementado | Reanudación siempre con TS limpio, evita bucle #NM cerrado en modo kernel. |
| `FPUTRAP` | `ntoskrnl/ke/i386/traphdlr.c` | Implementado | `DPRINT1` → `DPRINT` para reducir spam de serie en faltas de punto flotante. |
| `PspExitThread` | `ntoskrnl/ps/kill.c` | Implementado | Limpia `NpxThread` del PRCB al salir un hilo, evitando estado FPU colgado. |
| `GDI_CleanupForProcess` | `win32ss/gdi/ntgdi/gdiobj.c` | Implementado | Destruye DRIVEROBJs primero (dos pasadas), evitando lecturas de objetos liberados. |
| `EngDeviceIoControl` | `win32ss/gdi/eng/device.c` | Implementado | Valida handle antes de tocarlo, evitando faults en drivers de video cerrados. |

## Optimizaciones de Entrada

| Ajuste | Archivo | Estado | Detalle |
|--------|---------|--------|---------|
| `warp_check` reciente | `win32ss/user/ntuser/mouse.c` | Implementado | Recentra el cursor en cada poll exclusivo (throttle 10ms). |
| `GetThreadDesktop` | `win32ss/user/winsrv/usersrv/init.c` | Implementado | Impresión eliminada en sondeo caliente de `nvoglnt`. |
| Caller-ID rate-limited | `win32ss/user/user32/misc/desktop.c` | Implementado | Log de sondeo de escritorio limitado a 8 por proceso. |

## Optimizaciones de Limpieza y Estabilidad

| Ajuste | Archivo | Estado | Detalle |
|--------|---------|--------|---------|
| `DRIVEROBJ_vCleanup` | `win32ss/gdi/eng/driverobj.c` | Implementado | SEH + save/restore de `CombinedApcDisable`, evita fallos al salir del juego. |
| `EngpUpdateGraphicsDeviceList` | `win32ss/gdi/eng/device.c` | Implementado | Backoff 60s a dispositivos que fallan al registrar, reduce sondeo continuo. |
| Safety net VAD | `ntoskrnl/mm/ARM3/procsup.c` | Implementado | Libera tablas de página vacías, evita asserts en `MiDeletePde`. |

## Rendimiento Medido

| Escenario | FPS | Condiciones |
|-----------|-----|-------------|
| Halo (escenas ligeras, ~200 draws) | ~60 fps | i3 monoprocesador, `csmt=0`, ajustes bajos. |
| Halo (escenas pesadas, ~400 draws) | ~30 fps | i3 monoprocesador, `csmt=0`, ajustes bajos. |
| Halo (escenas muy pesadas, ~1000 draws) | ~20 fps | i3 monoprocesador, `csmt=0`, ajustes bajos. |

## Limitaciones Conocidas

- El frame está clavado en ~33.5ms (vsync a 60Hz cayendo cada 2 vblanks o cap de 30fps del juego).
- El costo por draw es alto en build `-O0` (sin optimizaciones del compilador).
- El ratón FPS puede atascarse en bordes si no se adquiere por dinput (Halo usa teclado por dinput, ratón por ClipCursor).
