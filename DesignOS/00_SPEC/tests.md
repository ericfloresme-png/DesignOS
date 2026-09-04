# DesignOS Base v0.1 — Test Specification

## 1. Convenciones

Cada Test tiene ID único, Expected, Actual, PASS/FAIL, Evidence e historial. Estados permitidos: NOT_RUN, RUNNING, PASS, FAIL, SKIPPED. Prioridades: P0 (bloqueante), P1, P2 y P3. Todo Test P0 es BLOCKING.

Tipos: FOUNDATION, UNIT, INTEGRATION, FLOW, REGRESSION, QUALITY GATE, KNOWLEDGE SYNC y TRACEABILITY.

Formato común: ID, TITLE, TYPE, STATUS, RELATED REQUIREMENTS, RELATED TASKS, RELATED MODULE, OBJECTIVE, PRECONDITIONS, INPUT, STEPS, EXPECTED RESULT, PASS CRITERIA, FAIL CRITERIA, EVIDENCE REQUIRED, REGRESSION, PRIORITY y BLOCKING.

Todos los Tests definidos aquí empiezan en NOT_RUN. La relación Task↔Test se normaliza en la matriz al final de este documento.

## 2. Tests definidos

### DOS-TEST-001 — Foundation structure
TYPE: FOUNDATION | RELATED REQUIREMENTS: DOS-R021 | RELATED TASKS: NONE | RELATED MODULE: CORE  
OBJECTIVE: Validar la estructura obligatoria del repositorio.  
PRECONDITIONS: Repositorio accesible. INPUT: raíz del repositorio. STEPS: comprobar DesignOS, AGENTS.md, 00_SPEC y sus cinco documentos, CORE, SYSTEMS, TESTS, EVIDENCE, KNOWLEDGE y DOCUMENTATION.  
EXPECTED RESULT: Todos existen y las convenciones internas son válidas. PASS CRITERIA: ninguna ausencia o nombre inválido. FAIL CRITERIA: cualquier ausencia. EVIDENCE REQUIRED: listado de rutas y log. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-002 — System lifecycle
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R001, DOS-R002 | RELATED TASKS: NONE | RELATED MODULE: SYSTEM MANAGEMENT  
OBJECTIVE: Validar crear, ID único, recuperar, actualizar, listar, historial y estructura relacionada de un System.  
PRECONDITIONS: Foundation PASS. INPUT: System válido y duplicado. STEPS: crear, repetir ID, recuperar, actualizar, listar y crear estructura.  
EXPECTED RESULT: El ID duplicado se rechaza; el System se recupera, lista, actualiza y conserva historial. PASS CRITERIA: todos los resultados esperados. FAIL CRITERIA: pérdida de identidad, historial o estructura. EVIDENCE REQUIRED: registros y consultas. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-003 — Spec revision
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R003 | RELATED TASKS: NONE | RELATED MODULE: SPEC MANAGEMENT  
OBJECTIVE: Validar crear, asociar, actualizar y consultar Specs sin perder revisiones.  
PRECONDITIONS: System existente. INPUT: Spec inicial y revisión. STEPS: crear, asociar, actualizar y consultar actual/anterior.  
EXPECTED RESULT: La Spec actual es consultable y la anterior permanece trazable. PASS CRITERIA: ambas revisiones y relación existen. FAIL CRITERIA: sobreescritura sin historial. EVIDENCE REQUIRED: snapshots y enlaces. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-004 — Requirement integrity
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R004, DOS-R005 | RELATED TASKS: NONE | RELATED MODULE: REQUIREMENTS MANAGEMENT  
OBJECTIVE: Validar ID, prioridad, estado, criterios, Spec, dependencias, historial y relaciones válidas.  
PRECONDITIONS: Spec existente. INPUT: Requirement válido, duplicado y referencia inexistente. STEPS: crear, asignar campos, relacionar y modificar.  
EXPECTED RESULT: Datos válidos se guardan; IDs duplicados y relaciones inexistentes se rechazan. PASS CRITERIA: integridad y revisión conservadas. FAIL CRITERIA: relación inválida aceptada o historial perdido. EVIDENCE REQUIRED: registros y errores. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-005 — Design traceability
TYPE: TRACEABILITY | RELATED REQUIREMENTS: DOS-R006, DOS-R016, DOS-R021 | RELATED TASKS: NONE | RELATED MODULE: DESIGN MANAGEMENT  
OBJECTIVE: Verificar Requirement → Design y que todo MUST tenga solución conceptual antes de implementación.  
PRECONDITIONS: Requirements y Design registrados. INPUT: Design completo y Requirement sin Design. STEPS: consultar ambos sentidos y validar cobertura.  
EXPECTED RESULT: Cada MUST queda cubierto o se reporta gap; no se permite avanzar con cobertura faltante. PASS CRITERIA: enlaces completos. FAIL CRITERIA: Requirement huérfano. EVIDENCE REQUIRED: matriz de cobertura. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-006 — Task readiness
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R007, DOS-R008 | RELATED TASKS: NONE | RELATED MODULE: TASK ENGINE  
OBJECTIVE: Validar Task, ID, Requirement, Module, Scope, Constraints, dependencies, Future Tests y preparación.  
PRECONDITIONS: Requirement válido. INPUT: Task completa y Task sin Requirement. STEPS: crear ambas y solicitar READY.  
EXPECTED RESULT: Solo la completa pasa a READY; la huérfana se bloquea salvo justificación explícita. PASS CRITERIA: reglas y vínculos correctos. FAIL CRITERIA: Task inválida en READY. EVIDENCE REQUIRED: Task y transición. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-007 — Context Pack completeness
TYPE: INTEGRATION | RELATED REQUIREMENTS: DOS-R009 | RELATED TASKS: NONE | RELATED MODULE: CODEX ENGINE  
OBJECTIVE: Validar System, Spec, Requirements, Task, Constraints, Relevant Files, Related Tests, Issues, Knowledge y Current Version.  
PRECONDITIONS: Task READY. INPUT: contexto completo. STEPS: construir, revisar y validar el paquete.  
EXPECTED RESULT: Todos los campos obligatorios tienen referencias correctas y el contexto es mínimo suficiente. PASS CRITERIA: validación PASS. FAIL CRITERIA: campo ausente, duplicado, excesivo o referencia incorrecta. EVIDENCE REQUIRED: Context Pack y validación. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-008 — Context Pack invalid inputs
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R009 | RELATED TASKS: NONE | RELATED MODULE: CODEX ENGINE  
OBJECTIVE: Rechazar campos ausentes, contexto duplicado/excesivo, Requirement/Task/Knowledge incorrectos y referencias rotas.  
PRECONDITIONS: Context Pack validator. INPUT: una variante inválida por caso. STEPS: validar cada variante.  
EXPECTED RESULT: Cada variante se rechaza con causa identificable y no se ejecuta Codex. PASS CRITERIA: cero ejecución inválida. FAIL CRITERIA: aceptación silenciosa. EVIDENCE REQUIRED: errores de validación. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-009 — Codex Run audit
TYPE: INTEGRATION | RELATED REQUIREMENTS: DOS-R010, DOS-R013, DOS-R020 | RELATED TASKS: NONE | RELATED MODULE: RUN ENGINE  
OBJECTIVE: Validar Run, Task, Context Pack, status, resultado, archivos, errores, Tests, Evidence y cierre.  
PRECONDITIONS: Context Pack PASS. INPUT: ejecución completada, fallida, cancelada e incompleta. STEPS: iniciar y registrar cada caso.  
EXPECTED RESULT: Cada Run tiene ID, contexto, estado correcto y datos de auditoría; estados FAILED, CANCELLED e INCOMPLETE preservan estado previo. PASS CRITERIA: cierre consistente. FAIL CRITERIA: Run huérfano o datos perdidos. EVIDENCE REQUIRED: Run records y logs. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-010 — Test engine
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R011 | RELATED TASKS: NONE | RELATED MODULE: TEST ENGINE  
OBJECTIVE: Validar crear, ejecutar, PASS, FAIL, SKIPPED, historial, affected tests, regression tests y coverage conceptual.  
PRECONDITIONS: Run registrado. INPUT: Tests con resultados variados. STEPS: registrar estados y recalcular conjuntos/historial.  
EXPECTED RESULT: Estados permitidos, historial completo, affected/regression identificables y coverage reproducible. PASS CRITERIA: cálculo y estados correctos. FAIL CRITERIA: transición o resultado ambiguo. EVIDENCE REQUIRED: resultados y cálculo. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-011 — Issue from failure
TYPE: FLOW | RELATED REQUIREMENTS: DOS-R008, DOS-R012 | RELATED TASKS: NONE | RELATED MODULE: ISSUE ENGINE  
OBJECTIVE: Validar FAIL → ISSUE → FIX TASK → RUN → RETEST PASS → RESOLVED.  
PRECONDITIONS: Test FAIL con Evidence. INPUT: Expected, Actual, Version, Run y Requirement. STEPS: crear Issue, Fix Task, ejecutar, retest y cerrar.  
EXPECTED RESULT: Issue conserva todos los vínculos y pasa OPEN → IN_PROGRESS → RESOLVED → CLOSED solo tras Retest PASS. PASS CRITERIA: flujo completo. FAIL CRITERIA: cierre sin PASS o pérdida de origen. EVIDENCE REQUIRED: Issue, Fix Task, Runs y Retest. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-012 — Evidence integrity
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R013 | RELATED TASKS: NONE | RELATED MODULE: EVIDENCE ENGINE  
OBJECTIVE: Validar ID, metadata, tipos FILE/IMAGE/LOG/REPORT/DIFF/DATA/OTHER y relaciones.  
PRECONDITIONS: Run, Test, Issue, Version y Release disponibles. INPUT: Evidence válida e inexistente. STEPS: registrar y asociar a cada entidad.  
EXPECTED RESULT: Vínculos válidos se guardan; referencias inexistentes no se aceptan silenciosamente. PASS CRITERIA: integridad completa. FAIL CRITERIA: Evidence huérfana o tipo inválido aceptado. EVIDENCE REQUIRED: registro y errores. REGRESSION: YES. PRIORITY: P1. BLOCKING: NON-BLOCKING.

