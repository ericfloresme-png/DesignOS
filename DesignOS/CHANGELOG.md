# Changelog

## DesignOS v0.1.0-foundation — STABLE

### Added

- Foundation técnica reproducible con pnpm, TypeScript, Zod y Vitest.
- Domain models mínimos para System, Spec, Requirement, Design, Task y Test.
- Context Pack determinista y traceable.
- Run model y persistencia operativa SQLite mediante port/adapter.
- Test Definition / Registration con estados, resultados, historial, affected/regression y coverage conceptual.

### Changed

- Build policy explícita en `pnpm-workspace.yaml` para `better-sqlite3` y `esbuild`.

### Fixed

- QG-001: reproducibilidad del build/test de pnpm.
- DOS-TEST-002: assertion temporal no definida por la Spec.

### Tests

- Baseline estable: 11 archivos, 27 tests, 27 PASS, 0 FAIL, 0 SKIPPED.
- TypeScript: PASS.
- Foundation, SQLite native load y Run persistence: PASS.

### Known Issues

- CR-001: texto histórico desactualizado en Implementation Readiness; LOW, NON-BLOCKING, OPEN.

### Deferred

- Codex execution runtime, Obsidian synchronization, Issue/Version/Release/Knowledge engines completos, Electron/React UI, external Executors y sistemas arquitectónicos específicos.
