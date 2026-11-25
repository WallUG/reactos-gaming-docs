# Virtualización

Esta página documenta el soporte para aceleración 3D y ejecución en máquinas virtuales en ReactOS Gaming.

## Hipervisores Soportados

| Hipervisor | Aceleración 3D | Estado | Notas |
|------------|---------------|--------|-------|
| QEMU / KVM | No (pci-testdev) | Parcial | Sirve para pruebas de arranque, no para GPU real. El hardware falso no tiene VBIOS ni interrupción real. |
| VirtualBox | No | Parcial | Guest additions no disponibles para ReactOS. |
| VMware | No | Parcial | SVGÁ no acelerado para WDDM; gráficos básicos sin aceleración 3D. |

## Banco QEMU (pci-testdev)

ReactOS Gaming incluye un banco de pruebas basado en QEMU que presenta un dispositivo `pci-testdev` como GT 710:

| Característica | Estado | Detalle |
|----------------|--------|---------|
| Presentado como GT 710 | Implementado | El dispositivo PCI se identifica como GT 710 para pruebas. |
| VBIOS | No disponible | El hardware falso no tiene VBIOS. |
| Interrupción | No disponible | Solo 3 recursos; sin interrupción real. |
| StartDevice | Termina en 0xC000009A | El miniport no puede iniciar correctamente en el banco. |
| Utilidad | Pruebas de arranque | Sirve para comprobar que dxgkrnl y el bus arrancan y el sistema llega a userland. |

> **Nota importante:** El banco QEMU **no sirve para validar arreglos del driver NVIDIA**. Todas las validaciones de GPU se hacen en la placa real (H81MHV3 + GT 710).

## Scripts de Prueba

| Script | Propósito | Uso |
|--------|-----------|-----|
| `bench-nvidia.py` | Banco QEMU con pci-testdev | `--iso <iso> --disco <imagen> --menu-downs 3` |
| `bench-disk-sync.sh` | Copia disco instalado a imagen raw | `sudo bench-disk-sync.sh [DISPOSITIVO] [IMAGEN]` |
| `smoke.py` | Validación obligatoria de arranque | `--iso <iso> --timeout 180` |
| `regtest.py` | Regresión de suites en invitado | `--iso <iso> --timeout 300` |

## Instalación en Máquina Virtual

### Requisitos Mínimos

| Recurso | Mínimo | Recomendado |
|---------|--------|-------------|
| RAM | 512 MB | 2 GB |
| CPU | 1 núcleo | 2+ núcleos |
| Disco | 5 GB | 20 GB |
| Gráficos | SVGÁ / VBE | SVGÁ (sin aceleración 3D) |

### Pasos de Instalación

1. Descargue la ISO de ReactOS Gaming (`bootcd-con-nvidia.iso` o `bootcd-sin-nvidia.iso`).
2. Cree una máquina virtual en su hipervisor preferido.
3. Asigne los recursos mínimos indicados arriba.
4. Monte la ISO como unidad de CD/DVD.
5. Inicie la máquina virtual y seleccione la instalación desde el CD.
6. Siga el asistente de instalación de ReactOS Setup.

## Limitaciones de Virtualización

- **Sin aceleración 3D:** Ningún hipervisor disponible ofrece aceleración 3D para ReactOS. El escritorio se renderiza por CPU.
- **Sin drivers de invitado:** No hay guest additions para VirtualBox ni herramientas de VMware para ReactOS.
- **Red emulada:** Las tarjetas de red virtuales funcionan con controladores NDIS genéricos.
- **Almacenamiento emulado:** Los discos virtuales se presentan como dispositivos IDE o SATA estándar.

## Aceleración 3D en Máquinas Virtuales

La aceleración 3D en máquinas virtuales está planeada para versiones futuras (0.6.0 o posteriores), pero actualmente no hay soporte:

| Característica | Estado | Versión planeada |
|----------------|--------|------------------|
| vGPU (GPU virtual) | No implementado | No planificado |
| Passthrough de GPU | No implementado | No planificado |
| VirGL / OpenGL en invitado | No implementado | No planificado |