### DOS-TEST-013 — Version transitions
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R014 | RELATED TASKS: NONE | RELATED MODULE: VERSION ENGINE  
OBJECTIVE: Validar campos, relaciones, historial y DRAFT → TESTING → CANDIDATE → STABLE → RELEASED.  
PRECONDITIONS: entidades vinculables. INPUT: Version completa e incompleta. STEPS: crear y solicitar transiciones válidas e inválidas.  
EXPECTED RESULT: Solo transiciones autorizadas progresan; el estado anterior queda registrado. PASS CRITERIA: máquina de estados correcta. FAIL CRITERIA: salto o promoción inválida. EVIDENCE REQUIRED: historial de estados. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-014 — Promotion rules
TYPE: QUALITY GATE | RELATED REQUIREMENTS: DOS-R015, DOS-R021 | RELATED TASKS: NONE | RELATED MODULE: VERSION/RELEASE ENGINE  
OBJECTIVE: Validar condiciones TESTING→CANDIDATE y CANDIDATE→STABLE.  
PRECONDITIONS: Version en estado previo. INPUT: scope, Tests, Issues, Evidence y trazabilidad combinados. STEPS: probar cada condición satisfecha y faltante.  
EXPECTED RESULT: Se exige scope completo, Tests obligatorios, P0 PASS, regression PASS, Issues críticos cero, Evidence y trazabilidad. PASS CRITERIA: Gate coincide con reglas. FAIL CRITERIA: promoción con condición faltante. EVIDENCE REQUIRED: checklist y decisión. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-015 — Release quality gate
TYPE: QUALITY GATE | RELATED REQUIREMENTS: DOS-R015, DOS-R021 | RELATED TASKS: NONE | RELATED MODULE: RELEASE ENGINE  
OBJECTIVE: Validar Requirements cubiertos, Tests PASS, Issues críticos cerrados, Version STABLE, Evidence, documentación y Knowledge.  
PRECONDITIONS: Version candidata o estable. INPUT: Gate completo e incompleto. STEPS: ejecutar Gate y solicitar Release.  
EXPECTED RESULT: CREATE RELEASE solo ocurre con todas las condiciones. PASS CRITERIA: Release conserva Version y Gate. FAIL CRITERIA: Release creado con incumplimiento. EVIDENCE REQUIRED: Gate report y Release. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-016 — Full traceability
TYPE: TRACEABILITY | RELATED REQUIREMENTS: DOS-R005, DOS-R016 | RELATED TASKS: NONE | RELATED MODULE: HISTORY / TRACEABILITY  
OBJECTIVE: Reconstruir hacia adelante y atrás Requirement → Design → Task → Run → Test → Evidence → Issue → Version → Release.  
PRECONDITIONS: flujo con y sin Issue. INPUT: entidades enlazadas y enlace roto. STEPS: navegar ambos sentidos y ejecutar detector.  
EXPECTED RESULT: Enlaces existentes se recorren y enlaces rotos se reportan. PASS CRITERIA: cadena completa cuando aplica. FAIL CRITERIA: enlace silenciosamente perdido. EVIDENCE REQUIRED: grafo y gap report. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-017 — Knowledge record
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R018, DOS-R019 | RELATED TASKS: NONE | RELATED MODULE: KNOWLEDGE ENGINE  
OBJECTIVE: Validar clasificación, origen, System, Run/Issue/Release cuando aplique y tipos SPEC, STANDARD, DECISION, LESSON, RELEASE, ARCHITECTURE, RULE, DOCUMENTATION y BITACORA.  
PRECONDITIONS: resultado operativo disponible. INPUT: un Knowledge record por tipo. STEPS: clasificar y validar metadata.  
EXPECTED RESULT: Cada record tiene tipo, origen y enlaces correctos. PASS CRITERIA: validación completa. FAIL CRITERIA: tipo u origen ausente. EVIDENCE REQUIRED: records y metadata. REGRESSION: YES. PRIORITY: P1. BLOCKING: NON-BLOCKING.

