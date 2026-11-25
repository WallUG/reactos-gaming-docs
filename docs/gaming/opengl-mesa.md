# OpenGL y Mesa 3D

Esta página documenta el estado de OpenGL en ReactOS Gaming, incluyendo el ICD de NVIDIA y la pila Mesa 3D.

## OpenGL ICD (nvoglv32.dll)

El ICD (Installable Client Driver) de OpenGL de NVIDIA es el controlador de modo usuario que traduce llamadas OpenGL a comandos de la GPU:

| Componente | Estado | Detalle |
|------------|--------|---------|
| `nvoglv32.dll` | Carga correctamente | Se carga sin fallos de imports (ETW resuelto). |
| `D3DKMTCreateDevice` | Funciona | Crea dispositivo de renderizado OpenGL. |
| `D3DKMTCreateAllocation` | Funciona | Crea asignaciones de memoria para OpenGL. |
| `D3DKMTCreateContext` | Funciona | Crea contextos de renderizado OpenGL. |
| `D3DKMTRender` | Falla en Render #2 | `0xc00000e8` debido al contexto GR (Paso 15). |
| `D3DKMTEscape` | Funciona | Escape `NVGL 0x05000013` para consultas de OpenGL. |

## Mesa 3D

Mesa es una implementación de código abierto de OpenGL y Vulkan:

| Componente | Estado | Detalle |
|------------|--------|---------|
| Mesa OpenGL | No integrado | ReactOS no incluye Mesa 3D en esta rama. |
| Gallium3D | No integrado | Arquitectura de controladores de Mesa. |
| Softpipe / LLVMpipe | No implementado | Renderizador por CPU de Mesa. |

## Flujo de Renderizado OpenGL

```
Aplicación OpenGL
    ↓
opengl32.dll (modo usuario)
    ↓
nvoglv32.dll (ICD de NVIDIA)
    ↓
D3DKMTCreateDevice / CreateAllocation / CreateContext
    ↓
D3DKMTRender (comandos OpenGL → comandos de GPU)
    ↓
dxgkrnl.sys (WDDM kernel)
    ↓
Miniport NVIDIA nvlddmkm.sys
    ↓
GPU GT 710
```

## Bloqueo Actual

El bloqueo principal es el **Paso 15: `ROBUST_CHANNEL_GR_FAULT_DURING_CTXSW`** (`ErrorType=0x2c`). Cuando `nvoglv32.dll` intenta crear un contexto temporal o renderizar, el driver de NVIDIA falla al cargar el buffer de contexto GR en el VAS del canal, produciendo `0xc00000e8` en `D3DKMTRender`.

## Limitaciones Conocidas

- `nvoglv32.dll` carga y llega a `D3DKMTRender`, pero no puede completar operaciones de renderizado 3D.
- No hay implementación de Mesa 3D como alternativa de software.
- OpenGL 1.2 es el mínimo requerido por muchas aplicaciones; actualmente no se alcanza.
