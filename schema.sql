-- =============================================
-- Nyaya Vedika - Database Foundation Schema
-- Run in phpMyAdmin on nyayavedika_db
-- =============================================

-- ===========================================
-- STEP 1: Drop everything (clean reset)
-- ===========================================

DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS cases;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tenants;

-- ===========================================
-- STEP 2: Recreate in strict order
-- Run one by one if needed
-- ===========================================

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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- STEP 3: Verify
-- ===========================================
-- Run: SHOW TABLES;
-- Expected exactly:
--   cases
--   events
--   files
--   sessions
--   tenants
--   users
-- No other tables.
