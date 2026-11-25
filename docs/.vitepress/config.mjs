import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ReactOS Gaming / NT6 — Documentación Técnica',
  description: 'Documentación de la rama ReactOS Gaming con soporte WDDM propietario NVIDIA y Dual Kernel NT 5.2 / NT 6.x',
  lang: 'es-ES',
  base: '/reactos-gaming-docs/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/reactos-gaming-docs/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0f172a' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/chart.js' }]
  ],

  themeConfig: {
    logo: '/reactos-gaming-docs/favicon.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/WallUG/reactos-gaming-docs' }
    ],

    editLink: {
      pattern: 'https://github.com/WallUG/reactos-gaming-docs/edit/main/:path',
      text: 'Sugerir cambios en esta página'
    },

    footer: {
      message: 'Released under the GPL-2.0-only license.',
      copyright: 'Copyright © 2026 ReactOS Gaming'
    },

    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Mapa del Sistema', link: '/mapa-sistema/' },
      { text: 'Dashboard', link: '/dashboard/estado-sistemas/' },
      { text: 'Hardware', link: '/dashboard/hardware/' },
      { text: 'Compatibilidad', link: '/dashboard/compatibilidad/' },
      { text: 'Roadmap', link: '/dashboard/roadmap/' },
      { text: 'Kernel', link: '/kernel/vision-general/' },
      { text: 'Graficos y Gaming', link: '/gaming/win32k-gdi-user/' },
      { text: 'Drivers', link: '/drivers/sistemas-archivos/' },
      { text: 'Modo Usuario', link: '/usermode/ntdll-smss-csrss/' },
      { text: 'Depuracion', link: '/debug/arnes-regresion-vision-general/' },
      { text: 'Desarrolladores', link: '/dev/empezar-aqui/' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Portal y Dashboards',
          items: [
            { text: 'Inicio', link: '/' },
            { text: 'Estado de Sistemas', link: '/dashboard/estado-sistemas/' },
            { text: 'Soporte de Hardware', link: '/dashboard/hardware/' },
            { text: 'Matriz de Compatibilidad', link: '/dashboard/compatibilidad/' },
            { text: 'Hoja de Ruta', link: '/dashboard/roadmap/' }
          ]
        },
        {
          text: 'Arquitectura del Nucleo y Arranque',
          items: [
            { text: 'Vision General', link: '/kernel/vision-general/' },
            { text: 'Dual Kernel NT 5.2 / NT 6.x', link: '/kernel/dual-kernel-nt52-nt6/' },
            { text: 'FreeLoader, Arranque y ACPI', link: '/kernel/freeloader-boot/' },
            { text: 'HAL — Capa de Abstraccion de Hardware', link: '/kernel/hal/' },
            { text: 'Multinucleo SMP y Mononucleo UP', link: '/kernel/smp-multinucleo/' },
            { text: 'Gestor de Memoria (Mm)', link: '/kernel/gestor-memoria/' },
            { text: 'Procesos e Hilos (Ps)', link: '/kernel/procesos-hilos/' },
            { text: 'I/O Manager y PnP', link: '/kernel/gestor-io-pnp/' },
            { text: 'Object Manager y Registro', link: '/kernel/gestor-objetos-registro/' },
            { text: 'Power Manager (Po)', link: '/kernel/gestor-energia/' },
            { text: 'Security Reference Monitor y ASLR', link: '/kernel/seguridad-aslr/' },
            { text: 'Cache Manager (Cc)', link: '/kernel/cache-manager/' }
          ]
        },
        {
          text: 'Subsistema Grafico y Stack Gaming',
          items: [
            { text: 'win32k, GDI y USER', link: '/gaming/win32k-gdi-user/' },
            { text: 'Arquitectura GPU: XDDM vs WDDM', link: '/gaming/arquitectura-gpu-xddm-wddm/' },
            { text: 'DirectX Core', link: '/gaming/directx-core/' },
            { text: 'OpenGL y Mesa 3D', link: '/gaming/opengl-mesa/' },
            { text: 'Vulkan y DXVK', link: '/gaming/vulkan-dxvk/' },
            { text: 'Audio y Multimedia', link: '/gaming/audio-multimedia/' },
            { text: 'Input y Gamepads', link: '/gaming/input-gamepads/' },
            { text: 'Optimizaciones Gaming', link: '/gaming/optimizaciones-gaming/' },
            { text: 'Benchmarks', link: '/gaming/benchmarks/' }
          ]
        },
        {
          text: 'Almacenamiento, Red y Perifericos',
          items: [
            { text: 'Sistemas de Archivos', link: '/drivers/sistemas-archivos/' },
            { text: 'Almacenamiento ATA/AHCI/NVMe', link: '/drivers/almacenamiento/' },
            { text: 'Pila USB', link: '/drivers/pila-usb/' },
            { text: 'Pila de Red TCP/IP', link: '/drivers/red-tcpip/' },
            { text: 'Drivers de Red y Wi-Fi', link: '/drivers/drivers-red-wifi/' },
            { text: 'Compatibilidad WDM', link: '/drivers/wdm-compatibilidad/' },
            { text: 'Virtualizacion', link: '/drivers/virtualizacion/' }
          ]
        },
        {
          text: 'Modo Usuario y Compatibilidad',
          items: [
            { text: 'NTDLL, smss y csrss', link: '/usermode/ntdll-smss-csrss/' },
            { text: 'APIs Win32 y Cobertura NT', link: '/usermode/win32-apis/' },
            { text: 'Integracion con Wine', link: '/usermode/sincronizacion-wine/' },
            { text: 'Compatibilidad 16 bits (NTVDM)', link: '/usermode/ntvdm-winevdm/' },
            { text: 'Explorador y Shell', link: '/usermode/shell-explorer/' },
            { text: 'ReactOS Applications Manager', link: '/usermode/rapps/' },
            { text: 'Runtimes (.NET, VC++, OpenAL)', link: '/usermode/runtimes/' },
            { text: 'Servicios de Red y Seguridad', link: '/usermode/servicios-red-seguridad/' }
          ]
        },
        {
          text: 'Depuracion, QA y Arnés de Regresion',
          items: [
            { text: 'Vision General del Arnes', link: '/debug/arnes-regresion-vision-general/' },
            { text: 'Validacion de Estructuras y APIs', link: '/debug/validacion-estructuras-apis/' },
            { text: 'Validacion de Subsistemas', link: '/debug/validacion-sistemas-subsistemas/' },
            { text: 'Ejecutar y Extender el Arnes', link: '/debug/ejecutar-y-extender-arnes/' },
            { text: 'Depuracion con WinDbg y GDB', link: '/debug/depuracion-kernel-windbg-gdb/' }
          ]
        },
        {
          text: 'Guia para Desarrolladores',
          items: [
            { text: 'Empezar Aqui', link: '/dev/empezar-aqui/' },
            { text: 'Entorno RosBE', link: '/dev/rosbe-entorno/' },
            { text: 'Compilacion con CMake', link: '/dev/compilacion-cmake/' },
            { text: 'Estructura del Codigo', link: '/dev/estructura-codigo/' },
            { text: 'Pruebas y Test Suite', link: '/dev/pruebas-test-suite/' },
            { text: 'Guia de Pull Requests', link: '/dev/guia-pull-requests/' },
            { text: 'Reportar Bugs', link: '/dev/reportar-bugs/' },
            { text: 'Arquitectura x64 y ARM', link: '/dev/arquitectura-x64-arm/' },
            { text: 'Glosario Tecnico', link: '/dev/glosario-recursos/' }
          ]
        }
      ]
    }
  },

  markdown: {
    theme: { light: 'vitesse-light', dark: 'vitesse-dark' },
    lineNumbers: true
  },

  vite: {
    optimizeDeps: {
      include: ['vue', '@vueuse/core']
    }
  }
})
