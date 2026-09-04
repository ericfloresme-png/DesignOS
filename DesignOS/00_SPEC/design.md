# DesignOS Base v0.1 — Design

## Propósito

DesignOS es el sistema madre que orquesta Systems reutilizables y el ciclo SSD/SDD. La arquitectura es modular, trazable, versionable y orientada a evidencia. DesignOS registra operación; Git conserva cambios técnicos; Obsidian conserva conocimiento persistente. Codex es el ejecutor principal y la arquitectura queda preparada para futuros Executors.

## Entidades principales

Todas las entidades tienen ID único, fechas de creación y actualización, estado y origen cuando aplique. Los IDs son inmutables; las modificaciones generan History.

| Entidad | Propósito, campos principales, relaciones y estados |
|---|---|
| SYSTEM | Unidad reutilizable. ID, nombre, descripción, repositorio y enlaces a Projects. Contiene las demás entidades. ACTIVE, ARCHIVED. |
| SPEC | Contrato funcional. ID, System, título, contenido y revisión. Se relaciona con Requirements, Design y Version. DRAFT, REVIEW, APPROVED, SUPERSEDED. |
| REQUIREMENT | Necesidad verificable. ID, título, descripción, prioridad, estado, criterios, dependencias e historial. Se relaciona con Spec, Design, Tasks, Tests y Versions. DRAFT, APPROVED, IMPLEMENTED, VERIFIED, DEPRECATED. |
| DESIGN | Solución técnica. ID, Spec, decisiones, constraints, componentes e interfaces. DRAFT, REVIEW, APPROVED, SUPERSEDED. |
| TASK | Unidad mínima enviada a Codex. ID, System, Requirements, alcance, constraints, archivos, Tests, Knowledge y Runs. TODO, READY, RUNNING, REVIEW, DONE, BLOCKED. |
| RUN | Ejecución auditable. ID, Task, System, fecha, Version, contexto, archivos modificados, resultado, Tests, errores, duración, Evidence y estado. QUEUED, RUNNING, COMPLETED, FAILED, CANCELLED. |
| TEST | Verificación de Requirements y Runs. ID, Requirements, Task, Run, tipo, expected, actual y resultado. NOT_RUN, RUNNING, PASS, FAIL, SKIPPED. |
| EVIDENCE | Prueba de lo ocurrido. ID, tipo, ubicación, descripción, origen y enlaces. Tipos FILE, IMAGE, LOG, REPORT, DIFF, DATA, OTHER. |
| ISSUE | Fallo o desviación. ID, Requirement, Test, Version, Run, expected, actual, Evidence, Fix Tasks y estado. OPEN, IN_PROGRESS, RESOLVED, CLOSED. |
| VERSION | Estado versionado del System. ID, Requirements, Tasks, Runs, Tests, Issues, Evidence, cambios y estado. DRAFT, TESTING, CANDIDATE, STABLE, RELEASED. |
| RELEASE | Publicación aprobada. ID, Version, Quality Gate, Evidence, notas y fecha. PREPARED, PUBLISHED, WITHDRAWN. |
| KNOWLEDGE | Conocimiento curado. ID, categoría, referencia, contexto, estado de curación y referencia Obsidian. CANDIDATE, CURATED, PUBLISHED, ARCHIVED. |

Cada entidad puede crear entidades de su siguiente etapa y consultar sus relaciones. Ninguna elimina historial.

## Relaciones y trazabilidad

Cadena principal:

SYSTEM → SPEC → REQUIREMENT → DESIGN → TASK → RUN → TEST → EVIDENCE → VERSION → RELEASE

Corrección:

TEST FAIL → ISSUE → FIX TASK → RUN → RETEST

Cada enlace conserva contexto temporal. Si cambia un Requirement, se crea una nueva revisión, se conserva su ID lógico y se enlaza la revisión anterior; Tasks y Tests conservan la revisión con la que fueron creados.

## Context Pack

CONTEXT PACK es un objeto lógico revisable antes de ejecutar. Contiene únicamente: System, Spec, Requirements, Task, Constraints, Relevant Files, Related Tests, Related Issues, Relevant Knowledge y Current Version. El paquete se conserva dentro del Run.

## Módulos y dependencias

