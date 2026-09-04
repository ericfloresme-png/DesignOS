# DOS-INC-002 — Transitive Dependency Closure v0.1

## 1. Executive Summary

The current Requirement DAG remains valid: 22 Requirements, 59 dependency edges and zero cycles. The actual implementation frontier is not the previous feature shortlist. `DOS-R003` is the smallest dependency-closed enablement slice and completes the partial Spec foundation without introducing deferred external capabilities.

## 2. Baseline Satisfied Set

`B` contains the 11 Requirements classified FULL in the released baseline:

`{R001, R002, R004, R005, R006, R007, R009, R010, R011, R020, R022}`

Partial Requirements are not added to B. Historical baseline implementations may use only a documented subset of a partial prerequisite; that does not make the partial Requirement FULL for new closure calculations. In particular, R022's bootstrap acceptance is explicitly limited to executable Foundation checks and does not imply full R021 Release validation.

## 3. Unfinished Requirement Inventory

| ID | Title | Priority | Status | Coverage | Direct dependencies | All transitive dependencies | Baseline satisfies dependency set | Unfinished dependencies | Design module |
|---|---|---|---|---|---|---|---|---|---|
| R001 | Crear Systems | MUST | IMPLEMENTED | FULL | — | — | YES | — | SYSTEM MANAGEMENT |
| R002 | Administrar Systems | MUST | IMPLEMENTED | FULL | R001 | R001 | YES | — | SYSTEM MANAGEMENT |
| R003 | Crear y mantener Specs | MUST | PARTIAL | PARTIAL | R001 | R001 | YES | — | SPEC MANAGEMENT |
| R004 | Gestionar Requirements | MUST | IMPLEMENTED | FULL | R003 | R001,R003 | YES* | R003 partial subset | REQUIREMENTS MANAGEMENT |
| R005 | Relacionar Requirements | MUST | IMPLEMENTED | FULL | R004,R006,R007,R011,R012,R014 | R001,R003,R004,R006,R007,R009,R010,R011,R012,R014,R017,R018 | NO* | R012,R014,R017,R018 | REQUIREMENTS MANAGEMENT |
| R006 | Documentar Design técnico | MUST | IMPLEMENTED | FULL | R003 | R001,R003 | YES* | R003 partial subset | DESIGN MANAGEMENT |
| R007 | Gestionar Tasks | MUST | IMPLEMENTED | FULL | R004 | R001,R003,R004 | YES* | R003 partial subset | TASK ENGINE |
| R008 | Crear Fix Tasks | MUST | DEFERRED | NONE | R012 | R001,R003,R004,R007,R009,R010,R011,R012,R017,R018 | NO | R003,R012,R017,R018 | TASK ENGINE / ISSUE FLOW |
| R009 | Preparar contexto para Codex | MUST | IMPLEMENTED | FULL | R001,R003,R004,R007,R017 | R001,R003,R004,R007,R017,R018 | NO* | R003,R017,R018 | CODEX ENGINE |
| R010 | Ejecutar Tasks con Codex y registrar Runs | MUST | IMPLEMENTED | FULL | R009 | R001,R003,R004,R007,R009,R017,R018 | NO* | R003,R017,R018 | RUN / CODEX ENGINE |
| R011 | Gestionar Tests | MUST | IMPLEMENTED | FULL | R004,R007,R010 | R001,R003,R004,R007,R009,R010,R017,R018 | NO* | R003,R017,R018 | TEST ENGINE |
| R012 | Gestionar Issues desde Tests FAIL | MUST | DEFERRED | NONE | R011 | R001,R003,R004,R007,R009,R010,R011,R017,R018 | NO | R003,R017,R018 | ISSUE ENGINE |
| R013 | Gestionar Evidence | MUST | DEFERRED | NONE | R010,R011,R012,R014 | R001,R003,R004,R007,R009,R010,R011,R012,R014,R017,R018 | NO | R003,R012,R014,R017,R018 | EVIDENCE ENGINE |
| R014 | Registrar Versions | MUST | DEFERRED | NONE | R001,R010,R011 | R001,R003,R004,R007,R009,R010,R011,R017,R018 | NO | R003,R017,R018 | VERSION ENGINE |
| R015 | Gestionar Releases | MUST | DEFERRED | NONE | R013,R014,R021 | R001,R003,R004,R005,R006,R007,R009,R010,R011,R012,R013,R014,R016,R017,R018,R020,R021 | NO | R003,R012,R013,R014,R016,R017,R018,R021 | RELEASE ENGINE |
| R016 | Mantener trazabilidad | MUST | PARTIAL | PARTIAL | R005,R006,R007,R010,R011,R012,R013,R014 | R001,R003,R004,R005,R006,R007,R009,R010,R011,R012,R013,R014,R017,R018 | NO | R003,R012,R013,R014,R017,R018 | HISTORY / TRACEABILITY |
| R017 | Consultar memoria Obsidian | MUST | DEFERRED | NONE | R018 | R001,R003,R018 | NO | R003,R018 | OBSIDIAN CONNECTOR |
| R018 | Registrar conocimiento persistente | MUST | DEFERRED | NONE | R003 | R001,R003 | NO | R003 | KNOWLEDGE ENGINE |
| R019 | Curar conocimiento | MUST | DEFERRED | NONE | R017,R018 | R001,R003,R017,R018 | NO | R003,R017,R018 | KNOWLEDGE ENGINE |
| R020 | Registrar History | MUST | IMPLEMENTED | FULL | R001,R003,R004,R007,R014 | R001,R003,R004,R007,R009,R010,R011,R014,R017,R018 | NO* | R003,R014,R017,R018 | HISTORY |
| R021 | Validar Foundation | MUST | PARTIAL | PARTIAL | R003,R004,R006,R007,R011,R013,R014,R016,R020 | R001,R003,R004,R005,R006,R007,R009,R010,R011,R012,R013,R014,R016,R017,R018,R020 | NO | R003,R012,R013,R014,R016,R017,R018 | CORE / RELEASE GATE |
| R022 | Executable Project Foundation | MUST | IMPLEMENTED | FULL | R021 | R001,R003,R004,R005,R006,R007,R009,R010,R011,R012,R013,R014,R016,R017,R018,R020,R021 | YES* | R021 full subset not required by bootstrap acceptance | PROJECT FOUNDATION |