### DOS-TEST-018 — Curation policy
TYPE: KNOWLEDGE SYNC | RELATED REQUIREMENTS: DOS-R018, DOS-R019 | RELATED TASKS: NONE | RELATED MODULE: KNOWLEDGE ENGINE  
OBJECTIVE: Separar OPERATIVE DATA de PERSISTENT KNOWLEDGE.  
PRECONDITIONS: política de curación. INPUT: log temporal, Decision aprobada, Issue irrelevante, error recurrente corregido y Release estable. STEPS: clasificar cada caso.  
EXPECTED RESULT: Log e Issue irrelevante no se promueven; Decision, Lesson recurrente y Release estable sí pueden promoverse. PASS CRITERIA: decisiones reproducibles. FAIL CRITERIA: promoción automática incorrecta. EVIDENCE REQUIRED: clasificación y decisión. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-019 — Obsidian read
TYPE: KNOWLEDGE SYNC | RELATED REQUIREMENTS: DOS-R017 | RELATED TASKS: NONE | RELATED MODULE: OBSIDIAN CONNECTOR  
OBJECTIVE: Recuperar Standards, Decisions, Lessons, Specs, Architecture, Rules y Documentation.  
PRECONDITIONS: referencias disponibles, ausentes, múltiples, inválidas e incompletas. INPUT: consultas por relevancia. STEPS: consultar cada caso.  
EXPECTED RESULT: Se devuelven resultados válidos, ausencia explícita o error identificable; metadata incompleta no se usa silenciosamente. PASS CRITERIA: respuesta determinista. FAIL CRITERIA: referencia inválida tratada como válida. EVIDENCE REQUIRED: consulta y resultado. REGRESSION: YES. PRIORITY: P1. BLOCKING: NON-BLOCKING.

