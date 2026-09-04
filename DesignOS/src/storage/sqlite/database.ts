declare const require: (moduleName: string) => unknown;

interface SqliteStatement {
  run(...parameters: unknown[]): unknown;
  get(...parameters: unknown[]): unknown;
  all(...parameters: unknown[]): unknown[];
}

export interface DatabaseConnection {
  exec(sql: string): void;
  prepare(sql: string): SqliteStatement;
  pragma?(pragma: string): unknown;
  close(): void;
}

type DatabaseConstructor = new (filename: string) => DatabaseConnection;

export function createDatabase(filename: string): DatabaseConnection {
  const Database = require('better-sqlite3') as DatabaseConstructor;
  const database = new Database(filename);

  database.exec(`
    CREATE TABLE IF NOT EXISTS runs (
      id TEXT PRIMARY KEY,
      task_id TEXT NOT NULL,
      system_id TEXT NOT NULL,
      version_id TEXT,
      status TEXT NOT NULL,
      payload TEXT NOT NULL
    )
  `);

  database.exec(`
    CREATE TABLE IF NOT EXISTS executors (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS execution_requests (id TEXT PRIMARY KEY, executor_id TEXT NOT NULL, run_id TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS execution_results (id TEXT PRIMARY KEY, request_id TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS artifacts (id TEXT PRIMARY KEY, run_id TEXT NOT NULL, producer TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS artifact_validations (artifact_id TEXT NOT NULL, test_result_id TEXT NOT NULL, evidence_id TEXT NOT NULL, PRIMARY KEY (artifact_id, test_result_id));
  `);

  database.exec(`
    CREATE TABLE IF NOT EXISTS specs (
      id TEXT PRIMARY KEY,
      system_id TEXT NOT NULL,
      current_revision INTEGER NOT NULL CHECK (current_revision > 0),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS spec_revisions (
      spec_id TEXT NOT NULL,
      revision INTEGER NOT NULL CHECK (revision > 0),
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('DRAFT', 'REVIEW', 'APPROVED', 'SUPERSEDED')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (spec_id, revision),
      FOREIGN KEY (spec_id) REFERENCES specs(id)
    );
    CREATE INDEX IF NOT EXISTS idx_spec_revisions_history
      ON spec_revisions (spec_id, revision ASC);
  `);

  database.exec(`
    CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS project_specs (
      project_id TEXT NOT NULL, spec_id TEXT NOT NULL, payload TEXT NOT NULL,
      PRIMARY KEY (project_id, spec_id), FOREIGN KEY (project_id) REFERENCES projects(id)
    );
    CREATE TABLE IF NOT EXISTS project_tasks (
      project_id TEXT NOT NULL, spec_id TEXT NOT NULL, task_id TEXT PRIMARY KEY, payload TEXT NOT NULL,
      FOREIGN KEY (project_id, spec_id) REFERENCES project_specs(project_id, spec_id)
    );
    CREATE TABLE IF NOT EXISTS flow_runs (
      project_id TEXT NOT NULL, spec_id TEXT NOT NULL, task_id TEXT NOT NULL, run_id TEXT PRIMARY KEY, payload TEXT NOT NULL,
      FOREIGN KEY (project_id, spec_id) REFERENCES project_specs(project_id, spec_id),
      FOREIGN KEY (task_id) REFERENCES project_tasks(task_id)
    );
    CREATE TABLE IF NOT EXISTS test_results (
      id TEXT PRIMARY KEY, run_id TEXT NOT NULL, payload TEXT NOT NULL,
      FOREIGN KEY (run_id) REFERENCES flow_runs(run_id)
    );
    CREATE TABLE IF NOT EXISTS evidence (
      id TEXT PRIMARY KEY, run_id TEXT NOT NULL, test_result_id TEXT NOT NULL, payload TEXT NOT NULL,
      FOREIGN KEY (run_id) REFERENCES flow_runs(run_id), FOREIGN KEY (test_result_id) REFERENCES test_results(id)
    );
    CREATE TABLE IF NOT EXISTS history_entries (
      id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL,
      operation TEXT NOT NULL, context TEXT NOT NULL, created_at TEXT NOT NULL
    );
  `);

  return database;
}
