import type { RunRepository } from '../../../core/ports/run.repository';
import { RunSchema } from '../../../core/run/run.schema';
import type { Run } from '../../../core/run/run.types';
import { createDatabase, type DatabaseConnection } from '../database';

export class SqliteRunRepository implements RunRepository {
  private readonly database: DatabaseConnection;

  public constructor(filename: string) {
    this.database = createDatabase(filename);
  }

  public save(run: Run): void {
    this.database.prepare(`
      INSERT INTO runs (id, task_id, system_id, version_id, status, payload)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        task_id = excluded.task_id,
        system_id = excluded.system_id,
        version_id = excluded.version_id,
        status = excluded.status,
        payload = excluded.payload
    `).run(run.id, run.taskId, run.systemId, run.versionId, run.status, JSON.stringify(run));
  }

  public findById(id: string): Run | null {
    const row = this.database.prepare('SELECT payload FROM runs WHERE id = ?').get(id) as { payload: string } | undefined;
    return row ? RunSchema.parse(JSON.parse(row.payload)) : null;
  }

  public close(): void {
    this.database.close();
  }
}
