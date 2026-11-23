<?php
/**
 * Nyaya Vedika - Chat Handler (Secured + Quota Enforced)
 * 
 * Main API endpoint for chat functionality.
 * Requires Supabase JWT authentication.
 * Enforces daily quota based on user's plan.
 */

header('Content-Type: application/json');

// Load security middleware
require_once __DIR__ . '/includes/security.php';

// Require authentication
$user = require_auth();

// Check quota before processing
$remaining = require_quota('chat');

// Log the quota status
audit_log('chat_quota_check', ['remaining' => $remaining]);

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Use POST.'
    ]);
    exit();
}

// Load configuration
require_once __DIR__ . '/ai_config.php';
require_once __DIR__ . '/db_connect.php';

// Parse input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['message']) || trim($input['message']) === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Message is required.'
    ]);
    exit();
}

// Sanitize input
$userMessage = sanitize_input(trim($input['message']), 5000);
$case_id = intval($input['case_id'] ?? 0);

// Log the request
audit_log('chat_request', [
    'case_id' => $case_id,
    'message_length' => strlen($userMessage)
]);

// Load chat history
$cleanHistory = [];

if ($case_id > 0) {
    // Verify case belongs to user
    try {
        $stmt = $db->prepare("SELECT id FROM nv_cases WHERE id = ? AND user_id = ?");
        $stmt->execute([$case_id, $user['id']]);
        $case = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($case) {
            // Load history from database
            $stmt = $db->prepare("
                SELECT role, content 
                FROM nv_messages 
                WHERE case_id = ? 
                ORDER BY created_at ASC
            ");
            $stmt->execute([$case_id]);
            $dbHistory = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($dbHistory as $msg) {
                $cleanHistory[] = [
                    'role' => $msg['role'] === 'ai' ? 'assistant' : 'user',
                    'content' => $msg['content']
                ];
            }
        }
    } catch (PDOException $e) {
        error_log("Chat history load error: " . $e->getMessage());
    }
} else {
    // Use frontend-provided history
    $chatHistory = isset($input['history']) && is_array($input['history']) ? $input['history'] : [];
    foreach ($chatHistory as $msg) {
        if (isset($msg['role']) && isset($msg['content'])) {
            $cleanHistory[] = [
                'role' => in_array($msg['role'], ['user', 'assistant']) ? $msg['role'] : 'user',
                'content' => sanitize_input(trim($msg['content']), 5000)
            ];
        }
    }
}

// Save user message to database if case_id provided
if ($case_id > 0) {
    try {
        $stmt = $db->prepare("INSERT INTO nv_messages (case_id, role, content) VALUES (?, 'user', ?)");
        $stmt->execute([$case_id, $userMessage]);
    } catch (PDOException $e) {
        error_log("Save user message error: " . $e->getMessage());
    }
}

// Route to the configured AI provider
try {
    // RAG: Retrieve relevant legal context
    require_once __DIR__ . '/includes/embeddings.php';
    $ragContext = '';
    $ragChunks = search_similar_chunks($userMessage, 5, 0.6);
    
    if (!empty($ragChunks)) {
        $ragContext = format_rag_context($ragChunks);
        audit_log('rag_retrieval', [
            'query_length' => strlen($userMessage),
            'chunks_found' => count($ragChunks)
        ]);
    }
    
    // Enhance message with RAG context if available
    $enhancedMessage = $userMessage;
    if ($ragContext) {
        $enhancedMessage = "User Question: {$userMessage}\n\n{$ragContext}\n\nProvide a well-researched answer. When citing the sources above, use format: [Citation: source name]";
    } else {
        // C. Hallucination fallback - no sources found
        $enhancedMessage = "User Question: {$userMessage}\n\nIMPORTANT: No authoritative legal sources were found in the database for this query. You may provide general guidance, but you MUST:\n1. Clearly state that no specific legal source was found\n2. Avoid citing specific case laws or sections unless you are 100% certain\n3. Recommend the user consult a qualified advocate for authoritative advice\n4. Be conservative and avoid confident legal conclusions";
        
        audit_log('rag_no_sources', ['query' => substr($userMessage, 0, 100)]);
    }
    
    switch (AI_PROVIDER) {
        case 'gemini':
            require_once __DIR__ . '/adapters/gemini_adapter.php';
            $response = gemini_send_message($enhancedMessage, $cleanHistory);
            break;
            
        case 'ollama':
            require_once __DIR__ . '/adapters/ollama_adapter.php';
            $response = ollama_send_message($userMessage, $cleanHistory);
            break;
            
        default:
            throw new Exception('Invalid AI provider configured: ' . AI_PROVIDER);
    }
    
    // Save AI response to database if case_id provided
    if ($response['success'] && $case_id > 0) {
        try {
            $stmt = $db->prepare("INSERT INTO nv_messages (case_id, role, content) VALUES (?, 'ai', ?)");
            $stmt->execute([$case_id, $response['message']]);
            
            // Update case title if it's still "New Case"
            $stmt = $db->prepare("SELECT title FROM nv_cases WHERE id = ?");
            $stmt->execute([$case_id]);
            $caseData = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($caseData && $caseData['title'] === 'New Case') {
                $newTitle = substr($userMessage, 0, 50);
                if (strlen($userMessage) > 50) {
                    $newTitle .= '...';
                }
                $stmt = $db->prepare("UPDATE nv_cases SET title = ? WHERE id = ?");
                $stmt->execute([$newTitle, $case_id]);
            }
        } catch (PDOException $e) {
            error_log("Save AI message error: " . $e->getMessage());
        }
    }
    
    // Log success
    audit_log('chat_response', [
        'case_id' => $case_id,
        'success' => $response['success'],
        'response_length' => strlen($response['message'] ?? '')
    ]);
    
    // Return the response
    if ($response['success']) {
        // Increment usage counter
        increment_usage('chat');
        
        echo json_encode([
            'success' => true,
            'message' => $response['message'],
            'provider' => AI_PROVIDER,
            'case_id' => $case_id,
            'quota_remaining' => check_quota('chat')
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $response['error']
        ]);
    }
    
} catch (Exception $e) {
    audit_log('chat_error', ['error' => $e->getMessage()]);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error. Please try again.'
    ]);
}
?>
