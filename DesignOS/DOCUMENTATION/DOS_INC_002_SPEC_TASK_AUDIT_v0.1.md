# DOS-INC-002 — Spec/Task Audit v0.1

## 1. Executive Summary

La auditoría confirma que `DOS-INC-002 — Spec Foundation Enablement` está listo para implementación. R003 permanece PARTIAL porque el modelo de dominio básico existe, pero la persistencia de revisiones y la consulta de History no están implementadas. Se definen dos Tasks sin solapamiento: dominio (016) y persistencia (017).

## 2. Baseline

- Version: `DesignOS v0.1.0-foundation`
- Commit: `012d779e0848ae74e71da7e299906758eec50c5e`
- Tag: `designos-v0.1.0-foundation`
- R003 before: PARTIAL
- INC-001 regression baseline: 27/27 PASS
- Node: v24.19.0
- pnpm: 11.19.0
- Git identity: DEFINED

## 3. R003 Acceptance Criteria Matrix

| Criterion | INC-001 status | INC-002 required work | Expected validation |
|---|---|---|---|
| Spec ID, System, title, content and status | FULL | Preserve existing contract | DOS-TEST-026 schema/domain cases |
| Spec revision identity and initial revision | FULL at domain level | Preserve stable Spec ID and positive revision number | DOS-TEST-026 |
| Versionable Spec updates | PARTIAL | Validate revision creation without product Version semantics | DOS-TEST-026 |
| Updates preserve History | PARTIAL | Persist immutable revision snapshots and query History | DOS-TEST-027 |

No criterion already FULL is to be reimplemented with changed semantics.

## 4. Terminology Boundaries

- SPEC: stable logical contract identified by `id` and associated to `systemId`.
- SPEC REVISION: numbered snapshot of a Spec; current model uses positive `revision` and stable Spec ID.
- VERSION: future DesignOS operational aggregate governed by R014.
- RELEASE: future published Version governed by R015.
- HISTORY: preserved prior revisions and change context; not event sourcing.

Spec revisioning does not create a product Version, Release, Git tag or Release lifecycle transition.

## 5. Revision Identity

The current Spec defines stable Spec identity (`id`) and a positive numeric revision. It does not define a separate revision UUID or timestamp-only ordering; none is introduced. Revision 1 is created with the first Spec. A later revision increments the numeric revision. Previous snapshots are not edited; the current/latest revision is the highest persisted revision for the stable Spec ID. This is sufficient and deterministic for R003.

## 6. History Contract

**HISTORY CONTRACT: DEFINED.** History means queryable full revision snapshots, stored append-only at the revision level. The current revision is separately identifiable; earlier snapshots remain semantically unchanged. No event-sourcing model or unrelated audit event stream is introduced.

## 7. Existing Spec Compatibility

Existing `SpecSchema`, `Spec` and `createSpec`/`updateSpec` behavior remains valid. Task-016 may add assertions and narrow domain validation but must preserve existing function signatures and fields. Task-017 adds persistence behind a repository port and does not change domain callers.

**BACKWARD COMPATIBILITY: PRESERVED.**

## 8. Design Coverage

Design defines Spec as a contract with revision, Spec Management ownership, general History preservation, Domain Core separation and Ports/Adapters persistence. The repository responsibility follows the approved general repository boundary; a dedicated SpecRepository port is required because only RunRepository currently exists.

**DESIGN COVERAGE: FULL.** No new module or semantic Design change is required.

## 9. Persistence Strategy

**PERSISTENCE PORT STRATEGY: DEFINED.** Domain Core remains independent of SQLite. Add `SpecRepository` with operations for saving a current Spec snapshot, finding current by stable ID and listing revision History. Add `SqliteSpecRepository` as adapter.

**PERSISTENCE HISTORY STRATEGY: DEFINED.** Use a stable `specs` row plus append-only `spec_revisions` full snapshots. `specs.current_revision` identifies the current snapshot. Revision number provides deterministic ordering. `system_id` is stored as a logical reference because no Systems table is currently approved in this slice.

## 10. SQLite/Migration Strategy

- Migration file required: YES.
- Naming: `src/storage/sqlite/migrations/002-spec.sql`.
- `001-foundation.sql`: historical migration, FORBIDDEN to modify.
- `database.ts`: explicitly authorized to register/apply the new Spec schema while preserving the existing runs schema.
- Conceptual tables: `specs(id, system_id, current_revision, created_at, updated_at)` and `spec_revisions(spec_id, revision, title, content, status, created_at, updated_at)` with stable/revision uniqueness.
- No unrelated Systems table or foreign-key migration is introduced.

## 11. TASK-016 Audit

