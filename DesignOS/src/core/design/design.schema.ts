import { z } from 'zod';

const idList = z.array(z.string().min(1)).min(1);
const textList = z.array(z.string().min(1)).min(1);

export const DesignSchema = z.object({
  id: z.string().min(1),
  specId: z.string().min(1),
  requirementIds: idList,
  decisions: textList,
  constraints: textList,
  status: z.enum(['DRAFT', 'REVIEW', 'APPROVED', 'SUPERSEDED']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

export type DesignInput = z.input<typeof DesignSchema>;
