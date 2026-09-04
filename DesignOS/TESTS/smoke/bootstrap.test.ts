import { describe, expect, it } from 'vitest';
import { z } from 'zod';

describe('DesignOS project bootstrap', () => {
  it('loads Zod and validates a smoke payload', () => {
    const schema = z.object({ foundation: z.literal(true) });
    expect(schema.parse({ foundation: true })).toEqual({ foundation: true });
  });
});
