import { describe, expect, it } from 'vitest';
import { ContextPackSchema } from '../../src/core/context/context-pack';

describe('DOS-TEST-008 — Context Pack invalid inputs', () => {
  it('rejects missing required references and invalid collection entries', () => {
    expect(() => ContextPackSchema.parse({
      specId: 'SPEC-001',
      requirementIds: ['REQ-001'],
      taskId: 'TASK-001',
      constraints: ['Constraint'],
      relevantFilePaths: ['src/core/system/system.ts'],
      relatedTestIds: ['TEST-001'],
      relatedIssueIds: [],
      relevantKnowledgeIds: [],
      currentVersionId: null,
    })).toThrow();

    expect(() => ContextPackSchema.parse({
      systemId: 'SYS-001',
      specId: 'SPEC-001',
      requirementIds: ['REQ-001'],
      taskId: 'TASK-001',
      constraints: ['Constraint'],
      relevantFilePaths: ['src/core/system/system.ts'],
      relatedTestIds: ['TEST-001', 'TEST-001'],
      relatedIssueIds: [],
      relevantKnowledgeIds: [],
      currentVersionId: null,
    })).toThrow();
  });

  it('rejects empty required collections and unknown fields', () => {
    expect(() => ContextPackSchema.parse({
      systemId: 'SYS-001',
      specId: 'SPEC-001',
      requirementIds: [],
      taskId: 'TASK-001',
      constraints: ['Constraint'],
      relevantFilePaths: ['src/core/system/system.ts'],
      relatedTestIds: ['TEST-001'],
      relatedIssueIds: [],
      relevantKnowledgeIds: [],
      currentVersionId: null,
      extra: 'not allowed',
    })).toThrow();
  });
});
