# Pila de Red TCP/IP

Esta página documenta la pila de red en ReactOS Gaming, incluyendo lwIP, NDIS y Winsock.

## Visión General

| Componente | Estado | Detalle |
|------------|--------|---------|
| lwIP | Implementado | Pila TCP/IP ligera para ReactOS. |
| NDIS 6 | Implementado | Interfaz de red de Windows para miniports. |
| Winsock | Implementado | API de sockets de Windows para aplicaciones. |
| DHCP | Implementado | Cliente DHCP para obtención automática de IP. |
| DNS | Implementado | Resolución de nombres de dominio. |

## Arquitectura de la Pila de Red

```
Aplicación (WinSock)
    ↓
ws2_32.dll (modo usuario)
    ↓
afd.sys (Ancillary Function Driver)
    ↓
tdi.sys (Transport Driver Interface)
    ↓
lwIP (pila TCP/IP)
    ↓
NDIS 6 (miniport de red)
    ↓
Controlador de red (rtlh86.sys, etc.)
    ↓
Hardware de red (tarjeta Ethernet)
```

## NDIS 6 (Network Driver Interface Specification)

| Característica | Estado | Detalle |
|----------------|--------|---------|
| NDIS 6.0 | Implementado | Miniports y filtros de red. |
| Miniport drivers | Implementado | `rtlh86.sys` para Realtek RTL8136. |
| Filtros de red | Parcial | Soporte limitado para filtros intermedios. |
| Offload de checksum | Parcial | Soporte limitado de descarga de checksum al hardware. |
| Receive Side Scaling (RSS) | No implementado | Distribución de recepción entre núcleos no soportada. |

## Winsock (ws2_32)

| Función | Estado | Detalle |
|---------|--------|---------|
| `socket` | Implementado | Creación de sockets TCP/UDP. |
| `bind` | Implementado | Asociación de socket a dirección local. |
| `listen` / `accept` | Implementado | Escucha y aceptación de conexiones entrantes. |
| `connect` | Implementado | Conexión a servidor remoto. |
| `send` / `recv` | Implementado | Envío y recepción de datos. |
| `select` | Implementado | Multiplexación de sockets. |
| `getaddrinfo` | Implementado | Resolución de nombres de host. |
| `getnameinfo` | Implementado | Resolución inversa de direcciones. |

## Implementación en Hardware Real

| Componente | Modelo | Estado | Detalle |
|------------|--------|--------|---------|
| Tarjeta de red | Realtek RTL8136 | Implementado | `rtlh86.sys` NDIS 6.0 miniport. |
| Velocidad | 10/100/1000 Mbps | Implementado | Auto-negociación de velocidad. |
| Duplex | Medio / Completo | Implementado | Detección automática de duplex. |
| Wake-on-LAN | No implementado | No hay soporte para encendido remoto. |

## Protocolos Soportados

| Protocolo | Estado | Detalle |
|-----------|--------|---------|
| IPv4 | Implementado | Protocolo de Internet versión 4. |
| IPv6 | No implementado | Protocolo de Internet versión 6 no soportado. |
| TCP | Implementado | Protocolo de control de transmisión. |
| UDP | Implementado | Protocolo de datagramas de usuario. |
| ICMP | Implementado | Protocolo de mensajes de control de Internet. |
| ARP | Implementado | Protocolo de resolución de direcciones. |
| DHCP | Implementado | Configuración automática de IP. |
| DNS | Implementado | Resolución de nombres mediante servidor DNS. |

## Limitaciones Conocidas

- No hay soporte para IPv6; solo IPv4 está disponible.
- No hay soporte para Wi-Fi nativo (ver página de Drivers de Red y Wi-Fi).
- No hay soporte para VPN (PPTP, L2TP, OpenVPN, etc.).
- No hay soporte para firewall integrado de Windows.
- No hay soporte para calidad de servicio (QoS).

## Flujo de Envío de Paquete

```
Aplicación → WinSock → afd.sys → tdi.sys → lwIP → NDIS 6 → Miniport → Tarjeta de red → Red
```
