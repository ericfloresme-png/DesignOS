import { SystemSchema, type SystemInput } from './system.schema';
import type { System } from './system.types';

export { SystemSchema } from './system.schema';
export type { System } from './system.types';

export function createSystem(input: Pick<SystemInput, 'id' | 'name'> & Partial<Pick<SystemInput, 'description'>>): System {
  const now = new Date().toISOString();
  return SystemSchema.parse({ ...input, status: 'ACTIVE', createdAt: now, updatedAt: now });
}

export function updateSystem(system: System, changes: Partial<Pick<System, 'name' | 'description' | 'status'>>): System {
  return SystemSchema.parse({ ...system, ...changes, id: system.id, createdAt: system.createdAt, updatedAt: new Date().toISOString() });
}
