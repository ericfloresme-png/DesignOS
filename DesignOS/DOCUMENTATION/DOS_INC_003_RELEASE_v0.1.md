# DesignOS v0.3.0-project-flow

Release Candidate: `DesignOS v0.3.0-project-flow`  
Release date: 2026-09-04

## Added

- Project domain with stable identity
- persistent Project repository
- Project → Spec association
- Project → Spec → Task linkage
- Task → Run validation
- Test Result persistence
- Evidence metadata persistence
- operational traceability
- append-only operational History
- `ProjectFlowService`
- migration `003-project-flow.sql`

## Validated

- Tests: 37/37 PASS
- TypeScript: PASS
- Migration 001 → 002 → 003: PASS
- SQLite reopen: PASS
- Spec History preserved
- Run persistence preserved
- ProjectFlowService: PASS
- Traceability: PASS
- History append-only: PASS
- Scope leaks: 0
- Architecture violations: 0

## Deferred

- UI
- Obsidian runtime integration
- Version Engine
- Release Engine
- Grasshopper adapter
- AutoCAD adapter
- ComfyUI adapter
- architectural executors

## Baseline

- Previous version: `DesignOS v0.2.0-spec-foundation`
- Previous commit/tag preserved.
- Release commit and tag are created only after the Release Gate passes.
