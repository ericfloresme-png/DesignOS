# DOS-INC-002 Planning v0.1

## 1. Executive Summary

DOS-INC-001 está liberado como `DesignOS v0.1.0-foundation`, commit `012d779e0848ae74e71da7e299906758eec50c5e`, tag `designos-v0.1.0-foundation`. Esta planificación analiza únicamente el siguiente slice sobre esa baseline.

Las auditorías de Requirements corrigieron R008/R012, R015/R016/R021 y R009/R017/R018. El DAG es válido. La remediación de cierre transitive identifica `DOS-R003` como el único slice de enablement pequeño, dependency-closed y arquitectónicamente coherente; completa la base de Specs sin arrastrar capacidades diferidas.

## 2. Released Baseline

- Version: `DesignOS v0.1.0-foundation`
- Commit: `012d779e0848ae74e71da7e299906758eec50c5e`
- Tag: `designos-v0.1.0-foundation`
- Status: RELEASED
- Test baseline: 27/27 PASS
- Post-release execution records remain operational records and are not functional DOS-INC-002 changes.

## 3. Deferred Requirement Inventory

| Requirement | Classification | Dependencies | Future capability |
|---|---|---|---|
| DOS-R001 | IMPLEMENTED_IN_INC_001 | — | System |
| DOS-R002 | IMPLEMENTED_IN_INC_001 | R001 | System administration |
| DOS-R003 | PARTIALLY_IMPLEMENTED | R001 | Full Spec revision/persistence |
| DOS-R004 | IMPLEMENTED_IN_INC_001 | R003 | Requirements |
| DOS-R005 | IMPLEMENTED_IN_INC_001 | R004, R006, R007, R011, R012, R014 | Relations |
| DOS-R006 | IMPLEMENTED_IN_INC_001 | R003 | Design |
| DOS-R007 | IMPLEMENTED_IN_INC_001 | R004 | Tasks |
| DOS-R008 | DEFERRED | R012 | Fix Tasks |
| DOS-R009 | IMPLEMENTED_IN_INC_001 | R001, R003, R004, R007, R017 | Context Pack |
| DOS-R010 | IMPLEMENTED_IN_INC_001 | R009 | Codex/Run |
| DOS-R011 | IMPLEMENTED_IN_INC_001 | R004, R007, R010 | Tests |
| DOS-R012 | DEFERRED | R011 | Issues from FAIL |
| DOS-R013 | DEFERRED | R010, R011, R012, R014 | Evidence |
| DOS-R014 | DEFERRED | R001, R010, R011 | Versions |
| DOS-R015 | DEFERRED | R013, R014, R021 | Releases |
| DOS-R016 | PARTIALLY_IMPLEMENTED | R005, R006, R007, R010, R011, R012, R013, R014 | Full traceability |
| DOS-R017 | DEFERRED | R018 | Obsidian query |
| DOS-R018 | DEFERRED | R003 | Persistent Knowledge |
| DOS-R019 | DEFERRED | R017, R018 | Curation |
| DOS-R020 | IMPLEMENTED_IN_INC_001 | R001, R003, R004, R007, R014 | History slice |
| DOS-R021 | PARTIALLY_IMPLEMENTED | R003, R004, R006, R007, R011, R013, R014, R016, R020 | Full Release validation |
| DOS-R022 | IMPLEMENTED_IN_INC_001 | — | Project Foundation |

The actual deferred-only count is **8**: DOS-R008, R012, R013, R014, R015, R017, R018 and R019. The prior count of 11 included the three partial Requirements R003, R016 and R021.

## 4. Requirement DAG

The relevant dependency edges include:

`R001 → R002, R003, R009, R014, R020`  
`R003 → R004, R006, R009, R018, R020`  
`R004 → R005, R007, R009, R011, R020, R021`  
`R006 → R005, R016, R021`  
`R007 → R005, R009, R020, R021`  
`R009 → R010, R017`  
`R010 → R011, R013, R014, R016`  
`R011 → R005, R012, R013, R014, R021`  
`R012 → R005, R008, R013`  
`R013 → R015, R016`  
`R014 → R005, R013, R015, R016, R021`  
`R015 → R016, R017, R018, R021`  
`R017 → R019`  
`R018 → R017, R019`  
`R020 → R021`

The previous cycles were caused by workflow, traceability and knowledge/version relationships being encoded as implementation prerequisites. The corrected orders are `DOS-R011 → DOS-R012 → DOS-R008`, `DOS-R015 → DOS-R021 → DOS-R016` and `DOS-R003 → DOS-R018 → DOS-R017 → DOS-R009`; Knowledge candidates do not require a Release, while Context Pack consumes relevant Knowledge.

### Historical / previous planning state

