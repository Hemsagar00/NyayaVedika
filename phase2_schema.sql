-- =============================================
-- Nyaya Vedika - Phase 2: AI Core Schema
-- Run AFTER bootstrap.sql
-- =============================================

-- ===========================================
-- STEP 1: Document text storage
-- ===========================================

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

-- ===========================================
-- STEP 2: Chunks (500 tokens, 50 overlap)
-- ===========================================

CREATE TABLE chunks (
  id CHAR(36) PRIMARY KEY,
  document_id CHAR(36),
  tenant_id CHAR(36),
  chunk_index INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_chunks_doc
    FOREIGN KEY (document_id) REFERENCES document_text(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_chunks_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- STEP 3: Embeddings (vector storage)
-- ===========================================

CREATE TABLE embeddings (
  id CHAR(36) PRIMARY KEY,
  chunk_id CHAR(36),
  tenant_id CHAR(36),
  vector BLOB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_embed_chunk
    FOREIGN KEY (chunk_id) REFERENCES chunks(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_embed_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- Verify
-- ===========================================
-- SHOW TABLES;
-- Expected: +3 tables (document_text, chunks, embeddings)
