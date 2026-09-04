# DesignOS Base v0.1 — Tasks

Todas las Tasks están en estado TODO. No implementan código; definen unidades futuras para Codex.

## MVP Tasks

| ID | TITLE | PRIORITY | RELATED REQUIREMENTS | MODULE | DEPENDENCIES | FUTURE TESTS |
|---|---|---|---|---|---|---|
| DOS-TASK-001 | Validar Foundation | P0 | DOS-R021 | CORE | Ninguna | DOS-TEST-001 |
| DOS-TASK-002 | Definir modelo System | P0 | DOS-R001, DOS-R002 | SYSTEM MANAGEMENT | 001, 015 | DOS-TEST-002 |
| DOS-TASK-003 | Definir modelo Spec | P0 | DOS-R003 | SPEC MANAGEMENT | 002 | DOS-TEST-003 |
| DOS-TASK-004 | Definir modelo Requirement | P0 | DOS-R004, DOS-R005 | REQUIREMENTS MANAGEMENT | 003 | DOS-TEST-004 |
| DOS-TASK-005 | Documentar Design traceable | P0 | DOS-R006, DOS-R016 | DESIGN MANAGEMENT | 004 | DOS-TEST-005 |
| DOS-TASK-006 | Definir Task y readiness | P0 | DOS-R007 | TASK ENGINE | 005 | DOS-TEST-006 |
| DOS-TASK-007 | Generar Context Pack | P0 | DOS-R009 | CODEX ENGINE | 006 | DOS-TEST-007, 008, 021 |
| DOS-TASK-008 | Registrar Run | P0 | DOS-R010, DOS-R020 | RUN ENGINE | 007 | DOS-TEST-009, 022, 023 |
| DOS-TASK-009 | Registrar Tests | P0 | DOS-R011 | TEST ENGINE | 008 | DOS-TEST-010 |
| DOS-TASK-010 | Gestionar Issues y Fix Tasks | P0 | DOS-R008, DOS-R012 | ISSUE ENGINE | 006, 009 | DOS-TEST-011 |
| DOS-TASK-011 | Registrar Evidence | P0 | DOS-R013 | EVIDENCE ENGINE | 008, 009 | DOS-TEST-012 |
| DOS-TASK-012 | Gestionar Version y Quality Gate | P0 | DOS-R014, DOS-R015, DOS-R021 | VERSION / RELEASE ENGINE | 009, 011, 013 | DOS-TEST-013, 014, 015 |
| DOS-TASK-013 | Validar Traceability e History | P0 | DOS-R016, DOS-R020, DOS-R021 | HISTORY / TRACEABILITY | 004, 005, 008 | DOS-TEST-016, 022 |
| DOS-TASK-014 | Curar Knowledge y frontera Obsidian | P0 | DOS-R017, DOS-R018, DOS-R019 | KNOWLEDGE / OBSIDIAN CONNECTOR | 012 | DOS-TEST-017, 018, 019, 020, 021 |
| DOS-TASK-015 | Bootstrap DesignOS Project | P0 | DOS-R022 | PROJECT / EXECUTION FOUNDATION | 001 | DOS-TEST-025 |
| DOS-TASK-016 | Complete Spec revision model | P0 | DOS-R003 | SPEC MANAGEMENT / DOMAIN CORE | 003 DONE | DOS-TEST-026 |
| DOS-TASK-017 | Persist Spec revisions and History | P0 | DOS-R003 | SPEC MANAGEMENT / HISTORY / SQLITE | 016 DONE | DOS-TEST-027 |

## Definición común de cada Task

Cada fila es una Task individual con ID, título, estado TODO, prioridad, Requirements, módulo, objetivo, scope, out of scope, dependencias, expected output, Future Tests y Definition of Done. Antes de implementación, el detalle operativo de cada fila deberá expandirse sin cambiar su alcance.

### DOS-TASK-015 — Bootstrap DesignOS Project

STATUS: DONE. OBJECTIVE: crear la foundation ejecutable y reproducible del proyecto. SCOPE: package.json, pnpm, lockfile, tsconfig, Zod, TypeScript, Vitest, estructura mínima source/tests y script de test. OUT OF SCOPE: Electron, React, SQLite, better-sqlite3, Playwright, entidades de dominio, adapters y UI. DEPENDENCIES: DOS-TASK-001 DONE. EXPECTED OUTPUT: entorno capaz de validar TypeScript, importar Zod y ejecutar smoke test Vitest. FUTURE TESTS: DOS-TEST-025. DEFINITION OF DONE: DOS-TEST-025 PASS, Foundation regression PASS y evidencia completa.

### DOS-TASK-016 — Complete Spec revision model

STATUS: TODO. OBJECTIVE: completar el modelo de dominio de Spec y sus revisiones sin persistencia. SCOPE: `src/core/spec/spec.schema.ts`, `src/core/spec/spec.types.ts`, `src/core/spec/spec.ts`, `tests/unit/spec.test.ts`. OUT OF SCOPE: SQLite, repositories, migrations, application services, Version/Release, Knowledge, Obsidian, UI y package files. DEPENDENCIES: DOS-TASK-003 DONE. EXPECTED OUTPUT: contrato de Spec y revisión validado, manteniendo compatibilidad con la API existente. FUTURE TESTS: DOS-TEST-026. DEFINITION OF DONE: DOS-TEST-026 PASS, TypeScript PASS, regresiones DOS-TEST-003, DOS-TEST-002, DOS-TEST-025 y DOS-TEST-001 PASS, Scope Leaks = 0 y evidencia registrada.

### DOS-TASK-017 — Persist Spec revisions and History

