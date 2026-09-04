import { z } from 'zod';
export const ExecutionResultSchema = z.object({
  id: z.string().min(1), requestId: z.string().min(1), status: z.enum(['COMPLETED', 'FAILED']), outputs: z.record(z.string(), z.unknown()), artifacts: z.array(z.string().min(1)), diagnostics: z.array(z.string().min(1)), startedAt: z.string().datetime(), finishedAt: z.string().datetime(),
}).strict();
export type ExecutionResult = z.infer<typeof ExecutionResultSchema>;
export function createExecutionResult(input: Omit<ExecutionResult, 'startedAt' | 'finishedAt'>): ExecutionResult { const now = new Date().toISOString(); return ExecutionResultSchema.parse({ ...input, startedAt: now, finishedAt: now }); }
