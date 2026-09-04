import { describe, expect, it } from 'vitest';
import { createContextPack, ContextPackSchema } from '../../src/core/context/context-pack';

const input = {
  systemId: 'SYS-001',
  specId: 'SPEC-001',
  requirementIds: ['REQ-001', 'REQ-002'],
  taskId: 'TASK-007',
  constraints: ['Domain Core only.', 'No external execution.'],
  relevantFilePaths: ['src/core/task/task.ts', 'src/core/spec/spec.ts'],
  relatedTestIds: ['TEST-007', 'TEST-008', 'TEST-021'],
  relatedIssueIds: [],
  relevantKnowledgeIds: ['KNOW-001'],
  currentVersionId: null,
};

describe('DOS-TEST-007/021 — Context Pack completeness', () => {
  it('builds a complete traceable Context Pack from references', () => {
    const pack = createContextPack(input);

    expect(ContextPackSchema.parse(pack)).toEqual(pack);
    expect(pack.systemId).toBe('SYS-001');
    expect(pack.specId).toBe('SPEC-001');
    expect(pack.requirementIds).toEqual(['REQ-001', 'REQ-002']);
    expect(pack.taskId).toBe('TASK-007');
    expect(pack.relatedTestIds).toEqual(['TEST-007', 'TEST-008', 'TEST-021']);
    expect(pack.relevantKnowledgeIds).toEqual(['KNOW-001']);
  });

  it('produces equivalent output for equivalent inputs without variable fields', () => {
    const first = createContextPack(input);
    const second = createContextPack({ ...input });

    expect(second).toEqual(first);
    expect(Object.keys(first)).not.toContain('createdAt');
    expect(Object.keys(first)).not.toContain('updatedAt');
  });
});