### DOS-TEST-020 — Obsidian write and round trip
TYPE: KNOWLEDGE SYNC | RELATED REQUIREMENTS: DOS-R018, DOS-R019 | RELATED TASKS: NONE | RELATED MODULE: OBSIDIAN CONNECTOR  
OBJECTIVE: Validar crear/actualizar Knowledge, preservar ID e historial, evitar duplicados y confirmar lectura posterior.  
PRECONDITIONS: Knowledge curado. INPUT: record nuevo y existente. STEPS: escribir, confirmar, leer de vuelta y validar metadata.  
EXPECTED RESULT: ROUND TRIP PASS: el record se recupera igual, sin duplicado y con historial. PASS CRITERIA: confirmación y read-back coinciden. FAIL CRITERIA: ID cambiado, duplicado o pérdida de metadata. EVIDENCE REQUIRED: write receipt y read-back. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-021 — Codex Obsidian context
TYPE: INTEGRATION | RELATED REQUIREMENTS: DOS-R009, DOS-R017 | RELATED TASKS: NONE | RELATED MODULE: CODEX/OBSIDIAN  
OBJECTIVE: Validar Task → consulta Obsidian → Knowledge relevante → Context Pack, excluyendo información irrelevante.  
PRECONDITIONS: Task y Knowledge indexado. INPUT: Knowledge relevante e irrelevante. STEPS: consultar, seleccionar y construir paquete.  
EXPECTED RESULT: Solo Knowledge relevante aparece en el Context Pack. PASS CRITERIA: selección justificada y referencias válidas. FAIL CRITERIA: contaminación o referencia rota. EVIDENCE REQUIRED: query, selección y paquete. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-022 — History preservation
TYPE: REGRESSION | RELATED REQUIREMENTS: DOS-R002, DOS-R003, DOS-R004, DOS-R010, DOS-R014, DOS-R020 | RELATED TASKS: NONE | RELATED MODULE: HISTORY / TRACEABILITY  
OBJECTIVE: Garantizar Requirement cambiado, Task corregida, Test repetido y Version promovida con estados anteriores conservados.  
PRECONDITIONS: entidades con historia. INPUT: modificaciones significativas. STEPS: modificar y consultar historial.  
EXPECTED RESULT: Cada versión anterior permanece asociada a contexto y origen. PASS CRITERIA: ninguna actualización destructiva. FAIL CRITERIA: historial sobrescrito. EVIDENCE REQUIRED: timeline. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-023 — Failure recovery
TYPE: INTEGRATION | RELATED REQUIREMENTS: DOS-R009, DOS-R010, DOS-R013, DOS-R017 | RELATED TASKS: NONE | RELATED MODULE: CORE  
OBJECTIVE: Verificar recuperación ante Run, Test Engine, almacenamiento, Evidence, Obsidian no disponible o Context Pack inválido.  
PRECONDITIONS: estado previo persistido. INPUT: fallo inducido por caso. STEPS: provocar fallo y recuperar operación.  
EXPECTED RESULT: Estado previo no se pierde; el error queda registrado y la operación no avanza falsamente. PASS CRITERIA: consistencia tras recuperación. FAIL CRITERIA: corrupción o promoción falsa. EVIDENCE REQUIRED: estado before/after y error. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-FOUNDATION-FLOW — Foundation Flow
TYPE: FLOW | RELATED REQUIREMENTS: DOS-R001–DOS-R021 | RELATED TASKS: NONE | RELATED MODULE: CORE  
OBJECTIVE: Validar el flujo madre completo: CREATE SYSTEM → REQUIREMENT → TASK → CONTEXT PACK → CODEX RUN → TEST → PASS/FAIL → ISSUE/FIX/RETEST → VERSION → KNOWLEDGE → Obsidian.  
PRECONDITIONS: Foundation PASS y contexto válido. INPUT: escenario PASS y escenario FAIL. STEPS: ejecutar ambos recorridos.  
EXPECTED RESULT: El recorrido PASS llega a Version/Knowledge; el FAIL llega a Retest y resolución antes de Release; la trazabilidad es completa. PASS CRITERIA: ambos recorridos y Evidence. FAIL CRITERIA: etapa huérfana o avance sin prueba. EVIDENCE REQUIRED: timeline completa. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

