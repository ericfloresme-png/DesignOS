import { z } from 'zod';

export const SpecSchema = z.object({
  id: z.string().min(1),
  systemId: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  revision: z.number().int().positive(),
  status: z.enum(['DRAFT', 'REVIEW', 'APPROVED', 'SUPERSEDED']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

export type SpecInput = z.input<typeof SpecSchema>;
