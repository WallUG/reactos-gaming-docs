# Arquitectura x64 y ARM

Esta página documenta el estado de compilación para IA-32, AMD64/x86-64 y ARM en ReactOS Gaming.

## Arquitecturas Soportadas

| Arquitectura | Estado | Detalle |
|------------|--------|---------|
| IA-32 (x86, 32-bit) | Implementado | Arquitectura principal de desarrollo y pruebas. |
| AMD64 / x86-64 (64-bit) | Experimental | En desarrollo, no listo para producción. |
| ARM | No implementado | No hay soporte para arquitectura ARM. |
| ARM64 | No implementado | No hay soporte para arquitectura ARM de 64 bits. |

## IA-32 (x86, 32-bit)

Esta es la arquitectura principal de ReactOS Gaming. Todas las pruebas y validaciones se realizan en esta arquitectura.

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Núcleo NT 5.2 | Implementado | Base estable y probada. |
| Núcleo NT 6.x | Parcial | Capa moderna en desarrollo. |
| WDDM NVIDIA | Parcial | Miniport 365.19 en desarrollo activo. |
| SMP | Implementado | Soporte para múltiples procesadores. |
| PAE | Implementado | Physical Address Extension para >4 GB de RAM. |
| Maximum RAM | 4 GB (sin PAE), 64 GB (con PAE, teórico) | Limitado por HAL y controladores. |

## AMD64 / x86-64 (64-bit)

La compilación para x86-64 está en desarrollo experimental. No está lista para producción.

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Compilación nativa x86-64 | Experimental | En desarrollo (versión 0.7.0 planeada). |
| WOW64 | No implementado | Subsistema para ejecutar aplicaciones de 32 bits en x86-64. |
| Controladores de 64 bits | No implementado | Los controladores WDM/WDDM de 32 bits no funcionan en x86-64. |
| ASLR | No implementado | Address Space Layout Randomization no implementado. |

### Hoja de Ruta para x86-64

| Versión | Meta | Estado |
|---------|------|--------|
| 0.7.0 | Compilación nativa x86-64 | Planeado |
| 0.7.0 | Soporte ASLR | Planeado |
| Post-0.7.0 | WOW64 | No planificado |

## ARM / ARM64

No hay soporte para arquitectura ARM en ReactOS Gaming. No hay planes concretos en la hoja de ruta actual.

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Compilación ARM | No implementado | No hay toolchain ni código de arquitectura. |
| Compilación ARM64 | No implementado | No hay toolchain ni código de arquitectura. |
| HAL para ARM | No implementado | No hay HAL para arquitecturas ARM. |
| Controladores para ARM | No implementado | Los controladores de x86 no funcionan en ARM. |

## Consideraciones para Arquitecturas Futuras

Si se decide añadir soporte para x86-64 o ARM en el futuro, se necesitará:

1. **HAL específico:** Nueva capa de abstracción de hardware para la arquitectura.
2. **Toolchain:** Compilador y enlazador que soporten la arquitectura objetivo.
3. **Controladores:** Todos los controladores de dispositivo deben ser recompilados o reescritos.
4. **WOW64 (para x86-64):** Subsistema para ejecutar aplicaciones de 32 bits.
5. **Pruebas:** Hardware real o emulación para validar el funcionamiento.

## Comandos de Compilación por Arquitectura

### IA-32 (actual, recomendado)

```bash
/home/demox/RosBE-CI/bin/cmake -G Ninja \
  -S /home/demox/reactos-gaming -B /home/demox/build-gaming-debug \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-gcc.cmake -DARCH=i386 \
  -DCMAKE_BUILD_TYPE=Debug -DENABLE_CCACHE=0 -DDLL_EXPORT_VERSION=0x600 \
  -DNT6_PRODUCT_VERSION=ON -DNT6_NVIDIA_DRIVER=ON \
  -DENABLE_ROSTESTS=1 -DENABLE_ROSAPPS=1

ninja -C /home/demox/build-gaming-debug bootcd -j8
```

### AMD64 / x86-64 (experimental)

```bash
/home/demox/RosBE-CI/bin/cmake -G Ninja \
  -S /home/demox/reactos-gaming -B /home/demox/build-x86-64 \
  -DCMAKE_TOOLCHAIN_FILE=toolchain-gcc.cmake -DARCH=amd64 \
  -DCMAKE_BUILD_TYPE=Debug -DENABLE_CCACHE=0 -DDLL_EXPORT_VERSION=0x600 \
  -DNT6_PRODUCT_VERSION=ON -DNT6_NVIDIA_DRIVER=OFF \
  -DENABLE_ROSTESTS=1 -DENABLE_ROSAPPS=1

ninja -C /home/demox/build-x86-64 bootcd -j8
```
