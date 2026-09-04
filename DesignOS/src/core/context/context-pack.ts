import { ContextPackSchema, type ContextPackInput } from './context-pack.schema';
import type { ContextPack } from './context-pack.types';

export { ContextPackSchema } from './context-pack.schema';
export type { ContextPack } from './context-pack.types';

export function createContextPack(input: ContextPackInput): ContextPack {
  return ContextPackSchema.parse({ ...input });
}
