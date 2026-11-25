# Dual Kernel NT 5.2 / NT 6.x

ReactOS Gaming mantiene una integración simultánea de dos generaciones del núcleo Windows NT:

- **NT 5.2 (Windows Server 2003):** Núcleo base, estable, con soporte probado para aplicaciones y drivers de la era XP/2003.
- **NT 6.x (Windows Vista / 7+):** Capa moderna que agrega soporte para WDDM, DirectX 10/11, APIs de usuario de Vista/7 y controladores de gráficos propietarios.

## Estrategia de Integración

Ambos núcleos no se ejecutan de forma independiente; más bien, la rama expone una interfaz de sistema que puede ser consultada en modo NT 5.2 o NT 6.x según lo requiera la aplicación o el controlador.

| Aspecto | NT 5.2 | NT 6.x |
|---------|--------|--------|
| Modelo de controladores | XDDM | WDDM |
| DirectX | Hasta 9.0c | 10, 11 |
| API de usuario | Win32 clásica | Win32 + APIs de Vista/7 |
| Gestión de memoria | PAE (32-bit) | PAE + x64 (experimental) |
| WDDM | No soportado | Soportado (miniport NVIDIA) |

## Detección de Versión

Las aplicaciones consultan la versión del sistema a través de `GetVersionEx()` o `RtlGetVersion()`. El núcleo responde con la versión declarada según el contexto de ejecución:

- Aplicaciones NT 5.2 reciben `5.2.3790`.
- Aplicaciones NT 6.x reciben `6.0.6002` (o superior según configuración).

## Impacto en Controladores

Los controladores WDDM (como `nvlddmkm.sys` de NVIDIA) requieren la capa NT 6.x para inicializarse correctamente. El núcleo clasifica los controladores por su modelo esperado y los dirige a la ruta de inicialización correspondiente.

## Limitaciones Conocidas

- La migración completa a NT 6.x como núcleo primario está en curso (ver hoja de ruta 0.7.0).
- Algunas APIs de NT 6.x aún son stubs y devuelven `STATUS_NOT_IMPLEMENTED`.
- El comportamiento de version lie (KSE) puede ser necesario para ciertas aplicaciones modernas.
