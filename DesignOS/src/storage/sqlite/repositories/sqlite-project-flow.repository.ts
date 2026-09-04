import { createDatabase, type DatabaseConnection } from '../database';
import type { Evidence } from '../../../core/evidence/evidence.types';
import type { Project } from '../../../core/project/project.types';
import type { Spec } from '../../../core/spec/spec.types';
import type { Task } from '../../../core/task/task.types';
import type { Run } from '../../../core/run/run.types';
import type { TestResult } from '../../../core/test-result/test-result.types';
import { EvidenceSchema } from '../../../core/evidence/evidence.schema';
import { ProjectSchema } from '../../../core/project/project.schema';
import { SpecSchema } from '../../../core/spec/spec.schema';
import { TaskSchema } from '../../../core/task/task.schema';
import { RunSchema } from '../../../core/run/run.schema';
import { TestResultSchema } from '../../../core/test-result/test-result.schema';
import type { HistoryEntry, ProjectFlowRepository, TraceabilityRecord } from '../../../core/ports/project-flow.repository';
import type { ExecutionRepository, ExtendedTraceability } from '../../../core/execution/execution-repository';
import type { ExecutorDefinition } from '../../../core/execution/executor-definition';
import type { ExecutionRequest } from '../../../core/execution/execution-request';
import type { ExecutionResult } from '../../../core/execution/execution-result';
import type { Artifact } from '../../../core/artifact/artifact';

export class SqliteProjectFlowRepository implements ProjectFlowRepository, ExecutionRepository {
  private readonly database: DatabaseConnection;

  public constructor(filename: string) { this.database = createDatabase(filename); }

  public saveProject(project: Project): void {
    ProjectSchema.parse(project);
    this.database.prepare('INSERT INTO projects (id, payload) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload').run(project.id, JSON.stringify(project));
    this.record('PROJECT', project.id, 'CREATE_OR_UPDATE', project.id);
  }

  public associateSpec(projectId: string, spec: Spec): void {
    SpecSchema.parse(spec);
    this.requireProject(projectId);
    this.database.prepare('INSERT INTO project_specs (project_id, spec_id, payload) VALUES (?, ?, ?) ON CONFLICT(project_id, spec_id) DO UPDATE SET payload = excluded.payload').run(projectId, spec.id, JSON.stringify(spec));
    this.record('SPEC', spec.id, 'ASSOCIATE', projectId);
  }

  public saveTask(projectId: string, specId: string, task: Task): void {
    TaskSchema.parse(task);
    this.requireSpec(projectId, specId);
    this.database.prepare('INSERT INTO project_tasks (project_id, spec_id, task_id, payload) VALUES (?, ?, ?, ?) ON CONFLICT(task_id) DO UPDATE SET project_id = excluded.project_id, spec_id = excluded.spec_id, payload = excluded.payload').run(projectId, specId, task.id, JSON.stringify(task));
    this.record('TASK', task.id, 'CREATE', `${projectId}:${specId}`);
  }

  public saveRun(projectId: string, specId: string, run: Run): void {
    RunSchema.parse(run);
    this.requireSpec(projectId, specId);
    const task = this.database.prepare('SELECT task_id FROM project_tasks WHERE project_id = ? AND spec_id = ? AND task_id = ?').get(projectId, specId, run.taskId);
    if (!task) throw new Error(`Task relationship not found: ${run.taskId}`);
    this.database.prepare('INSERT INTO flow_runs (project_id, spec_id, task_id, run_id, payload) VALUES (?, ?, ?, ?, ?) ON CONFLICT(run_id) DO UPDATE SET payload = excluded.payload').run(projectId, specId, run.taskId, run.id, JSON.stringify(run));
    this.record('RUN', run.id, 'CREATE_OR_UPDATE', `${projectId}:${specId}:${run.taskId}`);
  }

  public saveTestResult(result: TestResult): void {
    TestResultSchema.parse(result);
    this.requireRun(result.runId);
    this.database.prepare('INSERT INTO test_results (id, run_id, payload) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload').run(result.id, result.runId, JSON.stringify(result));
    this.record('TEST_RESULT', result.id, 'CREATE_OR_UPDATE', result.runId);
  }

  public saveEvidence(evidence: Evidence): void {
    EvidenceSchema.parse(evidence);
    this.requireRun(evidence.runId);
    const test = this.database.prepare('SELECT id FROM test_results WHERE id = ? AND run_id = ?').get(evidence.testResultId, evidence.runId);
    if (!test) throw new Error(`Test relationship not found: ${evidence.testResultId}`);
    this.database.prepare('INSERT INTO evidence (id, run_id, test_result_id, payload) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload').run(evidence.id, evidence.runId, evidence.testResultId, JSON.stringify(evidence));
    this.record('EVIDENCE', evidence.id, 'CREATE_OR_UPDATE', `${evidence.runId}:${evidence.testResultId}`);
  }

