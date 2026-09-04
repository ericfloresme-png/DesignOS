# DOS-INC-002 — Spec Requirements Audit v0.1

## Scope

Auditoría documental limitada a la dependencia circular entre `DOS-R008` y `DOS-R012`. No se implementan funcionalidades, no se crean Tasks y no se modifican `design.md`, `tasks.md` ni `tests.md`.

## Findings

| Elemento | Resultado |
|---|---|
| `DOS-R008` | Crear Fix Tasks; depende de `DOS-R012` |
| `DOS-R012` | Gestionar Issues desde Tests FAIL; corregido para depender únicamente de `DOS-R011` |
| Edge `DOS-R008 → DOS-R012` | Prerrequisito de implementación: una Fix Task conserva un Issue de origen |
| Edge `DOS-R012 → DOS-R008` | Dependencia inválida: codificaba como prerrequisito la relación de workflow Issue → Fix Task |
| Clasificación del ciclo | Documentación de workflow expresada como dependencia invertida |
| Causa raíz | La capacidad de Issue Management para solicitar una Fix Task se confundió con la implementación de Fix Tasks |

## Correction

`DOS-R012` ahora declara `DOS-R011` como única dependencia. `DOS-R008` conserva su dependencia de `DOS-R012`.

La secuencia resultante es:

`DOS-R011 → DOS-R012 → DOS-R008`

Esto preserva el workflow `Test FAIL → Issue → Fix Task` y es coherente con el diseño modular existente: Issue Engine solicita mediante Task Service; Task Engine mantiene la responsabilidad de Fix Tasks. No se introdujo ningún ciclo de módulos.

No se modificaron criterios de aceptación, prioridad, estado, IDs ni alcance funcional. La semántica del Requirement se mantiene; únicamente se corrigió la dirección declarada de dependencia.

## Independencia y trazabilidad

- `DOS-R008` sin `DOS-R012`: no es implementable de forma válida porque debe conservar un Issue de origen.
- `DOS-R012` sin `DOS-R008`: puede representar el Issue y emitir la solicitud mediante Task Service; la creación y ciclo de la Fix Task pertenecen a `DOS-R008`.
- `DOS-TEST-011` continúa siendo el test de flujo relacionado. Su planificación detallada queda pendiente de la revalidación de DOS-INC-002.
- La trazabilidad completa del flujo seguirá usando `DOS-R011`, `DOS-R012`, `DOS-R008` y sus Tests/Evidence posteriores.

## DAG completo después de la corrección

- Requirements: 22
- Dependency edges: 62
- Direct/transitive cycles: 1 residual cycle: `DOS-R015 → DOS-R021 → DOS-R016 → DOS-R015`
- Requirement DAG: INVALID — residual cycle
- Design module cycles: 0
- Architectural contradictions introduced: 0
- Issue/Fix dependency-closed for planning recheck: YES

## Comparison with previous cycle fix

El problema es análogo al ciclo de módulos corregido previamente: una relación de workflow no debe convertirse en dependencia bidireccional de implementación. La arquitectura ya usa `TASK SERVICE` para mantener acíclica la relación entre Issue Engine y Task Engine; esta corrección alinea el Requirement DAG con esa decisión.

## Options considered

1. **Selected — eliminar `DOS-R008` de las dependencias de `DOS-R012`.** Conserva Issue antes de Fix Task y requiere el cambio mínimo.
2. Eliminar ambas dependencias. Rechazada porque permitiría planificar Fix Tasks sin un Issue de origen.
3. Dividir `DOS-R012` en nuevos Requirements. Rechazada porque ampliaría la Spec y crearía IDs no autorizados.

## Residual finding outside this remediation scope

The full graph contains an independent cycle: `DOS-R015 → DOS-R021 → DOS-R016 → DOS-R015`. It was not modified because the authorized remediation targeted only `DOS-R008 ↔ DOS-R012`. The full Requirement DAG therefore cannot be declared valid yet.

## Audit result

**AUDIT: PARTIAL — TARGETED CORRECTION PASS; FULL DAG BLOCKED**

`DOS-INC-002` queda en `PLANNING_BLOCKED` por el ciclo residual R015/R016/R021. Esta auditoría no autoriza implementación ni ejecución de Tasks.
