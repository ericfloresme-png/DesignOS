export type RequirementPriority = 'MUST' | 'SHOULD' | 'COULD';
export type RequirementStatus = 'DRAFT' | 'APPROVED' | 'IMPLEMENTED' | 'VERIFIED' | 'DEPRECATED';

export interface Requirement {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly priority: RequirementPriority;
  readonly status: RequirementStatus;
  readonly specId: string;
  readonly acceptanceCriteria: readonly string[];
  readonly dependencyIds: readonly string[];
  readonly designIds: readonly string[];
  readonly taskIds: readonly string[];
  readonly testIds: readonly string[];
  readonly issueIds: readonly string[];
  readonly versionIds: readonly string[];
  readonly revision: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
