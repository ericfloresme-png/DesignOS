import { z } from 'zod';

const idList = z.array(z.string().min(1));
const textList = z.array(z.string().min(1)).min(1);

export const TaskSchema = z.object({
  id: z.string().min(1),
  systemId: z.string().min(1),
  requirementIds: idList.min(1),
  module: z.string().min(1),
  objective: z.string().min(1),
  scope: textList,
  outOfScope: textList,
  constraints: textList,
  dependencies: idList,
  expectedOutput: textList,
  futureTests: textList,
  definitionOfDone: textList,
  status: z.enum(['TODO', 'READY', 'RUNNING', 'REVIEW', 'DONE', 'BLOCKED']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

export type TaskInput = z.input<typeof TaskSchema>;
