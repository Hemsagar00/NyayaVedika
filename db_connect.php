<?php
/**
 * Nyaya Vedika - Database Connection (PDO)
 * 
 * Used by all API endpoints for database operations.
 */

$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'nyayavedika_db';
$db_user = getenv('DB_USER') ?: 'root';
$db_pass = getenv('DB_PASS') ?: '';

try {
    $db = new PDO(
        "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    // Log error but don't expose details
    error_log("Database connection failed: " . $e->getMessage());
    
    // Return JSON error for API calls
    if (strpos($_SERVER['REQUEST_URI'], '/api/') !== false || 
        strpos($_SERVER['REQUEST_URI'], 'chat_handler') !== false) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit();
    }
    
    die("Database connection failed. Please try again later.");
}
?>
