import { z } from 'zod';
export const ExecutionRequestSchema = z.object({
  id: z.string().min(1), projectId: z.string().min(1), specId: z.string().min(1), taskId: z.string().min(1), runId: z.string().min(1), executorId: z.string().min(1), inputs: z.record(z.string(), z.unknown()), parameters: z.record(z.string(), z.unknown()), context: z.record(z.string(), z.unknown()), createdAt: z.string().datetime(),
}).strict();
export type ExecutionRequest = z.infer<typeof ExecutionRequestSchema>;
export function createExecutionRequest(input: Omit<ExecutionRequest, 'createdAt'>): ExecutionRequest { return ExecutionRequestSchema.parse({ ...input, createdAt: new Date().toISOString() }); }
