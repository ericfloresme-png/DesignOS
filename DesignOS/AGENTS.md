# DesignOS — instrucciones para agentes

## Propósito

DesignOS es una plataforma futura para crear, desarrollar, probar, versionar, documentar y mantener sistemas computacionales orientados a arquitectura. Esta etapa inicial construye únicamente su base.

## Metodología obligatoria

Todo desarrollo debe seguir esta secuencia:

`SPEC → REQUIREMENTS → DESIGN → TASKS → IMPLEMENTATION → TESTS → EVIDENCE → VERSION → RELEASE → KNOWLEDGE`

No se deben implementar funcionalidades que aún no estén definidas en la Spec.

## Separación de conocimiento

Obsidian será la base de conocimiento permanente y tendrá, en el futuro, sincronización bidireccional con DesignOS. DesignOS almacenará principalmente información operativa. Obsidian almacenará Specs consolidadas, arquitectura, standards, decisions, lessons learned, releases, reglas del sistema, documentación y bitácora.

## Reglas para Codex y futuros agentes

Toda modificación debe:

1. Identificar el Requirement relacionado.
2. Identificar la Task relacionada.
3. Limitar los cambios al scope de la Task.
4. Ejecutar las pruebas relacionadas.
5. Reportar los archivos modificados.
6. Registrar los fallos encontrados.
7. No declarar una tarea terminada si fallan las pruebas requeridas.

## Alcance actual

No desarrollar todavía AutoCAD, Rhino, Grasshopper, V-Ray, ComfyUI ni ningún sistema arquitectónico específico. No implementar interfaz ni funcionalidades finales hasta que estén definidas y aprobadas mediante la metodología anterior.
