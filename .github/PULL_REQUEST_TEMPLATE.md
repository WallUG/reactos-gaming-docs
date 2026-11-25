name: Pull Request Template
description: Plantilla para enviar Pull Requests a ReactOS Gaming
title: "[NT6] "
labels: ["needs-triage"]
body:
  - type: markdown
    attributes:
      value: |
        Gracias por contribuir a **ReactOS Gaming**. Antes de enviar este PR, lee la [guía de contribución](CONTRIBUTING.md).

  - type: checkboxes
    attributes:
      label: Checklist previa al envío
      options:
        - label: He leído y acepto las reglas de contribución (nombre real y correo real en git).
        - label: El cambio es un único cambio lógico (no mezclo múltiples asuntos).
        - label: He ejecutado el arnés de regresión y el smoke pasa.
        - label: He revisado el diff y no hay archivos innecesarios.
        - label: He actualizado la documentación correspondiente si aplica.
        - label: He probado en la máquina real (GT 710) si el cambio toca el núcleo o WDDM.

  - type: textarea
    attributes:
      label: Descripción del cambio
      placeholder: ¿Qué cambia este PR y por qué es necesario?
    validations:
      required: true

  - type: textarea
    attributes:
      label: Área afectada
      placeholder: Ej: drivers/wddm/dxgkrnl/dxgwddm.c, ntoskrnl/ke/i386/traphdlr.c
    validations:
      required: true

  - type: textarea
    attributes:
      label: Resultados del arnés de regresión
      placeholder: Pega la salida de `python3 tools/nt6/smoke.py` y cualquier otro test relevante.
    validations:
      required: true

  - type: textarea
    attributes:
      label: Pruebas en máquina real (si aplica)
      placeholder: Describe qué probaste en el hardware GT 710 y el resultado.

  - type: textarea
    attributes:
      label: Notas adicionales / Issues relacionados
      placeholder: Enlace a issues de JIRA, commits relacionados, etc.