**PREVIOUS PLANNING STATE: BLOCKED — Requirement DAG contained cycles discovered during initial planning.**

The resolved historical findings were `R008 ↔ R012`, `R015 → R021 → R016 → R015` and `R009 ↔ R017`. They are preserved here as planning history and are not active blockers.

### Current authoritative state

**GLOBAL REQUIREMENT DAG: VALID**

**CURRENT METRICS:**

- Requirements: 22
- Dependency edges: 59
- Direct cycles: 0
- Transitive cycles: 0

**RESOLUTION:** Requirement dependency cycles were removed through Spec Requirements Audits 01, 02 and 03. The current authoritative planning state selects `DOS-INC-002 — Spec Foundation Enablement` with selected Requirement `DOS-R003`.

The remaining sections that describe the preliminary blocked planning state are retained as historical records. They do not supersede this current authoritative state or the later closure, audit, implementation and Candidate records.

## 5. Candidate Capabilities

| Capability | Dependency readiness | Lifecycle value | Testability | Risk | Decision |
|---|---:|---:|---:|---:|---|
| Issue + Fix Task flow | 5/5 | 5/5 | 4/5 | 3/5 | Ready for targeted planning recheck |
| Version registration | 3/5 | 5/5 | 4/5 | 4/5 | Blocked downstream by Evidence/Issue graph and planned task dependencies |
| Knowledge/Obsidian | 1/5 | 4/5 | 2/5 | 5/5 | Not ready; depends on Version/Release and deferred adapter boundary |

Scale: 0 = unavailable/high risk, 5 = fully ready/low risk. Scores guide planning only and do not create Requirements.

## 6. Prioritization

Issue/Fix has the greatest lifecycle leverage but cannot be dependency-closed. Version has high value but its approved implementation chain depends on Evidence and Issue capabilities. Knowledge/Obsidian has the highest external and integration risk and is not a suitable next slice.

## 7. Increment Options

### OPTION A — Issue and Fix Flow

- Objective: FAIL → Issue → Fix Task → retest.
- Requirements: DOS-R008, DOS-R012.
- Dependencies: DOS-R011 plus corrected R008/R012 dependency direction.
- Modules: ISSUE ENGINE, TASK ENGINE integration.
- Persistence: likely Issues and relations; conceptual only.
- Tests: Issue from failure, fix task and retest flow; P0/blocking.
- Approximate Tasks: 3–4.
- Risk: HIGH due circular Requirements.
- Value: HIGH; unlocks correction lifecycle.
- Unlocks: Evidence, Version and full Traceability downstream.
- Why now/not now: high value, but not now because the DAG is invalid.

### OPTION B — Version Registration

- Objective: register and transition Versions.
- Requirements: DOS-R014.
- Dependencies: R001, R010, R011; downstream Release requires Evidence and Gate support.
- Modules: VERSION ENGINE.
- Persistence: Versions and relations; conceptual only.
- Tests: version state transitions; P0/blocking.
- Approximate Tasks: 3–4.
- Risk: MEDIUM/HIGH due incomplete Evidence and Release prerequisites.
- Value: HIGH.
- Unlocks: Release and Knowledge.
- Why now/not now: valuable, but the approved task graph places it after deferred capabilities not yet validly plannable.

### OPTION C — Knowledge/Obsidian Round Trip

- Objective: curate and exchange persistent Knowledge.
- Requirements: DOS-R017, DOS-R018, DOS-R019.
- Dependencies: R003, R015 and the Obsidian boundary.
- Modules: KNOWLEDGE ENGINE, OBSIDIAN CONNECTOR.
- Persistence: Knowledge references; conceptual only.
- Tests: curation and round trip; P0/blocking.
- Approximate Tasks: 4–5.
- Risk: HIGH due external adapter and upstream dependencies.
- Value: MEDIUM/HIGH.
- Unlocks: persistent project memory.
- Why now/not now: not now; it is not the smallest core slice and depends on deferred Release capabilities.

## 8. Recommended Increment

**INCREMENT ID:** DOS-INC-002  
**TITLE:** Issue/Fix Flow Planning Blocked by Requirement Cycle  
**OBJECTIVE:** Prepare a dependency-closed Issue/Fix planning slice after the authorized R008/R012 dependency correction.  
**IN SCOPE:** dependency analysis, gap reporting and future planning prerequisite only.  
**OUT OF SCOPE:** code, migrations, Tasks execution, Issue Engine, Version Engine, Obsidian, Codex, UI and changes to Requirements/Design.

