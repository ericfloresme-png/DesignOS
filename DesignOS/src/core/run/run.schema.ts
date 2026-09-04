import { z } from 'zod';
import { ContextPackSchema } from '../context/context-pack.schema';

const nonEmptyList = z.array(z.string().min(1));
const runStatus = z.enum(['QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED']);

export const RunHistoryEntrySchema = z.object({
  status: runStatus,
  changedAt: z.string().datetime(),
  origin: z.string().min(1),
}).strict();

export const RunSchema = z.object({
  id: z.string().min(1),
  taskId: z.string().min(1),
  systemId: z.string().min(1),
  contextPack: ContextPackSchema,
  versionId: z.string().min(1).nullable(),
  origin: z.string().min(1),
  status: runStatus,
  result: z.string().nullable(),
  startedAt: z.string().datetime(),
  finishedAt: z.string().datetime().nullable(),
  durationMs: z.number().int().nonnegative().nullable(),
  errors: nonEmptyList,
  modifiedFiles: nonEmptyList,
  testIds: nonEmptyList,
  evidenceIds: nonEmptyList,
  history: z.array(RunHistoryEntrySchema),
}).strict();

export type RunInput = z.input<typeof RunSchema>;
