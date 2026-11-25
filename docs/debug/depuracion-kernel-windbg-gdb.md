# Depuración con WinDbg y GDB

Esta página documenta las técnicas de depuración avanzada para el núcleo de ReactOS Gaming, incluyendo WinDbg, GDB, PuTTY, puertos serie en QEMU/VirtualBox y análisis de backtraces y BSOD.

## Depuración por Puerto Serie (KDB)

ReactOS Gaming utiliza el puerto serie como canal principal de diagnóstico en el hardware real y en QEMU.

### Configuración de Arranque con Depuración

En `freeldr.ini` o en la línea de arranque del kernel:

```
DEBUG DEBUGPORT=COM1 BAUDRATE=115200 SOS
```

### Herramientas de Lectura del Puerto Serie

| Herramienta | Uso | Detalle |
|-------------|-----|---------|
| PuTTY | Lectura del puerto serie en Windows | Configurar COM1 a 115200 baudios. |
| MobaXterm | Lectura del puerto serie en Windows | Captura de logs con timestamp (ej. `MobaXterm_COM9...txt`). |
| screen / minicom | Lectura del puerto serie en Linux | `screen /dev/ttyUSB0 115200`. |
| cat /dev/ttyS0 | Lectura directa en Linux | `cat /dev/ttyS0` (requiere permisos). |

### Depurador del Kernel (KDB)

Cuando el kernel encuentra un error crítico, entra en el depurador KDB con el prompt `kdb:>`.

| Comando | Descripción |
|---------|-------------|
| `bt` | Muestra el backtrace (rastro de pila). |
| `cont` | Continúa la ejecución. |
| `i` | Ignore (responde a consultas del depurador). |
| `o` / `bt` / `g` | Respuestas al paginador del depurador. |

El arnés `regtest.py` responde automáticamente al prompt `kdb:>` (envía `i` = Ignore) y al paginador `Press q to abort` (envía `r`).

## Depuración con WinDbg

WinDbg es el depurador de kernel de Microsoft. Puede conectarse a ReactOS mediante el puerto serie o una conexión virtual.

### Configuración de Conexión

| Parámetro | Valor |
|-----------|-------|
| Puerto | COM1 (o COM2 según configuración) |
| Baudrate | 115200 |
| Paridad | Ninguna |
| Bits de datos | 8 |
| Bits de parada | 1 |
| Control de flujo | Ninguno |

### Comandos Comunes en WinDbg

| Comando | Descripción |
|---------|-------------|
| `k` | Muestra el backtrace del hilo actual. |
| `kn` | Muestra el backtrace con números de frame. |
| `kv` | Muestra el backtrace con información de parámetros. |
| `r` | Muestra los registros del procesador. |
| `dt <tipo>` | Muestra los campos de una estructura (ej. `dt nt!_ETHREAD`). |
| `!process` | Muestra información de procesos. |
| `!thread` | Muestra información de hilos. |
| `!irql` | Muestra el IRQL actual. |
| `!locks` | Muestra los bloques activos. |

## Depuración con GDB

GDB puede conectarse a QEMU mediante un servidor GDB incorporado.

### Configuración de QEMU con GDB

```bash
qemu-system-i386 -s -S -cdrom <ruta-a-tu-iso> ...
```

- `-s`: Equivalente a `-gdb tcp::1234` (puerto 1234).
- `-S`: Arranca en pausa, esperando a que GDB se conecte.

### Comandos Comunes en GDB

| Comando | Descripción |
|---------|-------------|
| `target remote :1234` | Conecta al servidor GDB de QEMU. |
| `break <funcion>` | Establece un punto de interrupción. |
| `continue` | Continúa la ejecución. |
| `backtrace` / `bt` | Muestra el rastro de pila. |
| `info registers` | Muestra los registros del procesador. |
| `x/<tipo><tamano><direccion>` | Examina memoria en una dirección. |

## Análisis de Backtraces y BSOD

