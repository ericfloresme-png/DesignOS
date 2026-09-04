declare const require: (moduleName: string) => unknown;

interface SqliteStatement {
  run(...parameters: unknown[]): unknown;
  get(...parameters: unknown[]): unknown;
}

export interface DatabaseConnection {
  exec(sql: string): void;
  prepare(sql: string): SqliteStatement;
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

  return database;
}
