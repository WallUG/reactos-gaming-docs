# Guía de Pull Requests

Esta página documenta el flujo de trabajo Git, la convención de commits y cómo enviar Pull Requests a la rama ReactOS Gaming.

## Flujo de Trabajo con Git

### 1. Clonar el Repositorio

```bash
git clone https://github.com/WallUG/reactos-gaming.git
cd reactos-gaming
git checkout feat/nt6-integration
```

### 2. Crear una Rama para su Cambio

```bash
git checkout -b fix/nombre-de-tu-cambio
```

### 3. Realizar Cambios Pequeños y Enfocados

Un solo cambio lógico por commit. No mezcle correcciones de kernel con documentación.

### 4. Usar el Prefijo de Commit Correcto

| Prefijo | Uso |
|---------|-----|
| `[NT6]` | Cambios del núcleo NT 6.x y WDDM. |
| `[GAMING]` | Cambios del camino gaming (353.62 vía ICD). |
| `[DOCS]` | Cambios de documentación. |
| `[TEST]` | Cambios en pruebas o arnés de regresión. |

### 5. Enviar la Rama y Abrir un Pull Request

```bash
git push origin fix/nombre-de-tu-cambio
```

Luego abra un Pull Request en GitHub hacia la rama `feat/nt6-integration`.

## Reglas para Pull Requests

- **Un solo cambio lógico por PR.** No mezcle correcciones de kernel con documentación.
- **Incluya resultados del arnés de regresión** en la descripción del PR.
- **No use `git add -A` a ciegas.** Revise cada archivo antes de hacer `git add`.
- **No comite secretos, claves o binarios con datos sensibles.**
- **Respete el Coding Style y las Programming Guidelines de ReactOS.**
- **Use su nombre real y correo real** en los commits (regla obligatoria de ReactOS).

## Plantilla de Pull Request

El repositorio incluye una plantilla en `.github/PULL_REQUEST_TEMPLATE.md` con los siguientes campos:

- Checklist previa al envío (nombre real, cambio lógico, arnés de regresión, diff revisado, documentación, pruebas en hardware).
- Descripción del cambio.
- Área afectada.
- Resultados del arnés de regresión.
- Pruebas en máquina real (si aplica).
- Notas adicionales / Issues relacionados.

## Ejemplo de Commit

```
[NT6] DxgKrnl: copiar UserCommandBuffer completo en DxgWddmRender para evitar 0xc00000e8

Se elimina la condicion !pRender->Flags.RenderKm que truncaba el buffer
copiado al solo CommandLength bytes cuando RenderKm == 0. nvoglv32.dll
pasa CommandLength=17 mientras escribe su cabecera NVDA extendida (>600
bytes) en UserCommandBuffer, y nvlddmkm lee pCommand+0x10..+0x268 asumiendo
que apunta al buffer completo (DmaBufferSize=12288). Al copiar solo 17 bytes
leia ~600 bytes de basura de NonPagedPool mas alla, provocando 0xc00000e8
en el chequeo de GPU VA y marcando Context+0xa3=1, lo que hacia fallar
todas las llamadas posteriores con 0xc00000e8.

Con este cambio se copia siempre el resto del UserCommandBuffer
(DmaBufferSize - CommandOffset) independientemente de RenderKm, preservando
RenderArg.CommandLength = pRender->CommandLength.

Probado en PC real (H81 + GT 710, nvlddmkm 365.19): el comando ahora lleva
cabecera NVDA valida (4e564441 00010004 ...) en lugar de basura de pool.
El error sigue en Paso 15 (ROBUST_CHANNEL_GR_FAULT_DURING_CTXSW, ErrorType
0x2c, va=0xdbb865000), que requiere mapear el buffer de contexto GR en el
VAS GPU del canal.
```

## Revisión de Pull Requests

1. Un mantenedor revisa el PR.
2. Se verifican los resultados del arnés de regresión.
3. Se prueban los cambios en la máquina real (si tocan el núcleo o WDDM).
4. Se aprueba o se solicitan cambios.
5. Tras la aprobación, se fusiona en `feat/nt6-integration`.

## Avisos Legales

Si ha visto código fuente de Microsoft Windows (incluido el Windows Research Kernel o filtraciones), su contribución no será aceptada por posible violación de derechos de autor. Antes de contribuir, debe afirmar que no ha usado ni visto dicho código.
