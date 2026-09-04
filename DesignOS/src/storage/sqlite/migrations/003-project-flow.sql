CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  payload TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_specs (
  project_id TEXT NOT NULL,
  spec_id TEXT NOT NULL,
  payload TEXT NOT NULL,
  PRIMARY KEY (project_id, spec_id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS project_tasks (
  project_id TEXT NOT NULL,
  spec_id TEXT NOT NULL,
  task_id TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  FOREIGN KEY (project_id, spec_id) REFERENCES project_specs(project_id, spec_id)
);

CREATE TABLE IF NOT EXISTS flow_runs (
  project_id TEXT NOT NULL,
  spec_id TEXT NOT NULL,
  task_id TEXT NOT NULL,
  run_id TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  FOREIGN KEY (project_id, spec_id) REFERENCES project_specs(project_id, spec_id),
  FOREIGN KEY (task_id) REFERENCES project_tasks(task_id)
);

CREATE TABLE IF NOT EXISTS test_results (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  payload TEXT NOT NULL,
  FOREIGN KEY (run_id) REFERENCES flow_runs(run_id)
);

CREATE TABLE IF NOT EXISTS evidence (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  test_result_id TEXT NOT NULL,
  payload TEXT NOT NULL,
  FOREIGN KEY (run_id) REFERENCES flow_runs(run_id),
  FOREIGN KEY (test_result_id) REFERENCES test_results(id)
);

CREATE TABLE IF NOT EXISTS history_entries (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  operation TEXT NOT NULL,
  context TEXT NOT NULL,
  created_at TEXT NOT NULL
);
