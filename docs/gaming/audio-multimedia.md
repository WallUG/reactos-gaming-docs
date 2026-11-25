# Audio y Multimedia

Esta página documenta el subsistema de audio en ReactOS Gaming, incluyendo WDM, HDAudio, AC97, DirectSound y WASAPI.

## Arquitectura de Audio

| Componente | Descripción | Archivo Principal |
|------------|-------------|-------------------|
| wdmaud.drv | Controlador de audio multimedia de Windows | `win32ss/gdi/eng/` / `base/system/audio/` |
| portcls.sys | Clase de puerto de audio (WaveRT, WaveCyclic) | `drivers/wdm/audio/backpln/portcls/` |
| hdaudbus.sys | Bus de audio de alta definición (HD Audio) | `drivers/wdm/audio/hdaudbus/` |
| RTKVHDA.sys | Controlador de codec Realtek ALC662 | `boot/bootdata/livecd/RTKVHDA.sys` |
| mmixer | Mezclador de audio del sistema | `base/system/audio/mmixer/` |
| dsound.dll | DirectSound (API de audio para juegos) | `dll/win32/dsound/` |

## Pilas de Audio Soportadas

| Pila | Estado | Detalle |
|------|--------|---------|
| WDM | Implementado | Modelo de controladores de audio de Windows Driver Model. |
| HDAudio | Implementado | Audio de alta definición mediante `hdaudbus.sys` y codecs. |
| AC97 | Implementado | Audio codec legacy mediante `ac97.sys`. |
| WaveRT | Implementado | Streaming de audio en tiempo real mediante `portcls`. |
| WaveCyclic | Implementado | Streaming de audio cíclico mediante `portcls`. |
| DirectSound | Implementado | API de audio para juegos mediante `dsound.dll`. |
| WASAPI | No implementado | Windows Audio Session API (Windows Vista+). |

## Implementación en Hardware Real

| Componente | Modelo | Estado | Detalle |
|------------|--------|--------|---------|
| Codec de audio | Realtek ALC662 | Implementado | `RTKVHDA.sys` carga sin Código 10 en placa real. |
| Bus de audio | Intel HDA | Implementado | `hdaudbus.sys` enumera el codec correctamente. |
| Clase de puerto | WaveRT | Implementado | `portcls.sys` con streaming de audio. |
| Mezclador | mmixer | Implementado | Controles de volumen y rutas de audio. |
| Salida de audio | Altavoces / Auriculares | Implementado | Selección de destino de reproducción. |

## Flujo de Audio

```
Aplicación (DirectSound / WaveOut / etc.)
    ↓
dsound.dll / winmm.dll (modo usuario)
    ↓
wdmaud.drv (modo usuario/kernel)
    ↓
portcls.sys (clase de puerto)
    ↓
Miniport (RTKVHDA.sys, ac97.sys, etc.)
    ↓
Hardware de audio (codec Realtek ALC662)
```

## Limitaciones Conocidas

- WASAPI no está implementado; las aplicaciones modernas que lo requieran no funcionarán.
- El mezclador de audio (`mmixer`) tiene soporte básico; algunas funciones avanzadas pueden faltar.
- La captura de audio (micrófono) no ha sido probada extensivamente en hardware real.
