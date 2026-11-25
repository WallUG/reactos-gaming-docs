export const roadmap = [
  {
    version: '0.5.0',
    title: 'WDDM Completo y Presentación por GPU',
    status: 'en-progreso',
    items: [
      { text: 'GPU lee RAM del sistema (tabla de páginas de apertura en VRAM)', done: false },
      { text: 'Invalidación de TLB para nuevas PTEs', done: false },
      { text: 'Presentación por GPU (scanout a 0x300000)', done: false },
      { text: 'OpenGL ICD funcional (nvoglv32 Render OK)', done: false }
    ]
  },
  {
    version: '0.6.0',
    title: 'DirectX 11 y Vulkan',
    status: 'planeado',
    items: [
      { text: 'Capa WineD3D para D3D 8/9/10/11', done: false },
      { text: 'Soporte Vulkan y traducción DXVK', done: false },
      { text: 'Aceleración 3D en máquinas virtuales', done: false }
    ]
  },
  {
    version: '0.7.0',
    title: 'Estabilización x64 y ASLR',
    status: 'planeado',
    items: [
      { text: 'Compilación nativa x86-64', done: false },
      { text: 'Soporte ASLR (Address Space Layout Randomization)', done: false },
      { text: 'ARM64 experimental', done: false }
    ]
  }
]

export const getRoadmapProgress = (items) => {
  const done = items.filter(i => i.done).length
  return Math.round((done / items.length) * 100)
}
