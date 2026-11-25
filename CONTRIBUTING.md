# Guía de Contribución — ReactOS Gaming / NT6

Bienvenido al proyecto **ReactOS Gaming**. Esta guía explica cómo replicar el entorno, enviar cambios y mantener la calidad del código en la rama `feat/nt6-integration`.

## 1. Requisitos previos

- **ReactOS Build Environment (RosBE)** — versión recomendada para tu plataforma (Windows o Unix/GNU-Linux).
- **CMake 3.17+** (usa el de RosBE, no el del sistema, para evitar problemas con `winnt.h`).
- **Ninja** (generador de build recomendado).
- **Git** con tu nombre y correo reales configurados (ReactOS no acepta contribuciones anónimas).

## 2. Clonar la rama ReactOS Gaming

```bash
git clone https://github.com/TU_USUARIO/reactos-gaming.git
cd reactos-gaming
git checkout feat/nt6-integration
```

## 3. Entorno de compilación

```bash
export PATH=/home/demox/RosBE/i386/bin:/home/demox/RosBE/bin:$PATH

/home/demox/RosBE-CI/bin/cmake -G Ninja \
  -S /home/demox/reactos-gaming -B /home/demox/build-gaming-debug \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-gcc.cmake -DARCH=i386 \
  -DCMAKE_BUILD_TYPE=Debug -DENABLE_CCACHE=0 -DDLL_EXPORT_VERSION=0x600 \
  -DNT6_PRODUCT_VERSION=ON -DNT6_NVIDIA_DRIVER=ON \
  -DENABLE_ROSTESTS=1 -DENABLE_ROSAPPS=1

ninja -C /home/demox/build-gaming-debug bootcd -j8
```

## 4. Arnés de regresión obligatorio

Antes de enviar cualquier PR, debes ejecutar el arnés de regresión y obtener `PASS`:

```bash
python3 tools/nt6/smoke.py --iso <ruta-a-tu-iso> --timeout 180
```

El smoke debe cumplir:
- `BOOT DRIVERS LOADED` presente
- Marcador de userland presente
- Ausencia de `Fatal System Error`, `*** STOP`, `KeBugCheck`, `Assertion failed`, `kdb:>`

## 5. Flujo de trabajo con Git

1. Crea una rama desde `feat/nt6-integration` con un nombre descriptivo:
   ```bash
   git checkout -b fix/nombre-de-tu-cambio
   ```
2. Realiza cambios pequeños y enfocados. Un solo cambio lógico por commit.
3. Usa el prefijo de commit según el tipo de cambio:
   - `[NT6]` — cambios del núcleo NT 6.x y WDDM
   - `[GAMING]` — cambios del camino gaming (353.62 vía ICD)
   - `[DOCS]` — cambios de documentación
   - `[TEST]` — cambios en pruebas o arnés de regresión
4. Sube tu rama y abre un Pull Request.

## 6. Reglas para Pull Requests

- **Un solo cambio lógico por PR.** No mezcles correcciones de kernel con documentación.
- **Incluye resultados del arnés de regresión** en la descripción del PR.
- **No uses `git add -A` a ciegas.** Revisa cada archivo antes de hacer `git add`.
- **No comites secretos, claves o binarios con datos sensibles.**
- **Respeta el Coding Style y las Programming Guidelines de ReactOS.**
- **Usa tu nombre real y correo real** en los commits (regla obligatoria de ReactOS).

## 7. Documentación

Si cambias código, actualiza o añade la documentación correspondiente en `docs/`. Las páginas de la wiki se generan con VitePress y se despliegan automáticamente en GitHub Pages.

## 8. Avisos legales

Si has visto código fuente de Microsoft Windows (incluido el Windows Research Kernel o filtraciones), tu contribución no será aceptada por posible violación de derechos de autor. Antes de contribuir, debes afirmar que no has usado ni visto dicho código.

## 9. Comunidad

- Chat oficial: https://chat.reactos.org/
- Foro: https://reactos.org/forum/
- JIRA: https://jira.reactos.org/
