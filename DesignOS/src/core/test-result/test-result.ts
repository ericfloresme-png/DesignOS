import { TestResultSchema, type TestResultInput } from './test-result.schema';
import type { TestResult } from './test-result.types';

export { TestResultSchema } from './test-result.schema';
export type { TestResult } from './test-result.types';

export function createTestResult(input: Pick<TestResultInput, 'id' | 'runId' | 'testId' | 'expected' | 'actual' | 'status'>): TestResult {
  const now = new Date().toISOString();
  return TestResultSchema.parse({ ...input, createdAt: now, updatedAt: now });
}
