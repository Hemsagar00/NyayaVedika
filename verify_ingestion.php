<?php
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/services/ingestion.php';

echo "Starting Ingestion verification...\n";

try {
    $service = new IngestionService($pdo);

    // Test Data
    $url = 'test://public-domain-doc.pdf';
    $license = 'public domain';
    // Using a known tenant or creating a temp one? 
    // Let's use the 'system' tenant ID if known, or fetch one.
    // Fetch first tenant
    $stmt = $pdo->query("SELECT id FROM tenants LIMIT 1");
    $tenantId = $stmt->fetchColumn();

    if (!$tenantId) {
        die("Error: No tenant found for testing.\n");
    }

    echo "Ingesting document from $url with license '$license' for tenant $tenantId...\n";

    // Run Ingestion
    $result = $service->ingestDocument($url, $license, $tenantId);

    if ($result['success']) {
        echo "Ingestion Successful!\n";
        echo "Document ID: " . $result['doc_id'] . "\n";
        echo "Chunks Created: " . $result['chunk_count'] . "\n";
        echo "Source Metadata ID: " . $result['source_id'] . "\n";

        // Verification Checks
        echo "\nVerifying Database Records:\n";

        // 1. Check Source Metadata
        $stmt = $pdo->prepare("SELECT * FROM source_metadata WHERE id = ?");
        $stmt->execute([$result['source_id']]);
        $source = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "1. Source Metadata: " . ($source ? "FOUND ({$source['license']})" : "MISSING") . "\n";

        // 2. Check Document Text License
        $stmt = $pdo->prepare("SELECT license FROM document_text WHERE id = ?");
        $stmt->execute([$result['doc_id']]);
        $doc = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "2. Document License: " . ($doc['license'] === $license ? "MATCHED" : "MISMATCH ({$doc['license']})") . "\n";

        // 3. Check Chunks
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM chunks WHERE document_id = ?");
        $stmt->execute([$result['doc_id']]);
        $chunkCount = $stmt->fetchColumn();
        echo "3. Chunk Count: " . ($chunkCount > 0 ? "OK ($chunkCount)" : "ZERO") . "\n";

    } else {
        echo "Ingestion Failed: " . $result['error'] . "\n";
    }

} catch (Exception $e) {
    echo "Test Error: " . $e->getMessage() . "\n";
}
