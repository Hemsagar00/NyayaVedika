-- =============================================
-- Nyaya Vedika - Complete Database Setup
-- Single file for aaPanel deployment
-- Copy and paste entire contents into phpMyAdmin SQL tab
-- =============================================

-- ===========================================
-- PHASE 1: FOUNDATION (Clean Reset)
-- ===========================================

DROP TABLE IF EXISTS embeddings;
DROP TABLE IF EXISTS chunks;
DROP TABLE IF EXISTS document_text;
DROP TABLE IF EXISTS metrics;
DROP TABLE IF EXISTS rate_limits;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS cases;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tenants;

-- 1. tenants
CREATE TABLE tenants (
  id CHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. users
CREATE TABLE users (
  id CHAR(36) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  tenant_id CHAR(36) NOT NULL,
  role VARCHAR(50) DEFAULT 'owner',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_users_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. sessions
CREATE TABLE sessions (
  id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_sessions_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. cases
CREATE TABLE cases (
  id CHAR(36) NOT NULL,
  tenant_id CHAR(36) NOT NULL,
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_cases_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. files
CREATE TABLE files (
  id CHAR(36) NOT NULL,
  case_id CHAR(36) NOT NULL,
  tenant_id CHAR(36) NOT NULL,
  path TEXT,
  hash VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_files_case
    FOREIGN KEY (case_id) REFERENCES cases(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_files_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. events
CREATE TABLE events (
  id CHAR(36) NOT NULL,
  tenant_id CHAR(36) NOT NULL,
  user_id CHAR(36),
  action VARCHAR(100),
  object_type VARCHAR(100),
  object_id CHAR(36),
  ip VARCHAR(45),
  flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_events_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- PHASE 2: AI CORE (Tables only, no embeddings yet)
-- ===========================================

-- Document text storage
CREATE TABLE document_text (
  id CHAR(36) PRIMARY KEY,
  file_id CHAR(36),
  tenant_id CHAR(36),
  content LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_doctext_file
    FOREIGN KEY (file_id) REFERENCES files(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_doctext_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Chunks
CREATE TABLE chunks (
  id CHAR(36) PRIMARY KEY,
  document_id CHAR(36) NOT NULL,
  tenant_id CHAR(36) NOT NULL,
  content TEXT NOT NULL,
  position INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_chunks_doc
    FOREIGN KEY (document_id) REFERENCES document_text(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_chunks_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE,
  INDEX idx_chunks_doc (document_id),
  INDEX idx_chunks_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Embeddings (for future use)
CREATE TABLE embeddings (
  id CHAR(36) PRIMARY KEY,
  chunk_id CHAR(36) NOT NULL,
  tenant_id CHAR(36) NOT NULL,
  vector BLOB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_embed_chunk
    FOREIGN KEY (chunk_id) REFERENCES chunks(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_embed_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- PHASE 5: SAFETY
-- ===========================================

-- Feedback
CREATE TABLE feedback (
  id CHAR(36) PRIMARY KEY,
  tenant_id CHAR(36) NOT NULL,
  user_id CHAR(36),
  message TEXT,
  rating TINYINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_feedback_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE,
  INDEX idx_feedback_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- PHASE 6: SCALE
-- ===========================================

-- Job queue
CREATE TABLE jobs (
  id CHAR(36) PRIMARY KEY,
  tenant_id CHAR(36) NOT NULL,
  type VARCHAR(50) NOT NULL,
  payload JSON,
  status VARCHAR(20) DEFAULT 'pending',
  attempts INT DEFAULT 0,
  error TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  started_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  CONSTRAINT fk_jobs_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE,
  INDEX idx_jobs_status (status),
  INDEX idx_jobs_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Metrics
CREATE TABLE metrics (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  value FLOAT NOT NULL,
  tenant_id CHAR(36),
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_metrics_name (name),
  INDEX idx_metrics_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Rate limits
CREATE TABLE rate_limits (
  id CHAR(36) PRIMARY KEY,
  tenant_id CHAR(36) NOT NULL,
  limit_type VARCHAR(50) NOT NULL,
  max_value INT NOT NULL,
  current_value INT DEFAULT 0,
  reset_at TIMESTAMP,
  CONSTRAINT fk_ratelimits_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE,
  UNIQUE KEY uk_ratelimits (tenant_id, limit_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- BOOTSTRAP DATA
-- ===========================================

INSERT INTO tenants (id, name)
VALUES ('00000000-0000-0000-0000-000000000001', 'Default Tenant');

INSERT INTO users (id, email, name, tenant_id, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@nyayavedika.in',
  'Admin',
  '00000000-0000-0000-0000-000000000001',
  'owner'
);

INSERT INTO sessions (id, user_id, expires_at)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  DATE_ADD(NOW(), INTERVAL 30 DAY)
);

-- ===========================================
-- VERIFY
-- ===========================================
-- Run: SHOW TABLES;
-- Expected 14 tables:
-- cases, chunks, document_text, embeddings, events, 
-- feedback, files, jobs, metrics, rate_limits, 
-- sessions, tenants, users
