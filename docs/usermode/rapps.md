# ReactOS Applications Manager (rapps)

Esta página documenta el gestor de aplicaciones de ReactOS (rapps), utilizado para instalar y gestionar software en el sistema.

## Visión General

ReactOS Applications Manager (rapps) es una herramienta de línea de comandos y interfaz gráfica para descargar, instalar y gestionar aplicaciones en ReactOS, similar a un gestor de paquetes.

| Característica | Estado | Detalle |
|--------------|--------|---------|
| Instalación de aplicaciones | Implementado | Descarga e instalación de aplicaciones desde catálogo. |
| Catálogo de aplicaciones | Implementado | Lista de aplicaciones disponibles para instalar. |
| Desinstalación | Implementado | Eliminación de aplicaciones instaladas. |
| Actualización | Parcial | Comprobación y actualización de aplicaciones. |

## Aplicaciones Disponibles

| Categoría | Ejemplos | Estado |
|-----------|----------|--------|
| Navegadores | Chrome, Firefox | Parcial (depende de APIs faltantes). |
| Ofimática | LibreOffice, OpenOffice | Parcial. |
| Multimedia | VLC, Audacity | Parcial. |
| Utilidades | CPU-Z, GPU-Z | Implementado (verificado en hardware real). |
| Juegos | Halo, GTA SA | Parcial (ver matriz de compatibilidad). |

## Flujo de Instalación

```
Usuario selecciona aplicación en rapps
    ↓
rapps descarga el instalador desde el catálogo
    ↓
se ejecuta el instalador (setup.exe, etc.)
    ↓
la aplicación se instala en C:\ReactOS\Program Files\
    ↓
se crea acceso directo en el menú Inicio o escritorio
```

## Limitaciones Conocidas

- Algunas aplicaciones requieren APIs de Windows 8/10 que no están implementadas.
- Los instaladores que usan tecnologías de instalación modernas (MSI, ClickOnce) pueden no funcionar.
- La actualización automática de aplicaciones tiene soporte limitado.
- No hay repositorio oficial de aplicaciones mantenido por el proyecto ReactOS Gaming.

## Hoja de Ruta

No hay planes concretos para rapps en la hoja de ruta actual (0.5.0 - 0.7.0). El enfoque principal está en el núcleo, gráficos y controladores.
