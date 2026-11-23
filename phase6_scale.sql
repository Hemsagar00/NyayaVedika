-- =============================================
-- Nyaya Vedika - Phase 6: Scale & Reliability
-- Run in phpMyAdmin
-- =============================================

-- ===========================================
-- STEP 1: Async Job Queue
-- ===========================================

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
  INDEX idx_jobs_tenant (tenant_id),
  INDEX idx_jobs_type (type),
  INDEX idx_jobs_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- STEP 3: Monitoring Metrics
-- ===========================================

CREATE TABLE metrics (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  value FLOAT NOT NULL,
  tenant_id CHAR(36),
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_metrics_name (name),
  INDEX idx_metrics_created (created_at),
  INDEX idx_metrics_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- STEP 4: Rate Limits Table
-- ===========================================

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
-- VERIFY
-- ===========================================
-- SHOW TABLES;
-- Expected: jobs, metrics, rate_limits added
