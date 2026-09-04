# DesignOS Base v0.1 — Requirements

Todos los requisitos están en estado **DRAFT**. Esta fase define únicamente requisitos; no implementa código.

## Requisitos

### DOS-R001
**ID:** DOS-R001  
**TITLE:** Crear Systems  
**DESCRIPTION:** Crear Systems reutilizables con identificador y nombre únicos.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** Ninguna.  
**ACCEPTANCE CRITERIA:** Se registra un System con ID y nombre obligatorios; se rechazan IDs duplicados.

### DOS-R002
**ID:** DOS-R002  
**TITLE:** Administrar Systems  
**DESCRIPTION:** Consultar y actualizar metadatos de Systems sin perder su identidad.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R001.  
**ACCEPTANCE CRITERIA:** Un System puede consultarse y actualizarse; su ID permanece estable; el cambio queda en History.

### DOS-R003
**ID:** DOS-R003  
**TITLE:** Crear y mantener Specs  
**DESCRIPTION:** Crear y mantener Specs versionables asociadas a un System.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R001.  
**ACCEPTANCE CRITERIA:** Cada Spec tiene ID, System, título, contenido y estado; las actualizaciones conservan historial.

### DOS-R004
**ID:** DOS-R004  
**TITLE:** Gestionar Requirements  
**DESCRIPTION:** Crear Requirements con ID único, estado y relación explícita con una Spec.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R003.  
**ACCEPTANCE CRITERIA:** Cada Requirement tiene ID, título, descripción, prioridad, estado y Spec; no hay IDs duplicados.

### DOS-R005
**ID:** DOS-R005  
**TITLE:** Relacionar Requirements  
**DESCRIPTION:** Relacionar Requirements con Designs, Tasks, Tests, Issues y Versions.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R004, DOS-R006, DOS-R007, DOS-R011, DOS-R012, DOS-R014.  
**ACCEPTANCE CRITERIA:** Las relaciones se crean, consultan y eliminan mediante IDs existentes.

### DOS-R006
**ID:** DOS-R006  
**TITLE:** Documentar Design técnico  
**DESCRIPTION:** Documentar el diseño técnico asociado a una Spec sin imponer stack tecnológico.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R003.  
**ACCEPTANCE CRITERIA:** Un Design registra ID, Spec, decisiones y restricciones, y puede consultarse.

### DOS-R007
**ID:** DOS-R007  
**TITLE:** Gestionar Tasks  
**DESCRIPTION:** Transformar Requirements en Tasks identificables con alcance y relación explícita.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R004.  
**ACCEPTANCE CRITERIA:** Cada Task tiene ID, Requirement, alcance, estado y criterios de finalización.

### DOS-R008
**ID:** DOS-R008  
**TITLE:** Crear Fix Tasks  
**DESCRIPTION:** Generar una Fix Task desde un Issue.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R012.  
**ACCEPTANCE CRITERIA:** La Fix Task conserva el Issue de origen, tiene ID propio y sigue el ciclo normal de ejecución y pruebas.

### DOS-R009
**ID:** DOS-R009  
**TITLE:** Preparar contexto para Codex  
**DESCRIPTION:** Preparar contexto estructurado con System, Spec, Requirement, Task, Constraints, archivos relevantes, Tests y conocimiento relevante de Obsidian.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R001, DOS-R003, DOS-R004, DOS-R007, DOS-R017.  
**ACCEPTANCE CRITERIA:** El contexto contiene todos los campos y referencias identificables; puede revisarse antes de ejecutar.

### DOS-R010
**ID:** DOS-R010  
**TITLE:** Ejecutar Tasks con Codex y registrar Runs  
**DESCRIPTION:** Ejecutar Tasks mediante Codex y producir un RUN identificable por ejecución.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R009.  
**ACCEPTANCE CRITERIA:** Cada RUN tiene ID único, Task, contexto, origen, timestamps, resultado y archivos modificados.

### DOS-R011
**ID:** DOS-R011  
**TITLE:** Gestionar Tests  
**DESCRIPTION:** Definir y registrar Tests relacionados con Requirements, Tasks o Runs.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R004, DOS-R007, DOS-R010.  
**ACCEPTANCE CRITERIA:** Cada Test tiene ID, objetivo, relación y resultado; admite NOT_RUN, RUNNING, PASS y FAIL.

