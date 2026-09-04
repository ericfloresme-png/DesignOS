# DOS-INC-002 — Spec Requirements Audit 02 v0.1

## 1. Executive Summary

La auditoría analiza el ciclo `DOS-R015 → DOS-R021 → DOS-R016 → DOS-R015`. La causa es una relación de trazabilidad hacia Release expresada como prerrequisito de implementación en `DOS-R016`. Se elimina únicamente `DOS-R015` de las dependencias de `DOS-R016`. Los criterios de aceptación y el baseline liberado permanecen intactos.

## 2. Residual Cycle

- Before: `DOS-R015` depended on `DOS-R021`; `DOS-R021` depended on `DOS-R016`; `DOS-R016` depended on `DOS-R015`.
- Corrected order: `DOS-R015 → DOS-R021 → DOS-R016`.
- `DOS-R008/R012` correction remains preserved.

## 3. R015 Analysis

- ID: `DOS-R015`
- Title: Gestionar Releases
- Statement: Convertir una Version en Release solo al cumplir criterios definidos.
- Priority: MUST
- Depends on: `DOS-R013, DOS-R014, DOS-R021`
- Acceptance: solo se marca RELEASED con Tests requeridos PASS, Evidence suficiente y sin Issues bloqueantes abiertos.
- Design module: RELEASE ENGINE
- Related tests: `DOS-TEST-014, DOS-TEST-015`
- Implementation status: DEFERRED; no runtime Release Engine completo en INC-001.
- Current coverage: PARTIAL (conceptual/documental; no runtime completo).

R015 requiere un Gate de Foundation antes de permitir Release. Esto es un prerrequisito de implementación y no se modifica.

## 4. R016 Analysis

- ID: `DOS-R016`
- Title: Mantener trazabilidad
- Statement: Rastrear Requirement → Design → Task → Run → Test → Evidence → Issue → Version → Release cuando aplique.
- Priority: MUST
- Depends on: `DOS-R005, DOS-R006, DOS-R007, DOS-R010, DOS-R011, DOS-R012, DOS-R013, DOS-R014`
- Acceptance: desde cada entidad se consultan relaciones y se identifican enlaces faltantes.
- Design module: HISTORY / TRACEABILITY
- Related tests: `DOS-TEST-005, DOS-TEST-016, DOS-TEST-022`
- Implementation status: PARTIAL; no runtime completo de Traceability en INC-001.
- Current coverage: PARTIAL.

La frase “cuando aplique” permite rastrear una Release existente sin exigir que Release exista para implementar el recorrido y detector de enlaces.

## 5. R021 Analysis

- ID: `DOS-R021`
- Title: Validar Foundation
- Statement: Validar que la estructura metodológica está completa antes de permitir un Release.
- Priority: MUST
- Depends on: `DOS-R003, DOS-R004, DOS-R006, DOS-R007, DOS-R011, DOS-R013, DOS-R014, DOS-R016, DOS-R020`
- Acceptance: comprobar Spec, Requirements, Design, Tasks, Tests, Evidence, Version, Release y Knowledge; si falta un elemento obligatorio, no aprobar Release.
- Design module: CORE / RELEASE ENGINE
- Related tests: `DOS-TEST-001, DOS-TEST-005, DOS-TEST-014, DOS-TEST-015, DOS-TEST-016, DOS-TEST-FOUNDATION-FLOW`
- Implementation status: PARTIAL; Foundation estructural validada en INC-001, Gate completo no implementado.
- Current coverage: PARTIAL.

R021 necesita servicios de trazabilidad para comprobar la integridad requerida antes de Release, pero no necesita que R016 dependa de una Release futura.

## 6. Edge Classification

| Edge | Classification | Reason |
|---|---|---|
| R015 → R021 | IMPLEMENTATION_PREREQUISITE | El Release Engine debe ejecutar el Foundation Gate antes de permitir RELEASED. |
| R021 → R016 | IMPLEMENTATION_PREREQUISITE | El Foundation Gate debe consultar trazabilidad para detectar enlaces faltantes. |
| R016 → R015 | INVALID_DEPENDENCY; TRACEABILITY_RELATION | R016 puede rastrear Release “cuando aplique”; esa relación no exige Release para implementar Traceability. |

## 7. Cycle Classification

Primary classification: **F — LIFECYCLE RELATION MISREPRESENTED AS DEPENDENCY**. Secondary classification: **C — WRONG DEPENDENCY DIRECTION**.

La evidencia de Spec es la aceptación de R016 (“cuando aplique”) y el ownership separado `HISTORY / TRACEABILITY`, frente a R015 (“antes de permitir un Release”) y R021 (validación previa al Release). La relación R016→Release es navegacional/condicional, no un prerrequisito.

## 8. Independent Implementability

- ¿R015 sin R021? **NO**. Sus criterios requieren el Gate previo a RELEASED.
- ¿R016 sin R015? **YES**. Puede construir y validar enlaces de entidades existentes; Release es una relación condicional.
- ¿R021 sin R016? **NO**. Sus criterios exigen comprobar trazabilidad completa antes del Release.

## 9. Lifecycle Reconstruction

### Actual runtime / operational flow

`Evidence suficiente → Version → Traceability check → Foundation Gate → Release → Knowledge/documentation publication`

Traceability es transversal: puede registrar enlaces antes y después de que exista una Release. La publicación de Knowledge posterior no convierte Knowledge en requisito de construcción de Version; los Gates pueden requerir Knowledge/documentación disponible según el estado definido.

### Implementation dependency DAG

`R013/R014 → R016 → R021 → R015` no es la representación literal completa de todas las dependencias, pero muestra el orden corregido del subgrupo. La relación operativa `Traceability ↔ Release` no se modela como dependencia inversa.

