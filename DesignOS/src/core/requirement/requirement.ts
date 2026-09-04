import { RequirementSchema, type RequirementInput } from './requirement.schema';
import type { Requirement } from './requirement.types';

export { RequirementSchema } from './requirement.schema';
export type { Requirement } from './requirement.types';

type RequirementCreationInput = Pick<RequirementInput, 'id' | 'title' | 'description' | 'priority' | 'specId' | 'acceptanceCriteria'> &
  Partial<Pick<RequirementInput, 'dependencyIds' | 'designIds' | 'taskIds' | 'testIds' | 'issueIds' | 'versionIds'>>;

export function createRequirement(input: RequirementCreationInput): Requirement {
  const now = new Date().toISOString();
  return RequirementSchema.parse({
    ...input,
    status: 'DRAFT',
    dependencyIds: input.dependencyIds ?? [],
    designIds: input.designIds ?? [],
    taskIds: input.taskIds ?? [],
    testIds: input.testIds ?? [],
    issueIds: input.issueIds ?? [],
    versionIds: input.versionIds ?? [],
    revision: 1,
    createdAt: now,
    updatedAt: now,
  });
}

export function updateRequirement(
  requirement: Requirement,
  changes: Partial<Pick<Requirement, 'title' | 'description' | 'priority' | 'status' | 'acceptanceCriteria' | 'dependencyIds' | 'designIds' | 'taskIds' | 'testIds' | 'issueIds' | 'versionIds'>>,
): Requirement {
  return RequirementSchema.parse({
    ...requirement,
    ...changes,
    id: requirement.id,
    specId: requirement.specId,
    revision: requirement.revision + 1,
    createdAt: requirement.createdAt,
    updatedAt: new Date().toISOString(),
  });
}