### DOS-R012
**ID:** DOS-R012  
**TITLE:** Gestionar Issues desde Tests FAIL  
**DESCRIPTION:** Relacionar un Test FAIL con un Issue y permitir que genere una Fix Task.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R008, DOS-R011.  
**ACCEPTANCE CRITERIA:** El Issue registra el Test FAIL; el vínculo es consultable; se crea una Fix Task desde el Issue.

### DOS-R013
**ID:** DOS-R013  
**TITLE:** Gestionar Evidence  
**DESCRIPTION:** Asociar Evidence a Runs, Tests, Issues y Versions.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R010, DOS-R011, DOS-R012, DOS-R014.  
**ACCEPTANCE CRITERIA:** Cada Evidence tiene ID, origen, referencia, fecha y descripción; sus vínculos son consultables.

### DOS-R014
**ID:** DOS-R014  
**TITLE:** Registrar Versions  
**DESCRIPTION:** Registrar Versions asociadas a Systems y cambios incluidos.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R001, DOS-R010, DOS-R011.  
**ACCEPTANCE CRITERIA:** Cada Version tiene ID, System, cambios, Tests y estado DRAFT, TESTING, CANDIDATE, STABLE o RELEASED.

### DOS-R015
**ID:** DOS-R015  
**TITLE:** Gestionar Releases  
**DESCRIPTION:** Convertir una Version en Release solo al cumplir criterios definidos.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R013, DOS-R014, DOS-R021.  
**ACCEPTANCE CRITERIA:** Solo se marca RELEASED con Tests requeridos PASS, Evidence suficiente y sin Issues bloqueantes abiertos.

### DOS-R016
**ID:** DOS-R016  
**TITLE:** Mantener trazabilidad  
**DESCRIPTION:** Rastrear Requirement → Design → Task → Run → Test → Evidence → Issue → Version → Release cuando aplique.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R005, DOS-R006, DOS-R007, DOS-R010, DOS-R011, DOS-R012, DOS-R013, DOS-R014, DOS-R015.  
**ACCEPTANCE CRITERIA:** Desde cada entidad se consultan sus relaciones; se identifican enlaces faltantes.

### DOS-R017
**ID:** DOS-R017  
**TITLE:** Consultar memoria Obsidian  
**DESCRIPTION:** Consultar posteriormente conocimiento relevante desde Obsidian como memoria persistente.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R009, DOS-R018.  
**ACCEPTANCE CRITERIA:** El contexto de Codex admite referencias a conocimiento relevante; no se define sincronización técnica en v0.1.

### DOS-R018
**ID:** DOS-R018  
**TITLE:** Registrar conocimiento persistente  
**DESCRIPTION:** Identificar Specs consolidadas, Decisions, Standards, Lessons Learned, Releases, documentación y reglas para registro posterior en Obsidian.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R003, DOS-R015.  
**ACCEPTANCE CRITERIA:** Cada elemento candidato tiene tipo, origen y contexto, separados de datos operativos.

### DOS-R019
**ID:** DOS-R019  
**TITLE:** Curar conocimiento  
**DESCRIPTION:** Diferenciar OPERATIVE DATA de PERSISTENT KNOWLEDGE antes de transferir información a Obsidian.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R017, DOS-R018.  
**ACCEPTANCE CRITERIA:** Todo elemento tiene clasificación consultable y modificable; los datos operativos no se promueven automáticamente.

### DOS-R020
**ID:** DOS-R020  
**TITLE:** Registrar History  
**DESCRIPTION:** Asociar toda modificación significativa con contexto, Version y origen.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R001, DOS-R003, DOS-R004, DOS-R007, DOS-R014.  
**ACCEPTANCE CRITERIA:** El cambio registra entidad, origen, contexto, fecha y Version cuando exista; el registro es consultable.

### DOS-R021
**ID:** DOS-R021  
**TITLE:** Validar Foundation  
**DESCRIPTION:** Validar que la estructura metodológica está completa antes de permitir un Release.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R003, DOS-R004, DOS-R006, DOS-R007, DOS-R011, DOS-R013, DOS-R014, DOS-R016, DOS-R020.  
**ACCEPTANCE CRITERIA:** Se comprueba Spec, Requirements, Design, Tasks, Tests, Evidence, Version, Release y Knowledge; si falta un elemento obligatorio, no se aprueba el Release.

## Tabla resumen