## 10. Domain Ownership

- R015: RELEASE ENGINE.
- R016: HISTORY / TRACEABILITY.
- R021: CORE / RELEASE ENGINE (Foundation Gate).

El flujo de negocio puede tener referencias hacia atrás —por ejemplo, un Release conserva trazabilidad— sin que los módulos deban depender circularmente. El diseño existente declara dependencias modulares acíclicas.

## 11. Version / Release / Knowledge Boundaries

`VERSION EXISTS` es distinto de `VERSION RELEASED`. R015 crea/publica el Release únicamente tras el Gate; R016 navega relaciones que incluyen Release cuando existe; Knowledge curado se mantiene separado de datos operativos y su publicación no se convierte automáticamente en requisito de Version. DesignOS conserva estado operativo, Obsidian conocimiento curado, Git historial de fuente y Filesystem evidence pesada.

INC-001 aporta evidencia documental de Stable Version Record, Release Review y Release Execution, pero no demuestra cobertura runtime de Version Engine, Release Engine, Knowledge Engine ni ObsidianAdapter.

## 12. Remediation Options

### Option A — Selected

- Change: EDGE REMOVED from R016 dependencies.
- Requirements affected: R016.
- Before: R016 depended on `R005,R006,R007,R010,R011,R012,R013,R014,R015`.
- After: R016 depends on `R005,R006,R007,R010,R011,R012,R013,R014`.
- Semantic impact: preserves intent; makes Release relation conditional.
- Acceptance criteria impact: none.
- Design impact: none.
- Test impact: none; existing mapping remains valid.
- Traceability impact: none; Release remains a traversable relation.
- INC-001 baseline impact: none.
- DOS-INC-002 impact: global DAG becomes valid; planning recheck enabled.
- Risk: LOW.

### Option B

- Change: RECLASSIFIED all Release references in R016 as conceptual associations and remove the dependency.
- Risk: MEDIUM; would require broader wording changes and could alter traceability semantics.

### Option C

- Change: REQUIREMENT SPLIT for Foundation Gate and Release eligibility.
- Risk: HIGH; requires new Requirements and structural Spec change, therefore not authorized.

## 13. Selected Correction

**ROOT CAUSE:** R016 encoded a downstream/optional Release traceability relation as an implementation prerequisite.

**RECOMMENDED CHANGE:** remove only `DOS-R015` from R016 dependencies. No acceptance criterion, ID, module or test is changed.

## 14. Spec Changes

`00_SPEC/requirements.md` is the only Spec file modified. Exact dependency mutation:

- R015 BEFORE: `[DOS-R013, DOS-R014, DOS-R021]`
- R015 AFTER: `[DOS-R013, DOS-R014, DOS-R021]`
- R016 BEFORE: `[DOS-R005, DOS-R006, DOS-R007, DOS-R010, DOS-R011, DOS-R012, DOS-R013, DOS-R014, DOS-R015]`
- R016 AFTER: `[DOS-R005, DOS-R006, DOS-R007, DOS-R010, DOS-R011, DOS-R012, DOS-R013, DOS-R014]`
- R021 BEFORE: `[DOS-R003, DOS-R004, DOS-R006, DOS-R007, DOS-R011, DOS-R013, DOS-R014, DOS-R016, DOS-R020]`
- R021 AFTER: `[DOS-R003, DOS-R004, DOS-R006, DOS-R007, DOS-R011, DOS-R013, DOS-R014, DOS-R016, DOS-R020]`

## 15. Full DAG Validation

- Total Requirements: 22
- Total dependency edges: 61
- Direct cycles after: 1 (`DOS-R009 → DOS-R017 → DOS-R009`)
- Transitive cycles after: 1 (`DOS-R009 → DOS-R017 → DOS-R009`)
- Requirement DAG: INVALID — out-of-scope cycle
- R008/R012 cycle reintroduced: NO

## 16. Architecture Validation

- Design module cycles: 0
- Architectural contradictions: 0
- Version ↔ Release: coherent; Gate precedes Release.
- Version ↔ Knowledge: no implementation prerequisite introduced.
- Release ↔ Knowledge: publication/reference boundary remains explicit.

## 17. Traceability

`R015 → Release Engine → future DOS-TASK-012 → DOS-TEST-014/015`  
`R016 → History/Traceability → future DOS-TASK-013 → DOS-TEST-005/016/022`  
`R021 → Core/Release Gate → DOS-TASK-001 and future DOS-TASK-012/013 → DOS-TEST-001/005/014/015/016/Foundation Flow`

TEST TRACEABILITY: **PLANNING_REQUIRED** for future runtime execution; no Tests were created or executed.

## 18. Candidate Increment Impact

- Issue/Fix Flow dependency closed: **YES** locally; global planning remains blocked.
- Version Registration dependency closed: **YES** locally at graph/planning level; runtime Version Engine remains deferred.
- Knowledge/Obsidian dependency closed: **NO**; external adapter and Knowledge runtime remain deferred.
- DOS-INC-002 remains blocked pending R009/R017 remediation; no Task DAG is created here.

## 19. Final Decision

The minimum R015/R016/R021 correction is valid and preserves intent and acceptance criteria, but the full graph is not acyclic because of the independent R009/R017 cycle. Released baseline and product code are untouched.

**SPEC-REQUIREMENTS AUDIT 02: BLOCKED**  
**GLOBAL REQUIREMENT DAG: INVALID**  
**DOS-INC-002 STATUS: PLANNING_BLOCKED**  
**NEXT AUTHORIZED ACTION: SPEC REMEDIATION — R009/R017**