  public getTraceability(projectId: string): TraceabilityRecord {
    const projectRow = this.database.prepare('SELECT payload FROM projects WHERE id = ?').get(projectId) as { payload: string } | undefined;
    const relation = this.database.prepare('SELECT s.payload AS spec, pt.payload AS task, fr.payload AS run, tr.payload AS test, e.payload AS evidence FROM project_specs ps JOIN projects p ON p.id = ps.project_id JOIN project_tasks pt ON pt.project_id = ps.project_id AND pt.spec_id = ps.spec_id JOIN flow_runs fr ON fr.project_id = pt.project_id AND fr.spec_id = pt.spec_id AND fr.task_id = pt.task_id JOIN test_results tr ON tr.run_id = fr.run_id JOIN evidence e ON e.run_id = fr.run_id AND e.test_result_id = tr.id JOIN (SELECT payload FROM project_specs WHERE project_id = ? LIMIT 1) s ON 1=1 WHERE ps.project_id = ? LIMIT 1').get(projectId, projectId) as { spec: string; task: string; run: string; test: string; evidence: string } | undefined;
    if (!projectRow || !relation) throw new Error(`Incomplete traceability for project: ${projectId}`);
    return { project: ProjectSchema.parse(JSON.parse(projectRow.payload)), spec: SpecSchema.parse(JSON.parse(relation.spec)), task: TaskSchema.parse(JSON.parse(relation.task)), run: RunSchema.parse(JSON.parse(relation.run)), testResult: TestResultSchema.parse(JSON.parse(relation.test)), evidence: EvidenceSchema.parse(JSON.parse(relation.evidence)) };
  }

  public getHistory(): HistoryEntry[] {
    const rows = this.database.prepare('SELECT id, entity_type, entity_id, operation, context, created_at FROM history_entries ORDER BY rowid ASC').all() as Array<{ id: string; entity_type: string; entity_id: string; operation: string; context: string; created_at: string }>;
    return rows.map((row) => ({ id: row.id, entityType: row.entity_type, entityId: row.entity_id, operation: row.operation, context: row.context, createdAt: row.created_at }));
  }

  public saveExecutor(definition: ExecutorDefinition): void { this.database.prepare('INSERT INTO executors (id, payload) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload').run(definition.id, JSON.stringify(definition)); this.record('EXECUTOR', definition.id, 'REGISTER', definition.kind); }
  public saveRequest(request: ExecutionRequest): void { this.requireRun(request.runId); this.database.prepare('INSERT INTO execution_requests (id, executor_id, run_id, payload) VALUES (?, ?, ?, ?)').run(request.id, request.executorId, request.runId, JSON.stringify(request)); this.record('EXECUTION_REQUEST', request.id, 'CREATE', request.executorId); }
  public saveResult(result: ExecutionResult): void { this.database.prepare('INSERT INTO execution_results (id, request_id, payload) VALUES (?, ?, ?)').run(result.id, result.requestId, JSON.stringify(result)); this.record('EXECUTION_RESULT', result.id, 'CREATE', result.status); }
  public saveArtifact(artifact: Artifact): void { this.requireRun(artifact.runId); this.database.prepare('INSERT INTO artifacts (id, run_id, producer, payload) VALUES (?, ?, ?, ?)').run(artifact.id, artifact.runId, artifact.producer, JSON.stringify(artifact)); this.record('ARTIFACT', artifact.id, 'CREATE', artifact.runId); }
  public linkArtifactValidation(artifactId: string, testResult: TestResult, evidence: Evidence): void { const artifact = this.database.prepare('SELECT id FROM artifacts WHERE id = ?').get(artifactId); if (!artifact) throw new Error(`Artifact not found: ${artifactId}`); this.database.prepare('INSERT INTO artifact_validations (artifact_id, test_result_id, evidence_id) VALUES (?, ?, ?)').run(artifactId, testResult.id, evidence.id); this.record('ARTIFACT_VALIDATION', artifactId, 'LINK', testResult.id); }
  public getExtendedTraceability(projectId: string): ExtendedTraceability { const base = this.getTraceability(projectId); const row = this.database.prepare('SELECT ex.payload AS executor, a.payload AS artifact FROM executors ex JOIN execution_requests rq ON rq.executor_id = ex.id JOIN execution_results rr ON rr.request_id = rq.id JOIN artifacts a ON a.id IN (SELECT json_each.value FROM json_each(rr.payload, \'$.artifacts\')) JOIN flow_runs fr ON fr.run_id = rq.run_id JOIN project_tasks pt ON pt.task_id = fr.task_id WHERE pt.project_id = ? LIMIT 1').get(projectId) as { executor: string; artifact: string } | undefined; if (!row) throw new Error(`Incomplete execution traceability for project: ${projectId}`); return { ...base, executor: JSON.parse(row.executor) as ExecutorDefinition, artifact: JSON.parse(row.artifact) as Artifact }; }

  public close(): void { this.database.close(); }

  private requireProject(id: string): void { if (!this.database.prepare('SELECT id FROM projects WHERE id = ?').get(id)) throw new Error(`Project relationship not found: ${id}`); }
  private requireSpec(projectId: string, specId: string): void { if (!this.database.prepare('SELECT spec_id FROM project_specs WHERE project_id = ? AND spec_id = ?').get(projectId, specId)) throw new Error(`Spec relationship not found: ${projectId}:${specId}`); }
  private requireRun(id: string): void { if (!this.database.prepare('SELECT run_id FROM flow_runs WHERE run_id = ?').get(id)) throw new Error(`Run relationship not found: ${id}`); }
  private record(entityType: string, entityId: string, operation: string, context: string): void { const now = new Date().toISOString(); this.database.prepare('INSERT INTO history_entries (id, entity_type, entity_id, operation, context, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(`${entityType}-${entityId}-${now}`, entityType, entityId, operation, context, now); }
}
