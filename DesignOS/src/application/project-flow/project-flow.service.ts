import type { Evidence } from '../../core/evidence/evidence.types';
import type { Project } from '../../core/project/project.types';
import { createProject } from '../../core/project/project';
import type { ProjectInput } from '../../core/project/project.schema';
import type { Spec } from '../../core/spec/spec.types';
import type { Task } from '../../core/task/task.types';
import type { Run } from '../../core/run/run.types';
import type { TestResult } from '../../core/test-result/test-result.types';
import type { HistoryEntry, ProjectFlowRepository, TraceabilityRecord } from '../../core/ports/project-flow.repository';

export interface ProjectFlowService {
  createProject(input: Pick<ProjectInput, 'id' | 'name'> & Partial<Pick<ProjectInput, 'description'>>): Project;
  associateSpec(projectId: string, spec: Spec): void;
  createTask(projectId: string, specId: string, task: Task): void;
  registerRun(projectId: string, specId: string, run: Run): void;
  recordTestResult(result: TestResult): void;
  recordEvidence(evidence: Evidence): void;
  getTraceability(projectId: string): TraceabilityRecord;
  getHistory(): HistoryEntry[];
}

export function createProjectFlowService(repository: ProjectFlowRepository): ProjectFlowService {
  return {
    createProject(input) {
      const project = createProject(input);
      repository.saveProject(project);
      return project;
    },
    associateSpec(projectId, spec) { repository.associateSpec(projectId, spec); },
    createTask(projectId, specId, task) { repository.saveTask(projectId, specId, task); },
    registerRun(projectId, specId, run) { repository.saveRun(projectId, specId, run); },
    recordTestResult(result) { repository.saveTestResult(result); },
    recordEvidence(evidence) { repository.saveEvidence(evidence); },
    getTraceability(projectId) { return repository.getTraceability(projectId); },
    getHistory() { return repository.getHistory(); },
  };
}
