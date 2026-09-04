import { z } from 'zod';

export const EvidenceSchema = z.object({
  id: z.string().min(1),
  runId: z.string().min(1),
  testResultId: z.string().min(1),
  type: z.string().min(1),
  locator: z.string().min(1),
  description: z.string().min(1),
  createdAt: z.string().datetime(),
}).strict();

export type EvidenceInput = z.input<typeof EvidenceSchema>;
