import { describe, expect, it } from 'vitest';
import { createExecutorDefinition, ExecutorDefinitionSchema } from '../../src/core/execution/executor-definition';
import { createExecutionRequest, ExecutionRequestSchema } from '../../src/core/execution/execution-request';
import { createExecutionResult, ExecutionResultSchema } from '../../src/core/execution/execution-result';
import { createArtifact, ArtifactSchema } from '../../src/core/artifact/artifact';

describe('DOS-TEST-038..041 — Executor contracts', () => {
  it('validates ExecutorDefinition, Request, Result and Artifact contracts', () => {
    const definition = createExecutorDefinition({ id: 'EXEC-001', name: 'Mock', kind: 'MOCK', capabilities: ['artifact'], version: '1.0.0', status: 'ACTIVE', metadata: {} });
    const request = createExecutionRequest({ id: 'REQ-EXEC-001', projectId: 'PROJECT-001', specId: 'SPEC-001', taskId: 'TASK-001', runId: 'RUN-001', executorId: definition.id, inputs: {}, parameters: {}, context: {} });
    const result = createExecutionResult({ id: 'RESULT-001', requestId: request.id, status: 'COMPLETED', outputs: { ok: true }, artifacts: [], diagnostics: [] });
    const artifact = createArtifact({ id: 'ARTIFACT-001', type: 'TEST', format: 'json', locator: 'memory://artifact', checksum: null, producer: definition.id, runId: request.runId });
    expect(ExecutorDefinitionSchema.parse(definition)).toEqual(definition);
    expect(ExecutionRequestSchema.parse(request)).toEqual(request);
    expect(ExecutionResultSchema.parse(result)).toEqual(result);
    expect(ArtifactSchema.parse(artifact)).toEqual(artifact);
    expect(() => ExecutionRequestSchema.parse({ ...request, projectId: '' })).toThrow();
    expect(() => ExecutionResultSchema.parse({ ...result, status: 'INVALID' })).toThrow();
    expect(() => ArtifactSchema.parse({ ...artifact, locator: '' })).toThrow();
  });
});
