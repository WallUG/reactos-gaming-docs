# Compatibilidad con Aplicaciones de 16 Bits (NTVDM / WineVDM)

Esta página documenta el soporte para aplicaciones de 16 bits en ReactOS Gaming mediante NTVDM (NT Virtual DOS Machine) y WineVDM.

## Visión General

NTVDM permite ejecutar aplicaciones de 16 bits (DOS y Windows 3.x) dentro del entorno de Windows NT mediante virtualización y emulación de CPU.

| Característica | Estado | Detalle |
|--------------|--------|---------|
| NTVDM | Parcial | Soporte básico para aplicaciones de 16 bits. |
| WineVDM | No implementado | Integración con WineVDM no disponible. |
| Aplicaciones DOS | Parcial | Ejecución básica de programas de 16 bits DOS. |
| Aplicaciones Windows 3.x | Parcial | Soporte limitado para aplicaciones de Windows 3.x. |

## Componentes de NTVDM

| Componente | Estado | Detalle |
|------------|--------|---------|
| `ntvdm.dll` | Parcial | Biblioteca principal de NTVDM. |
| `wow32.dll` | Parcial | Thunking de llamadas de 16 bits a 32 bits. |
| `wowexec.exe` | Parcial | Ejecutorio de entorno Windows 3.x. |
| `dosx.exe` | Parcial | Extensor de DOS para aplicaciones de 16 bits. |
| `cmd.exe` | Implementado | Intérprete de comandos de 32 bits (no NTVDM). |

## Flujo de Ejecución de 16 Bits

```
Aplicación de 16 bits (DOS / Win3.x)
    ↓
NTVDM (ntvdm.dll)
    ↓
Emulación de CPU 8086 / 80286
    ↓
Llamadas al sistema NT (a través de thunks)
    ↓
Kernel NT (NTOSKRNL)
```

## Limitaciones Conocidas

- El soporte para aplicaciones de 16 bits es experimental y puede tener inestabilidad.
- Algunas aplicaciones de Windows 3.x pueden no funcionar correctamente debido a diferencias en la implementación de GDI y USER de 16 bits.
- No hay aceleración gráfica para aplicaciones de 16 bits; el renderizado se hace por CPU.
- El sonido en aplicaciones de 16 bits puede no funcionar correctamente.

## Hoja de Ruta

No hay planes concretos para mejorar NTVDM en la hoja de ruta actual (0.5.0 - 0.7.0). El enfoque principal está en aplicaciones de 32 y 64 bits.
