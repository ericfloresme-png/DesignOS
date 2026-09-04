import { SpecSchema, type SpecInput } from './spec.schema';
import type { Spec } from './spec.types';

export { SpecSchema } from './spec.schema';
export type { Spec } from './spec.types';

export function createSpec(input: Pick<SpecInput, 'id' | 'systemId' | 'title' | 'content'>): Spec {
  const now = new Date().toISOString();
  return SpecSchema.parse({ ...input, revision: 1, status: 'DRAFT', createdAt: now, updatedAt: now });
}

export function updateSpec(spec: Spec, changes: Partial<Pick<Spec, 'title' | 'content' | 'status'>>): Spec {
  return SpecSchema.parse({
    ...spec,
    ...changes,
    id: spec.id,
    systemId: spec.systemId,
    revision: spec.revision + 1,
    createdAt: spec.createdAt,
    updatedAt: new Date().toISOString(),
  });
}
