# Multinúcleo SMP y Mononúcleo UP

ReactOS Gaming soporta tanto sistemas con un solo procesador (UP) como sistemas con múltiples procesadores (SMP — Symmetric Multiprocessing).

## Modelo de Procesadores

| Modo | Descripción | Estado |
|------|-------------|--------|
| UP | Un solo procesador activo | Implementado y probado en hardware real (i3-4170) |
| SMP | Múltiples procesadores compartiendo memoria | Implementado y probado en QEMU |

## Planificador de Hilos (Scheduler)

El scheduler de Windows NT es prioritario y preemptivo. Cada hilo tiene una prioridad asignada y el núcleo selecciona el hilo de mayor prioridad listo para ejecutar.

### Colas de Prioridad

| Rango | Clase de Prioridad |
|-------|-------------------|
| 0-15 | Tiempo real (Realtime) |
| 16-31 | Alta (High) |
| 32-47 | Por encima de lo normal (Above Normal) |
| 48-63 | Normal (Normal) |
| 64-79 | Por debajo de lo normal (Below Normal) |
| 80-95 | Baja (Idle) |

## Afinidad de Procesador

Cada hilo puede tener una máscara de afinidad que especifica en qué procesadores puede ejecutarse. Esto permite:

- Vincular hilos críticos a procesadores específicos.
- Evitar migraciones de contexto costosas.
- Aislar cargas de trabajo en núcleos dedicados.

## Espacios de Direcciones y TLB

Cada proceso tiene su propio espacio de direcciones virtuales. Las entradas de la TLB (Translation Lookaside Buffer) se invalidan en cambios de contexto para evitar accesos a memoria incorrectos entre procesos.

## SMP en Hardware Real

La validación en placa BIOSTAR H81MHV3 con i3-4170 (1 core físico, 2 hilos lógicos) confirma:

- Arranque del núcleo en modo UP estable.
- Pruebas de SMP realizadas en entornos de virtualización (QEMU).
- El kernel `ntoskrnlmp.exe` se utiliza para configuraciones multiprocesador.

## Sincronización de Procesadores

Para evitar condiciones de carrera en sistemas multiprocesador, el núcleo utiliza:

- **Spinlocks:** Bloqueos de espera activa para secciones críticas cortas.
- **Exclusive Resources:** Bloqueos de lectores/escritores para estructuras compartidas.
- **Interlocked Operations:** Operaciones atómicas sobre memoria compartida.
- **KeSynchronizeExecution:** Sincronización con manejadores de interrupciones.
