import { z } from 'zod';

export const SystemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['ACTIVE', 'ARCHIVED']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

export type SystemInput = z.input<typeof SystemSchema>;
