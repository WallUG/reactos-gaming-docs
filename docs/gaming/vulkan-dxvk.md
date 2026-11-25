# Vulkan y DXVK

Esta página documenta el estado futuro de Vulkan y la traducción DXVK en ReactOS Gaming.

## Vulkan

Vulkan es una API de bajo nivel para gráficos y cómputo de la era moderna:

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Vulkan Loader | No implementado | Cargador de funciones de Vulkan. |
| Vulkan ICD | No implementado | Controlador de modo usuario para Vulkan. |
| Vulkan Miniport | No implementado | Soporte de kernel para Vulkan en WDDM. |
| SPIR-V | No implementado | Formato intermedio de shaders de Vulkan. |

## DXVK (DirectX to Vulkan)

DXVK es una capa de traducción que convierte llamadas de Direct3D 9/10/11 a Vulkan:

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Traducción D3D9→Vulkan | No implementado | Requiere Vulkan funcional. |
| Traducción D3D10→Vulkan | No implementado | Requiere Vulkan funcional. |
| Traducción D3D11→Vulkan | No implementado | Requiere Vulkan funcional. |

## Hoja de Ruta

| Versión | Meta | Estado |
|---------|------|--------|
| 0.6.0 | Soporte Vulkan y traducción DXVK | Planeado |
| 0.6.0 | Capa WineD3D para D3D 8/9/10/11 | Planeado |

## Dependencias

Para implementar Vulkan y DXVK se requiere previamente:

1. **WDDM completo** con presentación por GPU (versión 0.5.0).
2. **OpenGL ICD funcional** para usar como backend alternativo.
3. **Controlador de modo kernel** que exponga capacidades de Vulkan al modo usuario.

## Limitaciones Conocidas

- No hay implementación de Vulkan en esta rama de ReactOS.
- DXVK no puede funcionar sin Vulkan subyacente.
- Direct3D 11 no está disponible nativamente.
