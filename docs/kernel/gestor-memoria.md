# Gestor de Memoria (Mm)

El Memory Manager (`Mm`) es responsable de la gestión de la memoria virtual, la paginación, el espacio de direcciones y el cache de páginas en ReactOS Gaming.

## Espacio de Direcciones Virtuales (x86)

En arquitecturas x86 de 32 bits, el espacio de direcciones virtuales se divide como sigue:

| Rango | Descripción | Tamaño |
|-------|-------------|--------|
| 0x00000000 - 0x7FFFFFFF | Espacio de usuario | 2 GB |
| 0x80000000 - 0xFFFFFFFF | Espacio de kernel | 2 GB |

## Estructura de Paginación (x86 PAE)

Con PAE (Physical Address Extension) habilitado:

- **Page Directory Pointer Table (PDPT):** 4 entradas, apunta a directorios de página.
- **Page Directory (PD):** 512 entradas, cada una cubre 2 MB.
- **Page Table (PT):** 512 entradas, cada una cubre 4 KB.
- **Page Entry:** Contiene el número de marco de página (PFN) y bits de atributo (present, read/write, user/supervisor, etc.).

## Gestión de Páginas

| Concepto | Descripción |
|----------|-------------|
| PFN Database | Base de datos de números de marco de página, rastrea el estado de cada página física. |
| Working Set | Conjunto de páginas residentes en memoria para un proceso. |
| Paged Pool | Memoria paginable del kernel, puede ser movida al archivo de paginación. |
| Non-Paged Pool | Memoria no paginable del kernel, siempre residente en RAM. |
| System PTE Space | Espacio de direcciones para entradas de página del sistema. |

## Máximo de RAM Soportado

| Configuración | Máximo RAM |
|-------------|------------|
| x86 sin PAE | 4 GB |
| x86 con PAE | 64 GB (teórico), limitado por el HAL y controladores |
| x86-64 (experimental) | 128 TB (teórico) |

En la placa de desarrollo actual se detectan 3,556 MB de RAM.

## Gestión de VAD (Virtual Address Descriptor)

Los VAD describen rangos de direcciones virtuales reservados para un proceso:

- **Tipo:** Imagen, mapeado, privado, etc.
- **Protección:** Lectura, escritura, ejecución, copy-on-write.
- **Estado:** Confirmado, reservado, liberado.

## Paginación y Archivo de Paginación

Cuando la memoria física se agota, el núcleo traslada páginas menos usadas al archivo de paginación (`pagefile.sys`). Las páginas pueden estar en los siguientes estados:

- **Válida:** Residente en memoria física.
- **Transición:** En proceso de entrada/salida de memoria física.
- **Paginada:** Almacenada en el archivo de paginación.
- **Demanda cero:** Página de ceros asignada bajo demanda.

## Gestión de Caché (Cc)

El Cache Manager (`Cc`) trabaja junto con Mm para almacenar en caché archivos mapeados en memoria, mejorando el rendimiento de lecturas y escrituras repetidas.

## Límites Conocidos

- La gestión de páginas grandes (2 MB / 1 GB) está limitada en ciertas rutas del kernel.
- La fragmentación del espacio de direcciones de kernel puede afectar la carga de controladores grandes.
