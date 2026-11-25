# Runtimes (.NET Framework, Visual C++, OpenAL)

Esta página documenta el soporte para entornos de ejecución y bibliotecas compartidas en ReactOS Gaming.

## .NET Framework

| Versión | Estado | Detalle |
|---------|--------|---------|
| .NET Framework 1.1 | No implementado | No hay soporte para tiempo de ejecución de .NET. |
| .NET Framework 2.0 | No implementado | No hay soporte para tiempo de ejecución de .NET. |
| .NET Framework 3.5 | No implementado | No hay soporte para tiempo de ejecución de .NET. |
| .NET Framework 4.x | No implementado | No hay soporte para tiempo de ejecución de .NET. |
| .NET Core / 5+ | No implementado | No hay soporte para tiempo de ejecución de .NET moderno. |

## Visual C++ Redistributables

| Versión | Estado | Detalle |
|---------|--------|---------|
| VC++ 6.0 | Parcial | Algunas aplicaciones compiladas con VC6 pueden funcionar. |
| VC++ 2005-2008 | Parcial | Soporte limitado; algunas aplicaciones funcionan. |
| VC++ 2010-2015 | No implementado | No hay soporte para redistributables modernos. |
| VC++ 2017-2022 | No implementado | No hay soporte para redistributables recientes. |

## OpenAL

| Versión | Estado | Detalle |
|---------|--------|---------|
| OpenAL 1.1 | No implementado | No hay soporte para audio posicional 3D. |

## Otros Runtimes

| Runtime | Estado | Detalle |
|---------|--------|---------|
| Java Runtime | No implementado | No hay soporte para Java. |
| Python | No implementado | No hay intérprete de Python incluido. |
| Perl | No implementado | No hay intérprete de Perl incluido. |
| PHP | No implementado | No hay soporte para PHP. |

## Limitaciones Conocidas

- La mayoría de aplicaciones modernas requieren .NET Framework o Visual C++ Redistributables recientes, que no están disponibles.
- Las aplicaciones que dependen de OpenAL para audio 3D no funcionarán.
- No hay instaladores automáticos para runtimes; se deben instalar manualmente si existen versiones compatibles.

## Hoja de Ruta

El soporte para .NET Framework y Visual C++ Redistributables modernos no está en la hoja de ruta actual (0.5.0 - 0.7.0). El enfoque principal está en el núcleo, gráficos y controladores de dispositivo.