## 3. MVP Test Suite

BLOCKING: DOS-TEST-001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 011, 014, 015, 016, 018, 020, 021, 022, 023 y DOS-TEST-FOUNDATION-FLOW.

NON-BLOCKING: DOS-TEST-012, 017 y 019.

El MVP requiere todos los Tests P0 BLOCKING en PASS. Los Tests P1 son NON-BLOCKING para la primera aceptación, salvo que una decisión posterior los eleve.

## 4. Regression Suite

Después de cambios en Context Pack: 007, 008, 009, 016, 021 y Foundation Flow.  
Después de cambios en Runs: 009, 010, 011, 013, 016, 022 y Foundation Flow.  
Después de cambios en Tests: 010, 011, 014, 015, 016, 018 y Foundation Flow.  
Después de cambios en Issues: 011, 013, 014, 015, 016 y Foundation Flow.  
Después de cambios en Versions: 013, 014, 015, 016, 022 y Foundation Flow.  
Después de cambios en Obsidian Sync: 018, 019, 020, 021 y Foundation Flow.

## 5. Evidence mínima de un Test

Cada resultado conserva Test ID, fecha, Version, input relevante, Expected, Actual, status y Run relacionado cuando aplique. Según el tipo se añaden logs, diffs, archivos, reportes, registros de estado, referencias y hashes.

