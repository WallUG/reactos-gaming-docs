# APIs Win32 y Cobertura NT

Esta página documenta la cobertura de APIs de Win32 y del núcleo NT en ReactOS Gaming, diferenciando entre NT 5.2 y NT 6.x.

## Visión General

ReactOS Gaming implementa las APIs de Win32 (kernel32, user32, gdi32, advapi32, etc.) y las llamadas al sistema del núcleo NT (a través de ntdll). La cobertura varía entre la versión NT 5.2 (base estable) y NT 6.x (capa moderna para drivers y aplicaciones recientes).

## Cobertura de DLLs de Modo Usuario

| DLL | Estado | Cobertura | Notas |
|-----|--------|-----------|-------|
| kernel32.dll | Implementado | Alta | APIs de kernel, archivos, procesos, hilos, sincronización. |
| user32.dll | Implementado | Alta | Ventanas, mensajes, menús, controles. |
| gdi32.dll | Implementado | Media-Alta | Dibujado GDI, fuentes, mapas de bits. |
| advapi32.dll | Implementado | Media | Registro, seguridad, servicios, ETW. |
| shell32.dll | Parcial | Media | Explorador, carpetas, enlaces de shell. |
| ole32.dll | Parcial | Media | COM, activación de objetos, marshalling. |
| rpcrt4.dll | Implementado | Media | Llamadas a procedimiento remoto. |
| msvcrt.dll | Implementado | Alta | Tiempo de ejecución de C. |

## Llamadas al Sistema (Syscalls)

| Versión | Cantidad | Estado | Detalle |
|---------|----------|--------|---------|
| NT 5.2 | 297 | Implementado | Llamadas al sistema base de Windows Server 2003 / XP. |
| NT 6.0 | 22 | Parcial | Llamadas adicionales de Windows Vista / 7. |

La validación de la tabla de syscalls se realiza con `tools/nt6/inventory.py`, que compara `sysfuncs.h` y `sysfuncs.lst`.

## API Sets

ReactOS Gaming implementa el mecanismo de API sets de Windows, que permite redireccionar llamadas a DLLs específicas según la versión del sistema.

| API Set | Estado | Detalle |
|---------|--------|---------|
| api-ms-win-core-* | Implementado | API sets del núcleo (procesos, hilos, archivos, etc.). |
| api-ms-win-security-* | Implementado | API sets de seguridad y criptografía. |
| api-ms-win-service-* | Parcial | API sets de servicios del sistema. |
| api-ms-win-appmodel-* | Parcial | API sets del modelo de aplicación (Windows 8+). |

## Validación de Contratos NT 5.2 → NT 6.0

El documento `docs/nt6/CONTRATOS-NT6.md` cataloga los contratos verificados entre versiones:

| ID | Contrato | NT 5.2 | NT 6.0 | Verificación |
|----|----------|--------|--------|--------------|
| C1 | Versión de producto | 5.2.3790 | 6.0.6002 | Registro y serial. |
| C2 | `OB_OPEN_METHOD` | 5 argumentos | 6 argumentos (con AccessMode) | `nt6_contract_probe`. |
| C3 | Campo PEB 0x50 | `ReadOnlySharedMemoryHeap` | `HotpatchInformation` | `nt6_contract_probe`. |
| C11 | Syscalls NT 6.0 | 297 | 22 adicionales | `tools/nt6/inventory.py`. |

## Limitaciones Conocidas

- Algunas APIs de Windows 8/10/11 no están implementadas (marcadas como stub que devuelve `STATUS_NOT_IMPLEMENTED`).
- La versión lie (KSE) puede ser necesaria para ciertas aplicaciones modernas que verifican la versión del sistema.
- Algunos comportamientos de API difieren ligeramente de Windows; esto puede causar fallos en aplicaciones que dependen de comportamientos exactos.

## Cómo Verificar la Cobertura de una API

1. Consulte `docs/nt6/CONTRATOS-NT6.md` para ver contratos documentados.
2. Ejecute los apitests en `modules/rostests/apitests/` para validar comportamiento.
3. Use `tools/nt6/inventory.py` para verificar la superficie de exports del kernel.
