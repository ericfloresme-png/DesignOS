import { EvidenceSchema, type EvidenceInput } from './evidence.schema';
import type { Evidence } from './evidence.types';

export { EvidenceSchema } from './evidence.schema';
export type { Evidence } from './evidence.types';

export function createEvidence(input: Pick<EvidenceInput, 'id' | 'runId' | 'testResultId' | 'type' | 'locator' | 'description'>): Evidence {
  return EvidenceSchema.parse({ ...input, createdAt: new Date().toISOString() });
}
