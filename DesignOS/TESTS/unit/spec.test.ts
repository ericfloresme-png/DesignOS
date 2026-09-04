import { describe, expect, it } from 'vitest';
import { createSpec, updateSpec, SpecSchema } from '../../src/core/spec/spec';

describe('DOS-TEST-003 — Spec revision', () => {
  it('accepts a valid Spec associated with a System', () => {
    const spec = createSpec({
      id: 'SPEC-001',
      systemId: 'SYS-001',
      title: 'Foundation Spec',
      content: 'Initial contract',
    });

    expect(SpecSchema.parse(spec)).toEqual(spec);
    expect(spec.systemId).toBe('SYS-001');
    expect(spec.status).toBe('DRAFT');
    expect(spec.revision).toBe(1);
  });

  it('rejects missing required fields and invalid status', () => {
    expect(() => SpecSchema.parse({ id: 'SPEC-002' })).toThrow();
    expect(() => SpecSchema.parse({
      id: 'SPEC-003', systemId: 'SYS-001', title: 'Invalid', content: 'x',
      status: 'UNKNOWN', revision: 1,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    })).toThrow();
  });

  it('preserves the previous revision when updating a Spec', () => {
    const current = createSpec({
      id: 'SPEC-004', systemId: 'SYS-001', title: 'v1', content: 'Initial',
    });
    const updated = updateSpec(current, { title: 'v2', content: 'Updated' });

    expect(updated.id).toBe(current.id);
    expect(updated.systemId).toBe(current.systemId);
    expect(updated.revision).toBe(2);
    expect(updated.title).toBe('v2');
    expect(current.revision).toBe(1);
  });
});

describe('DOS-TEST-026 — Spec revision domain contract', () => {
  it('creates a deterministic initial revision with stable Spec and System identity', () => {
    const spec = createSpec({
      id: 'SPEC-026-001',
      systemId: 'SYS-026-001',
      title: 'Revision Contract',
      content: 'Initial revision',
    });

    expect(spec.id).toBe('SPEC-026-001');
    expect(spec.systemId).toBe('SYS-026-001');
    expect(spec.revision).toBe(1);
    expect(spec.status).toBe('DRAFT');
    expect(SpecSchema.parse(spec)).toEqual(spec);
  });

  it('creates the next revision without changing the previous revision semantically', () => {
    const initial = createSpec({
      id: 'SPEC-026-002',
      systemId: 'SYS-026-002',
      title: 'Revision One',
      content: 'Original content',
    });

    const next = updateSpec(initial, {
      title: 'Revision Two',
      content: 'Updated content',
    });

    expect(next.id).toBe(initial.id);
    expect(next.systemId).toBe(initial.systemId);
    expect(next.revision).toBe(2);
    expect(next.title).toBe('Revision Two');
    expect(initial.revision).toBe(1);
    expect(initial.title).toBe('Revision One');
    expect(initial.content).toBe('Original content');
  });

  it('rejects invalid revision domain payloads', () => {
    expect(() => SpecSchema.parse({
      id: 'SPEC-026-003',
      systemId: 'SYS-026-003',
      title: 'Invalid Revision',
      content: 'Content',
      revision: 0,
      status: 'DRAFT',
      createdAt: 'not-a-date',
      updatedAt: 'not-a-date',
    })).toThrow();
  });
});