`*` indicates an existing baseline implementation satisfies its documented current subset, but the full transitive graph still contains unfinished requirements. This is why coverage status and new-slice closure are tracked separately.

## 4. Partial Requirement Analysis

### R003 — Crear y mantener Specs

- Already implemented: basic Spec association and core fields.
- Remaining acceptance: versionable maintenance and preservation of history on updates.
- Why partial: full revision/persistence behavior is not in the released runtime.
- Direct/transitive dependencies: R001; transitive R001.
- Can finish without another deferred Requirement: YES.
- Can reach FULL in one small slice: YES.
- Unlocks: R018 Knowledge registration, stronger R006/R004 foundations and downstream Spec-dependent work.

### R016 — Mantener trazabilidad

- Already implemented: conceptual links and partial history/navigation coverage.
- Remaining acceptance: complete bidirectional traversal and missing-link detection across the full lifecycle.
- Why partial: Evidence and Version capabilities are deferred.
- Direct/transitive dependencies: direct R005,R006,R007,R010,R011,R012,R013,R014; unfinished R012,R013,R014,R017,R018 plus R003.
- Can finish without another deferred Requirement: NO.
- Can reach FULL in one small slice: NO; it requires multiple downstream capabilities.
- Unlocks: complete Release Gate and History/Traceability validation.

### R021 — Validar Foundation

- Already implemented: repository structure/Foundation validation and bootstrap evidence.
- Remaining acceptance: runtime validation of the complete Spec→Requirements→Design→Tasks→Tests→Evidence→Version→Release→Knowledge chain before Release.
- Why partial: R013, R014 and R016 are incomplete, and Knowledge references remain deferred.
- Direct/transitive dependencies: direct R003,R004,R006,R007,R011,R013,R014,R016,R020; unfinished R003,R012,R013,R014,R016,R017,R018.
- Can finish without another deferred Requirement: NO.
- Can reach FULL in one small slice: NO.
- Unlocks: Release eligibility and final Foundation Gate.

