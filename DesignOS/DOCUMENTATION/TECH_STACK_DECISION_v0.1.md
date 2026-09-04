# Tech Stack Decision — DesignOS Base v0.1

## 1. Context and constraints

DesignOS Base debe ser local-first, funcionar inicialmente en Windows, acceder de forma controlada al filesystem, ejecutar procesos locales en el futuro, integrarse con Git, Codex y un vault local de Obsidian, y mantenerse como modular monolith. No se implementan todavía funcionalidades, adapters ni UI.

Requirements relevantes: DOS-R001–DOS-R021. Design relevante: CORE, Application Services, Engines, Adapters, Storage y UI desacoplada.

## 2. Options evaluated

- A: Electron + TypeScript.
- B: Tauri + frontend web + Rust.
- C: Local Web Application con frontend y backend local.
- D: .NET desktop + web UI local. Se considera, pero añade un segundo ecosistema principal.

Electron integra Chromium y Node.js en una aplicación desktop y separa main/renderer processes, con acceso nativo desde el proceso principal. Tauri usa un frontend web y un backend Rust comunicados por message passing, sin empaquetar un browser engine completo. SQLite es serverless y zero-configuration.

Fuentes oficiales: [Electron Introduction](https://www.electronjs.org/docs/latest/), [Electron Process Model](https://www.electronjs.org/docs/latest/tutorial/process-model), [Tauri Architecture](https://tauri.app/concept/architecture/), [SQLite Serverless](https://www.sqlite.org/serverless.html).

## 3. Decision Matrix

Escala: 1 = débil, 5 = fuerte. En Complexity, 5 significa menor complejidad para este MVP.

| Criterio | Electron + TS | Tauri + Rust | Local Web | .NET + web |
|---|---:|---:|---:|---:|
| Development Speed | 5 | 3 | 4 | 3 |
| Codex Development Experience | 5 | 3 | 4 | 3 |
| Windows Compatibility | 5 | 4 | 4 | 5 |
| Filesystem Access | 5 | 5 | 3 | 5 |
| Local Process Execution | 5 | 5 | 2 | 5 |
| Obsidian Integration | 5 | 4 | 4 | 4 |
| Git Integration | 5 | 4 | 4 | 4 |
| Testing | 5 | 4 | 4 | 4 |
| UI Development | 5 | 5 | 5 | 4 |
| Maintainability | 4 | 4 | 4 | 4 |
| Extensibility | 5 | 5 | 4 | 4 |
| Security Boundary | 3 | 5 | 3 | 4 |
| Future Executor Integration | 5 | 5 | 3 | 4 |
| Packaging | 4 | 5 | 2 | 4 |
| Complexity | 4 | 3 | 4 | 3 |
| MVP Suitability | 5 | 3 | 4 | 3 |
| **Total / 80** | **75** | **66** | **56** | **61** |

Las puntuaciones son una decisión arquitectónica contextual, no una medición universal. Electron gana por minimizar lenguajes y maximizar velocidad/Codex; Tauri gana en boundary de seguridad y tamaño, pero introduce Rust e IPC desde el MVP.

## 4. Selected baseline

| Área | Decisión |
|---|---|
| Application Architecture | Desktop modular monolith |
| Desktop Shell | Electron |
| Core Language | TypeScript |
| UI | React + TypeScript, desacoplada del Core |
| Operational Database | SQLite |
| Validation | Zod para contratos runtime |
| Tests | Vitest + Playwright |
| Knowledge | Obsidian Markdown + YAML Frontmatter |
| Versioning | Git para código; DesignOS para versiones semánticas, Runs y Releases |
| Integration style | Adapters y servicios de aplicación |

React + TypeScript se selecciona por velocidad, tipado compartido y desacoplamiento. No se introduce un framework de estado o backend adicional en v0.1 sin Requirement.

## 5. Application Layers

UI
↓
APPLICATION SERVICES
↓
DOMAIN CORE
↓
ADAPTERS
↓
STORAGE / CODEX / OBSIDIAN / GIT / FILESYSTEM

UI no accede directamente a SQLite, filesystem, Git, Obsidian ni Codex. Application Services orquesta casos de uso; Domain Core contiene entidades, estados, reglas y trazabilidad; Adapters aíslan infraestructura.

## 6. Adapter Architecture

Interfaces conceptuales:

- CodexAdapter: recibe Context Pack y devuelve Run outcome.
- ObsidianAdapter: READ, WRITE, UPDATE, SEARCH y SYNC METADATA sobre Markdown/YAML futuros.
- GitAdapter: status, diff, commit y rollback bajo scope autorizado.
- EvidenceStorageAdapter: archivos pesados y metadata/hash.
- FutureExecutorAdapter: frontera futura para aplicaciones externas, sin incluirlas en v0.1.

Core depende de interfaces, no de proveedores concretos.

## 7. Data Storage Strategy

SQLite será la base operativa para Systems, Specs, Requirements, Tasks, Runs, Tests, Issues, metadata de Evidence, Versions, Releases, Knowledge y Traceability. JSON se reserva para export/import y Context Packs, no como base relacional principal.

Evidence pesada vive en filesystem, por ejemplo EVIDENCE/system_id/run_id. SQLite guarda locator, tipo, hash, tamaño, fecha y relaciones. Git conserva source code, diffs, branches, commits y rollback. DesignOS conserva metadata semántica, Runs, Tests, Evidence references, Issues, Versions, Releases y trazabilidad.

## 8. Obsidian Strategy

Obsidian no es Operational Database. El formato persistente recomendado es Markdown + YAML Frontmatter, con IDs estables como STD-001, DEC-001, LESSON-001, SPEC-001 y REL-001. Ventajas: legibilidad, portabilidad, versionabilidad con Git y compatibilidad con vault local. Limitaciones: consultas y concurrencia menos estructuradas; por eso DesignOS conserva metadata operativa en SQLite.

El Adapter se implementará después y debe soportar referencias inválidas, duplicados, historial y fallos sin corromper estado operativo.

## 9. Codex Strategy

DesignOS → Context Pack → CodexAdapter → Codex.

CodexAdapter es la frontera local mínima; no se acopla el modelo a una API o interfaz concreta. Context Pack será JSON determinista para transporte/auditoría y Markdown derivado para lectura humana/agente. El Run conserva el paquete, resultado, archivos modificados, errores y Tests ejecutados.

## 10. Testing Strategy

- Unit: Vitest para Domain Core, validadores y servicios puros.
- Integration: Vitest con SQLite temporal y adapters fake.
- Flow: Playwright para recorridos desktop/UI y harness de servicios.
- UI: Playwright para flujos críticos; no testear detalles visuales innecesarios.
- Schema: Zod valida Requirement, Task, Context Pack, Run, Test Result y Knowledge Record; entradas inválidas fallan explícitamente.
- Un comando principal futuro deberá ejecutar la suite completa y producir Evidence.

Documentación oficial: [Playwright TypeScript](https://playwright.dev/docs/test-typescript).

## 11. Security Principles

Least privilege; workspace boundaries; paths explícitos y normalizados; no modificar archivos externos fuera del scope; audit trail para procesos; confirmación para operaciones destructivas; secrets fuera del repositorio; allowlist para procesos futuros; no sandbox avanzado obligatorio en v0.1.

## 12. Folder Structure

    DesignOS/
    ├── core/
    │   ├── domain/
    │   ├── validation/
    │   └── traceability/
    ├── application/
    ├── adapters/
    │   ├── codex/
    │   ├── obsidian/
    │   ├── git/
    │   └── evidence/
    ├── storage/
    │   ├── sqlite/
    │   └── migrations/
    ├── ui/
    ├── tests/
    ├── 00_SPEC/
    ├── EVIDENCE/
    └── DOCUMENTATION/

La estructura es propuesta y no se crea en esta fase.

## 13. ADRs

### ADR-001 — Application Architecture

Context: local-first, filesystem, procesos y adapters. Options: Electron, Tauri, Local Web, .NET. Decision: Electron modular monolith. Consequences: velocidad alta y un lenguaje; runtime mayor y boundary de seguridad requiere disciplina. Risks: exposición indebida de Node; mitigación mediante main/preload/renderer y least privilege. Status: ACCEPTED.

### ADR-002 — Core Language

Context: minimizar lenguajes y compartir modelos. Options: TypeScript, Rust, C#. Decision: TypeScript. Consequences: velocidad y modelos compartidos; menor aislamiento nativo que Rust. Risks: errores runtime; mitigación con Zod y Tests. Status: ACCEPTED.

### ADR-003 — Operational Storage

Context: relaciones, integridad, portabilidad y local-first. Options: SQLite, JSON files. Decision: SQLite; JSON solo para intercambio. Consequences: queries y migraciones; requiere disciplina de schema/backup. Status: ACCEPTED.

### ADR-004 — UI Stack

Context: UI desacoplada y rápida. Options: React + TypeScript, vanilla web, framework complejo. Decision: React + TypeScript. Consequences: ecosistema amplio; dependencia adicional controlada. Status: ACCEPTED.

### ADR-005 — Testing

Context: unit, integration, flow y UI. Decision: Vitest + Playwright, con Zod para schemas. Consequences: cobertura por capas y ejecución integrada. Status: ACCEPTED.

### ADR-006 — Obsidian Integration Boundary

Context: Obsidian es memoria persistente, no DB operativa. Decision: ObsidianAdapter sobre Markdown + YAML; implementación posterior. Consequences: portabilidad y legibilidad; queries menos relacionales. Status: ACCEPTED.

### ADR-007 — Codex Integration Boundary

Context: Codex es executor principal pero puede evolucionar. Decision: CodexAdapter recibe Context Pack y produce Run. Consequences: Core no depende de API concreta. Status: ACCEPTED.

### ADR-008 — Evidence Storage

Context: Evidence puede ser pesada. Decision: filesystem + metadata/hash en SQLite. Consequences: backups coordinados y referencias auditables. Status: ACCEPTED.

### ADR-009 — Git Boundary

Context: separar cambios técnicos de operación semántica. Decision: Git posee código/diffs/commits/rollback; DesignOS posee Runs, Tests, Evidence, Issues, Versions, Releases y Traceability. Status: ACCEPTED.

## 14. Risks and follow-up

- Electron exige endurecer la frontera renderer/main antes de ejecutar procesos.
- SQLite requiere migraciones, backups y política de bloqueo.
- Obsidian Round Trip depende de disponibilidad y consistencia del vault.
- La decisión TypeScript reduce fricción, pero puede requerir un proceso aislado para executors futuros.
- Las decisiones aceptadas no sustituyen Tasks; deben convertirse en Tasks antes de implementación.

## 15. Implementation Readiness

| Área | Estado |
|---|---|
| Requirements MUST | READY |
| Codex workflow | READY |
| Obsidian boundary | READY FOR TASK DESIGN |
| Local filesystem | READY FOR TASK DESIGN |
| Automated tests | READY |
| Future Executors | READY FOR ADAPTER DESIGN |
| MVP complexity | READY |

## 16. GO / NO-GO

**GO FOR IMPLEMENTATION PLANNING ONLY.**

El stack seleccionado es suficientemente definido para iniciar la fase posterior de Tasks de implementación. No se creó aplicación, no se instalaron paquetes, no se modificó package.json, no se creó base de datos, no se creó UI y no se implementaron adapters.
