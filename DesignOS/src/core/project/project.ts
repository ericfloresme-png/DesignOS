import { ProjectSchema, type ProjectInput } from './project.schema';
import type { Project } from './project.types';

export { ProjectSchema } from './project.schema';
export type { Project } from './project.types';

export function createProject(input: Pick<ProjectInput, 'id' | 'name'> & Partial<Pick<ProjectInput, 'description'>>): Project {
  const now = new Date().toISOString();
  return ProjectSchema.parse({ ...input, description: input.description ?? '', status: 'ACTIVE', createdAt: now, updatedAt: now });
}
