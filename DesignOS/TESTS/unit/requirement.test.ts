import { describe, expect, it } from 'vitest';
import { createRequirement, updateRequirement, RequirementSchema } from '../../src/core/requirement/requirement';

describe('DOS-TEST-004 — Requirement integrity', () => {
  it('accepts a valid Requirement with Spec, priority, status, criteria and relations', () => {
    const requirement = createRequirement({
      id: 'REQ-001',
      title: 'Create Systems',
      description: 'DesignOS can create reusable Systems.',
      priority: 'MUST',
      specId: 'SPEC-001',
      acceptanceCriteria: ['The System has a unique ID.'],
      dependencyIds: ['REQ-000'],
      designIds: ['DESIGN-001'],
      taskIds: ['TASK-001'],
      testIds: ['TEST-001'],
      issueIds: [],
      versionIds: [],
    });

    expect(RequirementSchema.parse(requirement)).toEqual(requirement);
    expect(requirement.status).toBe('DRAFT');
    expect(requirement.revision).toBe(1);
    expect(requirement.specId).toBe('SPEC-001');
    expect(requirement.dependencyIds).toEqual(['REQ-000']);
  });

  it('rejects missing fields and invalid priority or status', () => {
    expect(() => RequirementSchema.parse({ id: 'REQ-002' })).toThrow();
    expect(() => RequirementSchema.parse({
      id: 'REQ-003',
      title: 'Invalid',
      description: 'Invalid requirement',
      priority: 'INVALID',
      status: 'DRAFT',
      specId: 'SPEC-001',
      acceptanceCriteria: ['criterion'],
      dependencyIds: [],
      designIds: [],
      taskIds: [],
      testIds: [],
      issueIds: [],
      versionIds: [],
      revision: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })).toThrow();
  });

  it('rejects empty relationship IDs and duplicate dependency references', () => {
    expect(() => RequirementSchema.parse({
      id: 'REQ-004',
      title: 'Invalid relations',
      description: 'Invalid relations',
      priority: 'SHOULD',
      status: 'DRAFT',
      specId: 'SPEC-001',
      acceptanceCriteria: ['criterion'],
      dependencyIds: ['REQ-001', 'REQ-001'],
      designIds: [''],
      taskIds: [],
      testIds: [],
      issueIds: [],
      versionIds: [],
      revision: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })).toThrow();
  });

  it('preserves identity and increments revision when updated', () => {
    const current = createRequirement({
      id: 'REQ-005',
      title: 'Initial',
      description: 'Initial description',
      priority: 'COULD',
      specId: 'SPEC-001',
      acceptanceCriteria: ['criterion'],
    });
    const updated = updateRequirement(current, { title: 'Updated', description: 'Updated description' });

    expect(updated.id).toBe(current.id);
    expect(updated.specId).toBe(current.specId);
    expect(updated.revision).toBe(2);
    expect(updated.title).toBe('Updated');
    expect(current.revision).toBe(1);
  });
});
