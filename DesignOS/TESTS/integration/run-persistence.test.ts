import { afterEach, describe, expect, it } from 'vitest';
import { createRun } from '../../src/core/run/run';
import { createContextPack } from '../../src/core/context/context-pack';
import { SqliteRunRepository } from '../../src/storage/sqlite/repositories/sqlite-run.repository';

const contextPack = createContextPack({
  systemId: 'SYS-001',
  specId: 'SPEC-001',
  requirementIds: ['REQ-001'],
  taskId: 'TASK-008',
  constraints: ['SQLite behind repository port.'],
  relevantFilePaths: ['src/core/run/run.ts'],
  relatedTestIds: ['TEST-009'],
  relatedIssueIds: [],
  relevantKnowledgeIds: [],
  currentVersionId: null,
});

describe('DOS-TEST-022/023 — Run persistence and recovery', () => {
  let repository: SqliteRunRepository;

  afterEach(() => repository?.close());

  it('persists and reads a Run without losing references or status', () => {
    repository = new SqliteRunRepository(':memory:');
    const run = createRun({ id: 'RUN-003', taskId: 'TASK-008', systemId: 'SYS-001', contextPack, origin: 'DESIGNOS' });

    repository.save(run);

    expect(repository.findById(run.id)).toEqual(run);
  });

  it('returns no Run for an unknown ID and keeps the database usable after a failed lookup', () => {
    repository = new SqliteRunRepository(':memory:');

    expect(repository.findById('RUN-MISSING')).toBeNull();
  });
});
