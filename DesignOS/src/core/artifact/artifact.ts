import { z } from 'zod';
export const ArtifactSchema = z.object({ id: z.string().min(1), type: z.string().min(1), format: z.string().min(1), locator: z.string().min(1), checksum: z.string().min(1).nullable(), producer: z.string().min(1), runId: z.string().min(1), createdAt: z.string().datetime() }).strict();
export type Artifact = z.infer<typeof ArtifactSchema>;
export function createArtifact(input: Omit<Artifact, 'createdAt'>): Artifact { return ArtifactSchema.parse({ ...input, createdAt: new Date().toISOString() }); }
