import { RunSchema, type RunInput } from './run.schema';
import type { Run } from './run.types';
import type { ContextPack } from '../context/context-pack.types';

export { RunSchema } from './run.schema';
export type { Run } from './run.types';

type RunCreationInput = Omit<Pick<RunInput, 'id' | 'taskId' | 'systemId' | 'origin'>, never> & { contextPack: ContextPack } &
  Partial<Pick<RunInput, 'versionId' | 'modifiedFiles' | 'testIds' | 'evidenceIds'>>;

export function createRun(input: RunCreationInput): Run {
  const now = new Date().toISOString();
  return RunSchema.parse({
    ...input,
    versionId: input.versionId ?? null,
    status: 'QUEUED',
    result: null,
    startedAt: now,
    finishedAt: null,
    durationMs: null,
    errors: [],
    modifiedFiles: input.modifiedFiles ?? [],
    testIds: input.testIds ?? [],
    evidenceIds: input.evidenceIds ?? [],
    history: [{ status: 'QUEUED', changedAt: now, origin: input.origin }],
  });
}

export function updateRun(
  run: Run,
  changes: Partial<Pick<Run, 'status' | 'result' | 'finishedAt' | 'durationMs' | 'errors' | 'modifiedFiles' | 'testIds' | 'evidenceIds'>>,
): Run {
  const status = changes.status ?? run.status;
  const changedAt = new Date().toISOString();
  return RunSchema.parse({
    ...run,
    ...changes,
    id: run.id,
    taskId: run.taskId,
    systemId: run.systemId,
    contextPack: run.contextPack,
    versionId: run.versionId,
    origin: run.origin,
    startedAt: run.startedAt,
    history: [...run.history, { status, changedAt, origin: run.origin }],
  });
}
