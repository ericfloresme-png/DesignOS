import type { ExecutionRequest } from './execution-request';
import type { ExecutionResult } from './execution-result';
export interface Executor { readonly id: string; execute(request: ExecutionRequest): ExecutionResult; }
