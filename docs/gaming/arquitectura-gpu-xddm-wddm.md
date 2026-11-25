# Arquitectura GPU: XDDM vs WDDM

Esta página documenta la transición del modelo de controladores de pantalla XDDM (Windows XP/2003) al modelo WDDM (Windows Vista/7+) utilizado en ReactOS Gaming para soporte de GPUs modernas.

## XDDM (Windows Display Driver Model)

XDDM es el modelo de controladores de pantalla utilizado en Windows NT 5.x (XP, Server 2003):

| Característica | Descripción |
|----------------|-------------|
| Modelo de controlador | Monolítico, el controlador tiene acceso directo al hardware. |
| Gestión de memoria | El controlador administra su propia memoria de video. |
| Presentación | Blt (bit-block transfer) directo al framebuffer. |
| Multimonitor | Soporte limitado y complejo. |
| Recuperación de fallos | Un fallo del controlador puede afectar todo el sistema. |
| Controladores de ejemplo | `vga.sys`, `nv4_mini.sys`, `ati2mtag.sys`. |

## WDDM (Windows Display Driver Model)

WDDM es el modelo introducido en Windows Vista y utilizado en Windows 7+:

| Característica | Descripción |
|----------------|-------------|
| Modelo de controlador | Miniport + dxgkrnl, separación entre kernel y controlador de video. |
| Gestión de memoria | dxgkrnl administra la memoria de video y las asignaciones. |
| Presentación | VidPn, flip y blit gestionados por el compositor de escritorio. |
| Multimonitor | Soporte nativo y simplificado. |
| Recuperación de fallos | El controlador puede reiniciarse sin afectar el sistema. |
| Controladores de ejemplo | `nvlddmkm.sys` (NVIDIA), `atikmdag.sys` (AMD), `igdkmd64.sys` (Intel). |

## Componentes de WDDM en ReactOS Gaming

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| dxgkrnl.sys | `drivers/wddm/dxgkrnl/` | Núcleo del modelo WDDM, gestiona miniports y asignaciones. |
| Miniport NVIDIA | `boot/bootdata/livecd/nvlddmkm.sys` | Controlador propietario WDDM de NVIDIA 365.19. |
| Win32k | `win32ss/gdi/eng/` | Integración de GDI con WDDM mediante dxgkrnl. |
| D3DKMT | `win32ss/gdi/ntgdi/d3dkmt.c` | API de modo usuario para operaciones de kernel de video. |

## Arquitectura de la Pila de Video

```
Aplicación (modo usuario)
    ↓
OpenGL ICD / DirectX (modo usuario)
    ↓
D3DKMT API (win32ss/gdi/ntgdi/)
    ↓
dxgkrnl.sys (kernel WDDM)
    ↓
Miniport NVIDIA nvlddmkm.sys (kernel)
    ↓
Hardware GPU GT 710
```

## Implementación en ReactOS Gaming

| Característica | Estado | Detalle |
|----------------|--------|---------|
| dxgkrnl como miniport WDDM | Implementado | `nvlddmkm.sys` carga como miniport WDDM. |
| DxgkDdiStartDevice | Implementado | El miniport llega a la inicialización de dispositivo. |
| DxgkDdiCreateContext | Implementado | Se crean contextos de renderizado 3D. |
| DxgkDdiRender | Parcial | `Render #1` funciona; `Render #2` falla por contexto GR (Paso 15). |
| DxgkDdiSubmitCommand | Implementado | Envío de comandos a la GPU. |
| DxgkDdiPresent | Parcial | `SetVidPnSourceAddress` funciona; `Present` no escribe en la primaria. |
| VidPn (Video Present Network) | Implementado | Gestión de modos de video y salidas. |
| Asignaciones de memoria | Implementado | Creación y apertura de asignaciones VRAM y de apertura. |

## Bloqueo Actual

El modelo WDDM está parcialmente implementado. El bloqueo principal es el **Paso 15: `ROBUST_CHANNEL_GR_FAULT_DURING_CTXSW`** (`ErrorType=0x2c`), que impide que la GPU lea la RAM del sistema y, por lo tanto, que pueda presentar el escritorio o ejecutar aplicaciones OpenGL 3D.
