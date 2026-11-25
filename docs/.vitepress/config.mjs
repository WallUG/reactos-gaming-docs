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
      { text: 'Mapa del Sistema', link: '/mapa-sistema.html' },
      { text: 'Dashboard', link: '/dashboard/estado-sistemas.html' },
      { text: 'Hardware', link: '/dashboard/hardware.html' },
      { text: 'Compatibilidad', link: '/dashboard/compatibilidad.html' },
      { text: 'Roadmap', link: '/dashboard/roadmap.html' },
      { text: 'Kernel', link: '/kernel/vision-general.html' },
      { text: 'Graficos y Gaming', link: '/gaming/win32k-gdi-user.html' },
      { text: 'Drivers', link: '/drivers/sistemas-archivos.html' },
      { text: 'Modo Usuario', link: '/usermode/ntdll-smss-csrss.html' },
      { text: 'Depuracion', link: '/debug/arnes-regresion-vision-general.html' },
      { text: 'Desarrolladores', link: '/dev/empezar-aqui.html' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Portal y Dashboards',
          items: [
            { text: 'Inicio', link: '/' },
            { text: 'Estado de Sistemas', link: '/dashboard/estado-sistemas.html' },
            { text: 'Soporte de Hardware', link: '/dashboard/hardware.html' },
            { text: 'Matriz de Compatibilidad', link: '/dashboard/compatibilidad.html' },
            { text: 'Hoja de Ruta', link: '/dashboard/roadmap.html' }
          ]
        },
        {
          text: 'Arquitectura del Nucleo y Arranque',
          items: [
            { text: 'Vision General', link: '/kernel/vision-general.html' },
            { text: 'Dual Kernel NT 5.2 / NT 6.x', link: '/kernel/dual-kernel-nt52-nt6.html' },
            { text: 'FreeLoader, Arranque y ACPI', link: '/kernel/freeloader-boot.html' },
            { text: 'HAL — Capa de Abstraccion de Hardware', link: '/kernel/hal.html' },
            { text: 'Multinucleo SMP y Mononucleo UP', link: '/kernel/smp-multinucleo.html' },
            { text: 'Gestor de Memoria (Mm)', link: '/kernel/gestor-memoria.html' },
            { text: 'Procesos e Hilos (Ps)', link: '/kernel/procesos-hilos.html' },
            { text: 'I/O Manager y PnP', link: '/kernel/gestor-io-pnp.html' },
            { text: 'Object Manager y Registro', link: '/kernel/gestor-objetos-registro.html' },
            { text: 'Power Manager (Po)', link: '/kernel/gestor-energia.html' },
            { text: 'Security Reference Monitor y ASLR', link: '/kernel/seguridad-aslr.html' },
            { text: 'Cache Manager (Cc)', link: '/kernel/cache-manager.html' }
          ]
        },
        {
          text: 'Subsistema Grafico y Stack Gaming',
          items: [
            { text: 'win32k, GDI y USER', link: '/gaming/win32k-gdi-user.html' },
            { text: 'Arquitectura GPU: XDDM vs WDDM', link: '/gaming/arquitectura-gpu-xddm-wddm.html' },
            { text: 'DirectX Core', link: '/gaming/directx-core.html' },
            { text: 'OpenGL y Mesa 3D', link: '/gaming/opengl-mesa.html' },
            { text: 'Vulkan y DXVK', link: '/gaming/vulkan-dxvk.html' },
            { text: 'Audio y Multimedia', link: '/gaming/audio-multimedia.html' },
            { text: 'Input y Gamepads', link: '/gaming/input-gamepads.html' },
            { text: 'Optimizaciones Gaming', link: '/gaming/optimizaciones-gaming.html' },
            { text: 'Benchmarks', link: '/gaming/benchmarks.html' }
          ]
        },
        {
          text: 'Almacenamiento, Red y Perifericos',
          items: [
            { text: 'Sistemas de Archivos', link: '/drivers/sistemas-archivos.html' },
            { text: 'Almacenamiento ATA/AHCI/NVMe', link: '/drivers/almacenamiento.html' },
            { text: 'Pila USB', link: '/drivers/pila-usb.html' },
            { text: 'Pila de Red TCP/IP', link: '/drivers/red-tcpip.html' },
            { text: 'Drivers de Red y Wi-Fi', link: '/drivers/drivers-red-wifi.html' },
            { text: 'Compatibilidad WDM', link: '/drivers/wdm-compatibilidad.html' },
            { text: 'Virtualizacion', link: '/drivers/virtualizacion.html' }
          ]
        },
        {
          text: 'Modo Usuario y Compatibilidad',
          items: [
            { text: 'NTDLL, smss y csrss', link: '/usermode/ntdll-smss-csrss.html' },
            { text: 'APIs Win32 y Cobertura NT', link: '/usermode/win32-apis.html' },
            { text: 'Integracion con Wine', link: '/usermode/sincronizacion-wine.html' },
            { text: 'Compatibilidad 16 bits (NTVDM)', link: '/usermode/ntvdm-winevdm.html' },
            { text: 'Explorador y Shell', link: '/usermode/shell-explorer.html' },
            { text: 'ReactOS Applications Manager', link: '/usermode/rapps.html' },
            { text: 'Runtimes (.NET, VC++, OpenAL)', link: '/usermode/runtimes.html' },
            { text: 'Servicios de Red y Seguridad', link: '/usermode/servicios-red-seguridad.html' }
          ]
        },
        {
          text: 'Depuracion, QA y Arnés de Regresion',
          items: [
            { text: 'Vision General del Arnes', link: '/debug/arnes-regresion-vision-general.html' },
            { text: 'Validacion de Estructuras y APIs', link: '/debug/validacion-estructuras-apis.html' },
            { text: 'Validacion de Subsistemas', link: '/debug/validacion-sistemas-subsistemas.html' },
            { text: 'Ejecutar y Extender el Arnes', link: '/debug/ejecutar-y-extender-arnes.html' },
            { text: 'Depuracion con WinDbg y GDB', link: '/debug/depuracion-kernel-windbg-gdb.html' }
          ]
        },
        {
          text: 'Guia para Desarrolladores',
          items: [
            { text: 'Empezar Aqui', link: '/dev/empezar-aqui.html' },
            { text: 'Entorno RosBE', link: '/dev/rosbe-entorno.html' },
            { text: 'Compilacion con CMake', link: '/dev/compilacion-cmake.html' },
            { text: 'Estructura del Codigo', link: '/dev/estructura-codigo.html' },
            { text: 'Pruebas y Test Suite', link: '/dev/pruebas-test-suite.html' },
            { text: 'Guia de Pull Requests', link: '/dev/guia-pull-requests.html' },
            { text: 'Reportar Bugs', link: '/dev/reportar-bugs.html' },
            { text: 'Arquitectura x64 y ARM', link: '/dev/arquitectura-x64-arm.html' },
            { text: 'Glosario Tecnico', link: '/dev/glosario-recursos.html' }
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