## 6. Requirement Coverage Matrix

| Requirement | Tests | Priority | Blocking | MVP |
|---|---|---|---|---|
| DOS-R001–R002 | 002, 022 | P0 | YES | YES |
| DOS-R003 | 003, 022, 026, 027 | P0 | YES | YES |
| DOS-R004–R005 | 004, 005, 016 | P0 | YES | YES |
| DOS-R006 | 005 | P0 | YES | YES |
| DOS-R007–R008 | 006, 011 | P0 | YES | YES |
| DOS-R009 | 007, 008, 021, 023 | P0 | YES | YES |
| DOS-R010 | 009, 022, 023 | P0 | YES | YES |
| DOS-R011 | 010, 014 | P0 | YES | YES |
| DOS-R012 | 011, 016 | P0 | YES | YES |
| DOS-R013 | 009, 012, 015, 023 | P0/P1 | YES/NON-BLOCKING | YES |
| DOS-R014 | 013, 014, 022 | P0 | YES | YES |
| DOS-R015 | 014, 015 | P0 | YES | YES |
| DOS-R016 | 005, 016, 022 | P0 | YES | YES |
| DOS-R017 | 019, 021, 023 | P0/P1 | YES/NON-BLOCKING | YES |
| DOS-R018 | 017, 018, 020 | P0/P1 | YES/NON-BLOCKING | YES |
| DOS-R019 | 018, 020, 021 | P0 | YES | YES |
| DOS-R020 | 002, 003, 004, 009, 013, 022 | P0 | YES | YES |
| DOS-R021 | 001, 005, 014, 015, 016, Foundation Flow | P0 | YES | YES |

No existe GAP de cobertura para Requirements MUST. DOS-R017, DOS-R018 y DOS-R013 tienen cobertura P1 adicional; sus criterios críticos están incluidos en Tests P0 relacionados.

## 7. Task Test Matrix

La matriz incluye Tasks MVP y las Tasks planificadas de DOS-INC-002. Cada Task deberá mapearse a Future Test, Requirement y Module; una Task sin esa relación no podrá pasar a READY.

## 8. Objective Quality Gate Tests

