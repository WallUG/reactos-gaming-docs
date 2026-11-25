# Validación de Estructuras y APIs

El arnés de regresión valida que las estructuras, offsets, tamaños y firmas de APIs de ReactOS coincidan con el contrato de Windows NT 5.2 y NT 6.0. Esta validación se realiza en tres frentes: tests de modo kernel (kmtests), validación de ABI NDIS 6 frente al WDK, y verificación de la tabla de syscalls.

## 1. Validación de Estructuras del Kernel (kmtests)

Los tests de modo kernel en `modules/rostests/kmtests/` usan `FIELD_OFFSET` y `sizeof` en tiempo de ejecución, y `C_ASSERT` en tiempo de compilación. Se ejecutan en el invitado mediante `dbgprint NT6SUITE <nombre>` y `dbgprint --process --timeout 180 "%WINDIR%\bin\kmtest.exe <nombre>"`.

### Ejemplo: `PsProcessLayout_drv.c`

Ruta: `modules/rostests/kmtests/ntos_ps/PsProcessLayout_drv.c`

Valida el layout NT 6.0 de `ETHREAD`, `EPROCESS`, `KTHREAD` y `KPROCESS`:

```c
ok_eq_int((INT)sizeof(ETHREAD), 0x2A0);
ok_eq_int((INT)sizeof(EPROCESS), 0x270);
ok_eq_int((INT)sizeof(KTHREAD), 0x1E0);
ok_eq_int((INT)sizeof(KPROCESS), 0x80);

ok_eq_int((INT)FIELD_OFFSET(KTHREAD, CycleTime), 0x10);
#ifndef _WIN64
    ok_eq_int((INT)FIELD_OFFSET(KTHREAD, HighCycleTime), 0x18);
#endif
ok_eq_int((INT)FIELD_OFFSET(KPROCESS, CycleTime), 0x78);

ok_eq_int((INT)FIELD_OFFSET(ETHREAD, KeyedWaitSemaphore), 0x214);
ok_eq_int((INT)FIELD_OFFSET(ETHREAD, ImpersonationInfo), 0x228);
ok_eq_int((INT)FIELD_OFFSET(ETHREAD, RateControlApc), 0x23C);
ok_eq_int((INT)FIELD_OFFSET(ETHREAD, SpareUlong0), 0x25C);
ok_eq_int((INT)FIELD_OFFSET(ETHREAD, GrantedAccess), 0x25C);
ok_eq_int((INT)FIELD_OFFSET(ETHREAD, AlpcWaitSemaphore), 0x280);
ok_eq_int((INT)FIELD_OFFSET(ETHREAD, ThreadName), 0x298);

ok_eq_int((INT)FIELD_OFFSET(EPROCESS, ExceptionPort), 0xE8);
ok_eq_int((INT)FIELD_OFFSET(EPROCESS, RotateInProgress), 0xFC);
ok_eq_int((INT)FIELD_OFFSET(EPROCESS, HyperSpaceLock), 0xFC);
ok_eq_int((INT)FIELD_OFFSET(EPROCESS, Cookie), 0x268);
```

### Ejemplo: `AlpcPortObject.c`

Valida layouts de estructuras ALPC mediante `C_ASSERT` en tiempo de compilación:

```c
C_ASSERT(FIELD_OFFSET(ALPC_SECURITY_ATTR, QoS) == sizeof(PVOID));
```

### Ejemplo: `KeProcessorNumber_drv.c`

Valida el contrato de numeración de procesadores:

```c
// Valida KeGetProcessorNumberFromIndex / KeGetProcessorIndexFromNumber
```

### Ejemplo: `kmtest_drv/structs.c`

Valida offsets de `IO_STACK_LOCATION`:

```c
C_ASSERT(sizeof(IO_STACK_LOCATION) == 36);
```

## 2. Validación del ABI NDIS 6 frente al WDK

La herramienta `tools/nt6/ndis6abi/ndis6abi.py` extrae definiciones de estructuras del WDK (`km/ndis.h`, `shared/ntddndis.h`), compila un objeto con `sizeof`/`__builtin_offsetof` de cada campo para ReactOS y para el WDK, para x86 y amd64 y para NDIS 6.0/6.1/6.20, y compara byte a byte.

