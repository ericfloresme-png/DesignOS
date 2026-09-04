import type { ContextPack } from '../context/context-pack.types';

export type RunStatus = 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface RunHistoryEntry {
  readonly status: RunStatus;
  readonly changedAt: string;
  readonly origin: string;
}

export interface Run {
  readonly id: string;
  readonly taskId: string;
  readonly systemId: string;
  readonly contextPack: ContextPack;
  readonly versionId: string | null;
  readonly origin: string;
  readonly status: RunStatus;
  readonly result: string | null;
  readonly startedAt: string;
  readonly finishedAt: string | null;
  readonly durationMs: number | null;
  readonly errors: readonly string[];
  readonly modifiedFiles: readonly string[];
  readonly testIds: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly history: readonly RunHistoryEntry[];
}
