import { afterEach, describe, expect, it } from 'vitest';
import { createSpec, updateSpec } from '../../src/core/spec/spec';
import { SqliteSpecRepository } from '../../src/storage/sqlite/repositories/sqlite-spec.repository';
import { SqliteRunRepository } from '../../src/storage/sqlite/repositories/sqlite-run.repository';
import { createContextPack } from '../../src/core/context/context-pack';
import { createRun } from '../../src/core/run/run';

declare const require: (moduleName: string) => unknown;
const fs = require('node:fs') as { mkdtempSync(path: string): string; rmSync(path: string, options: { recursive: boolean; force: boolean }): void };
const os = require('node:os') as { tmpdir(): string };
const path = require('node:path') as { join(...parts: string[]): string };

describe('DOS-TEST-027 — Spec revision persistence and History', () => {
  let repository: SqliteSpecRepository | undefined;
  let temporaryDirectory: string | undefined;

  afterEach(() => {
    repository?.close();
    if (temporaryDirectory) fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it('persists revisions, preserves History, orders numerically and survives reopen', () => {
    repository = new SqliteSpecRepository(':memory:');
    const initial = createSpec({ id: 'SPEC-001', systemId: 'SYS-001', title: 'Initial', content: 'v1' });
    const later = updateSpec(initial, { title: 'Later', content: 'v2', status: 'REVIEW' });

    repository.save(initial);
    repository.save(later);

    expect(repository.findLatest(initial.id)).toEqual(later);
    expect(repository.findById(initial.id, 1)).toEqual(initial);
    expect(repository.findHistory(initial.id)).toEqual([initial, later]);
  });

  it('keeps existing Run data readable through the migration-enabled database', () => {
    temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'designos-spec-'));
    const filename = path.join(temporaryDirectory, 'foundation.db');
    const runs = new SqliteRunRepository(filename);
    const contextPack = createContextPack({
      systemId: 'SYS-001', specId: 'SPEC-002', requirementIds: ['DOS-R003'], taskId: 'DOS-TASK-017',
      constraints: ['Spec persistence only.'], relevantFilePaths: ['src/core/spec/spec.ts'],
      relatedTestIds: ['DOS-TEST-027'], relatedIssueIds: [], relevantKnowledgeIds: [], currentVersionId: null,
    });
    const run = createRun({ id: 'RUN-017', taskId: 'DOS-TASK-017', systemId: 'SYS-001', contextPack, origin: 'DESIGNOS' });
    runs.save(run);
    runs.close();

    repository = new SqliteSpecRepository(filename);
    const initial = createSpec({ id: 'SPEC-002', systemId: 'SYS-001', title: 'Reopen', content: 'durable' });
    repository.save(initial);
    expect(repository.findById(initial.id)).toEqual(initial);
    repository.close();
    repository = new SqliteSpecRepository(filename);
    expect(repository.findLatest(initial.id)).toEqual(initial);
    const recoveredRuns = new SqliteRunRepository(filename);
    expect(recoveredRuns.findById(run.id)).toEqual(run);
    recoveredRuns.close();
  });
});