- Related Requirement: R003.
- Dependencies: DOS-TASK-003 baseline Spec model DONE; no deferred Requirement.
- Module: SPEC MANAGEMENT / DOMAIN CORE.
- Responsibility: domain revision identity, validation and non-destructive revision behavior only.
- SQLite/persistence: FORBIDDEN.
- Files to modify: `src/core/spec/spec.schema.ts`, `src/core/spec/spec.types.ts`, `src/core/spec/spec.ts`, `tests/unit/spec.test.ts`.
- Files to create: none besides execution Evidence.
- Files forbidden: storage, migrations, repositories, database.ts, package files, Version/Release/Knowledge/Obsidian/UI and unrelated domain modules.
- Packages: NONE; existing Zod, TypeScript and Vitest.
- Test: DOS-TEST-026.
- Regression: DOS-TEST-003, DOS-TEST-002, DOS-TEST-025, DOS-TEST-001.
- Evidence: `EVIDENCE/DOS-INC-002/DOS-TASK-016_RESULT.md`.
- DoD: DOS-TEST-026 PASS, TypeScript PASS, regressions PASS, scope leaks 0, Evidence complete.
- Packet: COMPLETE.

## 12. TASK-017 Audit

- Related Requirement: R003.
- Dependency: DOS-TASK-016 DONE.
- Module: SPEC MANAGEMENT / HISTORY / SQLITE.
- Responsibility: repository port, SQLite adapter, migration, current revision retrieval and History snapshots.
- Files to create: `src/core/ports/spec.repository.ts`, `src/storage/sqlite/migrations/002-spec.sql`, `src/storage/sqlite/repositories/sqlite-spec.repository.ts`, `tests/integration/spec-persistence.test.ts`.
- Files allowed to modify: `src/storage/sqlite/database.ts` only for registering/applying Spec schema; no package files.
- Files forbidden: `src/storage/sqlite/migrations/001-foundation.sql`, RunRepository, run tests/source, existing Spec domain files, Version/Release/Knowledge/Obsidian/UI and external adapters.
- Migration: new `002-spec.sql` authorized; historical migration immutable.
- Packages: NONE; existing better-sqlite3, Zod, TypeScript and Vitest.
- Test: DOS-TEST-027.
- Regression: DOS-TEST-026, DOS-TEST-003, DOS-TEST-022, DOS-TEST-023, DOS-TEST-025, DOS-TEST-001; native better-sqlite3 load.
- Evidence: `EVIDENCE/DOS-INC-002/DOS-TASK-017_RESULT.md`.
- DoD: DOS-TEST-027 PASS, DOS-TEST-026 PASS, persistence/reopen/history PASS, Run regressions PASS, TypeScript PASS, native load PASS, scope leaks 0, Evidence complete.
- Packet: COMPLETE.

## 13. Task DAG

`DOS-TASK-016 → DOS-TASK-017`

- Direct Task cycles: 0
- Transitive Task cycles: 0
- Task DAG: ACYCLIC
- No dependency on future Knowledge or Version Tasks.
- Responsibility overlap: 0.

## 14. DOS-TEST-026 Audit

Valid UNIT contract for R003 domain behavior. It covers valid construction, stable Spec/System identity, revision 1, incremented revision, schema validation and invalid input rejection. It does not assert wall-clock values, random IDs, object identity or implementation-specific collections.

## 15. DOS-TEST-027 Audit

Valid INTEGRATION contract for persistence. It covers initial save, later revision, current retrieval, History retrieval, deterministic numeric ordering, unchanged old snapshot and database close/reopen. It also verifies the existing runs table and RunRepository remain usable.

## 16. Coverage Matrices

### Requirement → Task

| Requirement | Task | Acceptance criteria owned |
|---|---|---|
| R003 | DOS-TASK-016 | identity, fields, initial revision, versionable domain update |
| R003 | DOS-TASK-017 | persisted revision snapshots and History preservation |

R003 TASK COVERAGE: COMPLETE.

### Requirement → Test

| Requirement | Test | Coverage |
|---|---|---|
| R003 | DOS-TEST-026 | domain criteria |
| R003 | DOS-TEST-027 | persistence/History criteria |

R003 TEST COVERAGE: COMPLETE.

### Task → Test

| Task | Test | Coverage |
|---|---|---|
| DOS-TASK-016 | DOS-TEST-026 | COMPLETE |
| DOS-TASK-017 | DOS-TEST-027 | COMPLETE |

TASK TEST COVERAGE: COMPLETE.

## 17. Regression Plan

- Task-016: DOS-TEST-026 specific; DOS-TEST-003 Spec regression; DOS-TEST-002 System regression; DOS-TEST-025 bootstrap; DOS-TEST-001 Foundation structure.
- Task-017: DOS-TEST-027 specific; DOS-TEST-026 and DOS-TEST-003 Spec regressions; DOS-TEST-022/023 Run persistence/recovery; DOS-TEST-025 bootstrap; DOS-TEST-001 Foundation; native better-sqlite3 load.
- Final Gate: complete INC-001 baseline `27/27 PASS` and canonical `pnpm test`.

## 18. Package Scope

New packages: **NONE**. Existing Zod, TypeScript, Vitest and better-sqlite3 are sufficient. No package.json or lockfile mutation is authorized.

## 19. File Mutation Scope

Task-016 modifies only the existing Spec domain/test files listed above. Task-017 creates only the new Spec port, migration, repository and integration test, and modifies only `database.ts` for schema registration. `001-foundation.sql` is forbidden. No hidden manifest, migration or generated product-file mutation is allowed.

