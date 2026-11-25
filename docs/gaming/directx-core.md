# DirectX Core

Esta página documenta el estado de DirectX en ReactOS Gaming, incluyendo DirectDraw, Direct3D y la capa WineD3D.

## DirectDraw (ddraw)

DirectDraw es la API de nivel más bajo para acceso a la superficie de pantalla y aceleración 2D:

| Característica | Estado | Detalle |
|----------------|--------|---------|
| `ddraw.dll` | Implementado | API de DirectDraw para aplicaciones de modo usuario. |
| Superficies primarias y secundarias | Implementado | Gestión de superficies de dibujo. |
| Blit (bit-block transfer) | Implementado | Copia de bloques de memoria entre superficies. |
| Overlay | No implementado | Superposición de video no soportada. |

## Direct3D 8/9/10/11

| Versión | Estado | Detalle |
|---------|--------|---------|
| Direct3D 8 | No implementado | API de renderizado 3D de DirectX 8. |
| Direct3D 9 | No implementado | API de renderizado 3D de DirectX 9. |
| Direct3D 10 | No implementado | API de renderizado 3D de DirectX 10. |
| Direct3D 11 | No implementado | API de renderizado 3D de DirectX 11. |

## Capa WineD3D

WineD3D es la capa de traducción de Direct3D a OpenGL utilizada por Wine:

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Traducción D3D→OpenGL | No implementado | Requiere OpenGL ICD funcional. |
| Integración con wined3d | No implementado | DLL de Wine para traducción de comandos D3D. |

## API de Modo Usuario (D3DKMT)

ReactOS expone la API `D3DKMT` (DirectX Graphics Kernel Mode) para operaciones de video desde modo usuario:

| Función | Estado | Detalle |
|---------|--------|---------|
| `D3DKMTOpenAdapterFromHdc` | Implementado | Abre un adaptador de video desde un contexto de dispositivo. |
| `D3DKMTCreateDevice` | Implementado | Crea un dispositivo de renderizado. |
| `D3DKMTCreateAllocation` | Implementado | Crea asignaciones de memoria de video. |
| `D3DKMTCreateContext` | Implementado | Crea contextos de renderizado. |
| `D3DKMTRender` | Parcial | Envía comandos de renderizado a la GPU. |
| `D3DKMTPresent` | Parcial | Presenta superficies en la pantalla. |
| `D3DKMTQueryAdapterInfo` | Implementado | Consulta información del adaptador de video. |

## Implementación en ReactOS Gaming

| Componente | Estado | Detalle |
|------------|--------|---------|
| ddraw.dll | Implementado | DirectDraw funcional para aplicaciones 2D. |
| dxgkrnl | Implementado | Núcleo WDDM para gestión de video. |
| Miniport NVIDIA | Implementado | `nvlddmkm.sys` 365.19 como miniport WDDM. |
| Direct3D nativo | No implementado | Requiere WineD3D o implementación nativa. |
| OpenGL ICD | Parcial | `nvglv32.dll` carga pero falla en Render #2. |

## Limitaciones Conocidas

- No hay implementación nativa de Direct3D 8/9/10/11.
- WineD3D no está integrado; se requiere un OpenGL ICD funcional.
- `D3DKMTRender` y `D3DKMTPresent` funcionan parcialmente; el bloqueo del Paso 15 impide el renderizado 3D completo.
