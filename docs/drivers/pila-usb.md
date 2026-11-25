# Pila USB

Esta página documenta la pila USB en ReactOS Gaming, incluyendo los controladores UHCI, OHCI, EHCI y el estado de xHCI/USB 3.0.

## Visión General

| Versión USB | Controlador | Estado | Velocidad máxima |
|-------------|-------------|--------|------------------|
| USB 1.1 | UHCI | Implementado | 12 Mbps |
| USB 1.1 | OHCI | Implementado | 12 Mbps |
| USB 2.0 | EHCI | Implementado | 480 Mbps |
| USB 3.0 | xHCI | No implementado | 5 Gbps |

## Arquitectura de la Pila USB

```
Usuario (aplicaciones)
    ↓
Win32 API (user32, kernel32)
    ↓
Clase USB (hidclass, usbccgp, etc.)
    ↓
Controlador de función (hidusb, usbport, etc.)
    ↓
Controlador de host (uhci, ohci, ehci)
    ↓
Controlador de bus PCI
    ↓
Hardware USB (controlador de host, puertos, dispositivos)
```

## Controladores de Host

### UHCI (Universal Host Controller Interface)

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Velocidad | 12 Mbps | USB 1.1 Full Speed y Low Speed. |
| Controladores compatibles | Intel PIIX, VIA, etc. | Implementado para chipsets comunes. |
| Implementación | `drivers/usb/uhci/` | Funcional en hardware real y virtualización. |

### OHCI (Open Host Controller Interface)

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Velocidad | 12 Mbps | USB 1.1 Full Speed y Low Speed. |
| Controladores compatibles | VIA, nVidia, SiS, etc. | Implementado para chipsets comunes. |
| Implementación | `drivers/usb/ohci/` | Funcional en hardware real y virtualización. |

### EHCI (Enhanced Host Controller Interface)

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Velocidad | 480 Mbps | USB 2.0 High Speed. |
| Controladores compatibles | Intel, AMD, VIA, etc. | Implementado para chipsets comunes. |
| Implementación | `drivers/usb/ehci/` | Funcional en hardware real y virtualización. |

### xHCI (eXtensible Host Controller Interface)

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Velocidad | 5 Gbps | USB 3.0 SuperSpeed. |
| Controladores compatibles | Intel, Renesas, ASMedia, etc. | No implementado. |
| Implementación | Pendiente | No hay controlador xHCI en la rama actual. |

## Clases de Dispositivo USB

| Clase | Estado | Detalle |
|-------|--------|---------|
| HID (teclados, ratones) | Implementado | Mediante `hidclass.sys` y `hidusb.sys`. |
| Almacenamiento masivo | Implementado | Unidades flash y discos USB. |
| Impresión | Parcial | Soporte básico de impresoras USB. |
| Audio | Parcial | Soporte básico de dispositivos de audio USB. |
| Red | Parcial | Adaptadores de red USB parcialmente soportados. |
| Vídeo (cámaras web) | No implementado | No hay soporte para dispositivos de vídeo USB. |

## Implementación en Hardware Real

| Controlador | Modelo | Estado | Detalle |
|-------------|--------|--------|---------|
| USB 2.0 EHCI | Intel chipset series 8 | Implementado | Funcionando en placa BIOSTAR H81MHV3. |
| USB 1.1 OHCI/UHCI | Varios | Implementado | Funcional para teclados y ratones legacy. |
| USB 3.0 xHCI | Varios | No implementado | Puertos USB 3.0 no funcionan en ReactOS Gaming. |

## Limitaciones Conocidas

- No hay soporte para USB 3.0 (xHCI); los puertos USB 3.0 no funcionan en la placa real.
- El hotplug de dispositivos USB tiene soporte limitado; puede requerir reinicio para detectar nuevos dispositivos.
- Algunos dispositivos USB complejos (cámaras web, escáneres) no son compatibles.
- No hay soporte para USB PD (Power Delivery) ni modo alternativo.

## Flujo de Enumeración USB

1. El controlador de host (UHCI/OHCI/EHCI) detecta la conexión de un dispositivo.
2. El bus USB asigna una dirección al dispositivo.
3. Se lee el descriptor de dispositivo para identificar la clase y subcategoría.
4. Se carga el controlador de clase adecuado (hidclass, usbccgp, etc.).
5. El dispositivo está listo para usar desde modo usuario.