Si difieren, imprime cuál campo difiere:

```
x86  NDIS 60 DIFIERE
   NDIS_OID_REQUEST.Oid: WDK 24, ReactOS 28
```

Y puede emitir `C_ASSERT` listos para incluir en el código:

```c
#ifdef _WIN64
C_ASSERT(FIELD_OFFSET(NDIS_OID_REQUEST, Oid) == 24);
#else
C_ASSERT(FIELD_OFFSET(NDIS_OID_REQUEST, Oid) == 28);
#endif
C_ASSERT(sizeof(NDIS_OID_REQUEST) == 128);
```

Las estructuras validadas están listadas en `fields.txt` (24 estructuras: `NDIS_LINK_STATE`, `NET_BUFFER`, `NET_BUFFER_LIST`, `NDIS_OID_REQUEST`, `NDIS_MINIPORT_DRIVER_CHARACTERISTICS`, etc.).

### Comando de ejecución

```bash
python3 tools/nt6/ndis6abi/ndis6abi.py \
  --wdk "<WDK>/Include" \
  --src /home/demox/reactos-gaming \
  --build /home/demox/build-gaming-debug \
  --rosbe /home/demox/RosBE \
  --emit-asserts /tmp/ndis6_asserts.h
```

## 3. Validación de la Tabla de Syscalls NT 5.2 / NT 6.0

`tools/nt6/inventory.py` lee `ntoskrnl/include/sysfuncs.h` (secciones `#ifndef SYSFUNCS_NT6_ONLY` y `#ifndef SYSFUNCS_NT5_ONLY`) y la compara con `ntoskrnl/sysfuncs.lst`:

- Espera 297 syscalls NT 5.2 y 22 NT 6.0.
- Detecta entradas solo en la lista (el kernel no las expone) y solo en la cabecera (no inventariadas).
- Con `--strict`, las faltas en `sysfuncs.lst` son errores.

### Comando de ejecución

```bash
python3 tools/nt6/inventory.py --check --strict
```

## 4. Catálogo de Contratos NT 5.2 → NT 6.0

El documento `docs/nt6/CONTRATOS-NT6.md` documenta los contratos verificados:

| ID | Contrato | NT 5.2 | NT 6.0 | Verificación |
|----|----------|--------|--------|--------------|
| C1 | Versión de producto | 5.2.3790.3959 | 6.0.6002.18005 | resource + serial (S1.2) |
| C2 | `OB_OPEN_METHOD` | 5 args, sin `AccessMode` | 6 args, con `AccessMode` | `nt6_contract_probe` |
| C3 | `PEB` campo 0x50 | `ReadOnlySharedMemoryHeap` | `HotpatchInformation` | `nt6_contract_probe` |
| C11 | Syscalls NT 6.0 | 297 | 22 adiciones activas | `tools/nt6/inventory.py` |

## 5. Validación de Firmas de APIs (Modo Usuario)

Los apitests en `modules/rostests/apitests/` usan `wine/test.h` (`ok()`, `ok_eq_int()`, `trace()`) y comprueban que las APIs se comporten como en Windows. Cada suite imprime:

```
<nombre>: <n> tests executed (<n> marked as todo, <n> failures), <n> skipped.
```

y `regtest.py` lo parsea con `SUMMARY_RE` (líneas 30-34 de `regtest.py`).

## 6. Detección de Crasheses y Suites Perdidas

`regtest.py` detecta:

- `CRASH_RE = r"^Unhandled exception\s*$"` + `EXCEPTION_RE` (código de excepción).
- Suites lanzadas (marcador `NT6SUITE`) que no imprimen resumen → reportadas como `missing`.
- Estancamiento del puerto serie por más de `STALL_TIMEOUT` (300 s) → mata el guest.
- Respuesta automática al prompt `kdb:>` (envía `i` = Ignore) y al paginador `Press q to abort` (envía `r`).
