-- Ressourcenplanung: Basis-Schema (SQLite/PostgreSQL-kompatibel)

CREATE TABLE consultants (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  weekly_capacity_hours INTEGER NOT NULL DEFAULT 40,
  role TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  client TEXT,
  start_date DATE,
  end_date DATE,
  planned_total_hours INTEGER
);

CREATE TABLE allocations (
  id INTEGER PRIMARY KEY,
  consultant_id INTEGER NOT NULL REFERENCES consultants(id),
  project_id INTEGER NOT NULL REFERENCES projects(id),
  week_start DATE NOT NULL,
  planned_hours INTEGER NOT NULL,
  note TEXT,
  UNIQUE (consultant_id, project_id, week_start)
);

CREATE TABLE absences (
  id INTEGER PRIMARY KEY,
  consultant_id INTEGER NOT NULL REFERENCES consultants(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('vacation', 'sick', 'other')),
  note TEXT
);

CREATE TABLE capacity_overrides (
  id INTEGER PRIMARY KEY,
  consultant_id INTEGER NOT NULL REFERENCES consultants(id),
  week_start DATE NOT NULL,
  capacity_hours INTEGER NOT NULL,
  reason TEXT,
  UNIQUE (consultant_id, week_start)
);
