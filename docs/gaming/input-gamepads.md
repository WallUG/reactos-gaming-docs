# Input y Gamepads

Esta página documenta el subsistema de entrada en ReactOS Gaming, incluyendo teclado, ratón, mandos gaming y HID.

## Arquitectura de Entrada

| Componente | Descripción | Archivo Principal |
|------------|-------------|-------------------|
| i8042prt.sys | Controlador de teclado y ratón PS/2 | `drivers/input/i8042prt/` |
| hidclass.sys | Clase de dispositivos HID | `drivers/hid/hidclass/` |
| hidusb.sys | Controlador USB para dispositivos HID | `drivers/hid/hidusb/` |
| mouclass.sys | Clase de ratón | `drivers/input/mouclass/` |
| kbdclass.sys | Clase de teclado | `drivers/input/kbdclass/` |
| dinput.dll | DirectInput (API de entrada para juegos) | `dll/win32/dinput/` |
| xinput1_x.dll | XInput (API de mandos Xbox) | `dll/win32/xinput/` |

## Dispositivos de Entrada Soportados

| Dispositivo | Estado | Detalle |
|-------------|--------|---------|
| Teclado PS/2 | Implementado | Mediante `i8042prt.sys` y `kbdclass.sys`. |
| Ratón PS/2 | Implementado | Mediante `i8042prt.sys` y `mouclass.sys`. |
| Teclado USB | Implementado | Mediante `hidusb.sys` y `hidclass.sys`. |
| Ratón USB | Implementado | Mediante `hidusb.sys` y `hidclass.sys`. |
| Gamepad XInput | No implementado | API de mandos Xbox no disponible. |
| Gamepad DirectInput | No implementado | API de mandos genérica no disponible. |
| Dispositivos HID genéricos | Parcial | Clase HID implementada; controladores específicos pendientes. |

## DirectInput

DirectInput es la API de entrada para juegos de Microsoft:

| Característica | Estado | Detalle |
|----------------|--------|---------|
| `dinput.dll` | Implementado | DLL de DirectInput presente en el sistema. |
| Enumeración de dispositivos | No implementado | No se detectan mandos o joysticks. |
| Mapeo de ejes y botones | No implementado | No hay traducción de entrada de mandos. |
| Vibración (force feedback) | No implementado | No hay soporte para vibración de mandos. |

## XInput

XInput es la API de mandos de Xbox:

| Característica | Estado | Detalle |
|----------------|--------|---------|
| `xinput1_x.dll` | No implementado | DLL de XInput no disponible. |
| Detección de mandos Xbox | No implementado | No se detectan mandos de Xbox 360/One. |
| Vibración | No implementado | No hay soporte para vibración. |

## Implementación en Hardware Real

| Componente | Estado | Detalle |
|------------|--------|---------|
| Teclado | Implementado | Funcional en placa real (PS/2 y USB). |
| Ratón | Implementado | Funcional en placa real (PS/2 y USB). |
| Puntero de mouse | Software | El puntero es renderizado por software, no por hardware. |
| Clips de borde del ratón | Implementado | `warp_check` recentra el cursor en modo exclusivo (Halo FPS). |

## Mejoras Gaming en Input

| Mejora | Estado | Detalle |
|--------|--------|---------|
| `warp_check` reciente | Implementado | Recentra el cursor en cada poll exclusivo (throttle 10ms). |
| Clip del cursor | Implementado | Mantiene el cursor dentro del área de juego. |
| Posiciones absolutas | Implementado | Soporte para coordenadas absolutas de ratón. |

## Limitaciones Conocidas

- No hay soporte para mandos de juego (gamepads) mediante XInput o DirectInput.
- No hay soporte para dispositivos HID avanzados (volantes, palancas, pads de batalla).
- El puntero de mouse es de software; no hay cursor de hardware acelerado por GPU.