Deferred requirements transitively blocked: R003 blocks R018,R017,R019 and all feature paths consuming them; R016 blocks R021/R015; R021 blocks R015. Previous candidates blocked by R003: Issue/Fix, Version Registration and Knowledge/Obsidian. R003 has the highest enablement value among partials.

## 5. Implementation Frontier

Direct unfinished dependency count is zero for:

- Spec frontier: `R003, R012, R014`.
- Architecture-valid frontier: `R003` only. R012 requires the deferred Evidence/Issue flow boundary for its complete module behavior, and R014's Version Engine design depends on operational Evidence/Issue integration.

## 6. Topological Layers

- Layer 0: baseline FULL — `R001,R002,R004,R005,R006,R007,R009,R010,R011,R020,R022`.
- Layer 1: `R003,R012,R014`.
- Layer 2: `R008,R013,R018`.
- Layer 3: `R016,R017`.
- Layer 4: `R019,R021`.
- Layer 5: `R015`.

Layers describe unfinished dependency order, while existing baseline coverage may represent an explicitly narrower subset.

## 7. Candidate Critical Paths

- Issue/Fix: `R003 (PARTIAL) ← R017 (DEFERRED) ← R018 (DEFERRED) ← R009 (FULL subset) ← R010 (FULL subset) ← R011 (FULL subset) ← R012/R008 (DEFERRED)`. First unfinished blockers: R003, R017, R018.
- Version Registration: `R003 (PARTIAL) ← R018 (DEFERRED) ← R017 (DEFERRED) ← R009/R010/R011 (FULL subset) ← R014 (DEFERRED)`. First blocker toward the baseline is R003.
- Knowledge/Obsidian: `R003 (PARTIAL) ← R018 (DEFERRED) ← R017 (DEFERRED)`. First blocker: R003.

## 8. Closure Sets

| Target | Unfinished closure set | Count | Partial included | Deferred included | Modules | Persistence | External adapter | UI |
|---|---|---:|---|---|---|---|---|---|
| Issue/Fix | R003,R008,R012,R017,R018 | 5 | R003 | R008,R012,R017,R018 | Spec, Test, Run, Issue, Task, Knowledge, Codex | YES | YES transitively | NO |
| Version Registration | R003,R014,R017,R018 | 4 | R003 | R014,R017,R018 | Spec, Codex, Run, Test, Version, Knowledge, Obsidian | YES | YES transitively | NO |
| Knowledge Domain | R003,R018 | 2 | R003 | R018 | Spec, Knowledge | YES | NO | NO |
| Obsidian Runtime | R003,R017,R018 | 3 | R003 | R017,R018 | Spec, Knowledge, Obsidian | YES | YES | NO |

## 9. Enablement Increment Analysis

The smallest useful enablement increment is completion of R003. It reaches FULL with only one unfinished Requirement, uses existing Spec Management ownership, requires no external adapter and unlocks the Knowledge Domain closure and more reliable downstream planning.

## 10. Candidate Closed Sets

1. **Spec Foundation Enablement** — R003; 2 Tasks, 2 Tests; SQLite persistence for Spec revisions; no adapters; unlocks R018. Risk LOW.
2. **Spec + Knowledge Domain Foundation** — R003,R018; 3 Tasks, 3 Tests; Spec and Knowledge records; no Obsidian adapter; unlocks R017. Risk MEDIUM.
3. **Spec + Obsidian Query Foundation** — R003,R018,R017; 4 Tasks, 4 Tests; Knowledge persistence plus Obsidian port/adapter; external integration required; unlocks Context Pack injection. Risk HIGH.

## 11. Selected Increment

**DOS-INC-002 — Spec Foundation Enablement**  
Selected Requirements: `DOS-R003`  
Objective: complete versionable Spec maintenance and preserve revision History.

