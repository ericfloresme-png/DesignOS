# DesignOS v0.2.0-spec-foundation — Stable Version Record

## Version

- Version: `DesignOS v0.2.0-spec-foundation`
- Increment: DOS-INC-002 — Spec Foundation Enablement
- Status: STABLE
- Date: 2026-09-04
- Predecessor: `DesignOS v0.1.0-foundation`

## Scope

This stable version contains only the DOS-INC-002 Spec Foundation capability:

- Stable Spec identity and System association.
- Spec revision model and deterministic revision ordering.
- Durable Spec revision History.
- Current/latest revision retrieval.
- SpecRepository Port and SQLite Spec repository.
- `002-spec.sql` migration compatible with `001-foundation.sql`.
- Previous revision preservation and existing Run persistence compatibility.

It does not claim implementation of Version, Release, Issue/Fix, Knowledge, Obsidian, CodexAdapter, GitAdapter, Electron, React, UI or external architectural executors.

## Requirements Covered

- Selected Requirement: DOS-R003 — FULL.
- Global state: 12 FULL, 2 PARTIAL, 8 DEFERRED.
- Global MUST coverage remains PARTIAL outside this increment.

## Tasks and Tests

- Tasks: DOS-TASK-016, DOS-TASK-017 — DONE.
- Tests: DOS-TEST-026, DOS-TEST-027 — PASS.
- Full test baseline: 32 / 32 PASS, 0 FAIL, 0 SKIPPED.
- INC-001 regression: 27 / 27 PASS.
- TypeScript: PASS.

## Migration and Architecture

- Migration chain: `001-foundation → 002-spec`.
- `001-foundation.sql`: IMMUTABLE.
- `002-spec.sql`: ACTIVE.
- Existing Run persistence: PRESERVED.
- Architecture: TypeScript Core, Zod, Ports/Adapters, SQLite and better-sqlite3.
- Domain → SQLite coupling: 0.
- Architecture violations: 0.
- Module cycles: 0.

## Dependencies

- Node: v24.19.0.
- pnpm: 11.19.0.
- Zod: 4.5.4.
- TypeScript: 5.9.3.
- Vitest: 3.2.7.
- better-sqlite3: 13.0.3.
- New packages in DOS-INC-002: 0.
- Build allowlist: explicit for better-sqlite3 and esbuild.

## Known Findings

- DOS-TASK-017 initial test-first command was not captured; LOW, accepted for Stable. No historical result was fabricated.
- Planning wording contradiction: CLOSED.
- Version Identifier Gap: CLOSED.

## Deferred Capabilities

Version Engine, Release Engine, Issue/Fix Flow, Knowledge Engine, Obsidian runtime, CodexAdapter, GitAdapter, Electron/React UI, external executors and architectural systems remain outside this Stable scope.

## Traceability

DOS-R003 → Design → DOS-TASK-016 → DOS-TEST-026 → domain implementation → Evidence, and DOS-R003 → Design → DOS-TASK-017 → DOS-TEST-027 → persistence implementation → Evidence are COMPLETE.

## Evidence References

- `DOCUMENTATION/DOS_INC_002_QUALITY_GATE_v0.1.md`
- `DOCUMENTATION/DOS_INC_002_CANDIDATE_REVIEW_v0.1.md`
- `DOCUMENTATION/DOS_INC_002_TARGETED_CANDIDATE_RECHECK_v0.1.md`
- `DOCUMENTATION/DOS_INC_002_STABLE_REMEDIATION_VERSION_v0.1.md`
- `DOCUMENTATION/DOS_INC_002_TARGETED_STABLE_RECHECK_v0.1.md`
- `DOCUMENTATION/DOS_INC_002_STABLE_PROMOTION_v0.1.md`
- `EVIDENCE/DOS-INC-002/DOS-TASK-016_RESULT.md`
- `EVIDENCE/DOS-INC-002/DOS-TASK-017_RESULT.md`
- `EVIDENCE/DOS-INC-002/QUALITY_GATE_v0.1.md`
- `EVIDENCE/DOS-INC-002/TARGETED_STABLE_RECHECK_v0.1.md`
- `EVIDENCE/DOS-INC-002/STABLE_PROMOTION_v0.1.md`

## Release Boundary

Expected future Git tag: `designos-v0.2.0-spec-foundation`. No tag, commit or Release is created by Stable Promotion.
