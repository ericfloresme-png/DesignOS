import { z } from 'zod';

const idList = z.array(z.string().min(1));
const textList = z.array(z.string().min(1));

export const TestStatusSchema = z.enum(['NOT_RUN', 'RUNNING', 'PASS', 'FAIL', 'SKIPPED']);

export const TestHistoryEntrySchema = z.object({
  status: TestStatusSchema,
  actual: z.string().nullable(),
  output: z.string().nullable(),
  error: z.string().nullable(),
  runId: z.string().min(1).nullable(),
  evidenceIds: idList,
  recordedAt: z.string().datetime(),
}).strict();

export const TestCoverageSchema = z.object({
  applicableRequirementIds: idList,
  coveredRequirementIds: idList,
}).strict();

export const TestSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
  requirementIds: idList,
  taskIds: idList,
  runId: z.string().min(1).nullable(),
  objective: z.string().min(1),
  preconditions: textList,
  input: z.string().min(1),
  steps: textList,
  expectedResult: z.string().min(1),
  passCriteria: z.string().min(1),
  failCriteria: z.string().min(1),
  evidenceRequired: textList,
  priority: z.string().min(1),
  status: TestStatusSchema,
  actual: z.string().nullable(),
  output: z.string().nullable(),
  error: z.string().nullable(),
  evidenceIds: idList,
  affectedTestIds: idList,
  regressionTestIds: idList,
  coverage: TestCoverageSchema,
  history: z.array(TestHistoryEntrySchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

export type TestInput = z.input<typeof TestSchema>;