| ID | Grupo | Título | Prioridad | Estado |
|---|---|---|---|---|
| DOS-R001 | System | Crear Systems | MUST | DRAFT |
| DOS-R002 | System | Administrar Systems | MUST | DRAFT |
| DOS-R003 | Spec | Crear y mantener Specs | MUST | DRAFT |
| DOS-R004 | Requirements | Gestionar Requirements | MUST | DRAFT |
| DOS-R005 | Requirements | Relacionar Requirements | MUST | DRAFT |
| DOS-R006 | Design | Documentar Design técnico | MUST | DRAFT |
| DOS-R007 | Tasks | Gestionar Tasks | MUST | DRAFT |
| DOS-R008 | Tasks | Crear Fix Tasks | MUST | DRAFT |
| DOS-R009 | Codex | Preparar contexto | MUST | DRAFT |
| DOS-R010 | Codex | Ejecutar y registrar Runs | MUST | DRAFT |
| DOS-R011 | Tests | Gestionar Tests | MUST | DRAFT |
| DOS-R012 | Issues | Gestionar Issues | MUST | DRAFT |
| DOS-R013 | Evidence | Gestionar Evidence | MUST | DRAFT |
| DOS-R014 | Versions | Registrar Versions | MUST | DRAFT |
| DOS-R015 | Releases | Gestionar Releases | MUST | DRAFT |
| DOS-R016 | Traceability | Mantener trazabilidad | MUST | DRAFT |
| DOS-R017 | Obsidian | Consultar memoria | MUST | DRAFT |
| DOS-R018 | Obsidian | Registrar conocimiento | MUST | DRAFT |
| DOS-R019 | Knowledge | Curar conocimiento | MUST | DRAFT |
| DOS-R020 | History | Registrar History | MUST | DRAFT |
| DOS-R021 | Foundation | Validar Foundation | MUST | DRAFT |
| DOS-R022 | Foundation | Executable Project Foundation | MUST | DRAFT |

## Dependencias principales

1. R001 → R003 → R004 → R007 → R009 → R010 → R011.
2. R011 → R012 → R008.
3. R010 + R011 + R013 → R014 → R015.
4. R004/R006/R007/R010/R011/R012/R013/R014/R015 → R016.
5. R017 + R018 → R019.
6. R016 + R020 + R015 → R021.

## Requirements MUST para DesignOS Base v0.1

DOS-R001 a DOS-R021 son MUST. Todos permanecen en DRAFT hasta revisión y posterior DESIGN.

## OUT OF SCOPE

- Código, interfaz y funcionalidades finales en esta fase.
- Selección de stack tecnológico.
- Sincronización técnica con Obsidian.
- AutoCAD, Rhino, Grasshopper, V-Ray, ComfyUI y otros sistemas arquitectónicos específicos.
- Integraciones concretas con herramientas externas.
- Creación de Tasks de implementación.

## Preguntas y ambigüedades detectadas

- ¿Qué Tests son requeridos y qué Evidence es suficiente para un Release?
- ¿Qué estados tendrán Systems, Specs, Requirements, Tasks, Issues y Releases?
- ¿Qué constituye una modificación significativa?
- ¿Qué Issue se considera bloqueante?
- ¿Cuál será el contrato futuro de consulta y sincronización con Obsidian?
- No se han definido requisitos SHOULD o COULD; podrán añadirse tras revisar esta Spec.

### DOS-R022
**ID:** DOS-R022  
**TITLE:** Executable Project Foundation  
**DESCRIPTION:** DesignOS debe disponer de una foundation técnica ejecutable y reproducible que permita resolver dependencias aprobadas, validar TypeScript, ejecutar validación runtime, ejecutar Tests automatizados y reproducir el entorno mediante package manager y lockfile.  
**PRIORITY:** MUST  
**STATUS:** DRAFT  
**DEPENDENCIES:** DOS-R021.  
**ACCEPTANCE CRITERIA:** AC-01 existe configuración reproducible; AC-02 pnpm resuelve dependencias declaradas; AC-03 TypeScript valida el proyecto; AC-04 Zod está disponible; AC-05 Vitest ejecuta una prueba; AC-06 existe lockfile reproducible; AC-07 Foundation continúa pasando. No exige todavía Electron, React, SQLite, better-sqlite3, Playwright, CodexAdapter u ObsidianAdapter.
