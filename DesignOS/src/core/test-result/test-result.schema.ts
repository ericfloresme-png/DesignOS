import { z } from 'zod';

export const TestResultSchema = z.object({
  id: z.string().min(1),
  runId: z.string().min(1),
  testId: z.string().min(1),
  expected: z.string().min(1),
  actual: z.string().min(1),
  status: z.enum(['NOT_RUN', 'RUNNING', 'PASS', 'FAIL']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

export type TestResultInput = z.input<typeof TestResultSchema>;
