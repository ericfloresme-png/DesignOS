export type TaskStatus = 'TODO' | 'READY' | 'RUNNING' | 'REVIEW' | 'DONE' | 'BLOCKED';

export interface Task {
  readonly id: string;
  readonly systemId: string;
  readonly requirementIds: readonly string[];
  readonly module: string;
  readonly objective: string;
  readonly scope: readonly string[];
  readonly outOfScope: readonly string[];
  readonly constraints: readonly string[];
  readonly dependencies: readonly string[];
  readonly expectedOutput: readonly string[];
  readonly futureTests: readonly string[];
  readonly definitionOfDone: readonly string[];
  readonly status: TaskStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}
