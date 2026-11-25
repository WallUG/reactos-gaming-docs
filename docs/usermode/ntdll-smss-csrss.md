# NTDLL, smss y csrss

Esta página documenta los componentes críticos de modo usuario en el arranque y ejecución de ReactOS Gaming: NTDLL, Session Manager (smss) y Client/Server Runtime Subsystem (csrss).

## NTDLL (ntdll.dll)

NTDLL es la biblioteca de nivel más bajo en modo usuario. Proporciona la interfaz nativa del sistema (syscalls) al kernel y funciones de tiempo de ejecución básicas.

| Componente | Estado | Detalle |
|------------|--------|---------|
| Syscalls NT 5.2 | Implementado | 297 llamadas al sistema de NT 5.2. |
| Syscalls NT 6.0 | Parcial | 22 llamadas adicionales de NT 6.0. |
| Gestión de excepciones | Implementado | Manejo de excepciones estructuradas (SEH) a nivel de usuario. |
| Gestión de memoria | Implementado | Heap, páginas virtuales y memoria virtual. |
| Objetos sincronización | Implementado | Eventos, mutexes, semáforos y secciones críticas. |
| ETW | Implementado | Event Tracing for Windows implementado en `dll/ntdll/etw/trace.c`. |
| API sets | Implementado | Redirección de API sets para compatibilidad con Windows moderno. |

## Session Manager (smss.exe)

smss es el primer proceso de modo usuario que se inicia tras el kernel. Es responsable de crear la primera sesión de usuario y lanzar los subsistemas críticos.

| Responsabilidad | Estado | Detalle |
|-----------------|--------|---------|
| Crear sesión de usuario | Implementado | Inicializa la sesión 0 y los subsistemas de modo usuario. |
| Lanzar csrss | Implementado | Inicia Client/Server Runtime Subsystem. |
| Lanzar winlogon | Implementado | Inicia el proceso de inicio de sesión. |
| Ejecutar comandos de arranque | Implementado | Procesa `BootExecute` del registro. |
| Manejo de sesiones | Implementado | Gestión de múltiples sesiones de usuario. |

## csrss.exe (Client/Server Runtime Subsystem)

csrss es el subsistema de runtime de cliente/servidor. Gestiona la consola, hilos y ventanas a nivel de sistema.

| Responsabilidad | Estado | Detalle |
|-----------------|--------|---------|
| Subsistema de consola | Implementado | Gestión de ventanas de consola y entrada/salida. |
| Hilos de ventana | Implementado | Creación y gestión de hilos asociados a ventanas. |
| Ventanas de sistema | Implementado | Ventanas de escritorio y estaciones de trabajo. |
| Partes de Win32k | Parcial | Algunas funciones de win32k se delegan al kernel. |

## Flujo de Arranque de Modo Usuario

```
Kernel (NTOSKRNL)
    ↓
smss.exe (Session Manager)
    ↓
csrss.exe + win32k.sys (subsistema gráfico)
    ↓
winlogon.exe (inicio de sesión)
    ↓
Explorer.exe (entorno de escritorio)
    ↓
Aplicaciones de usuario
```

## Implementación en ReactOS Gaming

| Componente | Archivo | Estado | Detalle |
|------------|---------|--------|---------|
| NTDLL | `dll/ntdll/` | Implementado | Biblioteca nativa con syscalls y ETW. |
| smss | `base/system/smss/` | Implementado | Session Manager para creación de sesiones. |
| csrss | `base/system/csrss/` | Implementado | Runtime de cliente/servidor. |
| win32k | `win32ss/gdi/eng/` + `win32ss/user/` | Implementado | Subsistema gráfico y de usuario en modo kernel. |
| winlogon | `base/system/winlogon/` | Implementado | Proceso de inicio de sesión. |

## Limitaciones Conocidas

- Algunas funciones de csrss delegan en win32k (modo kernel), lo que puede crear dependencias circulares en ciertos escenarios.
- La gestión de sesiones múltiples funciona básicamente; el cambio rápido de usuario no está completamente probado.
- Algunas APIs de ntdll de Windows 10/11 pueden no estar implementadas.
