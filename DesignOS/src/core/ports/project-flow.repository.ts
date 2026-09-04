import type { Evidence } from '../evidence/evidence.types';
import type { Project } from '../project/project.types';
import type { Spec } from '../spec/spec.types';
import type { Task } from '../task/task.types';
import type { Run } from '../run/run.types';
import type { TestResult } from '../test-result/test-result.types';

export interface TraceabilityRecord {
  readonly project: Project;
  readonly spec: Spec;
  readonly task: Task;
  readonly run: Run;
  readonly testResult: TestResult;
  readonly evidence: Evidence;
}

export interface HistoryEntry {
  readonly id: string;
  readonly entityType: string;
  readonly entityId: string;
  readonly operation: string;
  readonly context: string;
  readonly createdAt: string;
}

export interface ProjectFlowRepository {
  saveProject(project: Project): void;
  associateSpec(projectId: string, spec: Spec): void;
  saveTask(projectId: string, specId: string, task: Task): void;
  saveRun(projectId: string, specId: string, run: Run): void;
  saveTestResult(result: TestResult): void;
  saveEvidence(evidence: Evidence): void;
  getTraceability(projectId: string): TraceabilityRecord;
  getHistory(): HistoryEntry[];
  close(): void;
}
