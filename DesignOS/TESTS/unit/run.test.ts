import { describe, expect, it } from 'vitest';
import { createRun, RunSchema, updateRun } from '../../src/core/run/run';
import { createContextPack } from '../../src/core/context/context-pack';

const contextPack = createContextPack({
  systemId: 'SYS-001',
  specId: 'SPEC-001',
  requirementIds: ['REQ-001'],
  taskId: 'TASK-008',
  constraints: ['No Codex execution.'],
  relevantFilePaths: ['src/core/run/run.ts'],
  relatedTestIds: ['TEST-009'],
  relatedIssueIds: [],
  relevantKnowledgeIds: [],
  currentVersionId: null,
});

describe('DOS-TEST-009 — Run audit', () => {
  it('creates a queued auditable Run with its context', () => {
    const run = createRun({ id: 'RUN-001', taskId: 'TASK-008', systemId: 'SYS-001', contextPack, origin: 'DESIGNOS' });

    expect(RunSchema.parse(run)).toEqual(run);
    expect(run.status).toBe('QUEUED');
    expect(run.contextPack.taskId).toBe('TASK-008');
    expect(run.result).toBeNull();
  });

  it('records completed, failed and cancelled outcomes without losing the Run identity', () => {
    const run = createRun({ id: 'RUN-002', taskId: 'TASK-008', systemId: 'SYS-001', contextPack, origin: 'DESIGNOS' });
    const failed = updateRun(run, { status: 'FAILED', result: 'Failure recorded', errors: ['Test failure'] });
    const cancelled = updateRun(run, { status: 'CANCELLED', result: 'Cancelled' });

    expect(failed.id).toBe(run.id);
    expect(failed.status).toBe('FAILED');
    expect(failed.errors).toEqual(['Test failure']);
    expect(cancelled.status).toBe('CANCELLED');
  });
});