Las siguientes condiciones son BLOCKING: una condición no satisfecha produce FAIL y bloquea la transición. Las condiciones NON-BLOCKING solo generan observación y no permiten declarar STABLE si la documentación de la versión las marca obligatorias.

| Transition | BLOCKING conditions | NON-BLOCKING conditions |
|---|---|---|
| DRAFT → TESTING | Incremento iniciado, Tasks seleccionadas y Tests definidos | Ninguna |
| TESTING → CANDIDATE | Todas las Tasks del scope DONE; Requirements MUST implementados; Tests P0 PASS; ningún Test P0 FAIL; Issues CRITICAL abiertos = 0; trazabilidad completa | Ninguna |
| CANDIDATE → STABLE | Regression Suite PASS; Foundation Flow PASS; Critical Issues = 0; High Issues bloqueantes = 0; Evidence obligatoria; documentación actualizada; Traceability PASS | Observaciones P1/P2 no bloqueantes registradas |
| STABLE → RELEASED | Quality Gate Stable PASS; Release creado; changelog generado; Knowledge persistente preparado; Obsidian sincronizado cuando esté en scope | Sincronización Obsidian fuera del scope de la versión queda registrada como pendiente |

No se usan criterios subjetivos como “calidad suficiente”, “funciona bien” o “parece estable”.

## 9. Acceptance Criteria

### CANDIDATE

DesignOS Base v0.1 puede declararse CANDIDATE cuando todos los Requirements MUST estén implementados dentro de su Scope, Tests obligatorios hayan sido ejecutados, no exista FAIL crítico abierto, Foundation Structure PASS, trazabilidad básica disponible y Evidence de cada resultado exista.

### STABLE

Puede declararse STABLE solo con Requirements MUST implementados, todos los Tests P0 PASS, Regression Suite PASS, Critical Issues = 0, Foundation Flow PASS, Traceability PASS, Obsidian Round Trip PASS o estado compatible formalmente aprobado, Evidence completa y documentación actualizada.

## 10. Orden de ejecución

FOUNDATION → UNIT → INTEGRATION → FLOW → REGRESSION → QUALITY GATE

## 11. Gaps, contradicciones y validación final

La Task Test Matrix está completa para las 16 Tasks MVP y planificadas en tasks.md. RELATED TASKS de cada registro de Test deberá materializarse durante la implementación usando esa matriz como fuente normativa.

No se detectan GAPS de cobertura Task → Test para las Tasks MVP. Las definiciones concretas de Evidence obligatoria e Issue crítico quedan fijadas por el Quality Gate de esta sección.

## 12. Related Tasks normalizadas

| Tests | Related Tasks |
|---|---|
| DOS-TEST-001 | DOS-TASK-001 |
| DOS-TEST-002 | DOS-TASK-002 |
| DOS-TEST-003 | DOS-TASK-003 |
| DOS-TEST-004 | DOS-TASK-004 |
| DOS-TEST-005 | DOS-TASK-005 |
| DOS-TEST-006 | DOS-TASK-006 |
| DOS-TEST-007, DOS-TEST-008 | DOS-TASK-007 |
| DOS-TEST-009 | DOS-TASK-008 |
| DOS-TEST-010 | DOS-TASK-009 |
| DOS-TEST-011 | DOS-TASK-010 |
| DOS-TEST-012 | DOS-TASK-011 |
| DOS-TEST-013, DOS-TEST-014, DOS-TEST-015 | DOS-TASK-012 |
| DOS-TEST-016, DOS-TEST-022 | DOS-TASK-013 |
| DOS-TEST-017, DOS-TEST-018, DOS-TEST-019, DOS-TEST-020 | DOS-TASK-014 |
| DOS-TEST-021 | DOS-TASK-007, DOS-TASK-014 |
| DOS-TEST-023 | DOS-TASK-007, DOS-TASK-008 |
| DOS-TEST-FOUNDATION-FLOW | DOS-TASK-001, DOS-TASK-002, DOS-TASK-004, DOS-TASK-006, DOS-TASK-007, DOS-TASK-008, DOS-TASK-009, DOS-TASK-010, DOS-TASK-012, DOS-TASK-014 |
| DOS-TEST-026 | DOS-TASK-016 |
| DOS-TEST-027 | DOS-TASK-017 |

