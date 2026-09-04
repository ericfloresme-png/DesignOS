CREATE TABLE IF NOT EXISTS runs (
  id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  system_id TEXT NOT NULL,
  version_id TEXT,
  status TEXT NOT NULL,
  payload TEXT NOT NULL
);
