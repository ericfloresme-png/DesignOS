CREATE TABLE IF NOT EXISTS executors (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS execution_requests (id TEXT PRIMARY KEY, executor_id TEXT NOT NULL, run_id TEXT NOT NULL, payload TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS execution_results (id TEXT PRIMARY KEY, request_id TEXT NOT NULL, payload TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS artifacts (id TEXT PRIMARY KEY, run_id TEXT NOT NULL, producer TEXT NOT NULL, payload TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS artifact_validations (artifact_id TEXT NOT NULL, test_result_id TEXT NOT NULL, evidence_id TEXT NOT NULL, PRIMARY KEY (artifact_id, test_result_id));