Baseline-satisfied prerequisite: R001.  
In scope: Spec revision model, validation, persistence port and revision History.  
Out of scope: R018/R017, Obsidian, Codex, Version, Release, UI and architectural systems.  
Modules: SPEC MANAGEMENT, CORE/HISTORY contracts.  
Persistence: Spec records and revision records; migration design only.  
Adapters: existing operational SQLite boundary only; no external adapter.  
UI: none.  
Unlocks: Knowledge Domain and more complete downstream Spec-dependent work.

## 12. Requirement Closure Proof

For R003, direct prerequisite R001 is FULL in INC-001 and has no unfinished transitive prerequisites. Therefore the selected set `{R003}` is dependency-closed and targets FULL coverage with no exception.

## 13. Architecture Coherence

Ownership is clear, ports/adapters remain valid, persistence uses the existing SQLite operational boundary, and no module cycle is introduced. The slice is coherent because revision/history is intrinsic to Spec maintenance and not an unrelated feature bundle.

## 14. Lifecycle Value

Before INC-002: Specs can be represented/associated, but full versionable revision maintenance and preserved update history are not available.  
After INC-002: a Spec can be revised, persisted and retrieved with prior revisions preserved, providing a stable foundation for future Knowledge and downstream lifecycle work.

## 15. Proposed Task Set

### DOS-TASK-016 — Complete Spec revision model

- Related Requirement: R003
- Dependencies: released Foundation
- Design Module: SPEC MANAGEMENT / CORE
- Expected Test: DOS-TEST-026
- Persistence: revision contract only
- Adapter: none
- DoD: Spec fields, System relation, revision identity and runtime validation reach the documented R003 subset.

### DOS-TASK-017 — Persist Spec revisions and History

- Related Requirement: R003
- Dependencies: DOS-TASK-016
- Design Module: SPEC MANAGEMENT / HISTORY
- Expected Test: DOS-TEST-027
- Persistence: Spec/revision records and History links
- Adapter: existing operational storage only
- DoD: updates preserve prior revisions, retrieval is deterministic and R003 acceptance is FULL.

## 16. Task DAG

`DOS-TASK-016 → DOS-TASK-017`

Direct Task cycles: 0. Transitive Task cycles: 0. Task DAG: ACYCLIC.

## 17. Test Plan

- DOS-TEST-026 — UNIT, R003, DOS-TASK-016, BLOCKING: validate Spec identity, required fields, System relation and invalid input rejection.
- DOS-TEST-027 — INTEGRATION, R003, DOS-TASK-017, BLOCKING: validate revision persistence, retrieval, preserved History and non-destructive updates.

## 18. Coverage Matrices

| Requirement | Test | Coverage |
|---|---|---|
| R003 | DOS-TEST-026, DOS-TEST-027 | COMPLETE; target FULL |

| Task | Test | Coverage |
|---|---|---|
| DOS-TASK-016 | DOS-TEST-026 | COMPLETE |
| DOS-TASK-017 | DOS-TEST-027 | COMPLETE |

## 19. Quality Gate

All proposed Tasks DONE; R003 FULL; DOS-TEST-026/027 PASS; INC-001 27/27 regression PASS; TypeScript PASS; architecture PASS; persistence PASS; traceability COMPLETE; Evidence COMPLETE; canonical `pnpm test` PASS; zero scope leaks and zero critical/high blockers.

## 20. Execution Packet Readiness

Both future Tasks are conceptually PACKET READY: YES. Packets can define create/modify/forbidden files, existing packages, commands, tests, regressions, Evidence and DoD. Detailed Execution Packets are not created in this remediation.

## 21. Final Decision

**TRANSITIVE DEPENDENCY CLOSURE: PASS**  
**DOS-INC-002 PLANNING RESULT: PASS**  
**DOS-INC-002 STATUS: PLANNED**  
**NEXT AUTHORIZED ACTION: DOS-INC-002 SPEC/TASK AUDIT**

No implementation, migration, package installation, Task execution or Test execution occurred.
