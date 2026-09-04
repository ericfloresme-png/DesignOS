import { TestSchema, TestStatusSchema, type TestInput } from './test.schema';
import type { Test, TestStatus } from './test.types';

export { TestSchema, TestStatusSchema } from './test.schema';
export type { Test, TestStatus } from './test.types';

type TestCreationInput = Pick<TestInput,
  'id' | 'title' | 'type' | 'requirementIds' | 'taskIds' | 'objective' |
  'preconditions' | 'input' | 'steps' | 'expectedResult' | 'passCriteria' |
  'failCriteria' | 'evidenceRequired' | 'priority' | 'affectedTestIds' |
  'regressionTestIds'
> & { applicableRequirementIds: string[] };

type TestResultInput = {
  status: TestStatus;
  actual?: string;
  output?: string;
  error?: string;
  runId?: string;
  evidenceIds?: string[];
};

export function createTestDefinition(input: TestCreationInput): Test {
  const now = new Date().toISOString();
  const { applicableRequirementIds, ...definition } = input;
  return TestSchema.parse({
    ...definition,
    runId: null,
    status: 'NOT_RUN',
    actual: null,
    output: null,
    error: null,
    evidenceIds: [],
    coverage: {
      applicableRequirementIds,
      coveredRequirementIds: [],
    },
    history: [],
    createdAt: now,
    updatedAt: now,
  });
}

export function recordTestResult(test: Test, result: TestResultInput): Test {
  const status = TestStatusSchema.parse(result.status);
  const actual = result.actual ?? null;
  const output = result.output ?? null;
  const error = result.error ?? null;
  const runId = result.runId ?? null;
  const evidenceIds = result.evidenceIds ?? [];
  const recordedAt = new Date().toISOString();
  const nextHistoryEntry = { status, actual, output, error, runId, evidenceIds, recordedAt };

  return TestSchema.parse({
    ...test,
    status,
    actual,
    output,
    error,
    runId,
    evidenceIds,
    coverage: {
      ...test.coverage,
      coveredRequirementIds: status === 'PASS'
        ? [...test.coverage.applicableRequirementIds]
        : [...test.coverage.coveredRequirementIds],
    },
    history: [...test.history, nextHistoryEntry],
    updatedAt: recordedAt,
  });
}
