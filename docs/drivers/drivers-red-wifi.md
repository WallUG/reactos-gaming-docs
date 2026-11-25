# Drivers de Red y Wi-Fi

Esta página documenta los controladores de red disponibles en ReactOS Gaming, incluyendo Ethernet, Wi-Fi y adaptadores inalámbricos.

## Controladores de Red por Cable (Ethernet)

| Controlador | Modelo | Estado | Detalle |
|-------------|--------|--------|---------|
| `rtlh86.sys` | Realtek RTL8136 | Implementado | NDIS 6.0 miniport para tarjetas Ethernet Realtek. |
| `e1000.sys` | Intel e1000 | Parcial | Soporte básico para tarjetas Intel Gigabit. |
| `e1000e.sys` | Intel e1000e | Parcial | Soporte básico para tarjetas Intel de segunda generación. |

### Realtek RTL8136 (rtlh86.sys)

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Interfaz | NDIS 6.0 | Miniport de red compatible con WDDM. |
| Velocidad | 10/100/1000 Mbps | Auto-negociación de velocidad y duplex. |
| Hardware validado | Realtek RTL8136 | Funcionando en placa BIOSTAR H81MHV3. |
| QEMU | e1000 / virtio-net | Funcional para pruebas de red en virtualización. |

## Controladores de Red Inalámbrica (Wi-Fi)

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Wi-Fi 802.11 | No implementado | No hay soporte nativo para redes inalámbricas. |
| Controladores Wi-Fi | No implementado | No hay miniports para tarjetas Wi-Fi. |
| WPA/WPA2 | No implementado | Sin soporte de cifrado inalámbrico. |
| Ad-hoc / Infrastructure | No implementado | Sin modos de operación inalámbrica. |

## Estado de Conectividad Inalámbrica

ReactOS Gaming **no tiene soporte para Wi-Fi** en la versión actual. Las únicas opciones de conectividad de red son:

- **Ethernet por cable** mediante tarjetas compatibles con NDIS 6.
- **Red en virtualización** mediante QEMU con tarjetas de red emuladas (e1000, virtio-net).

## Hoja de Ruta para Wi-Fi

| Versión | Meta | Estado |
|---------|------|--------|
| 0.7.0 | Soporte básico para Wi-Fi 802.11 | Planeado |
| Post-0.7.0 | WPA/WPA2, cifrado inalámbrico | No planificado |

## Implementación de Controladores de Red

| Componente | Archivo | Estado | Detalle |
|------------|---------|--------|---------|
| Miniport NDIS | `drivers/net/ndis/rtlh86/` | Implementado | Controlador para Realtek RTL8136. |
| Protocolo TCP/IP | `base/system/tdiprov/lwip/` | Implementado | Pila TCP/IP ligera. |
| Enlace NDIS | `base/system/ndis/` | Implementado | Enlace entre miniports y protocolos. |
| Utilidades de red | `base/system/network/` | Implementado | `ipconfig`, `ping`, `netstat`, etc. |

## Utilidades de Red

| Herramienta | Estado | Detalle |
|-------------|--------|---------|
| `ipconfig` | Implementado | Configuración y visualización de interfaces de red. |
| `ping` | Implementado | Prueba de conectividad mediante ICMP. |
| `netstat` | Implementado | Estadísticas de red y conexiones activas. |
| `arp` | Implementado | Gestión de caché de resolución de direcciones. |
| `hostname` | Implementado | Visualización y cambio del nombre del equipo. |

## Limitaciones Conocidas

- No hay adaptadores Wi-Fi soportados; solo Ethernet por cable.
- No hay soporte para adaptadores USB de red inalámbrica.
- No hay soporte para VPN ni cifrado de tráfico de red.
- No hay soporte para compartición de conexión de Internet (ICS).
