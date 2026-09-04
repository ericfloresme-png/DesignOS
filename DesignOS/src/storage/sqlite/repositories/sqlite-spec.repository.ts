import { SpecSchema } from '../../../core/spec/spec.schema';
import type { Spec } from '../../../core/spec/spec.types';
import type { SpecRepository } from '../../../core/ports/spec.repository';
import { createDatabase, type DatabaseConnection } from '../database';

interface SpecRevisionRow {
  id: string;
  system_id: string;
  revision: number;
  title: string;
  content: string;
  status: Spec['status'];
  created_at: string;
  updated_at: string;
}

export class SqliteSpecRepository implements SpecRepository {
  private readonly database: DatabaseConnection;

  public constructor(filename: string) {
    this.database = createDatabase(filename);
  }

  public save(spec: Spec): void {
    const existing = this.database.prepare('SELECT current_revision FROM specs WHERE id = ?').get(spec.id) as { current_revision: number } | undefined;
    if (existing && spec.revision <= existing.current_revision) {
      throw new Error(`Spec revision must advance: ${spec.id} ${spec.revision}`);
    }

    this.database.prepare(`
      INSERT INTO specs (id, system_id, current_revision, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        current_revision = excluded.current_revision,
        updated_at = excluded.updated_at
    `).run(spec.id, spec.systemId, spec.revision, spec.createdAt, spec.updatedAt);

    this.database.prepare(`
      INSERT INTO spec_revisions (spec_id, revision, title, content, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(spec.id, spec.revision, spec.title, spec.content, spec.status, spec.createdAt, spec.updatedAt);
  }

  public findById(id: string, revision?: number): Spec | null {
    const row = this.database.prepare(`
      SELECT s.id, s.system_id, r.revision, r.title, r.content, r.status, r.created_at, r.updated_at
      FROM specs s JOIN spec_revisions r ON r.spec_id = s.id
      WHERE s.id = ? AND (? IS NULL OR r.revision = ?)
    `).get(id, revision ?? null, revision ?? null) as SpecRevisionRow | undefined;
    return row ? this.toDomain(row) : null;
  }

  public findLatest(id: string): Spec | null {
    const row = this.database.prepare(`
      SELECT s.id, s.system_id, r.revision, r.title, r.content, r.status, r.created_at, r.updated_at
      FROM specs s JOIN spec_revisions r ON r.spec_id = s.id AND r.revision = s.current_revision
      WHERE s.id = ?
    `).get(id) as SpecRevisionRow | undefined;
    return row ? this.toDomain(row) : null;
  }

  public findHistory(id: string): Spec[] {
    const rows = this.database.prepare(`
      SELECT s.id, s.system_id, r.revision, r.title, r.content, r.status, r.created_at, r.updated_at
      FROM specs s JOIN spec_revisions r ON r.spec_id = s.id
      WHERE s.id = ?
      ORDER BY r.revision ASC
    `).all(id) as SpecRevisionRow[];
    return rows.map((row) => this.toDomain(row));
  }

  public close(): void {
    this.database.close();
  }

  private toDomain(row: SpecRevisionRow): Spec {
    return SpecSchema.parse({
      id: row.id,
      systemId: row.system_id,
      title: row.title,
      content: row.content,
      revision: row.revision,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}
