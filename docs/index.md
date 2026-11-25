# ReactOS Gaming / NT6 — Portal Oficial

## ReactOS Gaming / NT6

Soporte WDDM propietario NVIDIA + Dual Kernel NT 5.2 / NT 6.x para juegos y hardware real

ReactOS Gaming es una rama especializada de ReactOS enfocada en llevar aceleración 3D real, drivers propietarios de GPU y un núcleo NT 6.x a hardware físico. Nuestra meta: que ReactOS no solo arranque, sino que juegue.

---

## Estado Global del Proyecto

<ProgressBars />

<ChartBars title="Progreso por Subsistema" />

---

## ¿Qué es ReactOS Gaming?

ReactOS Gaming es un fork especializado de ReactOS orientado a juegos y aceleración gráfica sobre hardware real. A diferencia de ReactOS base (centrado en NT 5.2 / Server 2003), esta rama integra:

| Pilar | Descripción | Estado |
|-------|-------------|--------|
| Dual Kernel | Núcleo clásico NT 5.2 (Server 2003) y capa NT 6.x (Vista/7+) coexistiendo | Implementado |
| SMP / UP | Soporte para multinúcleo y mononúcleo | Implementado |
| WDDM NVIDIA | Miniport propietario nvlddmkm.sys 365.19 como driver de pantalla | Parcial |
| OpenGL ICD | nvoglv32.dll cargando y llegando a DxgkDdiRender | Bloqueado (Paso 15) |
| Audio | WDM, HDAudio, AC97, WaveRT vía portcls | Implementado |
| Red | NDIS 6, lwIP, Winsock, Realtek RTL8136 | Implementado |

---

## Enlaces Rápidos

<table>
  <tr>
    <td><strong>Dashboard de Sistemas</strong></td>
    <td>Progreso detallado por capa, barras de progreso y gráficos comparativos.</td>
    <td><a href="/dashboard/estado-sistemas/">Ver dashboard</a></td>
  </tr>
  <tr>
    <td><strong>Soporte de Hardware</strong></td>
    <td>Matriz de componentes probados en la placa real (H81MHV3 + GT 710).</td>
    <td><a href="/dashboard/hardware/">Ver hardware</a></td>
  </tr>
  <tr>
    <td><strong>Matriz de Compatibilidad</strong></td>
    <td>Juegos y programas probados con estado, FPS y notas técnicas.</td>
    <td><a href="/dashboard/compatibilidad/">Ver compatibilidad</a></td>
  </tr>
  <tr>
    <td><strong>Hoja de Ruta</strong></td>
    <td>Metas hacia 0.5.0, 0.6.0 y 0.7.0: WDDM completo, DX11, Vulkan, x64.</td>
    <td><a href="/dashboard/roadmap/">Ver roadmap</a></td>
  </tr>
  <tr>
    <td><strong>Guía para Desarrolladores</strong></td>
    <td>Cómo clonar, compilar con RosBE y enviar Pull Requests.</td>
    <td><a href="/dev/empezar-aqui/">Ver guía</a></td>
  </tr>
</table>

---

## Bloqueo Actual: Paso 15

<div class="callout warn">

**ROBUST_CHANNEL_GR_FAULT_DURING_CTXSW** (ErrorType=0x2c, Xid 44)

La GPU ejecuta comandos (Fill, copia VRAM→VRAM, interrupciones tipo 1) pero no puede leer la RAM del sistema. La VA 0xdbb865000 no tiene PTE válida en el VAS GPU durante el switch de contexto GR.

**Último commit:** 9fad9f1af4a — Fix de DxgWddmRender para copiar el UserCommandBuffer completo y evitar 0xc00000e8 en DxgkDdiRender.

</div>

---

## Últimos Cambios (Commits Recientes)

| Commit | Descripción | Fecha |
|--------|-------------|-------|
| 9fad9f1af4a | [NT6] DxgKrnl: copiar UserCommandBuffer completo en DxgWddmRender para evitar 0xc00000e8 | 25 nov 2026 |
| f296676fada | [NT6] Kernel32: DeleteFiber invoca cada callback FLS con su propio dato | 25 nov 2026 |
| 0427aa9c297 | [NT6] Docs: decodificar RC 0x2c = GR_FAULT_DURING_CTXSW (Paso 15) | 25 nov 2026 |
| b129ff861d0 | [NT6] DxgKrnl: corregir ABI de IoInitializeWorkItem e IoQueueWorkItemEx | 24 nov 2026 |

---

## ¿Quieres Colaborar?

Consulta la Guía de Contribución y las plantillas de Issues y PRs.

> **Nota legal:** Si has visto código fuente de Microsoft Windows (incluido el Windows Research Kernel o filtraciones), tu contribución no será aceptada por posible violación de derechos de autor.
