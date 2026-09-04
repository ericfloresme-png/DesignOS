export const TEST_STATUSES = ['NOT_RUN', 'RUNNING', 'PASS', 'FAIL', 'SKIPPED'] as const;
export type TestStatus = typeof TEST_STATUSES[number];

export interface TestHistoryEntry {
  readonly status: TestStatus;
  readonly actual: string | null;
  readonly output: string | null;
  readonly error: string | null;
  readonly runId: string | null;
  readonly evidenceIds: readonly string[];
  readonly recordedAt: string;
}

export interface TestCoverage {
  readonly applicableRequirementIds: readonly string[];
  readonly coveredRequirementIds: readonly string[];
}

export interface Test {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly requirementIds: readonly string[];
  readonly taskIds: readonly string[];
  readonly runId: string | null;
  readonly objective: string;
  readonly preconditions: readonly string[];
  readonly input: string;
  readonly steps: readonly string[];
  readonly expectedResult: string;
  readonly passCriteria: string;
  readonly failCriteria: string;
  readonly evidenceRequired: readonly string[];
  readonly priority: string;
  readonly status: TestStatus;
  readonly actual: string | null;
  readonly output: string | null;
  readonly error: string | null;
  readonly evidenceIds: readonly string[];
  readonly affectedTestIds: readonly string[];
  readonly regressionTestIds: readonly string[];
  readonly coverage: TestCoverage;
  readonly history: readonly TestHistoryEntry[];
  readonly createdAt: string;
  readonly updatedAt: string;
}
