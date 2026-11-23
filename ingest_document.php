<?php
/**
 * Nyaya Vedika - Document Ingestion Script
 * 
 * Ingests legal documents (PDFs, text) into the RAG system.
 * Run from command line: php ingest_document.php --file="path/to/doc.pdf"
 * 
 * Admin-only operation.
 */

require_once __DIR__ . '/includes/env.php';
require_once __DIR__ . '/includes/embeddings.php';
require_once __DIR__ . '/db_connect.php';

// Configuration
define('CHUNK_SIZE', 500);          // Words per chunk
define('CHUNK_OVERLAP', 100);       // Overlap words

/**
 * Extract text from PDF using basic method
 * For production, use a proper PDF library
 */
function extract_pdf_text($file_path) {
    // Try pdftotext if available (Linux)
    $output = [];
    $return_var = 0;
    exec("pdftotext -layout " . escapeshellarg($file_path) . " -", $output, $return_var);
    
    if ($return_var === 0 && !empty($output)) {
        return implode("\n", $output);
    }
    
    // Fallback: read raw text (basic)
    $content = file_get_contents($file_path);
    
    // Extract visible text between streams (very basic)
    preg_match_all('/\((.*?)\)/', $content, $matches);
    if (!empty($matches[1])) {
        return implode(' ', $matches[1]);
    }
    
    return null;
}

/**
 * Clean legal document text
 */
function clean_text($text) {
    // Remove excessive whitespace
    $text = preg_replace('/\s+/', ' ', $text);
    
    // Remove page numbers and headers
    $text = preg_replace('/Page \d+ of \d+/i', '', $text);
    
    // Normalize quotes
    $text = str_replace(['"', '"', ''', '''], ['"', '"', "'", "'"], $text);
    
    return trim($text);
}

/**
 * Split text into overlapping chunks
 */
function chunk_text($text, $chunk_size = CHUNK_SIZE, $overlap = CHUNK_OVERLAP) {
    $words = preg_split('/\s+/', $text);
    $chunks = [];
    $total_words = count($words);
    
    $start = 0;
    while ($start < $total_words) {
        $chunk_words = array_slice($words, $start, $chunk_size);
        $chunks[] = implode(' ', $chunk_words);
        
        $start += ($chunk_size - $overlap);
    }
    
    return $chunks;
}

/**
 * Ingest a document into the RAG system
 */
function ingest_document($file_path, $metadata = []) {
    global $db;
    
    echo "Processing: $file_path\n";
    
    // Validate file
    if (!file_exists($file_path)) {
        echo "Error: File not found\n";
        return false;
    }
    
    $ext = strtolower(pathinfo($file_path, PATHINFO_EXTENSION));
    
    // Extract text based on file type
    $text = null;
    if ($ext === 'pdf') {
        $text = extract_pdf_text($file_path);
    } elseif (in_array($ext, ['txt', 'md'])) {
        $text = file_get_contents($file_path);
    } else {
        echo "Error: Unsupported file type: $ext\n";
        return false;
    }
    
    if (!$text || strlen($text) < 100) {
        echo "Error: Could not extract sufficient text\n";
        return false;
    }
    
    // Clean text
    $text = clean_text($text);
    $word_count = str_word_count($text);
    echo "Extracted $word_count words\n";
    
    // Get Supabase credentials
    $supabase_url = env('SUPABASE_URL');
    $supabase_key = env('SUPABASE_ANON_KEY');
    
    // Create document record
    $doc_id = create_uuid();
    $doc_data = [
        'id' => $doc_id,
        'title' => $metadata['title'] ?? basename($file_path),
        'source' => $metadata['source'] ?? 'upload',
        'doc_type' => $metadata['doc_type'] ?? 'other',
        'citation' => $metadata['citation'] ?? null,
        'court' => $metadata['court'] ?? null,
        'file_path' => $file_path,
        'full_text' => $text,
        'word_count' => $word_count,
        'status' => 'processing'
    ];
    
    // Insert document via Supabase
    $response = supabase_insert('documents', $doc_data, $supabase_url, $supabase_key);
    if (!$response) {
        echo "Error: Failed to create document record\n";
        return false;
    }
    
    echo "Created document: $doc_id\n";
    
    // Chunk the text
    $chunks = chunk_text($text);
    $total_chunks = count($chunks);
    echo "Created $total_chunks chunks\n";
    
    // Process each chunk
    $success_count = 0;
    foreach ($chunks as $i => $chunk_content) {
        echo "Processing chunk " . ($i + 1) . " / $total_chunks\r";
        
        // Generate embedding
        $embedding = generate_embedding($chunk_content);
        
        if (!$embedding) {
            echo "\nWarning: Failed to generate embedding for chunk $i\n";
            continue;
        }
        
        // Insert chunk
        $chunk_data = [
            'id' => create_uuid(),
            'document_id' => $doc_id,
            'chunk_index' => $i,
            'content' => $chunk_content,
            'embedding' => '[' . implode(',', $embedding) . ']',
            'tokens' => count(explode(' ', $chunk_content))
        ];
        
        $result = supabase_insert('chunks', $chunk_data, $supabase_url, $supabase_key);
        if ($result) {
            $success_count++;
        }
        
        // Rate limit (avoid API throttling)
        usleep(100000); // 100ms
    }
    
    echo "\nIngested $success_count / $total_chunks chunks\n";
    
    // Update document status
    supabase_update('documents', $doc_id, ['status' => 'processed'], $supabase_url, $supabase_key);
    
    echo "Done: $file_path\n";
    return true;
}

/**
 * Generate UUID
 */
function create_uuid() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

/**
 * Supabase insert helper
 */
function supabase_insert($table, $data, $url, $key) {
    $ch = curl_init("{$url}/rest/v1/{$table}");
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'apikey: ' . $key,
            'Authorization: Bearer ' . $key,
            'Prefer: return=minimal'
        ]
    ]);
    
    $response = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return $code >= 200 && $code < 300;
}

/**
 * Supabase update helper
 */
function supabase_update($table, $id, $data, $url, $key) {
    $ch = curl_init("{$url}/rest/v1/{$table}?id=eq.{$id}");
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => 'PATCH',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'apikey: ' . $key,
            'Authorization: Bearer ' . $key
        ]
    ]);
    
    $response = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return $code >= 200 && $code < 300;
}

// CLI Handler
if (php_sapi_name() === 'cli') {
    $options = getopt('', ['file:', 'title:', 'source:', 'type:', 'citation:', 'court:']);
    
    if (!isset($options['file'])) {
        echo "Usage: php ingest_document.php --file=\"path/to/document.pdf\" [options]\n";
        echo "Options:\n";
        echo "  --title=\"Document Title\"\n";
        echo "  --source=\"indian_kanoon|india_code|upload\"\n";
        echo "  --type=\"judgment|act|circular|other\"\n";
        echo "  --citation=\"AIR 2020 SC 1234\"\n";
        echo "  --court=\"supreme_court|delhi_hc|...\"\n";
        exit(1);
    }
    
    $metadata = [
        'title' => $options['title'] ?? null,
        'source' => $options['source'] ?? 'upload',
        'doc_type' => $options['type'] ?? 'other',
        'citation' => $options['citation'] ?? null,
        'court' => $options['court'] ?? null
    ];
    
    $success = ingest_document($options['file'], $metadata);
    exit($success ? 0 : 1);
}
?>
