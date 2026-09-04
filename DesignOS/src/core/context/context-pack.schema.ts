import { z } from 'zod';

const uniqueIds = z.array(z.string().min(1)).superRefine((ids, context) => {
  if (new Set(ids).size !== ids.length) {
    context.addIssue({ code: 'custom', message: 'Context Pack references must be unique' });
  }
});

const requiredTextList = z.array(z.string().min(1)).min(1);

export const ContextPackSchema = z.object({
  systemId: z.string().min(1),
  specId: z.string().min(1),
  requirementIds: uniqueIds.min(1),
  taskId: z.string().min(1),
  constraints: requiredTextList,
  relevantFilePaths: requiredTextList,
  relatedTestIds: uniqueIds.min(1),
  relatedIssueIds: uniqueIds,
  relevantKnowledgeIds: uniqueIds,
  currentVersionId: z.string().min(1).nullable(),
}).strict();

export type ContextPackInput = z.input<typeof ContextPackSchema>;
