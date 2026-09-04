# DOS-INC-002 — Spec Requirements Audit 03 v0.1

## 1. Executive Summary

La auditoría resolvió el ciclo `DOS-R009 ↔ DOS-R017` mediante dos correcciones semánticas mínimas. R009 prepara un Context Pack y consume Knowledge relevante; R017 consulta Obsidian y no necesita que exista un Context Pack. Además, R018 puede registrar Knowledge candidato sin que exista una Release. Se preservan las correcciones R008/R012 y R015/R016/R021.

## 2. Residual R009/R017 Cycle

Antes:

- R009 dependía de `R001, R003, R004, R007, R017`.
- R017 dependía de `R009, R018`.
- R018 dependía de `R003, R015`.

Estas relaciones producían tanto el ciclo directo R009↔R017 como un ciclo transitive a través de R018, R015, R013 y R010. El ciclo completo desaparece al separar consumo de Knowledge de la capacidad que consulta y al eliminar el falso prerrequisito de Release para Knowledge candidato.

## 3. R009 Analysis

- ID: `DOS-R009`
- Title: Preparar contexto para Codex
- Statement: Preparar contexto estructurado con System, Spec, Requirement, Task, Constraints, archivos relevantes, Tests y conocimiento relevante de Obsidian.
- Priority: MUST
- Rationale: el Context Pack debe ser revisable y suficiente antes de ejecutar Codex.
- Depends on: `DOS-R001, DOS-R003, DOS-R004, DOS-R007, DOS-R017`
- Acceptance Criteria: contiene todos los campos y referencias identificables y puede revisarse antes de ejecutar.
- Design module: CODEX ENGINE / Context Pack
- Related tests: `DOS-TEST-007, DOS-TEST-008, DOS-TEST-021, DOS-TEST-023`
- Implementation status: IMPLEMENTED_IN_INC_001 (contextual/documental); runtime completo diferido.
- Current coverage: PARTIAL; no se infiere cobertura runtime adicional.

## 4. R017 Analysis

- ID: `DOS-R017`
- Title: Consultar memoria Obsidian
- Statement: Consultar posteriormente conocimiento relevante desde Obsidian como memoria persistente.
- Priority: MUST
- Rationale: ofrecer referencias curadas reutilizables al contexto de ejecución.
- Depends on: `DOS-R018`
- Acceptance Criteria: el contexto de Codex admite referencias a conocimiento relevante; no se define sincronización técnica en v0.1.
- Design module: OBSIDIAN CONNECTOR / KNOWLEDGE boundary
- Related tests: `DOS-TEST-019, DOS-TEST-021, DOS-TEST-023`
- Implementation status: DEFERRED; ObsidianAdapter no fue implementado en INC-001.
- Current coverage: NONE runtime; conceptual design coverage only.

## 5. Edge Classification

### Edge A — DOS-R009 → DOS-R017

Classification: `KNOWLEDGE_DEPENDENCY`.

R009 declara conocimiento relevante de Obsidian como parte del contexto. Design define `OBSIDIAN → Relevant Knowledge → CONTEXT PACK → CODEX`. DOS-TEST-007 verifica el campo Knowledge y DOS-TEST-021 verifica la selección de Knowledge relevante. Es un consumo válido del contrato de capacidad; no implica dependencia directa de un adapter concreto.

### Edge B — DOS-R017 → DOS-R009

Classification: `INVALID_DEPENDENCY`.

R017 consulta memoria y su salida puede alimentar el Context Pack; sus criterios no requieren que R009 exista. Design separa `READ FROM OBSIDIAN` de la construcción del paquete y mantiene `OBSIDIAN CONNECTOR` como frontera futura. DOS-TEST-019 puede probar consulta, ausencia y error de referencias sin ejecutar Codex ni construir Context Pack.

### Related edge — DOS-R018 → DOS-R015

Classification: `INVALID_DEPENDENCY / CONCEPTUAL_ASSOCIATION`.

R018 menciona Releases como una categoría de conocimiento candidato, pero también menciona Specs, Decisions, Standards, Lessons y documentación. Su aceptación no exige una Release. Design asigna Knowledge Engine a CORE/HISTORY, no a VERSION o RELEASE. Por ello se elimina R015 de R018.

## 6. Cycle Classification

**CYCLE CLASSIFICATION:** F — RUNTIME RELATION MISREPRESENTED AS IMPLEMENTATION DEPENDENCY, con componente H — TRACEABILITY/KNOWLEDGE RELATION MISREPRESENTED AS PREREQUISITE.

**ROOT CAUSE:** se modelaron como prerrequisitos de implementación relaciones de consumo y publicación que pertenecen al flujo operativo: Context Pack consume Knowledge, y Knowledge puede referenciar Releases posteriormente.

## 7. Independent Implementability

- Can R009 be implemented/tested without R017? **NO**, en su contrato completo, porque el contexto incluye Knowledge relevante; puede existir un stub/port, pero no se autoriza asumirlo como implementación completa.
- Can R017 be implemented/tested without R009? **YES**. Input: referencias curadas; action: consultar; output: resultados, ausencia o error identificable.

La respuesta se basa en datos de entrada, ownership CODEX/Knowledge/Obsidian, criterios de aceptación y outputs observables, no solo en los dependency lists.

