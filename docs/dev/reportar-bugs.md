# Reportar Bugs

Esta página documenta cómo reportar fallos en ReactOS Gaming usando las plantillas de Issues de GitHub.

## Plantillas de Issues Disponibles

| Plantilla | Ruta | Uso |
|-----------|------|-----|
| Bug Report | `.github/ISSUE_TEMPLATE/bug_report.yml` | Reportar fallos en el núcleo, WDDM, controladores o subsistemas. |
| Compatibility Report | `.github/ISSUE_TEMPLATE/compatibility_report.yml` | Reportar juegos o programas probados para sumar a la matriz de compatibilidad. |
| Feature Request | `.github/ISSUE_TEMPLATE/feature_request.yml` | Proponer nuevos subsistemas o mejoras arquitectónicas. |

## Cómo Reportar un Fallo (Bug Report)

### Antes de Reportar

1. Verifique que el fallo no esté ya reportado en los Issues existentes.
2. Ejecute el arnés de regresión y obtenga el resultado del smoke test.
3. Capture el log completo del puerto serie.
4. Anote las especificaciones de hardware (placa base, CPU, GPU, RAM).

### Campos Obligatorios del Bug Report

| Campo | Descripción |
|-------|-------------|
| Versión / Commit | Commit de ReactOS Gaming (ej. `9fad9f1af4a`). |
| Núcleo afectado | NT 5.2 (UP/SMP), NT 6.x, o ambos. |
| Gravedad | Bloqueante, Alto, Medio o Bajo. |
| Pasos para reproducir | Pasos exactos para reproducir el fallo. |
| Comportamiento esperado | ¿Qué debería pasar? |
| Comportamiento actual | ¿Qué está pasando en realidad? |
| Logs de WinDbg / GDB / Serie | Log completo del puerto serie, backtraces, volcados de kernel. |
| Especificaciones de hardware | Placa base, CPU, GPU, RAM, controladores instalados. |

### Ejemplo de Reporte

```
Título: [Bug] DxgkDdiRender falla con 0xc00000e8 en GT 710

Versión: 9fad9f1af4a
Núcleo: NT 6.x
Gravedad: Bloqueante

Pasos:
1. Iniciar ReactOS Gaming con driver nvlddmkm.sys 365.19.
2. Ejecutar NvStereoUtilityOGL.exe.
3. Observar fallo en DxgkDdiRender con 0xc00000e8.

Comportamiento esperado: El contexto OpenGL se crea y renderiza correctamente.
Comportamiento actual: Render #2 falla con 0xc00000e8, nvoglv32 termina con "A large number of errors have been detected".

Logs: [adjuntar log del puerto serie]
Hardware: H81MHV3, i3-4170, GT 710 (10de:128b), 3556 MB RAM.
```

## Cómo Reportar Compatibilidad (Compatibility Report)

Use esta plantilla para reportar juegos o programas probados. La información se agrega a la matriz de compatibilidad del dashboard.

### Campos Obligatorios

| Campo | Descripción |
|-------|-------------|
| Nombre del programa / juego | Ej. Halo Combat Evolved, CPU-Z, GPU-Z. |
| Versión | Ej. 1.0, 2.07.0. |
| Estado | Se lanza, Jugable, Parcial o Falla. |
| Núcleo probado | NT 5.2, NT 6.x o Ambos. |
| FPS / Rendimiento | Ej. 30-60 fps, 15 fps estable. |
| Notas y configuración | Configuración gráfica, resolución, parches, problemas conocidos. |
| Especificaciones de hardware de prueba | GPU, CPU, RAM usada. |

## Cómo Proponer una Nueva Característica (Feature Request)

Use esta plantilla para proponer nuevos subsistemas o mejoras arquitectónicas.

### Campos Obligatorios

| Campo | Descripción |
|-------|-------------|
| Descripción de la propuesta | ¿Qué quiere añadir o cambiar y por qué es importante? |
| Área afectada | Núcleo, Gráfico, Audio, Red, Almacenamiento, Modo usuario, Herramientas, Documentación. |
| Prioridad sugerida | Alta, Media o Baja. |

## Captura de Logs

### Log del Puerto Serie (Hardware Real)

Use MobaXterm, PuTTY o similar para capturar el puerto serie a 115200 baudios. Guarde el log con timestamp para referencia.

### Backtrace de WinDbg / GDB

Si el kernel entra en el depurador KDB, use `bt` para obtener el backtrace y adjúntelo al reporte.

### Volcado de BSOD

Si ocurre un bugcheck, anote:
- Código del bugcheck (`[0]`).
- Código de la excepción (`[1]`).
- EIP real (`[2]`).
- Puntero al trap frame (`[3]`).

## Reglas para Reportes

- **Un fallo por issue.** No mezcle múltiples problemas en un mismo reporte.
- **Incluya el commit exacto.** Sin el commit, no se puede reproducir el problema.
- **Incluya el log completo.** No recorte ni edite el log del puerto serie.
- **Pruebe en hardware real si es posible.** Algunos fallos solo aparecen en el GT 710 real.
