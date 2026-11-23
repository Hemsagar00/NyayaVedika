-- =============================================
-- Nyaya Vedika - Phase 4: Product Experience
-- Tools for advocates. No AI dependency.
-- =============================================

-- ===========================================
-- 1. CASE DEADLINE TRACKER
-- ===========================================

CREATE TABLE deadlines (
  id CHAR(36) PRIMARY KEY,
  tenant_id CHAR(36) NOT NULL,
  case_id CHAR(36),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  reminder BOOLEAN DEFAULT FALSE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_deadlines_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_deadlines_case
    FOREIGN KEY (case_id) REFERENCES cases(id)
    ON DELETE SET NULL,
  INDEX idx_deadlines_tenant (tenant_id),
  INDEX idx_deadlines_due (due_date),
  INDEX idx_deadlines_case (case_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- 5. FEE TRACKER
-- ===========================================

CREATE TABLE fees (
  id CHAR(36) PRIMARY KEY,
  tenant_id CHAR(36) NOT NULL,
  case_id CHAR(36),
  client_id CHAR(36),
  description VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  due_date DATE,
  paid_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_fees_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_fees_case
    FOREIGN KEY (case_id) REFERENCES cases(id)
    ON DELETE SET NULL,
  INDEX idx_fees_tenant (tenant_id),
  INDEX idx_fees_status (status),
  INDEX idx_fees_case (case_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- 6. CLIENT DIRECTORY
-- ===========================================

CREATE TABLE clients (
  id CHAR(36) PRIMARY KEY,
  tenant_id CHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_clients_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE,
  INDEX idx_clients_tenant (tenant_id),
  INDEX idx_clients_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Link cases to clients
ALTER TABLE cases ADD COLUMN client_id CHAR(36);
ALTER TABLE cases ADD CONSTRAINT fk_cases_client 
  FOREIGN KEY (client_id) REFERENCES clients(id) 
  ON DELETE SET NULL;

-- ===========================================
-- VERIFY
-- ===========================================
-- SHOW TABLES;
-- Expected: deadlines, fees, clients added
