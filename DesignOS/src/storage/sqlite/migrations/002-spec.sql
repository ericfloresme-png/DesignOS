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
