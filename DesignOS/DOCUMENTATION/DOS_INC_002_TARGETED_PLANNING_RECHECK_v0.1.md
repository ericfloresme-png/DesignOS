# DOS-INC-002 — Targeted Planning Recheck v0.1

## 1. Executive Summary

The Requirement DAG is valid after the authorized remediations, but no candidate is fully transitive dependency-closed. Issue/Fix and Version Registration reach deferred Knowledge/Obsidian requirements; Knowledge also reaches partial Spec capability. DOS-INC-002 cannot be selected for implementation planning yet.

## 2. Validated Requirement DAG

- Requirements: 22
- Dependency edges: 59
- Direct cycles: 0
- Transitive cycles: 0
- Global DAG: VALID
- Previous R008/R012 fix: preserved.
- Previous R015/R016/R021 fix: preserved.

## 3. Current Requirement Coverage

| Classification | Requirements | Count |
|---|---|---:|
| IMPLEMENTED_IN_INC_001 | R001, R002, R004, R005, R006, R007, R009, R010, R011, R020, R022 | 11 |
| PARTIALLY_IMPLEMENTED | R003, R016, R021 | 3 |
| DEFERRED | R008, R012, R013, R014, R015, R017, R018, R019 | 8 |
| Total | R001–R022 | 22 |

R003 remains partial because full Spec revision/persistence is deferred. R016 remains partial because runtime Traceability is not complete. R021 has structural Foundation coverage but no complete runtime Release Gate.

## 4. Candidate A — Issue/Fix

- Required Requirements: R008, R012, R011, R004, R007, R010, R009, R001, R003, R017, R018.
- Dependency closed: **NO**; R017/R018 remain deferred and R003 is partial.
- Vertical slice: NO.
- Persistence required: YES, for Issue/Fix Task operational state.
- Conceptual tables: Issues, Fix Tasks, links to Tests/Runs/Evidence; exact schema deferred.
- Modules: ISSUE ENGINE, TASK ENGINE/TASK SERVICE, TEST ENGINE, RUN/EVIDENCE references.
- Tests: unit plus integration/flow and retest.
- External adapter: NO as a direct goal, but Knowledge/Obsidian transitive dependency is not runtime-ready.
- UI: NO.
- Value: highest correction-lifecycle value.
- Risk: high until Knowledge dependencies are separately planned.
- Unlocks: correction lifecycle, Evidence and later Version work.

## 5. Candidate B — Version

- Required Requirement: R014.
- Direct dependencies: R001, R010, R011.
- Dependency closed: **NO**; R014 reaches R010→R009→R017→R018→R003 transitively, including deferred R017/R018 and partial R003.
- Vertical slice: **YES**.
- Persistence required: YES.
- Conceptual tables: `versions` plus relation records for Requirements, Tasks, Runs and Tests as needed; no migrations in Planning.
- Modules: VERSION ENGINE, CORE contracts and operational storage adapter.
- Tests: unit state/validation tests and integration persistence tests.
- External adapter: NO.
- UI: NO.
- Value: high; establishes operational version state without prematurely implementing Release.
- Risks: persistence and state-transition integrity; no external integration risk.
- Unlocks: later Release Gate and curated Release Knowledge.

Version representation, registration and state transitions are in scope. Release creation, Git tags and RELEASED promotion are out of scope.

## 6. Candidate C — Knowledge/Obsidian

- Domain Knowledge slice ready: **NO** for a complete vertical slice; R003 is partial and Knowledge runtime remains deferred.
- Obsidian runtime ready: **NO**.
- Blockers: deferred R017/R018/R019, ObsidianAdapter boundary, curation and round-trip runtime. R017/R018 are graph-valid but not implementation-ready in the released codebase.

## 7. Prioritization Matrix

Scale: 1–5. For positive criteria, 5 is best. For complexity/risk criteria, 5 means low complexity/low risk. UI dependency is scored 5 when no UI is required.

| Candidate | Readiness | Lifecycle value | Arch leverage | Traceability | Testability | Persistence simplicity | External risk | UI independence | Implementation risk | Unlocking power | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Issue/Fix | 2 | 5 | 5 | 5 | 4 | 2 | 3 | 5 | 2 | 5 | 38 |
| Version Registration | 2 | 4 | 4 | 4 | 5 | 3 | 5 | 5 | 3 | 4 | 39 |
| Knowledge/Obsidian | 1 | 3 | 4 | 3 | 3 | 2 | 1 | 5 | 2 | 4 | 28 |

## 8. Selected Increment

- Selected increment: NONE.
- Reason: no candidate is fully transitive dependency-closed.
- DOS-INC-002 objective: unresolved; no implementation scope is authorized.
- Dependencies: transitive closure remediation and subsequent planning recheck.
- In/out scope: no product implementation selected.

## 9. Scope

Explicitly excluded: Electron, React, CodexAdapter, ObsidianAdapter, GitAdapter, Release execution, Version-to-Release flow, Knowledge synchronization, external architecture executors and all other Requirements.

