# Procesos e Hilos (Ps)

El Process and Thread Manager (`Ps`) gestiona la creación, ejecución, programación y finalización de procesos e hilos en ReactOS Gaming.

## Proceso

Un proceso es un contenedor que proporciona:

- Un espacio de direcciones virtuales privado.
- Al menos un hilo de ejecución.
- Un identificador único (PID).
- Un token de seguridad y contexto de ejecución.
- Una tabla de handles para objetos del kernel.

## Hilo

Un hilo es la unidad básica de ejecución y contiene:

- Un identificador único (TID).
- Un contexto de CPU (registros, puntero de pila, contador de programa).
- Una prioridad de ejecución.
- Un estado (listo, ejecutando, bloqueado, terminado).
- Una afinidad de procesador opcional.

## Estados de un Hilo

| Estado | Descripción |
|--------|-------------|
| Listo | El hilo está esperando tiempo de CPU para ejecutar. |
| Ejecutando | El hilo está ejecutando instrucciones en el procesador. |
| Bloqueado | El hilo está esperando un evento (I/O, sincronización, temporizador). |
| Terminado | El hilo ha finalizado su ejecución y espera ser limpiado. |

## Creación de Proceso

El flujo típico para crear un proceso es:

1. `NtCreateUserProcess` o `CreateProcessW` desde modo usuario.
2. Validación de parámetros y permisos en `ntdll` y el kernel.
3. Creación del objeto de proceso y asignación de espacio de direcciones.
4. Carga de la imagen ejecutable (PE) en el espacio de direcciones.
5. Creación del hilo principal.
6. Inicio de la ejecución del hilo en el punto de entrada de la aplicación.

## Sincronización de Hilos

El núcleo proporciona primitivas de sincronización:

| Primitiva | Uso |
|-----------|-----|
| Eventos | Señalización entre hilos o procesos. |
| Mutexes | Exclusión mutua para secciones críticas. |
| Semaforos | Control de acceso a recursos con múltiples instancias. |
| Secciones críticas | Sincronización ligera dentro de un mismo proceso. |
| Variables de condición | Espera condicional asociada a un mutex. |

## Finalización de Proceso

Cuando un proceso termina:

1. Se notifica a los hilos del proceso para que finalicen.
2. Se cierran los handles abiertos por el proceso.
3. Se libera el espacio de direcciones y la memoria asociada.
4. Se notifica al padre del proceso (si existe).
5. El objeto de proceso se marca para eliminación cuando el último handle se cierra.

## Gestión de Prioridad y Boost

El núcleo puede incrementar temporalmente la prioridad de un hilo (priority boost) en situaciones como:

- Salida de una espera de I/O.
- Recepción de un mensaje de ventana.
- Finalización de una operación de sincronización.

Esto mejora la capacidad de respuesta de la aplicación.
