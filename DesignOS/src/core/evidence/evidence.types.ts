export interface Evidence {
  readonly id: string;
  readonly runId: string;
  readonly testResultId: string;
  readonly type: string;
  readonly locator: string;
  readonly description: string;
  readonly createdAt: string;
}
