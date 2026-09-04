export type SpecStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SUPERSEDED';

export interface Spec {
  readonly id: string;
  readonly systemId: string;
  readonly title: string;
  readonly content: string;
  readonly revision: number;
  readonly status: SpecStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}
