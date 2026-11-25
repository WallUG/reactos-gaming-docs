# Dashboard: Matriz de Compatibilidad

<CompatibilityTable />

---

## Leyenda de Estados

| Estado | Significado |
|--------|-------------|
| Jugable | Se puede jugar con limitaciones menores. FPS jugable. |
| Se lanza | El programa inicia pero no es completamente funcional. |
| Parcial | Funciona parcialmente, con fallos gráficos o funcionales. |
| Falla | No se lanza o crashea inmediatamente. |
| Validando | En proceso de pruebas, resultados preliminares. |

---

## Tabla de Programas y Juegos Probados

<table>
  <thead>
    <tr><th>Nombre</th><th>Versión</th><th>Estado</th><th>Núcleo</th><th>FPS / Rendimiento</th><th>Notas Técnicas</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Halo Combat Evolved</strong></td>
      <td>1.0</td>
      <td>Jugable</td>
      <td>NT 6.x</td>
      <td>30–60 fps</td>
      <td>Campaña jugable en 3D, salida limpia, restaura resolución al salir (1366×768).</td>
    </tr>
    <tr>
      <td><strong>CPU-Z</strong></td>
      <td>2.07</td>
      <td>Se lanza</td>
      <td>NT 6.x</td>
      <td>N/A</td>
      <td>Arranca y carga su controlador kernel sYD1urwK8SbpF.</td>
    </tr>
    <tr>
      <td><strong>GPU-Z</strong></td>
      <td>2.72</td>
      <td>Parcial</td>
      <td>NT 6.x</td>
      <td>N/A</td>
      <td>Detecta la GT 710. Problema con directorio %TEMP% en español (corregido en es-ES.rc y hivedef.inf).</td>
    </tr>
    <tr>
      <td><strong>GPU Caps Viewer</strong></td>
      <td>1.56</td>
      <td>Parcial</td>
      <td>NT 6.x</td>
      <td>4 fps</td>
      <td>Alcanza el bucle de ventana OpenGL pero viewport negro.</td>
    </tr>
    <tr>
      <td><strong>NvStereoUtilityOGL</strong></td>
      <td>1.0</td>
      <td>Falla</td>
      <td>NT 6.x</td>
      <td>N/A</td>
      <td>Ventana transparente. Render #2 falla con 0xc00000e8 (Paso 15).</td>
    </tr>
    <tr>
      <td><strong>Chrome 158</strong></td>
      <td>158.0.8127.88</td>
      <td>Se lanza</td>
      <td>NT 6.x</td>
      <td>N/A</td>
      <td>Carga hasta la red. Faltan 18 APIs de kernel32.dll y ws2_32.dll.</td>
    </tr>
    <tr>
      <td><strong>glteardown.exe</strong></td>
      <td>1.0</td>
      <td>Falla</td>
      <td>NT 6.x</td>
      <td>N/A</td>
      <td>Repro de crash wglMakeCurrent en estudio.</td>
    </tr>
    <tr>
      <td><strong>GTA San Andreas</strong></td>
      <td>1.0</td>
      <td>Validando</td>
      <td>NT 6.x</td>
      <td>N/A</td>
      <td>Salida y teardown en prueba.</td>
    </tr>
  </tbody>
</table>

---

## Cómo Reportar un Nuevo Juego o Programa

Si has probado un programa o juego en tu instalación de ReactOS Gaming, puedes contribuir a esta matriz:

1. Abre un issue usando la plantilla Compatibility Report (.github/ISSUE_TEMPLATE/compatibility_report.yml).
2. Incluye: nombre, versión, estado, núcleo probado (NT 5.2 / NT 6.x), FPS, notas técnicas y especificaciones de hardware.
3. Un mantenedor revisará y agregará la entrada a la tabla.

---

## Filtros Disponibles

La tabla superior es interactiva y permite:

- Buscar por nombre: Escribe en el campo de búsqueda para filtrar en tiempo real.
- Filtrar por núcleo: Selecciona Todos los núcleos, NT 6.x, NT 5.2 o Ambos.

Los resultados se actualizan instantáneamente sin recargar la página.