Cuando ocurre un bugcheck (pantalla azul de la muerte), ReactOS imprime información crítica por el puerto serie.

### Parámetros del Bugcheck

ReactOS pasa al bugcheck (`ntoskrnl/ke/i386/exp.c`):

| Parámetro | Descripción |
|-----------|-------------|
| `[0]` | Código del bugcheck (ej. 0x7E). |
| `[1]` | Código de la excepción (ej. 0xC0000005). |
| `[2]` | EIP real (dirección de la instrucción fallida). |
| `[3]` | Puntero al trap frame. |

**Error frecuente:** la guarda del volcado tiene que mirar `[1]`, no `[0]`.

### Volcado de Registros

Los registros los captura `KiTrap0EHandler` (`ntoskrnl/ke/i386/traphdlr.c`) sin imprimir nada. Se capturan en el trap y no en el bugcheck porque un fallo sobre una dirección no mapeada lo bugchequea el gestor de memoria por su cuenta (0x50) sin pasar por la excepción (0x7E).

El volcado está en `ntoskrnl/ke/bug.c`, en la rama que imprime `"*** Fatal System Error"`:

```
DxgKrnl-dbg: EIP 0x...  CR2 0x...  ErrCode 0x...
DxgKrnl-dbg: EAX 0x...  EBX 0x...  ECX 0x...  EDX 0x...  ESP 0x...
```

### Errores Frecuentes en el Log

| Error | Significado | Acción |
|-------|-------------|--------|
| `0x50` | Page fault (dirección no mapeada) | Revisar CR2 y el contexto de acceso. |
| `0x7E` | Excepción del sistema (0xC0000005, etc.) | Revisar `[1]` del bugcheck, no `[0]`. |
| `0xC0000005` | Violación de acceso | Revisar punteros nulos o direcciones inválidas. |
| `0xC000000D` | Parámetro inválido | Revisar argumentos pasados a DDIs del miniport. |
| `0xC00000E8` | Buffer de usuario inválido | Revisar `DxgkDdiRender` y la copia de comandos. |

## Depuración de la GPU NVIDIA (nvlddmkm.sys)

Para depurar el miniport propietario de NVIDIA:

1. El driver se carga en `AE7C1000` (o similar, ver log de arranque).
2. Los RVAs del desensamblado se suman a `0x10000` (ImageBase) para obtener direcciones virtuales.
3. Los RVAs del crash del log son RVAs reales.
4. El desensamblado completo está en `/tmp/opencode/nv365.asm` (1.7M líneas) o se puede leer con `tools/nt6/pe.py`.
5. Las etiquetas de `nv.dis` son RVA + 0x10000.

### Herramienta `pe.py`

```bash
python3 tools/nt6/pe.py --help
```

Permite leer el driver del repositorio, desensamblar con capstone, y encontrar destinos de salto y llamada correctamente.

## Limitaciones Conocidas

- El `kdb` por serie no funciona en la máquina real si el `freeldr.sys` del USB no pide `kdvbox.dll`.
- La consola del kernel se silencia cuando el depurador toma el control.
- Un `DPRINT1` antes del bugcheck no llega al puerto serie.
- No hay símbolos públicos para `nvlddmkm.sys`; el análisis se hace por desensamblado.

## Comandos Útiles para Depuración Rápida

```bash
# Ver el log serie completo
cat /dev/ttyUSB0

# Buscar errores críticos en el log
grep -i "Fatal System Error\|KeBugCheck\|Assertion failed\|0xc00000e8" /mnt/c/Users/garci/Downloads/MobaXterm_*.txt

# Buscar la carga del driver NVIDIA
grep "nvlddmkm.sys" /mnt/c/Users/garci/Downloads/MobaXterm_*.txt

# Buscar el modelo de GPU y DriverModel
grep "DriverModel\|GT 710\|10de:128b" /mnt/c/Users/garci/Downloads/MobaXterm_*.txt
```
