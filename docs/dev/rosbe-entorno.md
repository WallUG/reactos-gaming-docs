# Entorno RosBE

Esta página documenta la instalación y configuración de RosBE (ReactOS Build Environment) para compilar ReactOS Gaming.

## ¿Qué es RosBE?

RosBE es el entorno de compilación oficial de ReactOS. Incluye GCC, MinGW, CMake, Ninja y otras herramientas necesarias para construir el sistema operativo desde código fuente.

## Instalación

### En Windows

1. Descargue RosBE desde la página de descargas de ReactOS: https://reactos.org/wiki/Build_Environment.
2. Ejecute el instalador y siga las instrucciones.
3. Añada el directorio `bin` de RosBE al PATH del sistema.

### En Linux (WSL2 / Ubuntu)

1. Descargue RosBE-Unix desde la página de descargas de ReactOS.
2. Extraiga el archivo en una ubicación adecuada (ej. `/home/demox/RosBE`).
3. Añada al PATH:
   ```bash
   export PATH=/home/demox/RosBE/i386/bin:/home/demox/RosBE/bin:$PATH
   ```

## Verificación de la Instalación

```bash
# Verificar que cmake de RosBE funciona
/home/demox/RosBE-CI/bin/cmake --version

# Verificar que ninja está disponible
ninja --version

# Verificar que gcc de RosBE está disponible
i686-pc-reactos-gcc --version
```

## Notas Importantes

- **Use el cmake de RosBE-CI**, no el del sistema. El cmake genérico del sistema falla con `winnt.h` ausente.
- **RosBE usa GCC 8.4.0** en la configuración actual de ReactOS Gaming.
- **CMake 3.17.2-ReactOS** es la versión recomendada.
- **Ninja** es el generador de build recomendado (más rápido que Make).

## Estructura de RosBE

| Directorio | Contenido |
|------------|-----------|
| `/home/demox/RosBE/i386/bin/` | Herramientas de compilación para i386 (gcc, ld, etc.). |
| `/home/demox/RosBE/bin/` | Herramientas generales de RosBE. |
| `/home/demox/RosBE-CI/bin/cmake` | CMake de ReactOS CI (3.17). |

## Problemas Comunes

| Problema | Solución |
|----------|----------|
| `winnt.h` ausente | Usar `/home/demox/RosBE-CI/bin/cmake`, no el cmake del sistema. |
| `gcc` no encontrado | Añadir `/home/demox/RosBE/i386/bin` al PATH. |
| `ninja` no encontrado | Instalar ninja o usar el de RosBE. |
