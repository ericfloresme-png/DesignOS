export type DesignStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SUPERSEDED';

export interface Design {
  readonly id: string;
  readonly specId: string;
  readonly requirementIds: readonly string[];
  readonly decisions: readonly string[];
  readonly constraints: readonly string[];
  readonly status: DesignStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}