**REQUIREMENTS:** None selected for implementation.  
**DEPENDENCIES:** DOS-INC-001 released baseline; corrected Requirement DAG; targeted planning recheck required.  
**DESIGN MODULES:** ISSUE ENGINE / TASK ENGINE boundary, analysis only.  
**EXPECTED TESTS:** None created; future tests remain DOS-TEST-011 and related tests.  
**PERSISTENCE IMPACT:** None.  
**EXTERNAL ADAPTER IMPACT:** None.  
**UI IMPACT:** None.

## 9. Requirement Coverage

No Requirement is selected for implementation in this blocked planning state. Therefore no included Requirement can be falsely marked FULL. Future Issue/Fix scope must reach FULL for R008 and R012 together after the cycle is resolved.

## 10. Design Modules

No module is authorized for implementation. The released architecture remains unchanged: Domain Core, Ports/Adapters, SQLite operational persistence and deferred integration boundaries.

## 11. Persistence Impact

No new tables, migrations or persistence changes are proposed in this blocked plan.

## 12. Adapter Impact

No adapter is selected. CodexAdapter, ObsidianAdapter and GitAdapter remain deferred.

## 13. UI Impact

No Electron or React work is proposed.

## 14. Task DAG

No implementation Tasks are proposed because the Requirement DAG is invalid. Any future Task DAG for Issue/Fix must be rederived after the Requirements decision.

**TASK DAG: ACYCLIC** — empty planning DAG  
**CIRCULAR TASK DEPENDENCIES: 0**

## 15. Test Plan

No new Tests are written. Future mapping remains:

- DOS-R008/R012 → DOS-TEST-011, after dependency correction.
- DOS-R013 → DOS-TEST-012, after prerequisites.
- DOS-R014/R015 → DOS-TEST-013–015, after prerequisites.
- DOS-R017–R019 → DOS-TEST-017–021, after prerequisites.

## 16. Regression Baseline

Mandatory baseline for any future DOS-INC-002 implementation: DOS-INC-001 regression suite, **27 / 27 PASS**. Historical Tests must not be modified without explicit triage.

## 17. Risks

- Critical: implementing Issue/Fix against the current circular Requirement graph would violate SSD/SDD traceability.
- High: selecting Version before Evidence/Issue prerequisites would create an incomplete vertical slice.
- High: starting Obsidian would introduce external adapter scope prematurely.
- Low: CR-001 remains a non-blocking documentation issue; it does not cause this planning block.

## 18. Quality Gate

Not applicable as an implementation Gate because no Tasks are selected. The future Gate must require: Tasks DONE, included MUST coverage FULL, P0 PASS, 27/27 regression preserved, TypeScript PASS, zero critical blockers, complete traceability/Evidence, architecture PASS and zero scope leaks.

**QUALITY GATE: INCOMPLETE — planning recheck required before Task definition**

## 19. Release Readiness Preconditions

The following remain defined from DOS-INC-001 and must be inherited:

- Git identity: DEFINED.
- Release evidence strategy: DEFINED.
- Canonical `pnpm test` baseline: PASS.
- Build policy: DEFINED.

## 20. Known Issue Decision

CR-001 remains an OPEN, LOW, NON-BLOCKING Known Issue. It does not belong in the blocked implementation scope and does not justify a Fix Task before the next increment. It should be corrected through a separate documentation maintenance action when authorized.

## 21. Final Recommendation

Do not execute DOS-INC-002 Tasks. The final closure analysis selects the Spec Foundation Enablement slice; implementation still requires the subsequent Spec/Task audit.

**DOS-INC-002 PLANNING RESULT: PASS**  
**DOS-INC-002 STATUS: READY_FOR_IMPLEMENTATION**  
**NEXT AUTHORIZED ACTION: IMPLEMENT DOS-TASK-016 ONLY**

## 22. Final Targeted Planning Recheck

The preliminary blocked planning sections above are retained as audit history. The closure remediation supersedes the provisional “no increment” conclusion.

- Selected increment: `DOS-INC-002 — Spec Foundation Enablement`
- Selected Requirement: `DOS-R003`
- Issue/Fix blocker: deferred R017/R018 reached through R009.
- Version blocker: R014 reaches R010→R009→R017→R018→R003.
- Knowledge blocker: R018 depends on partial R003; Obsidian runtime remains deferred.
- INC-001 regression: mandatory `27/27 PASS` for any future implementation.

## 23. Transitive Closure Decision

The final selected set is `{DOS-R003}`. Its only prerequisite is R001, FULL in the released baseline. Proposed future Tasks are DOS-TASK-016 and DOS-TASK-017, with DOS-TEST-026 and DOS-TEST-027. No implementation or Execution Packet is created in this planning phase.

The subsequent Spec/Task Audit passed. DOS-TASK-016 is the only next authorized Task; DOS-TASK-017 remains blocked until DOS-TASK-016 is DONE.
