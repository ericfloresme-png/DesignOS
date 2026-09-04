import type { Run } from '../run/run.types';

export interface RunRepository {
  save(run: Run): void;
  findById(id: string): Run | null;
}
