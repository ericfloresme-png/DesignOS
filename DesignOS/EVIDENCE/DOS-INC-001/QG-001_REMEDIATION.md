# QG-001 Remediation Evidence

## Original Finding

`pnpm test` stopped during preflight with `ERR_PNPM_IGNORED_BUILDS`, while the local Vitest binary passed 27/27 tests.

## Environment

- Node: v24.19.0
- pnpm: 11.19.0
- Declared package manager: `pnpm@11.19.0`

## Ignored Builds Detected

- `better-sqlite3` — direct dependency; required for Run persistence/native SQLite foundation.
- `esbuild` — transitive dependency of Vite/Vitest; required by the approved test runner.

## Build Policy

Before: placeholder values in `pnpm-workspace.yaml`; builds were not explicitly approved.  
After: explicit allowlist:

```yaml
allowBuilds:
  better-sqlite3: true
  esbuild: true
```

## Files Modified

- `pnpm-workspace.yaml`

No `package.json`, `pnpm-lock.yaml`, source, application, storage, tests, Spec or Design file was modified.

## Commands Executed

- `pnpm ignored-builds`
- `pnpm approve-builds --help`
- `pnpm rebuild better-sqlite3 esbuild`
- `pnpm install --frozen-lockfile`
- `pnpm test`
- `pnpm exec tsc --noEmit`
- `TESTS/check_structure.ps1`
- native better-sqlite3 smoke load/query/close

## Results

- `pnpm ignored-builds`: PASS; no pending builds after remediation.
- `pnpm rebuild`: PASS.
- Frozen install preflight: PASS.
- `pnpm test`: PASS, exit code 0; 11 files, 27 tests, 27 PASS, 0 FAIL, 0 SKIPPED.
- TypeScript: PASS.
- Foundation: PASS.
- better-sqlite3 native load: PASS.
- Insecure bypasses: 0.
- New dependencies: 0.
- Removed dependencies: 0.
- Version changes: 0.
- Product code modified: NO.

## Remaining Findings

- QG-001: CLOSED.
- CR-001 stale Readiness documentation: LOW, non-blocking.

## Status

**CANDIDATE REMEDIATION RESULT: PASS**  
**DOS-INC-001 STATUS: READY_FOR_CANDIDATE_RECHECK**  
**NEXT AUTHORIZED ACTION: TARGETED CANDIDATE RECHECK**
