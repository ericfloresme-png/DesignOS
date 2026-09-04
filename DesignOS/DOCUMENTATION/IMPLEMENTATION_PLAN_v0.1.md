# Implementation Plan v0.1 — DOS-INC-001

## Executive Summary

DOS-INC-001, DesignOS Foundation, será el incremento mínimo y testeable para demostrar:

CREATE SYSTEM → CREATE REQUIREMENT → CREATE TASK → CREATE TEST DEFINITION → VALIDATE DATA → PERSIST MINIMUM STATE → READ STATE → RUN TEST SUITE

No ejecutará Codex desde DesignOS ni sincronizará Obsidian. Esas capacidades quedan preparadas para incrementos posteriores.

## Increment Definition

**ID:** DOS-INC-001  
**NAME:** DESIGNOS FOUNDATION  
**SCOPE:** Domain Core mínimo, validación runtime, repositories, persistencia SQLite mínima, servicios de aplicación y suite automatizada.  
**STATUS TARGET:** TESTING  
**OUT OF SCOPE:** UI completa, CodexAdapter runtime, ObsidianAdapter runtime, GitAdapter completo, Evidence Engine completo, Version Engine completo y Release Engine.

## Requirements Covered

DOS-R001, DOS-R002, DOS-R004, DOS-R005, DOS-R007, DOS-R011 y parcialmente DOS-R003, DOS-R016 y DOS-R021 mediante las entidades y validaciones mínimas. Los Requirements de Run, Evidence, Version, Release, Knowledge y sincronización permanecen diferidos salvo sus contratos futuros.

## Final Task Set

| Task | Requirement | Module | Dependencies | Tests | Increment | Included |
|---|---|---|---|---|---|---|
| DOS-TASK-001 | DOS-R021 | CORE | Ninguna | DOS-TEST-001 | 001 | YES |
| DOS-TASK-002 | DOS-R001–R002 | SYSTEM MANAGEMENT | 001 | DOS-TEST-002 | 001 | YES |
| DOS-TASK-003 | DOS-R003 | SPEC MANAGEMENT | 002 | DOS-TEST-003 | 001 | YES |
| DOS-TASK-004 | DOS-R004–R005 | REQUIREMENTS MANAGEMENT | 003 | DOS-TEST-004 | 001 | YES |
| DOS-TASK-005 | DOS-R006, DOS-R016 | DESIGN MANAGEMENT | 004 | DOS-TEST-005 | 001 | YES |
| DOS-TASK-006 | DOS-R007 | TASK ENGINE | 005 | DOS-TEST-006 | 001 | YES |
| DOS-TASK-008 | DOS-R010, DOS-R020 | RUN ENGINE | 007 | DOS-TEST-009 (registro mínimo) | 001 | YES |
| DOS-TASK-009 | DOS-R011 | TEST ENGINE | 008 | DOS-TEST-010 | 001 | YES |

El número de Tasks no es criterio de aceptación. El Final Task Set es dependency-closed e incluye las dependencias necesarias para alcanzar DOS-TASK-009. DOS-TASK-008 se limita al registro mínimo para probar persistencia y lectura; no ejecuta Codex.

### Tasks selected after dependency closure

DOS-TASK-001, DOS-TASK-002, DOS-TASK-003, DOS-TASK-004, DOS-TASK-005, DOS-TASK-006, DOS-TASK-008 y DOS-TASK-009.

DOS-TASK-003 define Spec mínima necesaria para asociar Requirements. DOS-TASK-005 documenta el Design traceable mínimo. DOS-TASK-008 solo registra el Run mínimo para soportar persistencia; no ejecuta Codex. DOS-TASK-007, 010, 011, 012, 013 y 014 se difieren.

## Tasks Deferred

| Tasks | Future increment |
|---|---|
| DOS-TASK-007 | DOS-INC-002 — Context Pack |
| DOS-TASK-010 | DOS-INC-003 — Issue/Fix Flow |
| DOS-TASK-011 | DOS-INC-004 — Evidence |
| DOS-TASK-012 | DOS-INC-004 — Version/Quality Gate |
| DOS-TASK-013 | DOS-INC-004 — Traceability completa |
| DOS-TASK-014 | DOS-INC-006 — Knowledge/Obsidian Round Trip |

## Domain Scope

Entidades implementadas inicialmente: SYSTEM, SPEC, REQUIREMENT, DESIGN, TASK y TEST definition. La prioridad operativa es System, Requirement, Task y Test; Spec y Design se mantienen como soporte mínimo de relaciones.

### Zod schemas y tipos

- SystemSchema / System: ID, name, description, status y timestamps. Invariants: ID y name obligatorios y únicos.
- RequirementSchema / Requirement: ID, title, description, priority, status, acceptanceCriteria, dependencies, specId y timestamps. Invariants: ID único, Spec existente y prioridades/estados permitidos.
- TaskSchema / Task: ID, status, priority, requirementIds, module, objective, scope, outOfScope, dependencies, expectedOutput, futureTests y definitionOfDone. Invariants: Requirement relacionado y READY solo con campos completos.
- TestSchema / Test: ID, title, type, status, requirementIds, taskIds, objective, preconditions, input, steps, expectedResult, passCriteria, failCriteria, evidenceRequired, regression y priority. Invariants: ID único, Requirement y Task válidos cuando sea comportamiento.

Repository needs: create, get, list, update y existence checks para cada entidad. Domain Core no conoce SQLite.

## Persistence Scope

SQLite mínimo con tablas: systems, specs, requirements, designs, tasks y tests. Para DOS-INC-001 se requieren como mínimo systems, requirements, tasks y tests; specs y designs soportan las foreign keys y trazabilidad inicial.

