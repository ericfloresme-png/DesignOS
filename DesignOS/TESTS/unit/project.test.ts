import { describe, expect, it } from 'vitest';
import { ProjectSchema, createProject } from '../../src/core/project/project';

describe('DOS-TEST-028 — Project contract', () => {
  it('creates a stable Project identity', () => {
    const project = createProject({ id: 'PROJECT-001', name: 'DesignOS Flow' });
    expect(project.id).toBe('PROJECT-001');
    expect(project.status).toBe('ACTIVE');
    expect(ProjectSchema.parse(project)).toEqual(project);
  });

  it('rejects an empty identity', () => {
    expect(() => createProject({ id: '', name: 'Invalid' })).toThrow();
  });
});
