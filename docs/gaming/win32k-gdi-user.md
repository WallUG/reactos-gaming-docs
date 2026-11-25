# win32k, GDI y USER

El subsistema `win32k.sys` implementa la interfaz gráfica de usuario (GDI y USER) en modo kernel, proporcionando ventanas, dibujado, fuentes, menús y la gestión de la superficie de pantalla.

## win32k.sys

`win32k.sys` es el controlador de modo kernel que implementa:

| Función | Descripción |
|---------|-------------|
| Gestión de ventanas | Creación, destrucción, posicionamiento y visibilidad de ventanas. |
| GDI | Dibujado de líneas, rectángulos, texto, mapas de bits y regiones. |
| USER | Mensajes de ventana, teclado, ratón, portapapeles y menús. |
| Superficie de pantalla | Gestión del framebuffer y presentación al controlador de pantalla. |

## GDI (Graphics Device Interface)

GDI proporciona operaciones de dibujado bidimensional:

- **Contexto de dispositivo (DC):** Abstracción de una superficie de dibujo (pantalla, impresora, mapa de bits).
- **Objetos GDI:** Pinceles, plumas, fuentes, mapas de bits, regiones y paletas.
- **Operaciones de dibujado:** `LineTo`, `Rectangle`, `Ellipse`, `TextOut`, `BitBlt`, `StretchBlt`.

## USER

USER gestiona la interacción del usuario y los mensajes de ventana:

- **Cola de mensajes:** `WM_PAINT`, `WM_KEYDOWN`, `WM_MOUSEMOVE`, `WM_COMMAND`, etc.
- **Procedimiento de ventana:** Función de callback que procesa los mensajes de una ventana.
- **Clases de ventana:** Registran el comportamiento y apariencia de un tipo de ventana.
- **Menús y controles:** Botones, listas, barras de desplazamiento y cuadros de edición.

## Superficie de Pantalla y Presentación

En esta rama, la presentación de pantalla sigue el camino por CPU:

1. GDI dibuja en una superficie de sombra en memoria del sistema.
2. `win32k` solicita la sombra a `dxgkrnl`.
3. La sombra se vuelca a la memoria de video (VRAM) mediante PRAMIN (ventana de memoria de la GPU).
4. El controlador de pantalla escanea la VRAM para generar la señal de video.

## Implementación en ReactOS Gaming

| Componente | Estado | Detalle |
|------------|--------|---------|
| win32k.sys | Implementado | Gestión de ventanas, GDI y USER en modo kernel. |
| GDI32 | Implementado | API de dibujado para aplicaciones de modo usuario. |
| USER32 | Implementado | API de ventanas y mensajes para aplicaciones de modo usuario. |
| Superficie de sombra | Implementado | GDI dibuja en sombra, presentado por CPU vía PRAMIN. |
| Swizzle de NVIDIA | Implementado | Reordenado de bloques de memoria corregido para la GT 710. |

## Limitaciones Conocidas

- La presentación por GPU (DirectFlip) no está implementada; se usa copia por CPU.
- El puntero de mouse es de software, no de hardware.
- Un solo modo de video (1024x768x32) es el soportado actualmente.
