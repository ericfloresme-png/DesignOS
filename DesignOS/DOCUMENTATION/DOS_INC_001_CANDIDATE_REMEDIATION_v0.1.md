# DOS-INC-001 Candidate Remediation v0.1

## 1. QG-001

QG-001 was caused by `pnpm test` stopping at `ERR_PNPM_IGNORED_BUILDS` before executing the suite.

## 2. Root Cause

pnpm 11.19.0 had a build-policy placeholder in `pnpm-workspace.yaml`. The installed dependency graph reported two pending lifecycle builds.

## 3. pnpm Build Policy

Before remediation, the policy did not explicitly approve lifecycle scripts. After remediation, the project stores the minimal explicit allowlist supported by pnpm 11.19.0:

```yaml
allowBuilds:
  better-sqlite3: true
  esbuild: true
```

## 4. Ignored Dependencies

`pnpm ignored-builds` reported:

- `better-sqlite3` — direct dependency; required for the authorized SQLite Run persistence foundation and native load.
- `esbuild` — transitive dependency through Vite/Vitest; required by the approved test runner toolchain.

No irrelevant package was approved.

## 5. Allowlist Decision

Both packages are part of the approved dependency graph and require lifecycle/build preparation. The allowlist contains exactly these two packages.

## 6. Configuration Applied

Modified only `pnpm-workspace.yaml`. `package.json` and `pnpm-lock.yaml` were not changed. No dependency was added, removed or versioned.

## 7. Reproducibility Validation

- `pnpm ignored-builds`: PASS; no pending builds after policy application/rebuild.
- `pnpm rebuild better-sqlite3 esbuild`: PASS.
- `pnpm install --frozen-lockfile`: PASS.
- `pnpm test`: PASS, exit code 0.

## 8. Test Validation

- Full suite: 11 files, 27 tests, 27 PASS, 0 FAIL, 0 SKIPPED.
- TypeScript canonical check: PASS.
- Foundation check: PASS.
- better-sqlite3 native load, SQLite open, statement and close: PASS.

## 9. Security Validation

No insecure bypass was used. TLS verification remains active. No `strict-ssl=false`, `NODE_TLS_REJECT_UNAUTHORIZED=0`, `dangerouslyAllowAllBuilds`, npm/yarn substitution or global indiscriminate build approval was used. `NODE_USE_SYSTEM_CA=1` remains only a process-scoped environment option when network access requires it and is not stored in source configuration.

## 10. Remaining Candidate Findings

- QG-001: CLOSED.
- CR-001 stale historical Readiness status: LOW, non-blocking, remains open for future documentation maintenance.

## 11. Final Status

- New dependencies: 0
- Removed dependencies: 0
- Version changes: 0
- Product code modified: NO
- QG-001: CLOSED
- Candidate remediation result: PASS
- DOS-INC-001 status: READY_FOR_CANDIDATE_RECHECK
- Next authorized action: TARGETED CANDIDATE RECHECK

No STABLE or RELEASED transition was performed.
