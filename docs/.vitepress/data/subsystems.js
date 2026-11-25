export const subsystems = [
  {
    id: 'kernel-core',
    name: 'Nucleo Core (NT 5.2 / NT 6.x)',
    status: 'implementado',
    progress: 85,
    description: 'Gestor de memoria, procesos, hilos, I/O, objetos y registro.'
  },
  {
    id: 'smp',
    name: 'Multinucleo SMP / Mononucleo UP',
    status: 'implementado',
    progress: 100,
    description: 'Soporte completo para multiples nucleos y un solo nucleo.'
  },
  {
    id: 'hal',
    name: 'HAL — Capa de Abstraccion de Hardware',
    status: 'implementado',
    progress: 90,
    description: 'ACPI, APIC, temporizadores y enrutamiento de interrupciones.'
  },
  {
    id: 'wddm',
    name: 'WDDM — Miniport NVIDIA 365.19',
    status: 'parcial',
    progress: 60,
    description: 'Driver propietario cargado, ejecucion de comandos, pero sin lectura de RAM.'
  },
  {
    id: 'opengl',
    name: 'OpenGL ICD (nvoglv32)',
    status: 'faltante',
    progress: 10,
    description: 'Carga el ICD pero falla en Render #2 por contexto GR.'
  },
  {
    id: 'directx',
    name: 'DirectX Core',
    status: 'parcial',
    progress: 40,
    description: 'DirectDraw activado, D3D en camino.'
  },
  {
    id: 'audio',
    name: 'Audio WDM / HDAudio / AC97',
    status: 'implementado',
    progress: 85,
    description: 'RTKVHDA, portcls WaveRT, wdmaud, mmixer.'
  },
  {
    id: 'red',
    name: 'Red TCP/IP y NDIS',
    status: 'implementado',
    progress: 90,
    description: 'lwIP, NDIS 6, Winsock, RTL8169.'
  },
  {
    id: 'almacenamiento',
    name: 'Sistemas de Archivos y Almacenamiento',
    status: 'implementado',
    progress: 75,
    description: 'FAT32, NTFS, Btrfs, ATA, AHCI, NVMe.'
  },
  {
    id: 'usb',
    name: 'Pila USB',
    status: 'parcial',
    progress: 60,
    description: 'UHCI, OHCI, EHCI; xHCI/USB 3.0 pendiente.'
  },
  {
    id: 'win32k',
    name: 'win32k.sys — GDI y USER',
    status: 'implementado',
    progress: 80,
    description: 'Escritorio funcional, presentacion por CPU via PRAMIN.'
  },
  {
    id: 'arnes-regresion',
    name: 'Arnes de Regresion Propio',
    status: 'implementado',
    progress: 90,
    description: 'Validacion de estructuras, APIs y subsistemas NT 5.2 / 6.x.'
  }
]

export const getSubsystemProgress = () => {
  const total = subsystems.reduce((sum, s) => sum + s.progress, 0)
  return Math.round(total / subsystems.length)
}