STATUS: TODO. OBJECTIVE: persistir snapshots de Spec y revisiones preservando History. SCOPE: `src/core/ports/spec.repository.ts`, `src/storage/sqlite/migrations/002-spec.sql`, `src/storage/sqlite/database.ts`, `src/storage/sqlite/repositories/sqlite-spec.repository.ts`, `tests/integration/spec-persistence.test.ts`. OUT OF SCOPE: modificar `001-foundation.sql`, RunRepository, runs, Version/Release, Knowledge, Obsidian, UI, package files y adapters externos. DEPENDENCIES: DOS-TASK-016 DONE. EXPECTED OUTPUT: repository port y adapter SQLite con Spec estable, revisión actual, History consultable y snapshots anteriores sin sobreescritura. FUTURE TESTS: DOS-TEST-027. DEFINITION OF DONE: DOS-TEST-027 PASS, DOS-TEST-026 PASS, DOS-TEST-022 y DOS-TEST-023 PASS, DOS-TEST-025 y DOS-TEST-001 PASS, TypeScript PASS, native load PASS, Scope Leaks = 0 y evidencia registrada.

## Alcance operativo de las Tasks MVP

- DOS-TASK-001: comprobar estructura y convenciones Foundation; DoD: resultado reproducible PASS/FAIL.
- DOS-TASK-002: ID, creación, consulta, actualización, listado, historial y estructura relacionada de System; DoD: DOS-TEST-002 PASS.
- DOS-TASK-003: Spec asociada a System, revisiones y consulta actual; DoD: DOS-TEST-003 PASS.
- DOS-TASK-004: schema, prioridad, estado, criterios, dependencias y relaciones válidas; DoD: DOS-TEST-004 PASS.
- DOS-TASK-005: Design, decisiones, constraints y cobertura Requirement → Design; DoD: DOS-TEST-005 PASS.
- DOS-TASK-006: Task, scope, constraints, estado READY y dependencia de Requirement; DoD: DOS-TEST-006 PASS.
- DOS-TASK-007: Context Pack determinista, mínimo, revisable y validado; DoD: Tests 007, 008 y 021 PASS.
- DOS-TASK-008: Run auditable con estados COMPLETED, FAILED, CANCELLED e incompleto; DoD: Tests 009, 022 y 023 PASS.
- DOS-TASK-009: Test result, estados, affected/regression, coverage e historial; DoD: DOS-TEST-010 PASS.
- DOS-TASK-010: Issue desde FAIL y solicitud de Fix Task mediante Task Service; DoD: DOS-TEST-011 PASS.
- DOS-TASK-011: Evidence tipada, referenciada y con metadata; DoD: DOS-TEST-012 PASS.
- DOS-TASK-012: Version, promociones objetivas y Quality Gate; DoD: Tests 013–015 PASS.
- DOS-TASK-013: navegación de trazabilidad, enlaces rotos e History; DoD: Tests 016 y 022 PASS.
- DOS-TASK-014: clasificación, consulta, curación y Round Trip conceptual con Obsidian; DoD: Tests 017–021 PASS.

## Task Test Matrix

| Task | Requirement | Module | Future Test | Priority | MVP |
|---|---|---|---|---|---|
| DOS-TASK-001 | DOS-R021 | CORE | DOS-TEST-001 | P0 | YES |
| DOS-TASK-002 | DOS-R001–R002 | SYSTEM MANAGEMENT | DOS-TEST-002 | P0 | YES |
| DOS-TASK-003 | DOS-R003 | SPEC MANAGEMENT | DOS-TEST-003 | P0 | YES |
| DOS-TASK-004 | DOS-R004–R005 | REQUIREMENTS MANAGEMENT | DOS-TEST-004 | P0 | YES |
| DOS-TASK-005 | DOS-R006, DOS-R016 | DESIGN MANAGEMENT | DOS-TEST-005 | P0 | YES |
| DOS-TASK-006 | DOS-R007 | TASK ENGINE | DOS-TEST-006 | P0 | YES |
| DOS-TASK-007 | DOS-R009 | CODEX ENGINE | DOS-TEST-007, 008, 021 | P0 | YES |
| DOS-TASK-008 | DOS-R010, DOS-R020 | RUN ENGINE | DOS-TEST-009, 022, 023 | P0 | YES |
| DOS-TASK-009 | DOS-R011 | TEST ENGINE | DOS-TEST-010 | P0 | YES |
| DOS-TASK-010 | DOS-R008, DOS-R012 | ISSUE ENGINE | DOS-TEST-011 | P0 | YES |
| DOS-TASK-011 | DOS-R013 | EVIDENCE ENGINE | DOS-TEST-012 | P0 | YES |
| DOS-TASK-012 | DOS-R014, DOS-R015, DOS-R021 | VERSION / RELEASE ENGINE | DOS-TEST-013–015 | P0 | YES |
| DOS-TASK-013 | DOS-R016, DOS-R020, DOS-R021 | HISTORY / TRACEABILITY | DOS-TEST-016, 022 | P0 | YES |
| DOS-TASK-014 | DOS-R017–R019 | KNOWLEDGE / OBSIDIAN | DOS-TEST-017–021 | P0 | YES |
| DOS-TASK-015 | DOS-R022 | PROJECT / EXECUTION FOUNDATION | DOS-TEST-025 | P0 | YES |
| DOS-TASK-016 | DOS-R003 | SPEC MANAGEMENT / DOMAIN CORE | DOS-TEST-026 | P0 | YES |
| DOS-TASK-017 | DOS-R003 | SPEC MANAGEMENT / HISTORY / SQLITE | DOS-TEST-027 | P0 | YES |
