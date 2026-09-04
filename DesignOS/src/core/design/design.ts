import { DesignSchema, type DesignInput } from './design.schema';
import type { Design } from './design.types';

export { DesignSchema } from './design.schema';
export type { Design } from './design.types';

type DesignCreationInput = Pick<DesignInput, 'id' | 'specId' | 'requirementIds' | 'decisions' | 'constraints'>;

export function createDesign(input: DesignCreationInput): Design {
  const now = new Date().toISOString();
  return DesignSchema.parse({ ...input, status: 'DRAFT', createdAt: now, updatedAt: now });
}

export function coversRequirement(design: Design, requirementId: string): boolean {
  return design.requirementIds.includes(requirementId);
}
