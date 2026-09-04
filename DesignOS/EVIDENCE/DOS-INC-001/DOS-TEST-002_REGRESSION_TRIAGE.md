# DOS-TEST-002 Regression Triage

- Detected During: DOS-TASK-003 regression execution
- Affected Task/Test: DOS-TASK-003 / DOS-TEST-002
- Requirement Analysis:
  - DOS-R001 requires creation of a System with an ID and name and rejection of duplicate IDs. It does not require timestamp ordering.
  - DOS-R002 requires metadata administration without losing identity; its acceptance criteria require stable ID and History, but do not explicitly require `updatedAt` to differ from the previous value or to be greater than `createdAt`.
  - `00_SPEC/design.md` defines `createdAt` and `updatedAt` as entity dates, but does not define strict monotonicity or same-millisecond update behavior.
  - Answer: updatedAt must change after update? **NO, not explicitly required by the current Requirement; temporal semantics are underspecified.**
  - Answer: updatedAt must be greater than createdAt? **NO, not required by the current Requirement or Design.**
  - Answer: does DOS-TEST-002 faithfully represent the Requirements? **NO.** The assertion `updated.updatedAt !== system.updatedAt` adds a stricter temporal condition than the documented acceptance criteria.
- Reproduction:
  - Command: `.\node_modules\.bin\vitest.CMD run tests/unit/system.test.ts --reporter=dot`
  - Executions: 5
  - Results: 3 FAIL, 2 PASS
  - Failure: `updated.updatedAt` equals `system.updatedAt` when both calls occur within the same millisecond.
  - Passing assertions: 2 of 3 tests passed in each execution; the timestamp inequality assertion was the only failing assertion.
- Root Cause Classification: **B — TEST DEFECT**. The test asserts a temporal inequality not required by DOS-R001/DOS-R002. The implementation's use of wall-clock ISO milliseconds exposes the mismatch, but the evidence does not establish an implementation violation of the current Spec.
- Flaky: **YES**. The result depends on scheduler/timing granularity; it is reproducible as an intermittent failure.
- Proposed Fix Scope: **TEST REMEDIATION REQUIRED; not implemented in this triage.** Before changing code, either align DOS-TEST-002 with the current Requirements by removing the undocumented strict inequality, or formally define a timestamp monotonicity invariant in the Spec/Design and authorize the corresponding implementation change. No sleeps, delays, retries, or timing-based workarounds are proposed.
- Files Authorized for Any Later Remediation: none in this triage. If a remediation is explicitly authorized, it must be limited to the existing DOS-TEST-002/model scope: `src/core/system/system.ts` and/or `tests/unit/system.test.ts`; no package, configuration, adapter, repository, UI, or unrelated entity changes.
- Tests Required After Authorized Remediation: DOS-TEST-002, TypeScript check, DOS-TEST-003, DOS-TEST-025, and DOS-TEST-001.
- Issue: not created; the evidence classifies this as a test/specification alignment problem, not a confirmed implementation issue.
- Fix Task: not created; no implementation defect was established.
- Impact on DOS-TASK-003: **BLOCKED**. Its required DOS-TEST-002 regression is not reliably PASS. DOS-TASK-003 must not be marked DONE until the test/specification alignment is resolved and the required regression suite passes.
- Status: **TRIAGE COMPLETE — TEST REMEDIATION REQUIRED; implementation stopped.**

