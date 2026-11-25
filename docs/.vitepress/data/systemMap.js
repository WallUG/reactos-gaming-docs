export const systemMapLayers = [
  {
    id: 'layer-1',
    name: 'Capa 1 — Aplicaciones y Shell (Modo Usuario)',
    modules: [
      {
        id: 'explorer',
        name: 'explorer.exe',
        status: 'implementado',
        progress: 80,
        kernel: 'Dual',
        summary: 'Explorador de archivos y entorno de escritorio.',
        link: '/usermode/shell-explorer/'
      },
      {
        id: 'shell32',
        name: 'shell32.dll',
        status: 'parcial',
        progress: 55,
        kernel: 'Dual',
        summary: 'Explorador, carpetas y enlaces de shell.',
        link: '/usermode/shell-explorer/'
      },
      {
        id: 'rapps',
        name: 'rapps.exe',
        status: 'parcial',
        progress: 40,
        kernel: 'Dual',
        summary: 'ReactOS Applications Manager y catálogo gaming.',
        link: '/usermode/rapps/'
      },
      {
        id: 'cmd',
        name: 'cmd.exe',
        status: 'implementado',
        progress: 85,
        kernel: 'Dual',
        summary: 'Intérprete de comandos de 32 bits.',
        link: '/usermode/ntvdm-winevdm/'
      },
      {
        id: 'runtimes',
        name: 'Runtimes (.NET / VC++)',
        status: 'faltante',
        progress: 0,
        kernel: 'Dual',
        summary: 'Entornos de ejecución .NET y Visual C++.',
        link: '/usermode/runtimes/'
      }
    ]
  },
  {
    id: 'layer-2',
    name: 'Capa 2 — APIs Win32 y Stack Gaming',
    modules: [
      {
        id: 'kernel32',
        name: 'kernel32.dll',
        status: 'implementado',
        progress: 85,
        kernel: 'Dual',
        summary: 'APIs de kernel, archivos, procesos, hilos y sincronización.',
        link: '/usermode/win32-apis/'
      },
      {
        id: 'user32',
        name: 'user32.dll',
        status: 'implementado',
        progress: 80,
        kernel: 'Dual',
        summary: 'Ventanas, mensajes, menús y controles.',
        link: '/usermode/win32-apis/'
      },
      {
        id: 'gdi32',
        name: 'gdi32.dll',
        status: 'implementado',
        progress: 75,
        kernel: 'Dual',
        summary: 'Dibujado GDI, fuentes y mapas de bits.',
        link: '/usermode/win32-apis/'
      },
      {
        id: 'ntdll',
        name: 'ntdll.dll',
        status: 'implementado',
        progress: 85,
        kernel: 'Dual',
        summary: 'Biblioteca nativa con syscalls y ETW.',
        link: '/usermode/ntdll-smss-csrss/'
      },
      {
        id: 'd3d',
        name: 'd3d9/11 (WineD3D)',
        status: 'faltante',
        progress: 0,
        kernel: 'NT 6.x',
        summary: 'Capa de traducción Direct3D a OpenGL.',
        link: '/gaming/directx-core/'
      },
      {
        id: 'opengl32',
        name: 'opengl32.dll (Mesa)',
        status: 'parcial',
        progress: 10,
        kernel: 'NT 6.x',
        summary: 'ICD OpenGL de NVIDIA (nvoglv32.dll) carga pero falla en Render #2.',
        link: '/gaming/opengl-mesa/'
      },
      {
        id: 'dsound',
        name: 'dsound.dll',
        status: 'implementado',
        progress: 70,
        kernel: 'Dual',
        summary: 'DirectSound, API de audio para juegos.',
        link: '/gaming/audio-multimedia/'
      },
      {
        id: 'xinput',
        name: 'xinput / dinput',
        status: 'faltante',
        progress: 0,
        kernel: 'Dual',
        summary: 'APIs de entrada para mandos y videojuegos.',
        link: '/gaming/input-gamepads/'
      }
    ]
  },
  {
    id: 'layer-3',
    name: 'Capa 3 — Servicios y Subsistemas',
    modules: [
      {
        id: 'smss',
        name: 'smss.exe',
        status: 'implementado',
        progress: 85,
        kernel: 'Dual',
        summary: 'Session Manager, crea la primera sesión de usuario.',
        link: '/usermode/ntdll-smss-csrss/'
      },
      {
        id: 'csrss',
        name: 'csrss.exe',
        status: 'implementado',
        progress: 80,
        kernel: 'Dual',
        summary: 'Client/Server Runtime Subsystem.',
        link: '/usermode/ntdll-smss-csrss/'
      },
      {
        id: 'lsass',
        name: 'lsass.exe',
        status: 'implementado',
        progress: 75,
        kernel: 'Dual',
        summary: 'Autoridad de seguridad local y autenticación.',
        link: '/usermode/servicios-red-seguridad/'
      },
      {
        id: 'ntvdm',
        name: 'ntvdm.exe',
        status: 'parcial',
        progress: 30,
        kernel: 'Dual',
        summary: 'NT Virtual DOS Machine para aplicaciones de 16 bits.',
        link: '/usermode/ntvdm-winevdm/'
      },
      {
        id: 'arnes',
        name: 'Arnés de Regresión',
        status: 'implementado',
        progress: 90,
        kernel: 'Dual',
        summary: 'Validación de estructuras, APIs y subsistemas NT 5.2 / 6.x.',
        link: '/debug/arnes-regresion-vision-general/'
      }
    ]
  },
  {
    id: 'layer-4',
    name: 'Capa 4 — Modo Kernel (Dual NT 5.2 / NT 6.x)',
    modules: [
      {
        id: 'ntoskrnl',
        name: 'ntoskrnl.exe',
        status: 'implementado',
        progress: 85,
        kernel: 'Dual',
        summary: 'Núcleo (Mm, Ps, Io, Ob, Cm, Cc, Se, Po).',
        link: '/kernel/vision-general/'
      },
      {
        id: 'win32k',
        name: 'win32k.sys',
        status: 'implementado',
        progress: 80,
        kernel: 'Dual',
        summary: 'Subsistema gráfico y de usuario en modo kernel.',
        link: '/gaming/win32k-gdi-user/'
      },
      {
        id: 'hal',
        name: 'hal.dll',
        status: 'implementado',
        progress: 90,
        kernel: 'Dual',
        summary: 'Capa de Abstracción de Hardware.',
        link: '/kernel/hal/'
      },
      {
        id: 'smp',
        name: 'Soporte SMP Multinúcleo',
        status: 'implementado',
        progress: 100,
        kernel: 'Dual',
        summary: 'Procesamiento multiprocesador simétrico y mononúcleo.',
        link: '/kernel/smp-multinucleo/'
      }
    ]
  },
  {
    id: 'layer-5',
    name: 'Capa 5 — Drivers y Hardware',
    modules: [
      {
        id: 'wddm',
        name: 'XDDM / WDDM (GPU)',
        status: 'parcial',
        progress: 60,
        kernel: 'NT 6.x',
        summary: 'Driver propietario NVIDIA 365.19 como miniport WDDM.',
        link: '/gaming/arquitectura-gpu-xddm-wddm/'
      },
      {
        id: 'hdaudio',
        name: 'portcls / HDAudio',
        status: 'implementado',
        progress: 85,
        kernel: 'Dual',
        summary: 'Clase de puerto de audio y HD Audio (RTKVHDA).',
        link: '/gaming/audio-multimedia/'
      },
      {
        id: 'filesystems',
        name: 'NTFS / FAT32 / Btrfs',
        status: 'implementado',
        progress: 75,
        kernel: 'Dual',
        summary: 'Sistemas de archivos: FAT32, NTFS, Btrfs, Ext2/3/4.',
        link: '/drivers/sistemas-archivos/'
      },
      {
        id: 'storage',
        name: 'AHCI / NVMe',
        status: 'implementado',
        progress: 70,
        kernel: 'Dual',
        summary: 'Controladores de almacenamiento SATA y NVMe.',
        link: '/drivers/almacenamiento/'
      },
      {
        id: 'usb',
        name: 'USB Stack',
        status: 'parcial',
        progress: 60,
        kernel: 'Dual',
        summary: 'Pila USB: UHCI, OHCI, EHCI; xHCI pendiente.',
        link: '/drivers/pila-usb/'
      },
      {
        id: 'net',
        name: 'NDIS / TCP-IP',
        status: 'implementado',
        progress: 90,
        kernel: 'Dual',
        summary: 'Pila de red: NDIS 6, lwIP, Winsock, Realtek RTL8136.',
        link: '/drivers/red-tcpip/'
      },
      {
        id: 'freeloader',
        name: 'FreeLoader (UEFI/BIOS)',
        status: 'implementado',
        progress: 85,
        kernel: 'Dual',
        summary: 'Gestor de arranque y carga del núcleo.',
        link: '/kernel/freeloader-boot/'
      }
    ]
  }
]

export const globalStats = {
  totalModules: 23,
  implemented: 13,
  partial: 7,
  missing: 3,
  globalProgress: 68,
  dualKernel: 'NT 5.2 + NT 6.x',
  smp: 'UP + SMP'
}

export const getStatusInfo = (status) => {
  const map = {
    implementado: { label: 'Implementado', class: 'badge-ok', dot: 'dot-ok' },
    parcial: { label: 'Parcial', class: 'badge-warn', dot: 'dot-warn' },
    faltante: { label: 'Faltante', class: 'badge-blocked', dot: 'dot-bad' }
  }
  return map[status] || { label: status, class: 'badge-temp', dot: 'dot-warn' }
}
