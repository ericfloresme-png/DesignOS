import { describe, expect, it } from 'vitest';
import { createTask, markTaskReady, TaskSchema } from '../../src/core/task/task';

describe('DOS-TEST-006 — Task readiness', () => {
  it('accepts a complete Task related to a Requirement and can become READY', () => {
    const task = createTask({
      id: 'TASK-001',
      systemId: 'SYS-001',
      requirementIds: ['REQ-001'],
      module: 'SYSTEM MANAGEMENT',
      objective: 'Define the System model.',
      scope: ['System schema', 'System tests'],
      outOfScope: ['SQLite', 'React'],
      constraints: ['Domain Core only.'],
      dependencies: [],
      expectedOutput: ['Valid System model'],
      futureTests: ['DOS-TEST-002'],
      definitionOfDone: ['DOS-TEST-002 PASS'],
    });

    expect(task.status).toBe('TODO');
    expect(TaskSchema.parse(task)).toEqual(task);
    expect(markTaskReady(task).status).toBe('READY');
  });

  it('rejects a Task without a Requirement or required readiness data', () => {
    expect(() => createTask({
      id: 'TASK-002',
      systemId: 'SYS-001',
      requirementIds: [],
      module: 'SYSTEM MANAGEMENT',
      objective: 'Incomplete task.',
      scope: ['Scope'],
      outOfScope: ['Out of scope'],
      constraints: ['Constraint'],
      dependencies: [],
      expectedOutput: ['Output'],
      futureTests: ['DOS-TEST-002'],
      definitionOfDone: ['Test PASS'],
    })).toThrow();
  });
});
