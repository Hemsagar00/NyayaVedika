<?php
require_once __DIR__ . '/db_connect.php';

try {
    // 1. Create table source_metadata
    $sql1 = "CREATE TABLE IF NOT EXISTS source_metadata (
        id CHAR(36) PRIMARY KEY,
        source_url TEXT NOT NULL,
        license TEXT NOT NULL,
        fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        INDEX idx_source_license (license(50))
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $pdo->exec($sql1);
    echo "Created table source_metadata.\n";

    // 2. Add license column to document_text
    // Check if exists first
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM information_schema.COLUMNS 
                          WHERE TABLE_NAME = 'document_text' 
                          AND TABLE_SCHEMA = DATABASE() 
                          AND COLUMN_NAME = 'license'");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("ALTER TABLE document_text ADD COLUMN license TEXT AFTER tenant_id");
        echo "Added column license to document_text.\n";
    } else {
        echo "Column license already exists in document_text.\n";
    }

    // 3. Add source_id to files
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM information_schema.COLUMNS 
                          WHERE TABLE_NAME = 'files' 
                          AND TABLE_SCHEMA = DATABASE() 
                          AND COLUMN_NAME = 'source_id'");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("ALTER TABLE files ADD COLUMN source_id CHAR(36) NULL, ADD CONSTRAINT fk_files_source FOREIGN KEY (source_id) REFERENCES source_metadata(id) ON DELETE SET NULL");
        echo "Added column source_id to files.\n";
    } else {
        echo "Column source_id already exists in files.\n";
    }

    echo "Phase 7 DB Setup Complete.\n";

} catch (PDOException $e) {
    die("DB Setup Failed: " . $e->getMessage() . "\n");
}
