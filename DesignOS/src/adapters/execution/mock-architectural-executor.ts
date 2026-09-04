import { createArtifact } from '../../core/artifact/artifact';
import type { Executor } from '../../core/execution/executor';
import { createExecutionResult, type ExecutionResult } from '../../core/execution/execution-result';
import type { ExecutionRequest } from '../../core/execution/execution-request';

export class MockArchitecturalExecutor implements Executor {
  public readonly id = 'EXEC-MOCK-001';
  public execute(request: ExecutionRequest): ExecutionResult {
    const artifact = createArtifact({ id: `${request.runId}-ARTIFACT-001`, type: 'MOCK_ARTIFACT', format: 'json', locator: `memory://${request.runId}`, checksum: null, producer: this.id, runId: request.runId });
    return createExecutionResult({ id: `${request.runId}-RESULT-001`, requestId: request.id, status: 'COMPLETED', outputs: { mock: true }, artifacts: [artifact.id], diagnostics: [] });
  }
}
