import type { Spec } from '../spec/spec.types';

export interface SpecRepository {
  save(spec: Spec): void;
  findById(id: string, revision?: number): Spec | null;
  findLatest(id: string): Spec | null;
  findHistory(id: string): Spec[];
  close(): void;
}
