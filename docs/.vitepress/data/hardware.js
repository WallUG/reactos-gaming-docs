export const hardware = {
  motherboard: {
    name: 'BIOSTAR H81MHV3',
    status: 'ok',
    notes: 'ACPI SMP + AHCI DMA funcionando en placa real.'
  },
  cpu: {
    name: 'Intel i3-4170',
    cores: 1,
    threads: 1,
    status: 'ok',
    notes: 'Mononucleo UP, kernel ntoskrnlmp.'
  },
  gpu: {
    name: 'NVIDIA GeForce GT 710',
    vendorId: '10de',
    deviceId: '128b',
    driver: '365.19',
    status: 'parcial',
    notes: 'Driver WDDM cargado, ejecuta Fill, no lee RAM del sistema.'
  },
  network: {
    name: 'Realtek RTL8136',
    vendorId: '10ec',
    deviceId: '8136',
    driver: 'rtlh86 NDIS 6',
    status: 'ok',
    notes: 'Funcional en QEMU y placa real.'
  },
  audio: {
    name: 'Realtek ALC662',
    driver: 'RTKVHDA + portcls WaveRT',
    status: 'ok',
    notes: 'Sin Codigo 10, audio funcionando en placa real.'
  },
  ram: {
    maxSupported: '4 GB (PAE)',
    current: '3556 MB',
    status: 'ok'
  },
  storage: {
    types: ['FAT32', 'NTFS', 'Btrfs', 'ATA', 'AHCI', 'NVMe'],
    status: 'ok'
  },
  usb: {
    versions: ['UHCI', 'OHCI', 'EHCI'],
    status: 'parcial',
    notes: 'xHCI / USB 3.0 pendiente.'
  }
}

export const hardwareStatus = {
  ok: { label: 'Funcional', class: 'badge-ok' },
  parcial: { label: 'Parcial', class: 'badge-warn' },
  faltante: { label: 'Faltante', class: 'badge-blocked' }
}
