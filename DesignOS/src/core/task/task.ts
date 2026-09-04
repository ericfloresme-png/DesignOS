import { TaskSchema, type TaskInput } from './task.schema';
import type { Task } from './task.types';

export { TaskSchema } from './task.schema';
export type { Task } from './task.types';

type TaskCreationInput = Pick<TaskInput, 'id' | 'systemId' | 'requirementIds' | 'module' | 'objective' | 'scope' | 'outOfScope' | 'constraints' | 'dependencies' | 'expectedOutput' | 'futureTests' | 'definitionOfDone'>;

export function createTask(input: TaskCreationInput): Task {
  const now = new Date().toISOString();
  return TaskSchema.parse({ ...input, status: 'TODO', createdAt: now, updatedAt: now });
}

export function isTaskReady(task: Task): boolean {
  return task.requirementIds.length > 0 &&
    task.module.length > 0 &&
    task.objective.length > 0 &&
    task.scope.length > 0 &&
    task.outOfScope.length > 0 &&
    task.constraints.length > 0 &&
    task.expectedOutput.length > 0 &&
    task.futureTests.length > 0 &&
    task.definitionOfDone.length > 0;
}

export function markTaskReady(task: Task): Task {
  if (!isTaskReady(task)) {
    throw new Error('Task is incomplete and cannot become READY');
  }

  return TaskSchema.parse({ ...task, status: 'READY', updatedAt: new Date().toISOString() });
}