| Módulo | Responsabilidad | Dependencias |
|---|---|---|
| CORE | IDs, validación, estados y contratos | Ninguna |
| SYSTEM MANAGEMENT | Systems y enlaces a Projects | CORE |
| SPEC MANAGEMENT | Specs y revisiones | CORE, SYSTEM |
| REQUIREMENTS MANAGEMENT | Requirements y dependencias | CORE, SPEC |
| DESIGN MANAGEMENT | Designs y decisiones | CORE, SPEC, REQUIREMENTS |
| TASK ENGINE | Tasks y Fix Tasks | CORE, REQUIREMENTS, DESIGN |
| CODEX ENGINE | Context Pack y ejecución abstracta | CORE, TASK, KNOWLEDGE |
| RUN ENGINE | Registro de Runs | CORE, TASK, VERSION |
| TEST ENGINE | Tests, affected/regression, coverage e historial | CORE, REQUIREMENTS, RUN |
| ISSUE ENGINE | Issues derivados de FAIL y solicitud de Fix Tasks | CORE, TEST, EVIDENCE, TASK SERVICE |
| EVIDENCE ENGINE | Evidencias y enlaces | CORE |
| VERSION ENGINE | Versions y promociones | CORE, REQUIREMENTS, TASK, RUN, TEST, ISSUE, EVIDENCE |
| RELEASE ENGINE | Quality Gate y Releases | VERSION, TEST, EVIDENCE, KNOWLEDGE |
| KNOWLEDGE ENGINE | Clasificación y curación | CORE, HISTORY |
| OBSIDIAN CONNECTOR | Frontera futura de lectura y escritura | KNOWLEDGE |
| HISTORY / TRACEABILITY | Auditoría y navegación | CORE |
| PROJECT / EXECUTION FOUNDATION | Bootstrap de entorno, dependencias, TypeScript y ejecución de Tests | CORE |

Las dependencias son acíclicas. TASK ENGINE no conoce ISSUE ENGINE. ISSUE ENGINE solicita Fix Tasks mediante la abstracción TASK SERVICE expuesta por TASK ENGINE. Executors futuros se conectarán al CODEX ENGINE sin modificar entidades.

PROJECT / EXECUTION FOUNDATION no es entidad de negocio: prepara el entorno reproducible para el Domain Core mediante pnpm, TypeScript, Zod y Vitest.

## Reglas de estados

Una Task pasa a READY solo con Requirement, alcance, Context Pack posible y Tests definidos. RUNNING crea un Run. DONE exige revisión y Tests relacionados ejecutados.

Un Test sigue NOT_RUN → RUNNING → PASS o FAIL. SKIPPED requiere motivo. Affected tests son los impactados por archivos, Requirements o dependencias modificadas. Regression tests son Tests PASS que deben repetirse tras cambios relacionados. Coverage es la proporción de Requirements aplicables con Tests ejecutados y resultados registrados. Test history conserva cada ejecución.

Una Version sigue DRAFT → TESTING → CANDIDATE → STABLE → RELEASED. Promover exige completar el estado previo, Tests obligatorios PASS, Evidence suficiente, cero Issues críticos abiertos y documentación actualizada. Una corrección posterior crea otra Version.

## Quality Gate

El Release Engine valida Requirements cubiertos por Design, Task y Test; Tests obligatorios PASS; Issues críticos igual a cero; Evidence mínima; trazabilidad completa; History disponible; Knowledge y documentación actualizadas. Si una condición falla, no se crea Release.

## Obsidian y Knowledge Curation

Lectura: OBSIDIAN → Relevant Knowledge → CONTEXT PACK → CODEX.

Escritura: RESULTADOS → CURATION → KNOWLEDGE → OBSIDIAN.

Categorías: SPEC, STANDARD, DECISION, LESSON, RELEASE, ARCHITECTURE, RULE, DOCUMENTATION, BITACORA.

La curación promueve información reutilizable, estable, normativa, decisional, explicativa, arquitectónica o necesaria para un Release. Logs efímeros, estados transitorios, contexto redundante y datos operativos permanecen en DesignOS.

## Responsabilidades y ownership

DesignOS orquesta, relaciona, valida estados y registra operación. Codex desarrolla y ejecuta Tasks. Executors futuros operan aplicaciones externas. Git posee código, diffs, branches y commits. DesignOS posee metadatos, estados, enlaces, Runs y registros operativos. Obsidian posee conocimiento curado y DesignOS conserva referencias para evitar duplicación.

## Flujos principales