Todos los Tests de comportamiento del MVP tienen al menos una Task relacionada mediante esta matriz. No se conserva NONE para un Test de comportamiento; el vínculo de cada registro se interpreta con esta tabla normativa.

No se detectaron Requirements MUST no verificables ni contradicciones críticas. No se definen Tests de AutoCAD, Rhino, Grasshopper, V-Ray, ComfyUI ni otros sistemas arquitectónicos.

### DOS-TEST-025 — Project Bootstrap
TYPE: FOUNDATION | RELATED REQUIREMENTS: DOS-R022 | RELATED TASKS: DOS-TASK-015 | RELATED MODULE: PROJECT / EXECUTION FOUNDATION  
OBJECTIVE: Validar la foundation ejecutable reproducible.  
PRECONDITIONS: DOS-TEST-001 PASS y pnpm disponible. INPUT: package.json, pnpm-lock.yaml, tsconfig.json y smoke test. STEPS: resolver dependencias con pnpm, validar TypeScript, importar Zod, ejecutar Vitest y repetir DOS-TEST-001.  
EXPECTED RESULT: package manager, lockfile, TypeScript, Zod y Vitest funcionan; Foundation permanece válida. PASS CRITERIA: todos los pasos PASS. FAIL CRITERIA: cualquier resolución, importación, check, test o Foundation check falla. EVIDENCE REQUIRED: versiones, logs, lockfile, output y resultados. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-026 — Spec revision domain contract
TYPE: UNIT | RELATED REQUIREMENTS: DOS-R003 | RELATED TASKS: DOS-TASK-016 | RELATED MODULE: SPEC MANAGEMENT / DOMAIN CORE  
OBJECTIVE: Validar identidad estable de Spec, asociación a System, campos obligatorios, revisión inicial, incremento de revisión y rechazo de entradas inválidas.  
PRECONDITIONS: DOS-TEST-003 PASS y modelo Spec existente. INPUT: Spec inicial válida, cambios válidos y payloads inválidos. STEPS: crear Spec, validar schema, crear una revisión posterior y comprobar que el objeto de revisión anterior no cambia semánticamente.  
EXPECTED RESULT: Spec válida y revisiones válidas se aceptan; entradas inválidas se rechazan; la identidad de Spec y la asociación System permanecen. PASS CRITERIA: contrato R003 de dominio completo. FAIL CRITERIA: pérdida de identidad, revisión inválida o aceptación silenciosa de payload inválido. EVIDENCE REQUIRED: casos deterministas y resultados. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.

### DOS-TEST-027 — Spec revision persistence and History
TYPE: INTEGRATION | RELATED REQUIREMENTS: DOS-R003 | RELATED TASKS: DOS-TASK-017 | RELATED MODULE: SPEC MANAGEMENT / HISTORY / SQLITE  
OBJECTIVE: Validar persistencia de Spec, revisión actual, snapshots históricos, orden determinista y recuperación tras reabrir la base de datos.  
PRECONDITIONS: DOS-TEST-026 PASS y SQLite disponible. INPUT: Spec inicial, revisión posterior y base temporal/reabierta. STEPS: guardar inicial, guardar revisión posterior, consultar actual e History, cerrar/reabrir y consultar nuevamente.  
EXPECTED RESULT: la revisión anterior permanece semánticamente igual, la actual se identifica por número de revisión y todos los registros sobreviven a reapertura. PASS CRITERIA: persistencia y History completos. FAIL CRITERIA: snapshot sobrescrito, orden ambiguo, datos perdidos o ruptura de runs existentes. EVIDENCE REQUIRED: registros before/after, History y logs de reapertura. REGRESSION: YES. PRIORITY: P0. BLOCKING: BLOCKING.