Relaciones: System 1:N Spec; Spec 1:N Requirement; Requirement N:M Task; Requirement N:M Test; Task N:M Test; System 1:N Task y Test. No se crean tablas de Runs, Evidence, Issues, Versions, Releases o Knowledge en este incremento.

## Repository Boundary

Ports: SystemRepository, RequirementRepository, TaskRepository y TestRepository. Un SpecRepository mínimo puede añadirse solo para satisfacer la relación Requirement→Spec. Adapters SQLite implementan los ports; los servicios y el dominio dependen de interfaces.

## Application Services

CreateSystem, ReadSystem, ListSystems, UpdateSystem, CreateRequirement, CreateTask y CreateTest. Cada servicio valida entrada con Zod, aplica invariants de dominio, persiste por port y devuelve entidad o error explícito. No se añade una capa de servicios para capacidades diferidas.

## Electron Boundary

DOS-INC-001 prioriza Core y Tests sin UI. La estructura futura reserva:

- MAIN: SQLite, filesystem y adapters.
- PRELOAD: IPC allowlist segura.
- RENDERER: React sin acceso directo a Node.js.

La shell Electron mínima y UI opcional se difieren hasta demostrar el Core en tests. No se permite Node.js directo en renderer.

## Testing Plan

### Test-first sequence

Para cada Task: Test identificado → Expected Failure → implementación futura → PASS. En este documento no se ejecutan Tests.

### Required P0 Test Set

| Test | Purpose | Tool | Blocking |
|---|---|---|---|
| DOS-TEST-001 | Foundation structure | Vitest/command check | YES |
| DOS-TEST-002 | System lifecycle | Vitest unit/integration | YES |
| DOS-TEST-003 | Spec revision | Vitest integration | YES |
| DOS-TEST-004 | Requirement integrity | Vitest unit/integration | YES |
| DOS-TEST-005 | Design traceability | Vitest integration | YES |
| DOS-TEST-006 | Task readiness | Vitest unit/integration | YES |
| DOS-TEST-010 | Test engine states/history | Vitest unit/integration | YES |

P0 TEST SET = DOS-TEST-001, 002, 003, 004, 005, 006, 009 y 010. DOS-TEST-FOUNDATION-FLOW se difiere porque requiere Version y Knowledge fuera del scope mínimo.

## File Plan

### CREATE

src/core/domain/system.ts, requirement.ts, task.ts, test.ts  
src/core/validation/system.schema.ts, requirement.schema.ts, task.schema.ts, test.schema.ts  
src/core/ports/system.repository.ts, requirement.repository.ts, task.repository.ts, test.repository.ts  
src/application/create-system.ts, create-requirement.ts, create-task.ts, create-test.ts  
src/storage/sqlite/migrations/001-foundation.sql  
src/storage/sqlite/repositories/  
tests/unit/  
tests/integration/

### MODIFY

package.json y configuración de TypeScript/Test solo después de autorización explícita de implementación. En este plan no se modifican.

### DO NOT TOUCH

00_SPEC/requirements.md, 00_SPEC/design.md, 00_SPEC/tasks.md, 00_SPEC/tests.md, AGENTS.md, SSD_AUDIT_v0.1.md, SSD_REAUDIT_v0.1.md y TECH_STACK_DECISION_v0.1.md.

No se crean archivos en esta fase.

## Package Plan

RUNTIME: electron, react, react-dom, typescript, zod y una librería SQLite compatible con el adapter decidido durante el bootstrap.

DEV: vitest, playwright, typescript tooling y utilidades de build.

### SQLite implementation decision

**SQLITE IMPLEMENTATION:** better-sqlite3.

Comparación: node:sqlite reduce dependencias, pero su documentación actual lo clasifica como Release Candidate; sqlite3 es maduro y asíncrono, pero añade complejidad de callbacks/promesas; better-sqlite3 ofrece API síncrona, transacciones directas, ergonomía TypeScript y buen ajuste para un Core local de baja concurrencia. La decisión acepta la dependencia nativa y el rebuild para la ABI de Electron.

**RATIONALE:** maximiza simplicidad del MVP, testing determinista y experiencia Codex manteniendo SQLite detrás de OperationalStorageAdapter.

**RISKS:** incompatibilidad de ABI, build nativo y packaging Windows.

**MITIGATIONS:** fijar versión compatible con Electron, ejecutar electron-rebuild durante el build, probar Windows empaquetado y mantener el port de repositories independiente.

**ELECTRON BUILD IMPACT:** better-sqlite3 debe compilarse/reconstruirse contra la versión de Electron y distribuir su native module correctamente.

**TEST IMPACT:** tests de repository con base temporal, transacciones commit/rollback y smoke test del módulo cargado por Electron.

**MIGRATION IMPACT:** migrations SQL versionadas; el adapter no expone detalles SQLite al Domain Core.

