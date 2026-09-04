import { z } from 'zod';

const uniqueIds = z.array(z.string().min(1)).superRefine((ids, context) => {
  if (new Set(ids).size !== ids.length) {
    context.addIssue({ code: 'custom', message: 'IDs must be unique' });
  }
});

export const RequirementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(['MUST', 'SHOULD', 'COULD']),
  status: z.enum(['DRAFT', 'APPROVED', 'IMPLEMENTED', 'VERIFIED', 'DEPRECATED']),
  specId: z.string().min(1),
  acceptanceCriteria: z.array(z.string().min(1)).min(1),
  dependencyIds: uniqueIds,
  designIds: uniqueIds,
  taskIds: uniqueIds,
  testIds: uniqueIds,
  issueIds: uniqueIds,
  versionIds: uniqueIds,
  revision: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

export type RequirementInput = z.input<typeof RequirementSchema>;
