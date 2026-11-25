# Servicios de Red y Seguridad

Esta página documenta los servicios de red y componentes de seguridad en ReactOS Gaming, incluyendo LSASS, SAM, NETLOGON y servicios del sistema.

## Servicios de Seguridad

| Servicio | Estado | Detalle |
|----------|--------|---------|
| LSASS (Local Security Authority Subsystem Service) | Implementado | Gestión de políticas de seguridad y autenticación. |
| SAM (Security Accounts Manager) | Implementado | Base de datos de cuentas de usuario y contraseñas. |
| NETLOGON | Parcial | Servicio de inicio de sesión de red; soporte limitado. |
| EventLog | Implementado | Registro de eventos del sistema y aplicaciones. |
| Servicios de criptografía | Parcial | Soporte básico de criptografía; sin soporte completo de certificados. |

## LSASS y SAM

| Componente | Estado | Detalle |
|------------|--------|---------|
| LSASS (`lsass.exe`) | Implementado | Proceso de autoridad de seguridad local. |
| SAM (`sam.dll`, `samsrv.dll`) | Implementado | Gestión de cuentas de usuario locales. |
| Políticas de seguridad | Implementado | Políticas de contraseñas, bloqueo de cuenta y auditoría. |
| Privilegios de usuario | Implementado | Asignación de privilegios a cuentas y grupos. |
| Autenticación | Implementado | Autenticación local de usuarios. |

## Servicios de Red

| Servicio | Estado | Detalle |
|----------|--------|---------|
| Cliente DHCP | Implementado | Obtención automática de dirección IP. |
| Cliente DNS | Implementado | Resolución de nombres de dominio. |
| NetBIOS | Parcial | Soporte limitado para nombres NetBIOS. |
| SMB / CIFS | No implementado | No hay soporte para compartir archivos en red. |
| Servidor de impresión | No implementado | No hay servidor de impresión de red. |
| Active Directory | No implementado | No hay soporte para dominios de Windows. |

## Servicios del Sistema

| Servicio | Estado | Detalle |
|----------|--------|---------|
| Administrador de sesiones (smss) | Implementado | Gestión de sesiones de usuario. |
| Servicios del sistema (services.exe) | Implementado | Gestión de servicios del sistema. |
| Planificador de tareas | Parcial | Soporte básico de tareas programadas. |
| Registro de eventos | Implementado | Registro de eventos del sistema. |
| Energía | Parcial | Gestión básica de energía del sistema. |

## Implementación en ReactOS Gaming

| Componente | Archivo | Estado | Detalle |
|------------|---------|--------|---------|
| LSASS | `base/system/lsasrv/` | Implementado | Autoridad de seguridad local. |
| SAM | `base/system/samssrv/` | Implementado | Gestor de cuentas de seguridad. |
| EventLog | `base/system/services/eventlog/` | Implementado | Registro de eventos. |
| Servicios | `base/system/services/` | Implementado | Gestor de servicios del sistema. |
| DHCP | `base/system/services/dhcp/` | Implementado | Cliente DHCP. |
| DNS | `base/system/services/dns/` | Implementado | Cliente DNS. |

## Limitaciones Conocidas

- No hay soporte para Active Directory ni dominios de Windows.
- No hay soporte para compartición de archivos en red (SMB/CIFS).
- No hay soporte para servidor de impresión de red.
- NETLOGON tiene soporte limitado; el inicio de sesión en dominio no funciona.
- La criptografía tiene soporte básico; no hay soporte completo de certificados PKI.

## Seguridad y Autenticación

| Característica | Estado | Detalle |
|--------------|--------|---------|
| Inicio de sesión local | Implementado | Autenticación de usuarios locales mediante SAM. |
| Cambio de contraseña | Implementado | Cambio de contraseñas de usuario local. |
| Bloqueo de cuenta | Implementado | Bloqueo tras múltiples intentos fallidos. |
| Auditoría | Implementado | Registro de eventos de seguridad. |
| Control de acceso (ACL) | Implementado | Listas de control de acceso en objetos del kernel. |
| Certificados SSL/TLS | No implementado | No hay soporte para certificados digitales. |
| Kerberos | No implementado | No hay protocolo de autenticación Kerberos. |
