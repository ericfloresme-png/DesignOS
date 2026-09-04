import { createEvidence } from '../../core/evidence/evidence';
import type { Evidence } from '../../core/evidence/evidence.types';
import { createExecutionRequest } from '../../core/execution/execution-request';
import type { ExecutionResult } from '../../core/execution/execution-result';
import type { Executor } from '../../core/execution/executor';
import type { ExecutorDefinition } from '../../core/execution/executor-definition';
import { createTestResult } from '../../core/test-result/test-result';
import type { Run } from '../../core/run/run.types';
import type { ProjectFlowRepository } from '../../core/ports/project-flow.repository';
import type { ExecutionRepository, ExtendedTraceability } from '../../core/execution/execution-repository';

export interface ArchitecturalExecutionOutcome { readonly result: ExecutionResult; readonly artifacts: Array<{ id: string; type: string; format: string; locator: string; checksum: string | null; producer: string; runId: string; createdAt: string }>; readonly evidence: Evidence[]; readonly trace: ExtendedTraceability; }
export function createArchitecturalExecutionService(repository: ProjectFlowRepository & ExecutionRepository, executor: Executor) {
  return {
    execute(input: { projectId: string; specId: string; taskId: string; run: Run; executor: ExecutorDefinition; inputs: Record<string, unknown>; parameters: Record<string, unknown>; context: Record<string, unknown> }): ArchitecturalExecutionOutcome {
      repository.saveExecutor(input.executor);
      const request = createExecutionRequest({ id: `${input.run.id}-REQUEST-001`, projectId: input.projectId, specId: input.specId, taskId: input.taskId, runId: input.run.id, executorId: input.executor.id, inputs: input.inputs, parameters: input.parameters, context: input.context });
      repository.saveRequest(request);
      const result = executor.execute(request);
      repository.saveResult(result);
      const artifacts = result.artifacts.map((id) => ({ id, type: 'MOCK_ARTIFACT', format: 'json', locator: `memory://${input.run.id}`, checksum: null, producer: input.executor.id, runId: input.run.id, createdAt: new Date().toISOString() }));
      const evidence: Evidence[] = [];
      for (const artifact of artifacts) { repository.saveArtifact(artifact); const test = createTestResult({ id: `${artifact.id}-TEST-001`, runId: input.run.id, testId: 'DOS-TEST-049', expected: 'COMPLETED', actual: result.status, status: result.status === 'COMPLETED' ? 'PASS' : 'FAIL' }); const ev = createEvidence({ id: `${artifact.id}-EVIDENCE-001`, runId: input.run.id, testResultId: test.id, type: 'ARTIFACT_VALIDATION', locator: artifact.locator, description: 'Mock artifact validation' }); repository.saveTestResult(test); repository.saveEvidence(ev); repository.linkArtifactValidation(artifact.id, test, ev); evidence.push(ev); }
      return { result, artifacts, evidence, trace: repository.getExtendedTraceability(input.projectId) };
    },
  };
}
