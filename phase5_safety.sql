-- =============================================
-- Nyaya Vedika - Phase 5: Safety & Governance
-- Run in phpMyAdmin
-- =============================================

-- ===========================================
-- STEP 1: Tenant Deletion Stored Procedure
-- ===========================================

DELIMITER //

CREATE PROCEDURE delete_tenant(IN t CHAR(36))
BEGIN
  DELETE FROM embeddings WHERE tenant_id = t;
  DELETE FROM chunks WHERE tenant_id = t;
  DELETE FROM document_text WHERE tenant_id = t;
  DELETE FROM files WHERE tenant_id = t;
  DELETE FROM cases WHERE tenant_id = t;
  DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE tenant_id = t);
  DELETE FROM events WHERE tenant_id = t;
  DELETE FROM feedback WHERE tenant_id = t;
  DELETE FROM users WHERE tenant_id = t;
  DELETE FROM tenants WHERE id = t;
END//

DELIMITER ;

-- ===========================================
-- STEP 3: Retention Policy Index
-- ===========================================

ALTER TABLE events ADD INDEX idx_events_created(created_at);

-- Retention cleanup (run via cron):
-- DELETE FROM events WHERE created_at < NOW() - INTERVAL 180 DAY;

-- ===========================================
-- STEP 6: Hallucination Defense Flag
-- ===========================================

ALTER TABLE events ADD COLUMN flagged BOOLEAN DEFAULT FALSE;

-- ===========================================
-- STEP 7: Feedback Table
-- ===========================================

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
  INDEX idx_feedback_tenant (tenant_id),
  INDEX idx_feedback_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- VERIFY
-- ===========================================
-- SHOW TABLES;
-- SHOW CREATE PROCEDURE delete_tenant;
-- DESCRIBE events;
