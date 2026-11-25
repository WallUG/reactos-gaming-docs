# HAL — Capa de Abstracción de Hardware

El Hardware Abstraction Layer (HAL) oculta las diferencias entre plataformas de hardware al núcleo, proporcionando una interfaz uniforme para el acceso a CPU, interrupciones, temporizadores y memoria de E/S.

## Responsabilidades del HAL

| Responsabilidad | Descripción |
|-----------------|-------------|
| Inicialización de CPU | Configuración de registros, modos de operación y características del procesador. |
| Gestión de interrupciones | Registro de ISR, enrutamiento de IRQ y control de prioridades. |
| Temporizadores | Contadores de ciclo, temporizadores de intervalo y tick del sistema. |
| Acceso a E/S | Lectura y escritura de puertos de E/S y espacios de memoria mapeada. |
| DMA | Gestión de transferencias de memoria directa y canales de acceso. |
| Power Management | Transiciones de estados de energía del sistema y dispositivos. |

## Implementación en ReactOS Gaming

El HAL utilizado en esta rama es `halmacpi.dll`, que soporta:

- **ACPI:** Tablas v5.0, temporizador y gestión de energía.
- **APIC:** APIC local e I/O APIC para sistemas multiprocesador.
- **SMP:** Soporte para múltiples procesadores (validado con i3-4170 en modo UP y QEMU con SMP).
- **Legacy:** Soporte para controladores de teclado, ratón y disco mediante BIOS/IOS.

## Archivos Clave

| Ruta | Descripción |
|------|-------------|
| `hal/halx86/acpi/` | Implementación ACPI y tablas de descripción |
| `hal/halx86/apic/` | Controlador de interrupciones APIC |
| `hal/halx86/generic/` | Código genérico x86 para BIOS y temporizadores |
| `hal/halx86/halinit.c` | Punto de entrada de inicialización del HAL |

## Flujo de Inicialización del HAL

1. `HalInitializeProcessor`: Configura el procesador de arranque (GDT, IDT, registros de control).
2. `HalInitializeProcessor` (APs): Inicializa procesadores secundarios en modo SMP.
3. `HalEnableSystemInterrupt`: Habilita las interrupciones del sistema.
4. `HalDispatchTable`: Tabla de funciones del HAL expuesta al núcleo.

## Interrupciones y IRQ

El sistema utiliza un modelo de interrupciones en niveles (IRQL):

| IRQL | Nombre | Uso |
|------|--------|-----|
| PASSIVE_LEVEL (0) | Pasivo | Código de ejecución normal del kernel y modo usuario. |
| APC_LEVEL (1) | APC | Cola de procedimientos asincrónicos. |
| DISPATCH_LEVEL (2) | Dispatch | Planificación de hilos y sección crítica del scheduler. |
| DIRQL (device-specific) | Dispositivo | Manejadores de interrupciones de hardware. |