## 8. Runtime vs Implementation Flow

### Runtime / operational flow

`Knowledge candidate → Curation → Obsidian reference → Relevant Knowledge query → Context Pack → Codex`

La consulta puede ocurrir antes de construir el Context Pack; el resultado se consume después. La existencia de una Release es opcional para registrar otros tipos de Knowledge.

### Implementation DAG

`R003 → R018 → R017 → R009 → R010`

Este DAG no convierte la salida de R009 en prerrequisito de R017 ni Knowledge candidate en prerrequisito de Version/Release.

## 9. Domain / Adapter Boundaries

- R009: Execution / Application capability, owned by CODEX ENGINE.
- R017: Knowledge access capability at the Obsidian boundary.
- R018: Knowledge classification/registration.
- Core uses capability contracts; no concrete adapter dependency was introduced.
- Design remains compatible with `CORE → PORT → ADAPTER` and no module cycle was added.

## 10. Existing Coverage

INC-001 established the Foundation and bootstrap, not a runtime Context Pack engine or ObsidianAdapter. Therefore R009 is PARTIAL and R017 is NONE at runtime. Documentation and test references do not count as runtime coverage.

## 11. Testability

- R009: INPUT complete System/Spec/Requirement/Task/Constraints/files/Tests/Knowledge; ACTION build/review Context Pack; EXPECTED OUTPUT all valid references and no extraneous context.
- R017: INPUT indexed, missing, invalid and incomplete Knowledge references; ACTION query relevant memory; EXPECTED OUTPUT deterministic results, explicit absence or identifiable error.

These tests are independently observable; R017 does not need R009 execution.

## 12. Remediation Options

### Option A — Selected

- Change type: REMOVE / RECLASSIFY.
- R009 before/after: `R001,R003,R004,R007,R017` / unchanged.
- R017 before/after: `R009,R018` / `R018`.
- Semantic change: none; removes only false prerequisite.
- Acceptance criteria impact: none.
- Design impact: none.
- Test impact: none; mappings remain consistent.
- Traceability impact: none.
- DOS-INC-001 impact: none.
- DOS-INC-002 impact: global DAG can be revalidated.
- Risk: LOW.

Additionally remove `R015` from R018 because full-DAG validation exposes the related transitive cycle; R018 remains dependent on R003.

### Option B

Remove R017 from R009 and R015 from R018, then make both relationships conceptual only. Rejected because R009 must retain an explicit Knowledge capability dependency.

### Option C

Split Context Pack, Knowledge Query and Knowledge Registration into new Requirements. Rejected: structural Spec change and new IDs are not authorized.

## 13. Selected Correction

**RECOMMENDED CORRECTION:**

1. R017 dependencies: remove R009; retain R018.
2. R018 dependencies: remove R015; retain R003.
3. Keep R009 dependency on R017.

This preserves intent, acceptance criteria, runtime semantics, independent testability and Ports/Adapters boundaries.

## 14. Spec Changes

Only `00_SPEC/requirements.md` changed:

- R009 BEFORE: `[DOS-R001, DOS-R003, DOS-R004, DOS-R007, DOS-R017]`
- R009 AFTER: `[DOS-R001, DOS-R003, DOS-R004, DOS-R007, DOS-R017]`
- R017 BEFORE: `[DOS-R009, DOS-R018]`
- R017 AFTER: `[DOS-R018]`
- R018 BEFORE: `[DOS-R003, DOS-R015]`
- R018 AFTER: `[DOS-R003]`

No new Requirement, split, renumbering, acceptance-criteria change, module, Task or Test was created.

## 15. Full Requirement DAG

- Total Requirements: 22
- Total Dependency Edges: 59
- Direct Cycles: 0
- Transitive Cycles: 0
- Global Requirement DAG: VALID
- R008/R012 Fix: PRESERVED
- R015/R016/R021 Fix: PRESERVED

## 16. Architecture Validation

- Design module cycles: 0
- Architectural contradictions: 0
- CODEX Engine consumes Knowledge capability without concrete Obsidian dependency.
- Version/Release/Knowledge boundaries remain coherent.

## 17. Traceability

- R009 → CODEX ENGINE → future DOS-TASK-007 → DOS-TEST-007, 008, 021, 023.
- R017 → OBSIDIAN CONNECTOR → future DOS-TASK-014 → DOS-TEST-019, 021, 023.

TEST TRACEABILITY: `PLANNING_REQUIRED`; current references are not contradictory.

## 18. Candidate Option Readiness

- Issue/Fix Flow dependency closed: **YES**.
- Version Registration dependency closed: **YES** at graph/planning level; runtime remains deferred.
- Knowledge/Obsidian dependency closed: **NO** for runtime execution; graph is valid but adapter/runtime work remains deferred.

## 19. Final Decision

The minimum valid Spec correction is complete. Runtime semantics and acceptance criteria are preserved, all previous fixes remain intact, and the full Requirement DAG is acyclic. Product code and the released baseline were not modified.

**SPEC-REQUIREMENTS AUDIT 03: PASS**  
**GLOBAL REQUIREMENT DAG: VALID**  
**DOS-INC-002 STATUS: READY_FOR_PLANNING_RECHECK**  
**NEXT AUTHORIZED ACTION: DOS-INC-002 TARGETED PLANNING RECHECK**
