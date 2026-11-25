# Integración con Wine

Esta página documenta la sincronización e integración con el proyecto Wine en ReactOS Gaming.

## Visión General

ReactOS y Wine comparten código y objetivos comunes: proporcionar compatibilidad con aplicaciones de Windows en sistemas no Windows. ReactOS Gaming aprovecha componentes de Wine donde es apropiado, particularmente en modo usuario.

## Componentes de Wine Integrados

| Componente | Estado | Detalle |
|------------|--------|---------|
| d3d9 (WineD3D) | No implementado | Capa de traducción Direct3D a OpenGL no integrada. |
| wined3d | No implementado | Requiere OpenGL ICD funcional para operar. |
| winegstreamer | No implementado | Framework multimedia de Wine no integrado. |
| wine fonts | Parcial | Algunas fuentes de Wine utilizadas para renderizado GDI. |
| wine registry | Parcial | Formato de registro compatible para importación de configuración. |

## Sincronización de Código

ReactOS Gaming mantiene sincronización selectiva con Wine en las siguientes áreas:

| Área | Estado | Detalle |
|------|--------|---------|
| Headers de API | Parcial | Algunos headers de Wine adaptados para ReactOS. |
| Test suite | Parcial | Algunas pruebas de Wine adaptadas para rostests. |
| Código de DLLs | Parcial | Algunas DLLs de modo usuario comparten código con Wine. |

## Diferencias Arquitectónicas

| Aspecto | ReactOS | Wine |
|---------|---------|------|
| Núcleo | Propio (NTOSKRNL) | Linux / Windows host |
| Modo kernel | Implementado | No aplica (ejecuta sobre otro SO) |
| Controladores | Propios (WDM, WDDM) | No aplica |
| Modo usuario | Compartido con Wine (parcial) | Propio |
| Objetivo | Sistema operativo completo | Capa de compatibilidad sobre otro SO |

## Limitaciones Conocidas

- WineD3D no está integrado; Direct3D 8/9/10/11 no funcionan nativamente.
- OpenGL ICD de NVIDIA (`nvoglv32.dll`) es el camino preferido para gráficos 3D, no WineD3D.
- Algunas DLLs de modo usuario pueden tener comportamientos ligeramente diferentes a Wine.

## Hoja de Ruta

| Versión | Meta | Estado |
|---------|------|--------|
| 0.6.0 | Capa WineD3D para Direct3D 8/9/10/11 | Planeado |
| Post-0.6.0 | Mayor sincronización de código con Wine | No planificado |
