export const compatibility = [
  {
    name: 'Halo Combat Evolved',
    version: '1.0',
    status: 'jugable',
    kernel: 'NT 6.x',
    fps: '30-60',
    notes: 'Campaña jugable en 3D, salida limpia, restaura resolución al salir.'
  },
  {
    name: 'CPU-Z',
    version: '2.07',
    status: 'se-lanza',
    kernel: 'NT 6.x',
    fps: 'N/A',
    notes: 'Arranca y carga su controlador kernel sYD1urwK8SbpF.'
  },
  {
    name: 'GPU-Z',
    version: '2.72',
    status: 'parcial',
    kernel: 'NT 6.x',
    fps: 'N/A',
    notes: 'Detecta la GT 710, problemas con directorio %TEMP% en español (corregido).'
  },
  {
    name: 'GPU Caps Viewer',
    version: '1.56',
    status: 'parcial',
    kernel: 'NT 6.x',
    fps: '4',
    notes: 'Alcanza el bucle de ventana OpenGL pero viewport negro.'
  },
  {
    name: 'NvStereoUtilityOGL',
    version: '1.0',
    status: 'falla',
    kernel: 'NT 6.x',
    fps: 'N/A',
    notes: 'Ventana transparente, Render #2 falla con 0xc00000e8.'
  },
  {
    name: 'Chrome 158',
    version: '158.0.8127.88',
    status: 'se-lanza',
    kernel: 'NT 6.x',
    fps: 'N/A',
    notes: 'Carga hasta la red, faltan 18 APIs de kernel32/ws2_32.'
  },
  {
    name: 'glteardown.exe',
    version: '1.0',
    status: 'falla',
    kernel: 'NT 6.x',
    fps: 'N/A',
    notes: 'Repro de crash wglMakeCurrent en estudio.'
  },
  {
    name: 'GTA San Andreas',
    version: '1.0',
    status: 'validando',
    kernel: 'NT 6.x',
    fps: 'N/A',
    notes: 'Salida y teardown en prueba.'
  }
]

export const getStatusBadge = (status) => {
  const map = {
    'jugable': { label: 'Jugable', class: 'badge-ok' },
    'se-lanza': { label: 'Se lanza', class: 'badge-temp' },
    'parcial': { label: 'Parcial', class: 'badge-warn' },
    'falla': { label: 'Falla', class: 'badge-blocked' },
    'validando': { label: 'Validando', class: 'badge-experimental' }
  }
  return map[status] || { label: status, class: 'badge-temp' }
}
