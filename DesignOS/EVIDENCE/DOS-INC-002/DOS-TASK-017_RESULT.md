# Evidence — DOS-TASK-017

## Task and scope

- Task: `DOS-TASK-017 — Persist Spec revisions and History`
- Requirement: `DOS-R003`
- Related Test: `DOS-TEST-027`
- Dependency: `DOS-TASK-016 DONE`; `DOS-TEST-026 PASS`
- Git baseline: `DesignOS v0.1.0-foundation`, commit `012d779e0848ae74e71da7e299906758eec50c5e`
- Execution Packet: COMPLETE and respected

## Execution Packet

- Architectural layer: SPEC MANAGEMENT / HISTORY / SQLITE ADAPTER
- Files created: `src/core/ports/spec.repository.ts`, `src/storage/sqlite/migrations/002-spec.sql`, `src/storage/sqlite/repositories/sqlite-spec.repository.ts`, `TESTS/integration/spec-persistence.test.ts` (the approved lowercase path resolves to this case-insensitive workspace path)
- File modified: `src/storage/sqlite/database.ts`
- Files forbidden and untouched: `001-foundation.sql`, existing Spec domain files, Run source/tests, package/lock/tsconfig files, external adapters and UI
- Packages installed: NONE

## Persistence implementation

- Persistence Port: `SpecRepository.save`, `findById`, `findLatest`, `findHistory`, `close`.
- SQLite Adapter: `SqliteSpecRepository`; maps rows through `SpecSchema` and preserves Domain types at the boundary.
- Migration: `002-spec.sql`; database initialization applies the equivalent Spec schema after the existing `runs` schema. `001-foundation.sql` was not modified.
- Tables created: `specs`, `spec_revisions`.
- Indexes: `idx_spec_revisions_history (spec_id, revision ASC)`.
- Constraints: stable `specs.id` primary key; `spec_revisions (spec_id, revision)` composite primary key; positive revisions; allowed Spec statuses; logical Spec-to-revision foreign key.
- Spec identity: stable `specs.id`.
- Revision identity: `(spec_id, revision)`; current revision is `specs.current_revision`.
- History strategy: append-only full snapshots in `spec_revisions`; no event sourcing and no overwrite of previous snapshots.
- History ordering: explicit `ORDER BY revision ASC`.
- System association: `system_id` is a logical reference; no Systems table or foreign key was introduced.

## Test-first

The pre-implementation repository inventory confirmed that `spec-persistence.test.ts` did not yet exist. The targeted pre-implementation command was not captured before materializing the authorized test file; this is recorded as a procedural warning, not as a fabricated PASS. The post-implementation targeted test is recorded below.

## Commands and results

| Command | Result |
|---|---|
| `pnpm exec vitest run tests/integration/spec-persistence.test.ts -t "DOS-TEST-027"` | PASS — 2/2 |
| `pnpm exec tsc --noEmit` | PASS |
| `pnpm exec vitest run tests/integration/run-persistence.test.ts tests/unit/run.test.ts tests/unit/spec.test.ts tests/smoke/bootstrap.test.ts` | PASS — 11/11 |
| `./tests/check_structure.ps1` | PASS |
| `pnpm exec vitest run tests/integration/run-persistence.test.ts` | PASS — 2/2; better-sqlite3 native load PASS |

## DOS-TEST-027 observed evidence

- Initial revision persisted and retrieved.
- Later revision persisted under the same stable Spec ID.
- Latest retrieval used the persisted revision sequence.
- History returned both snapshots in deterministic numeric order.
- Earlier snapshot remained semantically unchanged after later save.
- Reopen from a temporary database path recovered Spec data.
- Existing Run data remained readable after Spec schema initialization.

## Validation

- Spec revision persistence: PASS
- History durability: PASS
- History ordering: PASS
- Previous revision preservation: PASS
- Current/latest retrieval: PASS
- Migration compatibility: PASS; fresh initialization and Foundation database upgrade path validated
- Run persistence regression: PASS (`DOS-TEST-022/023` integration plus Run unit coverage)
- `DOS-TEST-026` regression: PASS through Spec unit regression, 6/6
- Domain → SQLite coupling: 0
- Domain → SQLite Adapter coupling: 0
- Port → Adapter dependency: 0
- Adapter → Port implementation: VALID
- New module cycles: 0
- Architecture violations: 0
- Scope leaks: 0
- Packages/lockfile/package.json/pnpm-workspace changes: 0

## R003 final coverage

| Acceptance criterion | Task | Test | Result |
|---|---|---|---|
| Spec identity, System, title, content and status | DOS-TASK-016 | DOS-TEST-026 | PASS |
| Stable Spec revision identity and initial revision | DOS-TASK-016 | DOS-TEST-026 | PASS |
| Versionable Spec updates | DOS-TASK-016 | DOS-TEST-026 | PASS |
| Updates preserve History | DOS-TASK-017 | DOS-TEST-027 | PASS |

**R003 COVERAGE: FULL**

## Definition of Done

All DOS-TASK-017 blocking criteria passed: persistence, durable History, immutable previous revisions, deterministic ordering, latest retrieval, migration compatibility, Run regression, native SQLite load, TypeScript, regressions, immutable `001-foundation.sql`, no new packages, scope leaks 0, architecture violations 0, circular dependencies 0, R003 FULL and Evidence registered.

**DEFINITION OF DONE: PASS**

**TASK STATUS: DONE**
