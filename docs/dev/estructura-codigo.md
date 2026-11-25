# Estructura del Código

Esta página documenta el mapa del árbol de directorios del código fuente de ReactOS Gaming.

## Raíz del Repositorio

| Directorio | Contenido |
|------------|-----------|
| `base/` | Componentes de base del sistema (servicios, utilidades, shell). |
| `boot/` | Carga de arranque, FreeLoader, imágenes LiveCD, datos de arranque. |
| `dll/` | Bibliotecas de modo usuario (kernel32, user32, gdi32, opengl32, etc.). |
| `drivers/` | Controladores de dispositivo (video, audio, red, almacenamiento, USB, etc.). |
| `hal/` | Capa de Abstracción de Hardware (HAL). |
| `modules/` | Módulos adicionales (rostests, aplicaciones de ReactOS). |
| `ntoskrnl/` | Núcleo del sistema (NTOSKRNL). |
| `sdk/` | SDK de desarrollo (headers, librerías de importación). |
| `subsystems/` | Subsistemas del sistema (Win32, POSIX, etc.). |
| `win32ss/` | Subsistema de Windows (GDI, USER, win32k). |
| `tools/` | Herramientas de desarrollo (arnés de regresión, scripts). |
| `docs/` | Documentación del proyecto. |
| `media/` | Medios de instalación (imágenes ISO, etc.). |
| `runs/` | Configuraciones de ejecución. |

## Áreas Clave para Desarrolladores de ReactOS Gaming

### Núcleo y WDDM

| Directorio | Contenido |
|------------|-----------|
| `ntoskrnl/` | Núcleo del sistema (gestión de memoria, procesos, E/S, objetos, etc.). |
| `hal/` | Capa de Abstracción de Hardware. |
| `drivers/wddm/dxgkrnl/` | Núcleo del modelo WDDM, gestiona miniports y asignaciones. |
| `drivers/wddm/dxgkrnl/dxgwddm.c` | Implementación de DDIs de WDDM (Render, Patch, SubmitCommand, etc.). |
| `drivers/wddm/dxgkrnl/dxgwvidpn.c` | Gestión de VidPn, modos de video, presentación. |
| `drivers/wddm/dxgkrnl/dxgkrnlcb.c` | Callbacks de dxgkrnl (DxgkCb*). |
| `drivers/wddm/dxgkrnl/dxgprobe.c` | Funciones de sondeo y diagnóstico de la GPU. |

### Subsistema Gráfico

| Directorio | Contenido |
|------------|-----------|
| `win32ss/gdi/` | Subsistema GDI (dibujado, fuentes, mapas de bits). |
| `win32ss/user/` | Subsistema USER (ventanas, mensajes, entrada). |
| `win32ss/gdi/eng/` | Motor de dibujado GDI. |
| `win32ss/gdi/ntgdi/` | API de GDI de modo usuario (d3dkmt, etc.). |
| `win32ss/gdi/eng/cdddisp.c` | Superficie de sombra para presentación por CPU. |

### Controladores de Dispositivo

| Directorio | Contenido |
|------------|-----------|
| `drivers/video/` | Controladores de video (vga, vgavega, etc.). |
| `drivers/wdm/audio/` | Controladores de audio (portcls, hdaudbus, etc.). |
| `drivers/network/ndis/` | Controladores de red NDIS (rtlh86, etc.). |
| `drivers/storage/` | Controladores de almacenamiento (ATA, AHCI, NVMe). |
| `drivers/bus/pci/` | Bus PCI y enumeración de dispositivos. |
| `drivers/usb/` | Pila USB (UHCI, OHCI, EHCI). |

### Modo Usuario

| Directorio | Contenido |
|------------|-----------|
| `dll/win32/kernel32/` | API kernel32 de modo usuario. |
| `dll/win32/user32/` | API user32 de modo usuario. |
| `dll/win32/gdi32/` | API gdi32 de modo usuario. |
| `dll/ntdll/` | Biblioteca nativa (NTDLL) con syscalls y ETW. |
| `base/system/smss/` | Session Manager. |
| `base/system/csrss/` | Client/Server Runtime Subsystem. |
| `base/system/winlogon/` | Proceso de inicio de sesión. |

### Herramientas y Pruebas

| Directorio | Contenido |
|------------|-----------|
| `tools/nt6/` | Arnés de regresión (smoke.py, regtest.py, baseline.py, etc.). |
| `modules/rostests/` | Tests de regresión (apitests, kmtests). |
| `modules/rostests/apitests/` | Tests de API de modo usuario. |
| `modules/rostests/kmtests/` | Tests de modo kernel. |

## Archivos de Configuración Importantes

| Archivo | Contenido |
|---------|-----------|
| `CMakeLists.txt` | Configuración principal de CMake. |
| `toolchain-gcc.cmake` | Cadena de herramientas GCC. |
| `toolchain-msvc.cmake` | Cadena de herramientas MSVC. |
| `toolchain-clang.cmake` | Cadena de herramientas Clang. |
| `freeldr.ini` | Configuración de arranque de FreeLoader. |
| `boot/bootdata/hivesys-nvlddmkm.inf` | Registro para el driver NVIDIA. |
| `boot/bootdata/livecd/nt6regtest.inf` | Registro del arnés de regresión. |