## 10. Requirement Closure

| Requirement | Direct dependencies | Transitive prerequisites | Baseline satisfied | INC-002 work | Target |
|---|---|---|---|---|---|
| R014 | R001, R010, R011 | R003, R004, R007, R009, R017, R018 and upstream closure | NO | Not authorized | NONE |

R010 closure reaches R009, and R009 explicitly depends on R017. Therefore R014 cannot be declared closed by considering only its direct dependencies.

## 11. Design Modules

Ownership is clear: Version behavior belongs to VERSION ENGINE; IDs/state contracts belong to CORE; persistence uses the existing operational storage boundary. Module cycles: 0. Port/adapter boundaries: VALID. No design gap found.

## 12. Persistence

Conceptually persist Version identity, System reference, state, change summary, timestamps and links to applicable Requirements/Tasks/Runs/Tests. Future repository ports and SQLite tables are part of implementation planning; no migration files are created here.

## 13. Task Set

No Tasks are proposed because no candidate passes transitive closure.

<!-- Historical candidate task sketch intentionally omitted; no Task IDs are reserved by this recheck. -->

<!--
### DOS-TASK-016 — Define Version model and registration

- Related Requirements: R014
- Dependencies: released Foundation and existing domain contracts
- Design Module: VERSION ENGINE / CORE
- Areas likely affected: `src/core/version/`, Version repository port, unit tests
- Persistence impact: Version record contract only
- Adapter impact: none
- Expected Tests: DOS-TEST-026
- DoD: valid Version registration and invalid input rejection are tested; R014 fields and relations are represented.
- Packet Ready: YES

### DOS-TASK-017 — Implement Version state transitions

- Related Requirements: R014
- Dependencies: DOS-TASK-016
- Design Module: VERSION ENGINE
- Areas likely affected: Version state transition service and tests
- Persistence impact: state changes and history records
- Adapter impact: none
- Expected Tests: DOS-TEST-027
- DoD: only DRAFT→TESTING→CANDIDATE→STABLE→RELEASED transitions allowed; invalid transitions and history are tested.
- Packet Ready: YES
-->

## 14. Task DAG

No Task DAG is created.

- Task DAG: NOT APPLICABLE — no selected increment
- Direct Task cycles: 0
- Transitive Task cycles: 0
- Granularity: each Task has one coherent responsibility, bounded scope and objective validation.

## 15. Test Plan

No Tests are proposed because no implementation Task is authorized.

<!--
### DOS-TEST-026

- Type: UNIT
- Related Requirements: R014
- Related Task: DOS-TASK-016
- Blocking: YES
- Purpose: validate Version fields, identity, registration and required relations.

### DOS-TEST-027

- Type: UNIT / INTEGRATION
- Related Requirements: R014
- Related Task: DOS-TASK-017
- Blocking: YES
- Purpose: validate state transitions, rejected transitions and preserved history.
-->

## 16. Requirement-Test Matrix

| Requirement | Tests | Coverage |
|---|---|---|
| None | None | NOT APPLICABLE |

## 17. Task-Test Matrix

| Task | Tests | Coverage |
|---|---|---|
| None | None | NOT APPLICABLE |

## 18. Regression Baseline

Mandatory INC-001 regression: **27/27 PASS**. No historical Test changes are authorized. With two proposed new Test IDs, the expected test structure is 27 plus the new cases, subject to actual case counts.

## 19. CR-001 Decision

**DEFER — SEPARATE_MAINTENANCE_TASK.** CR-001 is LOW/NON-BLOCKING stale documentation status. It is not required for R014 and will not be fixed or included in DOS-INC-002.

## 20. Quality Gate

Before implementation completion: DOS-TASK-016/017 DONE; R014 FULL; DOS-TEST-026/027 PASS; INC-001 27/27 regression PASS; TypeScript PASS; architecture PASS; scope leaks 0; critical/high blockers 0; traceability COMPLETE; Evidence COMPLETE; persistence validation PASS; canonical `pnpm test` PASS.

## 21. Release Readiness Preconditions

Git identity, canonical pnpm test, build policy, package mutation permissions, migration permissions, release evidence immutability and post-release operational evidence are carried forward as DEFINED from INC-001.

## 22. Execution Packet Readiness

| Task | Packet Ready |
|---|---|
| None | 0/0 |

Future packets can specify files, forbidden files, existing packages, commands, tests, regressions, Evidence and DoD without introducing technology. No packet is created in this recheck.

## 23. Final Decision

**DOS-INC-002 TARGETED PLANNING RECHECK: BLOCKED**  
**DOS-INC-002 STATUS: PLANNING_BLOCKED**  
**NEXT AUTHORIZED ACTION: PLANNING REMEDIATION — TRANSITIVE DEPENDENCY CLOSURE**

No implementation, migration, package installation, Task execution or Test execution occurred.
