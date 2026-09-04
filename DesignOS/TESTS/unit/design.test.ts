import { describe, expect, it } from 'vitest';
import { createDesign, DesignSchema, coversRequirement } from '../../src/core/design/design';

describe('DOS-TEST-005 — Design traceability', () => {
  it('accepts a Design associated with a Spec and covering a Requirement', () => {
    const design = createDesign({
      id: 'DESIGN-001',
      specId: 'SPEC-001',
      requirementIds: ['REQ-001'],
      decisions: ['Use a modular domain boundary.'],
      constraints: ['Keep the domain independent of infrastructure.'],
    });

    expect(DesignSchema.parse(design)).toEqual(design);
    expect(coversRequirement(design, 'REQ-001')).toBe(true);
    expect(design.status).toBe('DRAFT');
  });

  it('reports a Requirement without Design coverage', () => {
    const design = createDesign({
      id: 'DESIGN-002',
      specId: 'SPEC-001',
      requirementIds: ['REQ-001'],
      decisions: ['Document the domain boundary.'],
      constraints: ['No infrastructure dependency.'],
    });

    expect(coversRequirement(design, 'REQ-002')).toBe(false);
  });

  it('rejects an orphan Design and empty traceability IDs', () => {
    expect(() => DesignSchema.parse({
      id: 'DESIGN-003',
      specId: '',
      requirementIds: ['REQ-001'],
      decisions: ['Decision'],
      constraints: ['Constraint'],
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })).toThrow();

    expect(() => DesignSchema.parse({
      id: 'DESIGN-004',
      specId: 'SPEC-001',
      requirementIds: [''],
      decisions: ['Decision'],
      constraints: ['Constraint'],
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })).toThrow();
  });
});
