export type SystemStatus = 'ACTIVE' | 'ARCHIVED';

export interface System {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly status: SystemStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}
