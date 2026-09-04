import type { RunRepository } from '../../core/ports/run.repository';
import { createRun } from '../../core/run/run';
import type { RunInput } from '../../core/run/run.schema';
import type { Run } from '../../core/run/run.types';
import type { ContextPack } from '../../core/context/context-pack.types';

type CreateRunInput = Omit<Pick<RunInput, 'id' | 'taskId' | 'systemId' | 'origin'>, never> & { contextPack: ContextPack } &
  Partial<Pick<RunInput, 'versionId' | 'modifiedFiles' | 'testIds' | 'evidenceIds'>>;

export function registerRun(repository: RunRepository, input: CreateRunInput): Run {
  const run = createRun(input);
  repository.save(run);
  return run;
}
