# Dashboard: Hoja de Ruta (Roadmap)

Esta página detalla las metas planeadas para las próximas versiones de ReactOS Gaming, con el progreso de cada hito y los elementos pendientes.

---

## Resumen de Versiones

| Versión | Título | Estado | Progreso |
|---------|--------|--------|----------|
| 0.5.0 | WDDM Completo y Presentación por GPU | En progreso | 25% |
| 0.6.0 | DirectX 11 y Vulkan | Planeado | 0% |
| 0.7.0 | Estabilización x64 y ASLR | Planeado | 0% |

---

## Versión 0.5.0 — WDDM Completo y Presentación por GPU

Estado: En progreso | Progreso: 25%

Esta versión se centra en que la GPU pueda presentar el escritorio directamente, sin depender de la copia por CPU vía PRAMIN.

| Meta | Descripción | Estado |
|------|-------------|--------|
| GPU lee RAM del sistema | Que la tabla de páginas de la apertura llegue a la VRAM y la GPU pueda acceder a memoria del sistema | Pendiente |
| Invalidación de TLB | Emitir el comando de invalidate de NVIDIA (MEM_OP_B para clase 906F) tras escribir nuevas PTEs | Pendiente |
| Presentación por GPU | Mover el scanout a 0x300000 y tener la GPU copiando la sombra a la VRAM | Pendiente |
| OpenGL ICD funcional | nvoglv32.dll completa Render #2 sin 0xc00000e8 | Pendiente |

Bloqueo actual: Paso 15 — ROBUST_CHANNEL_GR_FAULT_DURING_CTXSW (ErrorType=0x2c). La VA 0xdbb865000 no tiene PTE en el VAS GPU durante el switch de contexto GR.

---

## Versión 0.6.0 — DirectX 11 y Vulkan

Estado: Planeado | Progreso: 0%

| Meta | Descripción | Estado |
|------|-------------|--------|
| Capa WineD3D | Implementar Direct3D 8/9/10/11 a través de la capa WineD3D | Planeado |
| Soporte Vulkan | Implementar Vulkan y traducción DXVK | Planeado |
| Aceleración 3D en VMs | Soporte para máquinas virtuales con GPU passthrough | Planeado |

---

## Versión 0.7.0 — Estabilización x64 y ASLR

Estado: Planeado | Progreso: 0%

| Meta | Descripción | Estado |
|------|-------------|--------|
| Compilación nativa x86-64 | Build de ReactOS Gaming para arquitectura de 64 bits | Planeado |
| ASLR | Address Space Layout Randomization para mitigación de exploits | Planeado |
| ARM64 experimental | Soporte experimental para arquitectura ARM de 64 bits | Planeado |

---

## Hitos Completados (Histórico)

| Hito | Descripción | Commit |
|------|-------------|--------|
| Paso 1 | Registro en clase Display + INF WDDM | 58a05fe8031 |
| Paso 2 | Callbacks DxgkCb* y despacho DMA | fbe7133c992 |
| Paso 3 | Puente D3DKMT → DxgkDdi | 44b6e2d7144 |
| Paso 6 | Spam serie + ETW Vista+ | ae5b352e671 |
| Paso 7 | Handle data (DXGK_HANDLE_ALLOCATION/RESOURCE) | b14d565aa41 |
| Paso 8 | Corrupción PTE +8 bytes | b54d74dc9e9 |
| Paso 9 | Flags UMD→KMD (CreateContext/Present) | 2775445114a |
| Paso 10 | CreateContext en PASSIVE_LEVEL | b1cb26b2137 |
| Paso 11 | Render 0xc00000e8 / 0xc000000d | 9fad9f1af4a |
| Paso 12 | Render/Submit OK + ABI IoInitializeWorkItem | b129ff861d0 |
| Paso 13 | Render #2 0xc00000e8 (SetAllocationResident) | fbe7133c992 |
| Paso 14 | Mapeo VRAM 30000102 + SYS_NCOH | 2f10dc44a68 |

---

## Cómo Contribuir al Roadmap

1. Revisa las metas pendientes en cada versión.
2. Elige una meta y crea una rama desde feat/nt6-integration.
3. Implementa el cambio y prueba en la máquina real (GT 710).
4. Envía un Pull Request usando la plantilla de .github/PULL_REQUEST_TEMPLATE.md.
5. Un mantenedor actualizará el progreso en esta página tras la fusión.
