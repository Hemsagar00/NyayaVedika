-- Phase 7: Safe Data Ingestion

-- 1. Create table for source metadata tracking
CREATE TABLE IF NOT EXISTS source_metadata (
    id CHAR(36) PRIMARY KEY,
    source_url TEXT NOT NULL,
    license TEXT NOT NULL,
    fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    INDEX idx_source_license (license(50))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Add license column to document_text to link every text block to its rights
-- We use a safe ALTER procedure to avoid errors if column exists
SET @exist := (SELECT COUNT(*) FROM information_schema.COLUMNS 
              WHERE TABLE_NAME = 'document_text' 
              AND TABLE_SCHEMA = DATABASE() 
              AND COLUMN_NAME = 'license');

SET @sql := IF(@exist > 0, 
              'SELECT "Column license already exists"', 
              'ALTER TABLE document_text ADD COLUMN license TEXT AFTER tenant_id');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 3. Add foreign key from document_text to source_metadata (optional but good for tracking)
-- Since document_text is linked to files, and files will be linked to source_metadata, direct link might be redundant
-- but for strict audit, we might want to link file to source_metadata.
-- Let's link files table to source_metadata instead, as one file = one source. 

SET @exist_file_source := (SELECT COUNT(*) FROM information_schema.COLUMNS 
                          WHERE TABLE_NAME = 'files' 
                          AND TABLE_SCHEMA = DATABASE() 
                          AND COLUMN_NAME = 'source_id');

SET @sql_file := IF(@exist_file_source > 0,
                   'SELECT "Column source_id already exists in files"',
                   'ALTER TABLE files ADD COLUMN source_id CHAR(36) NULL, ADD CONSTRAINT fk_files_source FOREIGN KEY (source_id) REFERENCES source_metadata(id) ON DELETE SET NULL');

PREPARE stmt_file FROM @sql_file;
EXECUTE stmt_file;
DEALLOCATE PREPARE stmt_file;
