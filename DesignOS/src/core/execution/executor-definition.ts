import { z } from 'zod';

export const ExecutorDefinitionSchema = z.object({
  id: z.string().min(1), name: z.string().min(1), kind: z.string().min(1),
  capabilities: z.array(z.string().min(1)), version: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE']), metadata: z.record(z.string(), z.unknown()),
}).strict();
export type ExecutorDefinition = z.infer<typeof ExecutorDefinitionSchema>;
export function createExecutorDefinition(input: ExecutorDefinition): ExecutorDefinition { return ExecutorDefinitionSchema.parse(input); }