Fuentes: [Node.js SQLite](https://nodejs.org/api/sqlite.html), [Electron Native Node Modules](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules), [better-sqlite3 troubleshooting](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/troubleshooting.md).

## ADR-013 — SQLite Implementation

**STATUS:** ACCEPTED

**CONTEXT:** DesignOS necesita Operational Database local, relacional, portable y testeable dentro de Electron en Windows.

**OPTIONS:** node:sqlite, better-sqlite3, sqlite3.

**DECISION:** better-sqlite3 detrás de OperationalStorageAdapter.

**CONSEQUENCES:** API síncrona y transacciones sencillas; se añade un native module y una etapa de rebuild/packaging.

**RISKS:** ABI de Electron, toolchain nativa Windows y errores de empaquetado.

**MITIGATIONS:** versión fijada, electron-rebuild, smoke tests empaquetados y adapters aislados.

## Implementation Order

1. Project bootstrap y configuración mínima.
2. Testing bootstrap.
3. Zod schemas.
4. Domain types e invariants.
5. Repository ports.
6. SQLite migration y adapter foundation.
7. System services.
8. Spec/Requirement services.
9. Design traceability mínima.
10. Task service y readiness.
11. Test definition service.
12. Integration tests de persistencia y lectura.
13. Regression de Foundation.
14. Evidence de implementación y changelog.
15. Version posterior en estado TESTING.

## Task Execution Packets

Cada paquete futuro debe contener:

TASK ID; OBJECTIVE; RELATED REQUIREMENTS; RELATED TESTS; FILES TO CREATE; FILES ALLOWED TO MODIFY; FILES FORBIDDEN; COMMANDS TO RUN; DEFINITION OF DONE.

Packets de DOS-INC-001:

- TASK-001: Foundation; Test 001; crear solo estructura/verificación; ejecutar check.
- TASK-002: System; R001/R002; Test 002; schema, port, repository y servicio.
- TASK-003: Spec mínima; R003; Test 003; schema y persistencia de revisión.
- TASK-004: Requirement; R004/R005; Test 004; validación y relaciones.
- TASK-005: Design traceability; R006/R016; Test 005; enlaces Requirement→Design.
- TASK-006: Task readiness; R007; Test 006; schema, estado y servicio.
- TASK-009: Test definition; R011; Test 010; schema, estado e historial mínimo.

## Evidence Plan

Destino: EVIDENCE/DOS-INC-001/. Conservar test output, diff, lista de archivos modificados, coverage cuando aplique y evidencia de migration SQLite. Screenshots no son necesarios sin UI.

## Version Plan

Versión posterior: DesignOS v0.1.0-foundation, estado TESTING. No podrá marcarse CANDIDATE, STABLE o RELEASED sin Quality Gate.

Changelog futuro: Added, Changed, Fixed, Tests y Known Issues.

### RELEASE EVIDENCE IMMUTABILITY POLICY

La Release baseline inmutable de una versión está compuesta por el source baseline validado, Tests, Spec, documentación aprobada previa a Release Execution, manifests y lockfile, build policy, CHANGELOG, Version Record, documentos de Quality Gate/Candidate/Stable/Release Review y sus Evidence pre-release.

La identidad autoritativa de Release es `RELEASE COMMIT HASH + ANNOTATED RELEASE TAG`. Los documentos `DOS_INC_001_RELEASE_EXECUTION_v0.1.md` y `EVIDENCE/DOS-INC-001/RELEASE_EXECUTION_v0.1.md` son registros operativos post-release y no forman parte del commit/tag que documentan. Pueden registrar el hash, tag y validación posterior sin crear un ciclo autorreferencial.

El tag es inmutable y no se mueve para incorporar Evidence operacional. Si esos registros se versionan, cualquier commit posterior es documentación post-release y no modifica el Release baseline ni el tag.

## Future Increments

DOS-INC-002: Context Pack + Run.  
DOS-INC-003: Test + Issue Flow.  
DOS-INC-004: Evidence + Version.  
DOS-INC-005: CodexAdapter.  
DOS-INC-006: Obsidian Knowledge Round Trip.  
DOS-INC-007: Release Engine.  
DOS-INC-008: Foundation UI Expansion.

## Critical Path and Parallel Tasks

Critical path:

001 → 002 → 003 → 004 → 005 → 006 → 007 → 008 → 009

Tasks 002 y 003 pueden iniciar después de 001 y ejecutarse en paralelo si la relación Spec se mantiene como contrato. Task 005 requiere 004. Task 007 queda fuera del incremento y por eso DOS-TASK-008 será implementada solo como registro mínimo tras un bootstrap de persistencia, sin ejecutar Codex. Las Tasks 010, 011, 012, 013 y 014 son futuras.

## Stop Conditions

Detener implementación si un Test P0 contradice Requirement; una Task requiere salir de Scope; SQLite contradice Domain Design; Electron rompe Security Boundary; una Task deja de ser implementable; aparece un ciclo; o se requiere modificar Spec. Flujo: STOP → REPORT → REVIEW SPEC.

## Definition of Done

DOS-INC-001 termina cuando las Tasks seleccionadas están DONE, Requirements relacionados están implementados, Tests P0 seleccionados PASS, Integration Tests PASS, Regression PASS, Circular Dependencies = 0, Domain validation PASS, persistencia/lectura mínima PASS, Evidence registrada, changelog actualizado, Version creada en TESTING y trazabilidad Requirement → Task → Test disponible.

## Implementation Readiness

| Área | Estado |
|---|---|
| Tasks selected | READY |
| Dependencies | READY |
| Tests | READY |
| File plan | READY |
| Package plan | NEEDS_FIX |
| SQLite plan | READY FOR TECHNICAL TASK |
| Electron boundary | READY |
| Test strategy | READY |
| Evidence | READY |
| Version plan | READY |

La librería SQLite está seleccionada. El plan usa el cierre real de dependencias; el registro mínimo de Run de DOS-TASK-008 no implica ejecutar Codex.

## GO / NO-GO

**GO FOR DOS-INC-001 IMPLEMENTATION.**

Las decisiones del plan están cerradas. El siguiente paso autorizado es DOS-INC-001 IMPLEMENTATION — FIRST TASK ONLY. No se escribió código, no se instalaron paquetes y no se creó package.json.

## Execution Packet — DOS-TASK-002

**TASK ID:** DOS-TASK-002  
**TITLE:** Definir modelo System  
**RELATED REQUIREMENTS:** DOS-R001, DOS-R002  
**RELATED MODULE:** SYSTEM MANAGEMENT / DOMAIN CORE  
**OBJECTIVE:** Definir el modelo mínimo de System con identidad, campos obligatorios, estado y reglas de consulta/actualización/historial.  
**SCOPE:** Schema Zod, TypeScript type, invariants del modelo y prueba unitaria del ciclo de identidad.  
**OUT OF SCOPE:** SQLite, repositories, Electron, React, Codex, Obsidian, Git, Projects detallado y otras entidades.  
**DEPENDENCIES:** DOS-TASK-001 DONE.  
**EXPECTED OUTPUT:** System válido aceptado; ID y nombre obligatorios; datos inválidos rechazados; identidad estable durante actualización.  
**RELATED TESTS:** DOS-TEST-002.  

### Files to Create

- src/core/system/system.schema.ts
- src/core/system/system.types.ts
- src/core/system/system.ts
- tests/unit/system.test.ts

### Files Allowed to Modify

- Ninguno. La Task es autocontenida.

### Files Forbidden

00_SPEC/; DOCUMENTATION/; EVIDENCE/; Obsidian Adapter; Codex Adapter; SQLite Adapter; Electron main/preload/renderer; React UI; Version Engine; Issue Engine; Evidence Engine; Release Engine; repositories; package.json; otras entidades futuras.

### Packages Required

- Runtime: zod.
- Dev: vitest.
- No instalar paquetes durante esta fase.

### Commands to Run

- vitest run tests/unit/system.test.ts
- .\\DesignOS\\TESTS\\check_structure.ps1

### Evidence Required

Task ID, Requirements, archivos creados/modificados, paquetes instalados, comandos, resultados, errores, warnings, diff summary y notas. Destino: EVIDENCE/DOS-INC-001/DOS-TASK-002_RESULT.md.

### Definition of Done

DOS-TEST-002 PASS; SystemSchema acepta datos válidos y rechaza inválidos con error explícito; ID permanece estable; no se modifican archivos fuera de Allowed; evidencia completa registrada.

## Execution Packet — DOS-TASK-003

**TASK ID:** DOS-TASK-003  
**TITLE:** Definir modelo Spec  
**RELATED REQUIREMENTS:** DOS-R003  
**RELATED TESTS:** DOS-TEST-003  
**RELATED MODULE:** SPEC MANAGEMENT / DOMAIN CORE  
**OBJECTIVE:** Definir una Spec asociada a un System, con revisión versionable, consulta de la revisión actual y conservación del historial anterior.  
**SCOPE:** Schema Zod, TypeScript type, invariants de Spec y prueba unitaria de creación, asociación y revisión. La relación única permitida es Spec → System mediante systemId.  
**OUT OF SCOPE:** Modificación de System, Requirements, Design, SQLite, repositories, application services, Electron, React, Codex, Obsidian, Git y entidades futuras.  
**DEPENDENCIES:** DOS-TASK-002 DONE.  
**EXPECTED OUTPUT:** Spec válida aceptada con System existente y revisión; Spec inválida rechazada; actualización conserva la revisión anterior y permite consultar la actual.  
**DEFINITION OF DONE:** DOS-TEST-003 PASS; TypeScript check PASS; regresiones DOS-TEST-002, DOS-TEST-025 y DOS-TEST-001 PASS; Scope Leaks = 0; Architecture Violations = 0; evidencia registrada.

### Files To Create

- src/core/spec/spec.schema.ts
- src/core/spec/spec.types.ts
- src/core/spec/spec.ts
- tests/unit/spec.test.ts

### Files Allowed To Modify

- Ninguno. La Task debe ser autocontenida y no requiere modificar el modelo System ni archivos de configuración.

### Files Forbidden

00_SPEC/; DOCUMENTATION/; package.json; pnpm-lock.yaml; tsconfig.json; src/core/system/*; SQLite adapters; repositories; application services; Electron main/preload/renderer; React UI; CodexAdapter; ObsidianAdapter; GitAdapter; Evidence Engine; Issue Engine; Version Engine; Release Engine; otras entidades futuras.

### Packages Required

- Runtime: zod — ALREADY AVAILABLE.
- Dev: vitest — ALREADY AVAILABLE.
- TypeScript — ALREADY AVAILABLE.
- Packages to install: NONE.

### Test Boundary

**TEST FILE:** tests/unit/spec.test.ts  
**TEST COMMAND:** vitest run tests/unit/spec.test.ts  
**EXPECTED INITIAL FAILURE:** el módulo Spec no existe antes de la implementación.  
**PASS CRITERIA:** Spec válida con systemId, título, contenido, estado y revisión pasa; revisión anterior permanece consultable; datos inválidos y System inexistente se rechazan explícitamente.  
**FAIL CRITERIA:** pérdida de historial, relación inválida aceptada o validación silenciosa.  
**REGRESSION TESTS:** vitest run tests/unit/system.test.ts; vitest run tests/smoke/bootstrap.test.ts; TESTS/check_structure.ps1.

### Evidence Required

EVIDENCE/DOS-INC-001/DOS-TASK-003_RESULT.md con Task, Requirement, Test, archivos, Test-first result, implementación, Tests, TypeScript, regresiones, errores, warnings, Scope, Architecture y Definition of Done.

## Execution Packet — DOS-TASK-004

**TASK ID:** DOS-TASK-004  
**TITLE:** Definir modelo Requirement  
**PRIORITY:** P0  
**RELATED REQUIREMENTS:** DOS-R004, DOS-R005  
**RELATED TESTS:** DOS-TEST-004  
**RELATED MODULE:** REQUIREMENTS MANAGEMENT / DOMAIN CORE  
**ARCHITECTURAL LAYER:** Domain Core  
**OBJECTIVE:** Definir el modelo mínimo de Requirement con identidad, prioridad, estado, criterios, relación con una Spec, dependencias y relaciones válidas conforme a DOS-R004, DOS-R005 y DOS-TEST-004.  
**SCOPE:** Schema Zod, TypeScript type, invariants documentados, validación/creación mínima, representación de dependencias y prueba unitaria de integridad. Las dependencias entre Requirements se representan; la detección global de ciclos no forma parte de esta Task.  
**OUT OF SCOPE:** Design model, Task model, Test model futuro, cycle detector o graph engine, repositories, SQLite, adapters, application services, Electron, React, CodexAdapter, ObsidianAdapter, GitAdapter, Evidence Engine, Issue Engine, Version Engine, Release Engine y modificaciones de System o Spec.  
**DEPENDENCIES:** DOS-TASK-003 DONE.  
**EXPECTED OUTPUT:** Requirement válido aceptado con sus campos e IDs de relación; datos inválidos, IDs duplicados y referencias inexistentes rechazados; dependencias y relaciones válidas representadas sin perder integridad ni historial/revisión cuando aplique al modelo definido por la Task.  
**DEFINITION OF DONE:** DOS-TEST-004 PASS; TypeScript check PASS; regresiones DOS-TEST-003, DOS-TEST-002, DOS-TEST-025 y DOS-TEST-001 PASS; Scope Leaks = 0; Architecture Violations = 0; New Circular Dependencies = 0; evidencia registrada.

### Files To Create

- src/core/requirement/requirement.schema.ts
- src/core/requirement/requirement.types.ts
- src/core/requirement/requirement.ts
- tests/unit/requirement.test.ts

### Files Allowed To Modify

- Ninguno. Requirement debe ser autocontenido y no requiere modificar System, Spec ni configuración existente.

### Files Forbidden

00_SPEC/*; DOCUMENTATION/* salvo esta sección del Execution Packet; package.json; pnpm-lock.yaml; tsconfig.json; src/core/system/*; src/core/spec/*; SQLite; repositories; adapters; application services; Electron; React; CodexAdapter; ObsidianAdapter; GitAdapter; Evidence Engine; Issue Engine; Version Engine; Release Engine; Design/Task/Test domain models futuros.

### Packages Required

- Runtime: zod — ALREADY AVAILABLE.
- Dev: vitest — ALREADY AVAILABLE.
- TypeScript — ALREADY AVAILABLE.
- Packages to install: NONE.

### Test-First and Commands

**TEST FILE:** tests/unit/requirement.test.ts  
**TEST COMMAND:** `\.\node_modules\.bin\vitest.CMD run tests/unit/requirement.test.ts`  
**EXPECTED INITIAL RESULT:** FAIL porque el módulo Requirement no existe antes de la implementación.  
**PASS CRITERIA:** campos, prioridad, estados, criterios, Spec, dependencias y relaciones válidas pasan; entradas inválidas, IDs duplicados y referencias inexistentes se rechazan; la integridad/revisión documentada se conserva.  
**FAIL CRITERIA:** relación inválida aceptada, campo obligatorio omitido sin rechazo, estado/prioridad inválidos aceptados, ID duplicado aceptado o historial/revisión perdido.

**TYPESCRIPT CHECK:** `\.\node_modules\.bin\tsc.CMD --noEmit`  
**REGRESSION TESTS:**  
- `\.\node_modules\.bin\vitest.CMD run tests/unit/spec.test.ts`
- `\.\node_modules\.bin\vitest.CMD run tests/unit/system.test.ts`
- `\.\node_modules\.bin\vitest.CMD run tests/smoke/bootstrap.test.ts`
- `\.\TESTS\check_structure.ps1`

### Evidence Required

`EVIDENCE/DOS-INC-001/DOS-TASK-004_RESULT.md` con Task, Title, Requirements, Tests, Dependencies, Files Created, Files Modified, Packages Installed, Test-first Result, Implementation Summary, Commands, Specific Test Results, TypeScript Check, Regression Results, Errors, Warnings, Diff Summary, Scope Validation, Architecture Validation y Definition of Done.

## Execution Packet — DOS-TASK-005

**TASK ID:** DOS-TASK-005  
**TITLE:** Documentar Design traceable  
**PRIORITY:** P0  
**OBJECTIVE:** Representar un Design técnico asociado a una Spec y cubrir Requirements mediante enlaces explícitos.  
**RELATED REQUIREMENTS:** DOS-R006, DOS-R016  
**RELATED TESTS:** DOS-TEST-005  
**DEPENDENCIES:** DOS-TASK-004 DONE  
**ARCHITECTURAL LAYER:** DESIGN MANAGEMENT / DOMAIN CORE  
**FILES TO CREATE:** `src/core/design/design.schema.ts`, `src/core/design/design.types.ts`, `src/core/design/design.ts`, `tests/unit/design.test.ts`  
**FILES ALLOWED TO MODIFY:** NONE. El modelo será autocontenido; no modifica Requirement ni Spec.  
**FILES FORBIDDEN:** `00_SPEC/*`; `DOCUMENTATION/*` salvo este packet; `package.json`; `pnpm-lock.yaml`; `tsconfig.json`; `src/core/system/*`; `src/core/spec/*`; `src/core/requirement/*`; repositories; SQLite; adapters; application services; Electron; React; CodexAdapter; ObsidianAdapter; GitAdapter; Task/Test/Run/Evidence/Issue/Version/Release engines.  
**PACKAGES REQUIRED:** zod, TypeScript y vitest — ALREADY AVAILABLE. Packages to install: NONE.  
**COMMANDS TO RUN:** `\.\node_modules\.bin\vitest.CMD run tests/unit/design.test.ts`; `\.\node_modules\.bin\tsc.CMD --noEmit`; `\.\node_modules\.bin\vitest.CMD run tests/unit/requirement.test.ts`; `\.\node_modules\.bin\vitest.CMD run tests/unit/spec.test.ts`; `\.\node_modules\.bin\vitest.CMD run tests/unit/system.test.ts`; `\.\node_modules\.bin\vitest.CMD run tests/smoke/bootstrap.test.ts`; `\.\TESTS\check_structure.ps1`.  
**REGRESSION TESTS:** DOS-TEST-004, DOS-TEST-003, DOS-TEST-002, DOS-TEST-025 y DOS-TEST-001.  
**TEST PACKET:** Specific Test DOS-TEST-005; file `tests/unit/design.test.ts`; initial result expected FAIL por módulo inexistente; PASS exige Spec, decisiones, constraints y cobertura Requirement→Design válidos; FAIL si Design huérfano o Requirement MUST sin cobertura.  
**EVIDENCE REQUIRED:** `EVIDENCE/DOS-INC-001/DOS-TASK-005_RESULT.md` con Task, Requirements, Tests, Files, Packages, Commands, TDD, Implementation, Regression, Scope, Architecture, Errors, Warnings y DoD.  
**DEFINITION OF DONE:** DOS-TEST-005 PASS; TypeScript PASS; regresiones PASS; Scope Leaks = 0; Architecture Violations = 0; New Circular Dependencies = 0; Evidence registrada.

## Execution Packet — DOS-TASK-006

**TASK ID:** DOS-TASK-006  
**TITLE:** Definir Task y readiness  
**PRIORITY:** P0  
**OBJECTIVE:** Definir una Task relacionada con Requirements, con alcance, constraints y estado READY solo cuando el contexto requerido esté completo.  
**RELATED REQUIREMENTS:** DOS-R007  
**RELATED TESTS:** DOS-TEST-006  
**DEPENDENCIES:** DOS-TASK-005 DONE  
**ARCHITECTURAL LAYER:** TASK ENGINE / DOMAIN CORE  
**FILES TO CREATE:** `src/core/task/task.schema.ts`, `src/core/task/task.types.ts`, `src/core/task/task.ts`, `tests/unit/task.test.ts`  
**FILES ALLOWED TO MODIFY:** NONE.  
**FILES FORBIDDEN:** `00_SPEC/*`; `DOCUMENTATION/*` salvo este packet; `package.json`; `pnpm-lock.yaml`; `tsconfig.json`; `src/core/system/*`; `src/core/spec/*`; `src/core/requirement/*`; `src/core/design/*`; repositories; SQLite; adapters; application services; Electron; React; CodexAdapter; ObsidianAdapter; GitAdapter; Run/Test/Evidence/Issue/Version/Release engines.  
**PACKAGES REQUIRED:** zod, TypeScript y vitest — ALREADY AVAILABLE. Packages to install: NONE.  
**COMMANDS TO RUN:** `\.\node_modules\.bin\vitest.CMD run tests/unit/task.test.ts`; `\.\node_modules\.bin\tsc.CMD --noEmit`; `\.\node_modules\.bin\vitest.CMD run tests/unit/design.test.ts`; `\.\node_modules\.bin\vitest.CMD run tests/unit/requirement.test.ts`; `\.\node_modules\.bin\vitest.CMD run tests/unit/spec.test.ts`; `\.\node_modules\.bin\vitest.CMD run tests/unit/system.test.ts`; `\.\node_modules\.bin\vitest.CMD run tests/smoke/bootstrap.test.ts`; `\.\TESTS\check_structure.ps1`.  
**REGRESSION TESTS:** DOS-TEST-005, DOS-TEST-004, DOS-TEST-003, DOS-TEST-002, DOS-TEST-025 y DOS-TEST-001.  
**TEST PACKET:** Specific Test DOS-TEST-006; file `tests/unit/task.test.ts`; initial result expected FAIL; PASS exige Requirement, Module, Scope, Constraints, Future Tests y Definition of Done válidos, y READY únicamente con campos completos; FAIL si una Task huérfana alcanza READY.  
**EVIDENCE REQUIRED:** `EVIDENCE/DOS-INC-001/DOS-TASK-006_RESULT.md` con el formato de evidence aprobado.  
**DEFINITION OF DONE:** DOS-TEST-006 PASS; TypeScript PASS; regresiones PASS; Scope Leaks = 0; Architecture Violations = 0; New Circular Dependencies = 0; Evidence registrada.

## Execution Packet — DOS-TASK-007

**TASK ID:** DOS-TASK-007  
**TITLE:** Generar Context Pack  
**PRIORITY:** P0  
**OBJECTIVE:** Construir y validar un Context Pack mínimo, determinista y revisable para una Task.  
**RELATED REQUIREMENTS:** DOS-R009  
**RELATED TESTS:** DOS-TEST-007, DOS-TEST-008, DOS-TEST-021  
**DEPENDENCIES:** DOS-TASK-006 DONE  
**ARCHITECTURAL LAYER:** CODEX ENGINE / DOMAIN CORE  
**FILES TO CREATE:** `src/core/context/context-pack.schema.ts`, `src/core/context/context-pack.types.ts`, `src/core/context/context-pack.ts`, `tests/unit/context-pack.test.ts`, `tests/integration/context-pack.test.ts`  
**FILES ALLOWED TO MODIFY:** NONE.  
**FILES FORBIDDEN:** `00_SPEC/*`; `DOCUMENTATION/*` salvo este packet; `package.json`; `pnpm-lock.yaml`; `tsconfig.json`; todos los modelos previos; repositories; SQLite; adapters; application services; Electron; React; CodexAdapter runtime; ObsidianAdapter runtime; GitAdapter; Run/Test/Evidence/Issue/Version/Release engines.  
**PACKAGES REQUIRED:** zod, TypeScript y vitest — ALREADY AVAILABLE. Packages to install: NONE.  
**COMMANDS TO RUN:** `\.\node_modules\.bin\vitest.CMD run tests/unit/context-pack.test.ts tests/integration/context-pack.test.ts`; `\.\node_modules\.bin\tsc.CMD --noEmit`; regresiones especificadas abajo; `\.\TESTS\check_structure.ps1`.  
**REGRESSION TESTS:** DOS-TEST-006, DOS-TEST-005, DOS-TEST-004, DOS-TEST-003, DOS-TEST-002, DOS-TEST-025 y DOS-TEST-001.  
**TEST PACKET:** DOS-TEST-007 y DOS-TEST-021 cubren Context Pack completo y Knowledge relevante representado por referencias; DOS-TEST-008 cubre entradas inválidas; initial result expected FAIL; PASS exige todos los campos y referencias estructurales válidos; FAIL si falta, sobra o se rompe una referencia.  
**EVIDENCE REQUIRED:** `EVIDENCE/DOS-INC-001/DOS-TASK-007_RESULT.md` con Task, Requirements, Tests, Files, Packages, Commands, TDD, Implementation, Regression, Scope, Architecture, Errors, Warnings y DoD.  
**DEFINITION OF DONE:** DOS-TEST-007, DOS-TEST-008 y DOS-TEST-021 PASS; TypeScript PASS; regresiones PASS; Scope Leaks = 0; Architecture Violations = 0; New Circular Dependencies = 0; Evidence registrada.

## Execution Packet — DOS-TASK-008

**TASK ID:** DOS-TASK-008  
**TITLE:** Registrar Run  
**PRIORITY:** P0  
**OBJECTIVE:** Registrar y leer el estado mínimo auditable de un Run asociado a una Task y Context Pack, con persistencia operativa SQLite.  
**RELATED REQUIREMENTS:** DOS-R010, DOS-R020  
**RELATED TESTS:** DOS-TEST-009, DOS-TEST-022, DOS-TEST-023  
**DEPENDENCIES:** DOS-TASK-007 DONE  
**ARCHITECTURAL LAYER:** RUN ENGINE / DOMAIN CORE + PORTS + INFRASTRUCTURE  
**FILES TO CREATE:** `src/core/run/run.schema.ts`, `src/core/run/run.types.ts`, `src/core/run/run.ts`, `src/core/ports/run.repository.ts`, `src/storage/sqlite/migrations/001-foundation.sql`, `src/storage/sqlite/database.ts`, `src/storage/sqlite/repositories/sqlite-run.repository.ts`, `src/application/run/create-run.ts`, `tests/unit/run.test.ts`, `tests/integration/run-persistence.test.ts`  
**FILES ALLOWED TO MODIFY:** `package.json` and `pnpm-lock.yaml`, exclusively as a consequence of installing the explicitly approved `better-sqlite3` dependency for DOS-TASK-008; no general modifications to either file are authorized.  
**FILES FORBIDDEN:** `00_SPEC/*`; `DOCUMENTATION/*` salvo este packet; `tsconfig.json`; `src/core/system/*`; `src/core/spec/*`; `src/core/requirement/*`; `src/core/design/*`; `src/core/task/*`; `src/core/context/*`; Electron; React; CodexAdapter; ObsidianAdapter; GitAdapter; Version/Release/Knowledge/Evidence/Issue engines no requeridos por el Run mínimo; cualquier almacenamiento fuera de SQLite.  
**PACKAGES REQUIRED:** zod, TypeScript y vitest — ALREADY AVAILABLE; `better-sqlite3` — APPROVED and first authorized for installation/use in DOS-TASK-008.  
**PACKAGES TO INSTALL DURING TASK:** `better-sqlite3` only. No Electron, React, Playwright or other package.  
**COMMANDS TO RUN:** `pnpm add better-sqlite3`; `\.\node_modules\.bin\vitest.CMD run tests/unit/run.test.ts tests/integration/run-persistence.test.ts`; `\.\node_modules\.bin\tsc.CMD --noEmit`; regression commands for DOS-TEST-007, DOS-TEST-006, DOS-TEST-005, DOS-TEST-004, DOS-TEST-003, DOS-TEST-002, DOS-TEST-025 and DOS-TEST-001.  
**REGRESSION TESTS:** DOS-TEST-007, DOS-TEST-008, DOS-TEST-021, DOS-TEST-006, DOS-TEST-005, DOS-TEST-004, DOS-TEST-003, DOS-TEST-002, DOS-TEST-025 y DOS-TEST-001.  
**TEST PACKET:** DOS-TEST-009, DOS-TEST-022 y DOS-TEST-023; initial result expected FAIL; PASS exige Run ID/context/estado/resultado y preservación ante fallo, cancelación o estado incompleto; persistence uses repository port and SQLite adapter.  
**EVIDENCE REQUIRED:** `EVIDENCE/DOS-INC-001/DOS-TASK-008_RESULT.md` incluyendo migration, package installation, persistence/read logs, Tests, scope, architecture, errors, warnings y DoD.  
**DEFINITION OF DONE:** DOS-TEST-009, DOS-TEST-022 y DOS-TEST-023 PASS; TypeScript PASS; regresiones PASS; SQLite detrás de port/repository; Scope Leaks = 0; Architecture Violations = 0; New Circular Dependencies = 0; Evidence registrada.

## Execution Packet — DOS-TASK-009

**TASK ID:** DOS-TASK-009  
**TITLE:** Registrar Tests  
**PRIORITY:** P0  
**OBJECTIVE:** Definir y registrar Tests con estados, resultado, historial mínimo, affected/regression y cobertura conceptual asociados a Requirements y Runs.  
**RELATED REQUIREMENTS:** DOS-R011  
**RELATED TESTS:** DOS-TEST-010  
**DEPENDENCIES:** DOS-TASK-008 DONE  
**ARCHITECTURAL LAYER:** TEST ENGINE / DOMAIN CORE  
**FILES TO CREATE:** `src/core/test/test.schema.ts`, `src/core/test/test.types.ts`, `src/core/test/test.ts`, `tests/unit/test-definition.test.ts`  
**FILES ALLOWED TO MODIFY:** NONE.  
**FILES FORBIDDEN:** `00_SPEC/*`; `DOCUMENTATION/*` salvo este packet; `package.json`; `pnpm-lock.yaml`; `tsconfig.json`; modelos System, Spec, Requirement, Design, Task y Run; repositories; SQLite; adapters; application services; Electron; React; CodexAdapter; ObsidianAdapter; GitAdapter; Issue/Version/Release/Knowledge engines.  
**PACKAGES REQUIRED:** zod, TypeScript y vitest — ALREADY AVAILABLE. Packages to install: NONE.  
**COMMANDS TO RUN:** `\.\node_modules\.bin\vitest.CMD run tests/unit/test-definition.test.ts`; `\.\node_modules\.bin\tsc.CMD --noEmit`; regresiones DOS-TEST-009, DOS-TEST-008, DOS-TEST-007, DOS-TEST-006, DOS-TEST-005, DOS-TEST-004, DOS-TEST-003, DOS-TEST-002, DOS-TEST-025 y DOS-TEST-001.  
**REGRESSION TESTS:** DOS-TEST-009, DOS-TEST-022, DOS-TEST-023, DOS-TEST-007, DOS-TEST-008, DOS-TEST-006, DOS-TEST-005, DOS-TEST-004, DOS-TEST-003, DOS-TEST-002, DOS-TEST-025 y DOS-TEST-001.  
**TEST PACKET:** Specific Test DOS-TEST-010; file `tests/unit/test-definition.test.ts`; initial result expected FAIL; PASS exige estados NOT_RUN/RUNNING/PASS/FAIL/SKIPPED, historial y conjuntos affected/regression identificables; FAIL si hay transición inválida, historial perdido o coverage inconsistente.  
**EVIDENCE REQUIRED:** `EVIDENCE/DOS-INC-001/DOS-TASK-009_RESULT.md` con Task, Requirements, Tests, Files, Packages, Commands, TDD, Implementation, Regression, Scope, Architecture, Errors, Warnings y DoD.  
**DEFINITION OF DONE:** DOS-TEST-010 PASS; TypeScript PASS; regresiones PASS; Scope Leaks = 0; Architecture Violations = 0; New Circular Dependencies = 0; Evidence registrada.

## DOS-INC-001 Bootstrap Amendment

New Requirement: DOS-R022 — Executable Project Foundation. New Task: DOS-TASK-015 — Bootstrap DesignOS Project. New Test: DOS-TEST-025 — Project Bootstrap.

Final Task Set: DOS-TASK-001, 002, 003, 004, 005, 006, 007, 008, 009 y 015. Final Task Count: 10. DOS-TASK-015 depende de DOS-TASK-001 y DOS-TASK-002 pasa a depender de DOS-TASK-001 y DOS-TASK-015. DOS-TASK-007 se incluye porque es dependencia obligatoria de DOS-TASK-008. Circular Task Dependencies: 0.

Topological Order: 001 → 015 → 002 → 003 → 004 → 005 → 006 → 007 → 008 → 009. DOS-TASK-007 permanece diferida; por tanto el orden de implementación de la parte seleccionada es 001 → 015 → 002 → 003 → 004 → 005 → 006, con 008/009 sujetos a su dependencia documentada y a revisión de alcance.

Critical Path: 001 → 015 → 002 → 003 → 004 → 005 → 006 → 007 → 008 → 009. Parallel Group A: ninguna antes de 001; Group B: 002 y 015 solo después de 001, pero 002 requiere 015 para el entorno.

Implementation Waves: Wave 0 = 001; Wave 1 = 015; Wave 2 = 002/003; Wave 3 = 004/005; Wave 4 = 006; Wave 5 = 007; Wave 6 = 008; Wave 7 = 009. Required P0 Test Set añade DOS-TEST-025 y conserva DOS-TEST-007, 008, 009 y 010. DOS-R022 → DOS-TASK-015 → DOS-TEST-025 tiene trazabilidad FULL.

DOS-TASK-015 Execution Packet: Files to create: package.json, pnpm-lock.yaml, tsconfig.json, tests/smoke/bootstrap.test.ts. Files allowed to modify: ninguno adicional. Files forbidden: Electron, React, SQLite, better-sqlite3, Playwright, Domain entities, adapters, Requirements, Design, Tasks y Tests existentes. Packages: runtime zod; dev typescript, vitest. Commands: pnpm install; pnpm exec tsc --noEmit; pnpm exec vitest run tests/smoke/bootstrap.test.ts; .\\DesignOS\\TESTS\\check_structure.ps1. Evidence: EVIDENCE/DOS-INC-001/DOS-TASK-015_RESULT.md.

Implementation Plan Status: READY_FOR_TARGETED_REAUDIT. No se crean archivos ni se instalan paquetes en esta fase documental.
