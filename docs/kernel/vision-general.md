# Visión General — Arquitectura del Núcleo

ReactOS Gaming implementa una arquitectura de núcleo híbrida basada en el modelo Windows NT. El núcleo gestiona la ejecución de procesos, la memoria, los dispositivos de hardware y los subsistemas de modo usuario, exponiendo una API estable a través de `ntdll.dll`.

## Componentes Principales

| Componente | Responsabilidad | Archivo Principal |
|------------|-----------------|-------------------|
| Mm | Gestión de memoria virtual, paginación y caché | `ntoskrnl/mm/` |
| Ps | Gestión de procesos e hilos | `ntoskrnl/ps/` |
| Io | Gestión de entrada/salida y PnP | `ntoskrnl/io/` |
| Ob | Gestión de objetos del kernel | `ntoskrnl/ob/` |
| Cm | Gestión del registro de configuración | `ntoskrnl/config/` |
| Po | Gestión de energía | `ntoskrnl/po/` |
| Se | Security Reference Monitor | `ntoskrnl/se/` |
| Cc | Cache Manager | `ntoskrnl/mm/cc/` |

## Modelo de Ejecución

El núcleo opera en dos modos de procesador:

- **Modo Kernel (Ring 0):** Acceso directo al hardware, instrucciones privilegiadas y memoria física.
- **Modo Usuario (Ring 3):** Ejecución de aplicaciones con acceso restringido a través de llamadas al sistema (`syscall`/`int 0x2e`).

Las transiciones entre modos se realizan a través de la Interrupt Descriptor Table (IDT) y el System Service Descriptor Table (SSDT).

## Dualidad de Núcleos

Esta rama mantiene simultáneamente soporte para:

- **NT 5.2 (Server 2003):** Núcleo clásico, base estable y probada.
- **NT 6.x (Vista/7+):** Capa moderna para soporte de drivers WDDM, DirectX y aplicaciones recientes.

Ambos núcleos comparten la misma infraestructura de bajo nivel (HAL, manejador de interrupciones, gestor de memoria) pero exponen interfaces de sistema distintas según la versión objetivo.

## Flujo de Arranque

1. **FreeLoader:** Carga el núcleo y los controladores de arranque desde el medio de instalación.
2. **HAL:** Inicializa la abstracción de hardware y los temporizadores.
3. **Núcleo (NTOSKRNL):** Inicializa gestores de memoria, procesos, objetos y E/S.
4. **Session Manager (smss):** Crea la primera sesión de usuario y lanza el subsistema Win32.
5. **Win32k y Explorer:** Inician la interfaz gráfica y el entorno de escritorio.
