# Object Manager y Registro

El Object Manager (`Ob`) y el Configuration Manager (`Cm`) gestionan los objetos del kernel y el registro de configuración del sistema, respectivamente.

## Object Manager (Ob)

El Object Manager es responsable de crear, nombrar, rastrear y destruir objetos del kernel. Todo en el núcleo de Windows NT se trata como un objeto: procesos, hilos, archivos, eventos, semáforos, dispositivos, secciones, etc.

### Tipos de Objeto

| Tipo | Descripción |
|------|-------------|
| Proceso | Representa una instancia de ejecución de un programa. |
| Hilo | Unidad de ejecución dentro de un proceso. |
| Archivo | Representa un archivo abierto o dispositivo de E/S. |
| Evento | Objeto de sincronización señalizable. |
| Mutex | Exclusión mutua para secciones críticas. |
| Semaforo | Contador para control de acceso a recursos. |
| Dispositivo | Representa un dispositivo de hardware o virtual. |
| Sección | Región de memoria compartida o mapeada. |

### Namespace de Objetos

Los objetos se organizan en un jerarquía de nombres similar a un sistema de archivos:

| Ruta | Descripción |
|------|-------------|
| `\ObjectTypes` | Tipos de objetos registrados en el sistema. |
| `\Devices` | Dispositivos creados por controladores. |
| `\DosDevices` | Enlaces simbólicos para rutas de modo usuario (ej: `C:`). |
| `\BaseNamedObjects` | Objetos nombrados creados por aplicaciones. |

### Handles

Un handle es un índice en la tabla de handles de un proceso que referencia un objeto del kernel. Los handles proporcionan:

- Control de acceso mediante máscaras de derechos (lectura, escritura, ejecución, etc.).
- Conteo de referencias para gestión de vida del objeto.
- Seguridad mediante descritores de seguridad (ACL).

## Configuration Manager (Cm) — Registro

El Configuration Manager gestiona el registro de configuración de Windows, una base de datos jerárquica que almacena configuración del sistema, software y hardware.

### Claves Raíz del Registro

| Clave | Descripción |
|-------|-------------|
| `HKEY_LOCAL_MACHINE` | Configuración del equipo y hardware instalado. |
| `HKEY_CURRENT_USER` | Configuración del usuario actual. |
| `HKEY_CLASSES_ROOT` | Asociaciones de archivos y clases COM. |
| `HKEY_USERS` | Perfiles de todos los usuarios. |
| `HKEY_CURRENT_CONFIG` | Configuración de hardware actual. |

### Almacenamiento

El registro se almacena en "hives" (archivos binarios) cargados en memoria:

- `SYSTEM`: Configuración del sistema y controladores.
- `SOFTWARE`: Configuración de software instalado.
- `SAM`: Base de datos de cuentas de seguridad.
- `SECURITY`: Políticas de seguridad.
- `DEFAULT`: Configuración predeterminada de usuarios.

### Operaciones del Registro

| Operación | Descripción |
|-----------|-------------|
| `RegCreateKeyEx` | Crea o abre una clave del registro. |
| `RegSetValueEx` | Establece el valor de una entrada. |
| `RegQueryValueEx` | Lee el valor de una entrada. |
| `RegDeleteValue` | Elimina una entrada del registro. |
| `RegEnumKeyEx` | Enumera subclaves de una clave. |

## Implementación en ReactOS Gaming

| Componente | Estado | Detalle |
|------------|--------|---------|
| Object Manager | Implementado | Gestión completa de objetos del kernel con handles y conteo de referencias. |
| Namespace de objetos | Implementado | `\ObjectTypes`, `\Devices`, `\DosDevices`, `\BaseNamedObjects`. |
| Configuration Manager | Implementado | Lectura y escritura de hives del registro. |
| Claves raíz | Implementado | HKLM, HKCU, HKCR, HKU, HKCC. |
| Operaciones de registro | Implementado | `RegCreateKeyEx`, `RegSetValueEx`, `RegQueryValueEx`, etc. |

## Seguridad de Objetos

Cada objeto puede tener un descritor de seguridad que especifica:

- Dueño del objeto (SID).
- Lista de control de acceso discrecional (DACL).
- Lista de control de acceso del sistema (SACL) para auditoría.

El Object Manager verifica los derechos de acceso en cada operación sobre un objeto mediante el Security Reference Monitor (`Se`).
