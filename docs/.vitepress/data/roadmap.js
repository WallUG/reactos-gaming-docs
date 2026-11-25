export const roadmap = [
  {
    version: '0.5.0',
    title: 'WDDM Completo y Presentacion por GPU',
    status: 'en-progreso',
    items: [
      { text: 'GPU lee RAM del sistema (tabla de paginas de apertura en VRAM)', done: false },
      { text: 'Invalidacion de TLB para nuevas PTEs', done: false },
      { text: 'Presentacion por GPU (scanout a 0x300000)', done: false },
      { text: 'OpenGL ICD funcional (nvoglv32 Render OK)', done: false }
    ]
  },
  {
    version: '0.6.0',
    title: 'DirectX 11 y Vulkan',
    status: 'planeado',
    items: [
      { text: 'Capa WineD3D para D3D 8/9/10/11', done: false },
      { text: 'Soporte Vulkan y traduccion DXVK', done: false },
      { text: 'Aceleracion 3D en maquinas virtuales', done: false }
    ]
  },
  {
    version: '0.7.0',
    title: 'Estabilizacion x64 y ASLR',
    status: 'planeado',
    items: [
      { text: 'Compilacion nativa x86-64', done: false },
      { text: 'Soporte ASLR (Address Space Layout Randomization)', done: false },
      { text: 'ARM64 experimental', done: false }
    ]
  }
]

export const getRoadmapProgress = (items) => {
  const done = items.filter(i => i.done).length
  return Math.round((done / items.length) * 100)
}
