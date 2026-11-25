# Cache Manager (Cc)

El Cache Manager (`Cc`) es responsable de almacenar en caché los datos de archivos mapeados en memoria, mejorando el rendimiento de operaciones de lectura y escritura sobre archivos y secciones mapeadas.

## Función Principal

El Cache Manager permite que los archivos se accedan como si fueran memoria, utilizando el mecanismo de páginas mapeadas del Memory Manager (`Mm`). En lugar de leer y escribir datos explícitamente a través de llamadas al sistema, el sistema operativo mapea regiones del archivo en el espacio de direcciones virtuales y deja que el hardware y el gestor de memoria administren el caché.

## Arquitectura de Caché

| Componente | Descripción |
|------------|-------------|
| Vacbs (Virtual Address Control Blocks) | Estructuras que mapean vistas de 256 KB de un archivo en el espacio de direcciones del sistema. |
| Lazy Writer | Proceso del sistema que escribe páginas sucias (modificadas) al disco de forma periódica. |
| Read-Ahead | Lectura anticipada de datos del disco basándose en patrones de acceso secuencial. |
| Coherencia de caché | Garantiza que las modificaciones en caché se reflejen correctamente en el disco y viceversa. |

## Flujo de Lectura de Archivo mediante Caché

1. La aplicación solicita leer datos de un archivo.
2. El sistema de archivos mapea la región del archivo en el espacio de direcciones del sistema (si no está ya mapeada).
3. El Cache Manager verifica si los datos ya residen en memoria (cache hit).
4. Si hay fallo de caché (cache miss), se leen los datos desde el disco y se almacenan en memoria.
5. La aplicación accede a los datos directamente desde memoria.

## Lazy Writer

El Lazy Writer es un hilo del sistema que ejecuta periódicamente para:

- Recorrer las páginas sucias en el caché.
- Escribirlas al disco subyacente.
- Liberar páginas limpias del caché cuando se necesita memoria.

El intervalo de escritura es configurable y depende de la carga del sistema y la disponibilidad de memoria.

## Read-Ahead

Cuando se detecta un patrón de acceso secuencial a un archivo, el Cache Manager solicita al controlador de almacenamiento que lea bloques adicionales del disco antes de que sean solicitados explícitamente. Esto reduce la latencia de lecturas secuenciales grandes.

## Implementación en ReactOS Gaming

| Componente | Estado | Detalle |
|------------|--------|---------|
| Cache Manager (`Cc`) | Implementado | Soporte básico para mapeo de archivos en caché. |
| Vacbs | Implementado | Gestión de vistas de 256 KB de archivos. |
| Lazy Writer | Implementado | Escritura periódica de páginas sucias. |
| Read-Ahead | Parcial | Implementado básicamente, sin heurísticas avanzadas. |
| Coherencia de caché | Implementado | Mecanismos básicos de sincronización entre caché y disco. |

## Integración con Memory Manager

El Cache Manager depende directamente del Memory Manager para:

- Asignar páginas físicas para las vistas de archivo.
- Gestionar fallos de página cuando se accede a regiones no residentes.
- Liberar páginas cuando el sistema necesita memoria para otros propósitos.

## Límites Conocidos

- El caché no tiene límites configurables dinámicamente en tiempo de ejecución.
- No hay soporte para caché de escritura directa (write-through) en todos los sistemas de archivos.
- El read-ahead es conservador y no se adapta dinámicamente a patrones de acceso complejos.
