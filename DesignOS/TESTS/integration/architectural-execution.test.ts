import { afterEach, describe, expect, it } from 'vitest';
import { createProjectFlowService } from '../../src/application/project-flow/project-flow.service';
import { createArchitecturalExecutionService } from '../../src/application/execution/architectural-execution.service';
import { MockArchitecturalExecutor } from '../../src/adapters/execution/mock-architectural-executor';
import { createProject } from '../../src/core/project/project';
import { createSpec } from '../../src/core/spec/spec';
import { createTask } from '../../src/core/task/task';
import { createRun } from '../../src/core/run/run';
import { createContextPack } from '../../src/core/context/context-pack';
import { SqliteProjectFlowRepository } from '../../src/storage/sqlite/repositories/sqlite-project-flow.repository';

declare const require: (moduleName: string) => unknown;
const fs = require('node:fs') as { mkdtempSync(path: string): string; rmSync(path: string, options: { recursive: boolean; force: boolean }): void };
const os = require('node:os') as { tmpdir(): string };
const path = require('node:path') as { join(...parts: string[]): string };

describe('DOS-TEST-045..050 — Architectural execution flow', () => {
  let repository: SqliteProjectFlowRepository | undefined;
  let temporaryDirectory: string | undefined;
  afterEach(() => {
    repository?.close();
    if (temporaryDirectory) fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it('executes MockArchitecturalExecutor and recovers extended traceability', () => {
    temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'designos-execution-'));
    repository = new SqliteProjectFlowRepository(path.join(temporaryDirectory, 'execution.db'));
    const flow = createProjectFlowService(repository);
    const execution = createArchitecturalExecutionService(repository, new MockArchitecturalExecutor());
    const project = flow.createProject({ id: 'PROJECT-EXEC-001', name: 'Executor Flow' });
    const spec = createSpec({ id: 'SPEC-EXEC-001', systemId: 'SYS-001', title: 'Executor Spec', content: 'mock execution' });
    flow.associateSpec(project.id, spec);
    const task = createTask({ id: 'TASK-EXEC-001', systemId: 'SYS-001', requirementIds: ['DOS-R032'], module: 'EXECUTION', objective: 'Execute artifact', scope: ['executor'], outOfScope: ['Rhino'], constraints: ['portable'], dependencies: [], expectedOutput: ['artifact'], futureTests: ['DOS-TEST-049'], definitionOfDone: ['PASS'] });
    flow.createTask(project.id, spec.id, task);
    const contextPack = createContextPack({ systemId: 'SYS-001', specId: spec.id, requirementIds: ['DOS-R032'], taskId: task.id, constraints: ['portable'], relevantFilePaths: ['src/core/execution'], relatedTestIds: ['DOS-TEST-049'], relatedIssueIds: [], relevantKnowledgeIds: [], currentVersionId: null });
    const run = createRun({ id: 'RUN-EXEC-001', taskId: task.id, systemId: 'SYS-001', origin: 'DESIGNOS', contextPack });
    flow.registerRun(project.id, spec.id, run);

    const outcome = execution.execute({ projectId: project.id, specId: spec.id, taskId: task.id, run, executor: { id: 'EXEC-MOCK-001', name: 'Mock Architectural Executor', kind: 'MOCK', capabilities: ['artifact'], version: '1.0.0', status: 'ACTIVE', metadata: {} }, inputs: { sample: true }, parameters: {}, context: { source: 'test' } });

    expect(outcome.result.status).toBe('COMPLETED');
    expect(outcome.artifacts.length).toBe(1);
    expect(outcome.trace.project.id).toBe(project.id);
    expect(outcome.trace.executor.id).toBe('EXEC-MOCK-001');
    expect(outcome.trace.artifact.id).toBe(outcome.artifacts[0].id);
    expect(outcome.trace.testResult.status).toBe('PASS');
    expect(outcome.trace.evidence.id).toBeTruthy();
    expect(repository.getHistory().length).toBeGreaterThanOrEqual(10);
    const filename = path.join(temporaryDirectory, 'execution.db');
    repository.close();
    repository = new SqliteProjectFlowRepository(filename);
    expect(repository.getExtendedTraceability(project.id).artifact.id).toBe(outcome.artifacts[0].id);
    const historyBefore = repository.getHistory();
    repository.saveExecutor({ id: 'EXEC-MOCK-001', name: 'Mock Architectural Executor', kind: 'MOCK', capabilities: ['artifact'], version: '1.0.0', status: 'ACTIVE', metadata: {} });
    const historyAfter = repository.getHistory();
    expect(historyAfter.length).toBeGreaterThan(historyBefore.length);
    expect(historyAfter.slice(0, historyBefore.length)).toEqual(historyBefore);
  });
});