1. CREATE SYSTEM: validar ID, crear System y abrir History.
2. DEFINE SPEC: seleccionar System, crear/revisar Spec y relacionar Requirements.
3. CREATE TASK: seleccionar Requirement/Design, definir alcance, constraints y Tests, marcar READY.
4. RUN WITH CODEX: generar Context Pack, revisar, enviar a Codex, crear RUN y registrar resultado.
5. TEST PASS: ejecutar Test, registrar PASS/Evidence y actualizar Version.
6. TEST FAIL: registrar FAIL/Evidence, crear Issue y bloquear o marcar Version según severidad.
7. FIX ISSUE: Issue → solicitud mediante TASK SERVICE → Fix Task → Context Pack → Codex → Run → Retest.
8. CREATE VERSION: seleccionar cambios y crear Version DRAFT.
9. PROMOTE VERSION: ejecutar Quality Gate por estados.
10. CREATE RELEASE: aprobar Gate, registrar Release y publicar Knowledge/documentación.
11. READ FROM OBSIDIAN: consultar referencias curadas, seleccionar relevancia y preparar Context Pack.
12. WRITE TO OBSIDIAN: seleccionar resultados, curar, publicar Knowledge y guardar referencia.

## Diagrama general

                         OBSIDIAN
                         ↕
SYSTEM → SPEC → REQUIREMENT → DESIGN → TASK
                                      ↓
                              DESIGNOS CORE
                                      ↓
                                CODEX ENGINE
                                      ↓
                                     RUNS
                                      ↓
                                TEST ENGINE
                                 ↙       ↘
                              PASS       FAIL → ISSUE → FIX TASK
                               ↓
                         VERSION / RELEASE
                               ↓
                          KNOWLEDGE

## Projects

Un System puede enlazarse a Projects mediante project_ref y contexto de repositorio, sin diseñar el módulo Projects en v0.1. El System sigue siendo la unidad de trazabilidad.

## Data ownership

| Área | Propietario |
|---|---|
| Metadatos, estados, relaciones, Runs, Issues y operación | DesignOS |
| Código, diffs, branches y commits | Git |
| Knowledge curado, Decisions, Standards, Lessons, Releases y bitácora | Obsidian |

## OUT OF SCOPE

UI final; AutoCAD; Rhino; Grasshopper; V-Ray; ComfyUI; BIM; pipelines arquitectónicos; optimización generativa; ejecución remota; colaboración multiusuario avanzada; Executors; APIs concretas; stack tecnológico; SemVer obligatorio; sincronización técnica bidireccional con Obsidian.

## Matriz Requirement → Module → Entity → Future Test

| Requirement | Module | Entity | Future Test |
|---|---|---|---|
| DOS-R001–R002 | System Management | SYSTEM | Crear, identificar y actualizar System |
| DOS-R003 | Spec Management | SPEC | Crear revisión y conservar historial |
| DOS-R004–R005 | Requirements Management | REQUIREMENT | ID, estado, relaciones y trazabilidad |
| DOS-R006 | Design Management | DESIGN | Asociar Design a Spec |
| DOS-R007–R008 | Task Engine | TASK | Crear Task y Fix Task válidas |
| DOS-R009–R010 | Codex/Run Engine | CONTEXT PACK, RUN | Contexto completo y Run único |
| DOS-R011 | Test Engine | TEST | Estados, affected/regression e historial |
| DOS-R012 | Issue Engine | ISSUE | FAIL → Issue → Fix Task |
| DOS-R013 | Evidence Engine | EVIDENCE | Enlaces a Run/Test/Issue/Version/Release |
| DOS-R014 | Version Engine | VERSION | Estados y promoción |
| DOS-R015 | Release Engine | RELEASE | Quality Gate bloquea incumplimientos |
| DOS-R016 | History/Traceability | LINKS/HISTORY | Recorrido completo |
| DOS-R017–R019 | Knowledge/Obsidian | KNOWLEDGE | Consulta, clasificación y curación |
| DOS-R020 | History | HISTORY | Contexto, origen y Version |
| DOS-R021 | CORE/Release Engine | FOUNDATION GATE | Validación antes de Release |

## Validación, riesgos y decisiones pendientes

Los 22 Requirements MUST tienen solución conceptual en la matriz. Cada módulo tiene propósito; no se identifican ciclos; Codex, Obsidian, Tests, Versions y Evidence son parte del núcleo; la arquitectura permite Systems y Executors futuros.

Pendientes: definir Tests obligatorios, Evidence mínima e Issue crítico; estados finales de entidades no fijados en Requirements; identidad y permisos de Projects; contrato futuro de Obsidian; almacenamiento, concurrencia, retención y archivado; si RELEASED será promoción o snapshot inmutable.

No se detectó contradicción crítica con requirements.md.
