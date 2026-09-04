export type TestResultStatus = 'NOT_RUN' | 'RUNNING' | 'PASS' | 'FAIL';

export interface TestResult {
  readonly id: string;
  readonly runId: string;
  readonly testId: string;
  readonly expected: string;
  readonly actual: string;
  readonly status: TestResultStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}
