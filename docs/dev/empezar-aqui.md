# Empezar Aquí

Esta página es el punto de entrada para nuevos colaboradores que quieran trabajar en la rama ReactOS Gaming.

## ¿Qué es ReactOS Gaming?

ReactOS Gaming es una rama especializada de ReactOS enfocada en llevar aceleración 3D real, drivers propietarios de GPU y un núcleo NT 6.x a hardware físico. La rama de trabajo es `feat/nt6-integration`.

## Requisitos Previos

Antes de empezar, necesitas:

- **ReactOS Build Environment (RosBE)** — versión recomendada para tu plataforma (Windows o Unix/GNU-Linux).
- **CMake 3.17+** (usa el de RosBE, no el del sistema, para evitar problemas con `winnt.h`).
- **Ninja** (generador de build recomendado).
- **Git** con tu nombre y correo reales configurados (ReactOS no acepta contribuciones anónimas).
- **QEMU** para pruebas en máquina virtual.
- Acceso a hardware real (opcional, para pruebas con GT 710).

## Primeros Pasos

### 1. Clonar el Repositorio

```bash
git clone https://github.com/WallUG/reactos-gaming.git
cd reactos-gaming
git checkout feat/nt6-integration
```

### 2. Configurar el Entorno de Compilación

```bash
export PATH=/home/demox/RosBE/i386/bin:/home/demox/RosBE/bin:$PATH

/home/demox/RosBE-CI/bin/cmake -G Ninja \
  -S /home/demox/reactos-gaming -B /home/demox/build-gaming-debug \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-gcc.cmake -DARCH=i386 \
  -DCMAKE_BUILD_TYPE=Debug -DENABLE_CCACHE=0 -DDLL_EXPORT_VERSION=0x600 \
  -DNT6_PRODUCT_VERSION=ON -DNT6_NVIDIA_DRIVER=ON \
  -DENABLE_ROSTESTS=1 -DENABLE_ROSAPPS=1
```

### 3. Compilar

```bash
ninja -C /home/demox/build-gaming-debug bootcd -j8
```

### 4. Ejecutar el Smoke Test (Obligatorio)

```bash
python3 tools/nt6/smoke.py --iso /home/demox/build-gaming-debug/bootcd.iso --timeout 180
```

## Estructura de la Documentación para Desarrolladores

| Página | Contenido |
|--------|-----------|
| `rosbe-entorno.md` | Instalación y configuración de RosBE. |
| `compilacion-cmake.md` | Compilación con CMake, Ninja, GCC/MinGW y MSVC. |
| `estructura-codigo.md` | Mapa del árbol de directorios del código fuente. |
| `pruebas-test-suite.md` | Cómo ejecutar los rostests oficiales junto con el arnés de regresión. |
| `guia-pull-requests.md` | Flujo de trabajo Git, convención de commits y cómo enviar PRs. |
| `reportar-bugs.md` | Uso de las plantillas de Issues, captura de logs y reproducción de fallos. |
| `arquitectura-x64-arm.md` | Estado de compilación para IA-32, AMD64/x86-64 y ARM. |
| `glosario-recursos.md` | Glosario técnico de Windows NT/ReactOS y referencias. |

## Reglas de Oro

1. **Un solo cambio lógico por commit.** No mezcles correcciones de kernel con documentación.
2. **Nunca hagas `git add -A` a ciegas.** Revisa cada archivo antes de hacer `git add`.
3. **Ejecuta el arnés de regresión antes de enviar cualquier PR.** El smoke test debe pasar.
4. **Usa tu nombre real y correo real** en los commits (regla obligatoria de ReactOS).
5. **Si has visto código fuente de Microsoft Windows, no contribuyas.** ReactOS no acepta contribuciones con posible violación de derechos de autor.

## ¿Dónde Pedir Ayuda?

- Chat oficial: https://chat.reactos.org/
- Foro: https://reactos.org/forum/
- JIRA: https://jira.reactos.org/
