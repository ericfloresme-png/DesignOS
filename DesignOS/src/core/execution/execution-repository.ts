import type { Artifact } from '../artifact/artifact';
import type { ExecutionRequest } from './execution-request';
import type { ExecutionResult } from './execution-result';
import type { ExecutorDefinition } from './executor-definition';
import type { Evidence } from '../evidence/evidence.types';
import type { TestResult } from '../test-result/test-result.types';
import type { TraceabilityRecord } from '../ports/project-flow.repository';

export interface ExtendedTraceability extends TraceabilityRecord { readonly executor: ExecutorDefinition; readonly artifact: Artifact; }
export interface ExecutionRepository {
  saveExecutor(definition: ExecutorDefinition): void;
  saveRequest(request: ExecutionRequest): void;
  saveResult(result: ExecutionResult): void;
  saveArtifact(artifact: Artifact): void;
  linkArtifactValidation(artifactId: string, testResult: TestResult, evidence: Evidence): void;
  getExtendedTraceability(projectId: string): ExtendedTraceability;
}
