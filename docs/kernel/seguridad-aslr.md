# Security Reference Monitor y ASLR

El Security Reference Monitor (`Se`) es el componente del núcleo responsable de aplicar las políticas de seguridad y control de acceso en ReactOS Gaming.

## Responsabilidades del Security Reference Monitor

| Responsabilidad | Descripción |
|-----------------|-------------|
| Validación de accesos | Verifica que un sujeto tenga permisos sobre un objeto antes de conceder el handle. |
| Tokens de acceso | Gestiona los tokens que representan la identidad y privilegios de un proceso o hilo. |
| Privilegios | Controla privilegios del sistema (SeDebugPrivilege, SeBackupPrivilege, etc.). |
| ACL y DACL | Evalúa listas de control de acceso discrecional en descritores de seguridad. |
| Auditoría | Registra eventos de seguridad según la política de auditoría del sistema. |

## Tokens de Acceso

Un token de acceso contiene:

- Identificador de usuario (SID).
- Identificador de grupo principal.
- Lista de grupos a los que pertenece el usuario.
- Privilegios habilitados y deshabilitados.
- Origen del token (proceso que lo creó).
- Nivel de integridad (opcional, para controles de aislamiento).

## Descriptores de Seguridad

Cada objeto protegible tiene un descritor de seguridad que incluye:

- SID del dueño del objeto.
- SID del grupo primario.
- DACL (Discretionary Access Control List): controla el acceso de usuarios y grupos.
- SACL (System Access Control List): controla la auditoría de accesos.

## ASLR — Address Space Layout Randomization

ASLR es una técnica de mitigación de exploits que aleatoriza la ubicación de regiones de memoria en el espacio de direcciones de un proceso, dificultando la explotación de vulnerabilidades de corrupción de memoria.

### Región Aleatorizada

| Región | Estado en ReactOS Gaming | Detalle |
|--------|-------------------------|---------|
| Imagen ejecutable (EXE) | Pendiente | No implementado en esta rama. |
| Bibliotecas (DLL) | Pendiente | No implementado en esta rama. |
| Montón (Heap) | Pendiente | No implementado en esta rama. |
| Pila (Stack) | Pendiente | No implementado en esta rama. |
| Bibliotecas del sistema | Pendiente | No implementado en esta rama. |

### Estado Actual

ASLR **no está implementado** en la rama actual de ReactOS Gaming. Las direcciones de memoria son deterministas, lo que facilita la explotación de vulnerabilidades de memoria. Este es un hito planeado para la versión 0.7.0 (estabilización x64 y ASLR).

## Control de Acceso en Objetos del Kernel

Cuando un proceso solicita acceso a un objeto:

1. El Object Manager crea el objeto o lo busca por nombre.
2. Se verifica que el solicitante tenga un handle válido.
3. El Security Reference Monitor evalúa el DACL del objeto contra el token del solicitante.
4. Se concede o deniega el acceso según los derechos solicitados (lectura, escritura, ejecución, etc.).

## Privilegios del Sistema

| Privilegio | Descripción |
|------------|-------------|
| SeDebugPrivilege | Permite depurar y modificar otros procesos. |
| SeBackupPrivilege | Permite hacer copia de seguridad de archivos y directorios. |
| SeRestorePrivilege | Permite restaurar archivos y directorios. |
| SeShutdownPrivilege | Permite apagar o reiniciar el sistema. |
| SeLoadDriverPrivilege | Permite cargar y descargar controladores del sistema. |