## 20. Execution Packets

### DOS-TASK-016 Packet

- TASK: DOS-TASK-016 — Complete Spec revision model
- REQUIREMENT: DOS-R003
- TEST: DOS-TEST-026
- ARCHITECTURAL LAYER: SPEC MANAGEMENT / DOMAIN CORE
- FILES TO CREATE: none
- FILES ALLOWED TO MODIFY: four existing Spec/test files listed in section 11
- FILES FORBIDDEN: all storage, migration, package, adapter, UI and future engine files
- PACKAGES: none; existing stack only
- TEST-FIRST: `pnpm exec vitest run tests/unit/spec.test.ts -t "DOS-TEST-026"`
- SPECIFIC TEST: `pnpm exec vitest run tests/unit/spec.test.ts -t "DOS-TEST-026"`
- TYPESCRIPT: `pnpm exec tsc --noEmit`
- REGRESSIONS: `pnpm exec vitest run tests/unit/spec.test.ts tests/unit/system.test.ts tests/smoke/bootstrap.test.ts`; `./tests/check_structure.ps1`
- EVIDENCE: `EVIDENCE/DOS-INC-002/DOS-TASK-016_RESULT.md`
- STOP: any need for SQLite, package/config mutation, semantic Spec expansion or forbidden file.
- DoD: section 11.
- PACKET STATUS: COMPLETE.

### DOS-TASK-017 Packet

- TASK: DOS-TASK-017 — Persist Spec revisions and History
- REQUIREMENT: DOS-R003
- DEPENDENCY: DOS-TASK-016 DONE
- TEST: DOS-TEST-027
- ARCHITECTURAL LAYER: SPEC MANAGEMENT / HISTORY / SQLITE ADAPTER
- FILES TO CREATE: `src/core/ports/spec.repository.ts`, `src/storage/sqlite/migrations/002-spec.sql`, `src/storage/sqlite/repositories/sqlite-spec.repository.ts`, `tests/integration/spec-persistence.test.ts`
- FILES ALLOWED TO MODIFY: `src/storage/sqlite/database.ts` only
- FILES FORBIDDEN: `src/storage/sqlite/migrations/001-foundation.sql`, existing Run files, package/lock/tsconfig, existing Spec domain files, external adapters and UI
- MIGRATION: `002-spec.sql` creation authorized; database initialization registration authorized; historical migration edits forbidden
- PACKAGES: none; existing better-sqlite3, Zod, TypeScript, Vitest
- TEST-FIRST: `pnpm exec vitest run tests/integration/spec-persistence.test.ts -t "DOS-TEST-027"`
- SPECIFIC TEST: `pnpm exec vitest run tests/integration/spec-persistence.test.ts -t "DOS-TEST-027"`
- TYPESCRIPT: `pnpm exec tsc --noEmit`
- REGRESSIONS: `pnpm exec vitest run tests/integration/run-persistence.test.ts tests/unit/run.test.ts tests/unit/spec.test.ts tests/smoke/bootstrap.test.ts`; `./tests/check_structure.ps1`; native better-sqlite3 load through Run persistence.
- TEST DATABASE: isolated temporary/in-memory database; reopen case uses a temporary test database path and cleanup.
- EVIDENCE: `EVIDENCE/DOS-INC-002/DOS-TASK-017_RESULT.md`
- STOP: migration rewrite, package change, Run regression failure, concrete adapter need or forbidden file mutation.
- DoD: section 12.
- PACKET STATUS: COMPLETE.

## 21. Quality Gate

The specialized Gate requires TASK-016 and TASK-017 DONE; R003 FULL; DOS-TEST-026 and DOS-TEST-027 PASS; INC-001 27/27 regression PASS; TypeScript PASS; Spec History PASS; SQLite persistence PASS; Run persistence regression PASS; Architecture PASS; Domain→SQLite coupling 0; critical blockers 0; high blockers 0; Traceability COMPLETE; Evidence COMPLETE; scope leaks 0; canonical `pnpm test` PASS.

## 22. Findings

- FINDING-001: TASK-016/017 and TEST-026/027 were absent from normative task/test matrices. Classification MEDIUM, BLOCKING: NO. Corrected documentation-only.
- FINDING-002: existing migration file 001 is not to be rewritten; new migration and explicit database initialization permission are required. Classification HIGH, BLOCKING: NO after packet authorization.
- CR-001: LOW/NON-BLOCKING; excluded and deferred to separate maintenance.

## 23. Final Decision

All audit conditions pass. R003 target coverage is FULL, History semantics are defined, terminology is separated, packets are complete and no implementation change occurred.

**DOS-INC-002 SPEC/TASK AUDIT: PASS**  
**DOS-INC-002 STATUS: READY_FOR_IMPLEMENTATION**  
**NEXT READY TASK: DOS-TASK-016**  
**NEXT AUTHORIZED ACTION: IMPLEMENT DOS-TASK-016 ONLY**
