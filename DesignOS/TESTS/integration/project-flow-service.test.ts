import { afterEach, describe, expect, it } from 'vitest';
import { createProjectFlowService } from '../../src/application/project-flow/project-flow.service';
import { createProject } from '../../src/core/project/project';
import { createSpec } from '../../src/core/spec/spec';
import { createTask } from '../../src/core/task/task';
import { createRun } from '../../src/core/run/run';
import { createContextPack } from '../../src/core/context/context-pack';
import { createTestResult } from '../../src/core/test-result/test-result';
import { createEvidence } from '../../src/core/evidence/evidence';
import { SqliteProjectFlowRepository } from '../../src/storage/sqlite/repositories/sqlite-project-flow.repository';

describe('DOS-TEST-037 — ProjectFlowService orchestration', () => {
  let repository: SqliteProjectFlowRepository | undefined;
  afterEach(() => repository?.close());

  it('orchestrates the complete flow through the application boundary', () => {
    repository = new SqliteProjectFlowRepository(':memory:');
    const service = createProjectFlowService(repository);
    const project = service.createProject({ id: 'PROJECT-SERVICE-001', name: 'Service Flow' });
    const spec = createSpec({ id: 'SPEC-SERVICE-001', systemId: 'SYS-001', title: 'Service Spec', content: 'content' });
    service.associateSpec(project.id, spec);
    const task = createTask({ id: 'TASK-SERVICE-001', systemId: 'SYS-001', requirementIds: ['DOS-R023'], module: 'FLOW', objective: 'service flow', scope: ['flow'], outOfScope: ['UI'], constraints: ['delegation'], dependencies: [], expectedOutput: ['trace'], futureTests: ['DOS-TEST-037'], definitionOfDone: ['PASS'] });
    service.createTask(project.id, spec.id, task);
    const contextPack = createContextPack({ systemId: 'SYS-001', specId: spec.id, requirementIds: ['DOS-R023'], taskId: task.id, constraints: ['delegation'], relevantFilePaths: ['src/application/project-flow/project-flow.service.ts'], relatedTestIds: ['DOS-TEST-037'], relatedIssueIds: [], relevantKnowledgeIds: [], currentVersionId: null });
    const run = createRun({ id: 'RUN-SERVICE-001', taskId: task.id, systemId: 'SYS-001', origin: 'DESIGNOS', contextPack });
    service.registerRun(project.id, spec.id, run);
    const result = createTestResult({ id: 'TEST-RESULT-SERVICE-001', runId: run.id, testId: 'DOS-TEST-037', expected: 'PASS', actual: 'PASS', status: 'PASS' });
    service.recordTestResult(result);
    const evidence = createEvidence({ id: 'EVIDENCE-SERVICE-001', runId: run.id, testResultId: result.id, type: 'TEST_OUTPUT', locator: 'memory://service', description: 'Service flow result' });
    service.recordEvidence(evidence);

    const trace = service.getTraceability(project.id);
    expect(trace.project.id).toBe(project.id);
    expect(trace.spec.id).toBe(spec.id);
    expect(trace.task.id).toBe(task.id);
    expect(trace.run.id).toBe(run.id);
    expect(trace.testResult.id).toBe(result.id);
    expect(trace.evidence.id).toBe(evidence.id);
    expect(service.getHistory().length).toBe(6);
  });
});
