-- =============================================
-- Nyaya Vedika - Phase 2 Step 2: Chunks Table
-- Run in phpMyAdmin
-- =============================================

-- Drop if exists (to update schema)
DROP TABLE IF EXISTS chunks;

-- Create chunks table with position field
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
  INDEX idx_chunks_tenant (tenant_id),
  INDEX idx_chunks_position (position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
