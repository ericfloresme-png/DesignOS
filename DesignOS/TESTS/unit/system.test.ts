import { describe, expect, it } from 'vitest';
import { createSystem, updateSystem, SystemSchema } from '../../src/core/system/system';

describe('DOS-TEST-002 — System lifecycle', () => {
  it('accepts a valid System with required identity fields', () => {
    const system = createSystem({ id: 'SYS-001', name: 'DesignOS Base' });

    expect(SystemSchema.parse(system)).toEqual(system);
    expect(system.id).toBe('SYS-001');
    expect(system.name).toBe('DesignOS Base');
    expect(system.status).toBe('ACTIVE');
  });

  it('rejects missing identity fields and invalid status', () => {
    expect(() => SystemSchema.parse({ name: 'Missing ID' })).toThrow();
    expect(() => SystemSchema.parse({ id: 'SYS-002', name: 'Invalid', status: 'UNKNOWN' })).toThrow();
  });

  it('preserves identity when metadata is updated', () => {
    const system = createSystem({ id: 'SYS-003', name: 'Original' });
    const updated = updateSystem(system, { name: 'Updated', description: 'Changed metadata' });

    expect(updated.id).toBe(system.id);
    expect(updated.name).toBe('Updated');
    expect(updated.description).toBe('Changed metadata');
    expect(SystemSchema.parse(updated)).toEqual(updated);
  });
});
