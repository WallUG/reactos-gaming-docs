# Explorador y Shell (ReactOS Explorer)

Esta página documenta el entorno de escritorio, el explorador de archivos y la interfaz de usuario de ReactOS Gaming.

## Componentes del Escritorio

| Componente | Estado | Detalle |
|------------|--------|---------|
| Explorer.exe | Implementado | Explorador de archivos y entorno de escritorio. |
| Shell | Implementado | Barra de tareas, menú Inicio, escritorio y bandeja del sistema. |
| Temas visuales | Parcial | Soporte básico de temas y estilos visuales. |
| Gestor de ventanas | Implementado | Gestión de ventanas de escritorio mediante win32k. |

## Explorador de Archivos

| Función | Estado | Detalle |
|---------|--------|---------|
| Navegación de carpetas | Implementado | Navegación por el sistema de archivos. |
| Copiar / Mover / Eliminar | Implementado | Operaciones básicas de archivos. |
| Búsqueda de archivos | Parcial | Búsqueda básica de archivos y carpetas. |
| Vista de detalles | Implementado | Vista de lista con detalles de archivo. |
| Vista de iconos | Implementado | Vista de iconos para archivos y carpetas. |
| Arrastre y suelta | Parcial | Soporte limitado de arrastrar y soltar. |

## Menú Inicio y Barra de Tareas

| Función | Estado | Detalle |
|---------|--------|---------|
| Menú Inicio | Implementado | Acceso a aplicaciones y configuración. |
| Barra de tareas | Implementado | Barra de tareas con botones de ventana y reloj. |
| Bandeja del sistema | Implementado | Iconos de notificación y estado del sistema. |
| Buscar programas | Parcial | Búsqueda básica en el menú Inicio. |

## Implementación en ReactOS Gaming

| Componente | Archivo | Estado | Detalle |
|------------|---------|--------|---------|
| Explorador | `base/shell/explorer/` | Implementado | Explorador de archivos y escritorio. |
| Shell | `base/shell/` | Implementado | Componentes de shell y menú Inicio. |
| win32k | `win32ss/user/` + `win32ss/gdi/` | Implementado | Gestión de ventanas y dibujado. |
| Temas | `base/shell/themes/` | Parcial | Temas visuales básicos. |

## Limitaciones Conocidas

- El menú Inicio puede fallar si `rshell.dll` no está empaquetado en la imagen (verificado y corregido en commits anteriores).
- Algunos temas visuales pueden no renderizarse correctamente.
- La búsqueda de archivos es básica y no indexa el contenido de los archivos.
- El arrastrar y soltar entre ventanas puede no funcionar en todos los escenarios.

## Personalización del Escritorio

| Elemento | Estado | Detalle |
|----------|--------|---------|
| Fondo de escritorio | Implementado | Cambio de fondo de pantalla. |
| Iconos de escritorio | Implementado | Colocación y gestión de iconos. |
| Barra de tareas | Implementado | Posición y comportamiento de la barra de tareas. |
| Temas | Parcial | Aplicación de temas visuales limitados. |
