import { afterEach, describe, expect, it } from 'vitest';
import { createProject } from '../../src/core/project/project';
import { createSpec } from '../../src/core/spec/spec';
import { createTask } from '../../src/core/task/task';
import { createRun } from '../../src/core/run/run';
import { createContextPack } from '../../src/core/context/context-pack';
import { createTestResult } from '../../src/core/test-result/test-result';
import { createEvidence } from '../../src/core/evidence/evidence';
import { SqliteProjectFlowRepository } from '../../src/storage/sqlite/repositories/sqlite-project-flow.repository';

declare const require: (moduleName: string) => unknown;
const fs = require('node:fs') as { mkdtempSync(path: string): string; rmSync(path: string, options: { recursive: boolean; force: boolean }): void };
const os = require('node:os') as { tmpdir(): string };
const path = require('node:path') as { join(...parts: string[]): string };

describe('DOS-TEST-029..036 — Project operational flow', () => {
  let repository: SqliteProjectFlowRepository;
  let temporaryDirectory: string | undefined;
  afterEach(() => {
    repository?.close();
    if (temporaryDirectory) fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it('persists the complete flow and recovers it after reopen', () => {
    temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'designos-flow-'));
    const filename = path.join(temporaryDirectory, 'flow.db');
    repository = new SqliteProjectFlowRepository(filename);
    const project = createProject({ id: 'PROJECT-001', name: 'Flow' });
    const spec = createSpec({ id: 'SPEC-001', systemId: 'SYS-001', title: 'Flow Spec', content: 'content' });
    const task = createTask({ id: 'TASK-001', systemId: 'SYS-001', requirementIds: ['DOS-R023'], module: 'FLOW', objective: 'Run flow', scope: ['flow'], outOfScope: ['UI'], constraints: ['deterministic'], dependencies: [], expectedOutput: ['trace'], futureTests: ['DOS-TEST-035'], definitionOfDone: ['PASS'] });
    const contextPack = createContextPack({ systemId: 'SYS-001', specId: spec.id, requirementIds: ['DOS-R023'], taskId: task.id, constraints: ['flow'], relevantFilePaths: ['src/core/project/project.ts'], relatedTestIds: ['DOS-TEST-035'], relatedIssueIds: [], relevantKnowledgeIds: [], currentVersionId: null });
    const run = createRun({ id: 'RUN-001', taskId: task.id, systemId: 'SYS-001', origin: 'DESIGNOS', contextPack });
    const test = createTestResult({ id: 'TEST-RESULT-001', runId: run.id, testId: 'DOS-TEST-035', expected: 'PASS', actual: 'PASS', status: 'PASS' });
    const evidence = createEvidence({ id: 'EVIDENCE-001', runId: run.id, testResultId: test.id, type: 'TEST_OUTPUT', locator: 'memory://flow', description: 'Flow result' });

    repository.saveProject(project);
    repository.associateSpec(project.id, spec);
    repository.saveTask(project.id, spec.id, task);
    repository.saveRun(project.id, spec.id, run);
    repository.saveTestResult(test);
    repository.saveEvidence(evidence);

    repository.close();
    repository = new SqliteProjectFlowRepository(filename);
    const trace = repository.getTraceability(project.id);
    expect(trace.project.id).toBe(project.id);
    expect(trace.spec.id).toBe(spec.id);
    expect(trace.task.id).toBe(task.id);
    expect(trace.run.id).toBe(run.id);
    expect(trace.testResult.id).toBe(test.id);
    expect(trace.evidence.id).toBe(evidence.id);
    expect(repository.getHistory().length).toBeGreaterThanOrEqual(6);
  });

  it('rejects inconsistent relationships', () => {
    repository = new SqliteProjectFlowRepository(':memory:');
    const task = createTask({ id: 'TASK-002', systemId: 'SYS-001', requirementIds: ['DOS-R023'], module: 'FLOW', objective: 'Invalid', scope: ['flow'], outOfScope: ['UI'], constraints: ['deterministic'], dependencies: [], expectedOutput: ['trace'], futureTests: ['DOS-TEST-033'], definitionOfDone: ['PASS'] });
    expect(() => repository.saveTask('PROJECT-MISSING', 'SPEC-MISSING', task)).toThrow();
  });
});
