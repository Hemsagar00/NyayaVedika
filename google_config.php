<?php
// google_config.php - Load from environment variables
define('GOOGLE_CLIENT_ID', getenv('GOOGLE_CLIENT_ID') ?: '');
define('GOOGLE_CLIENT_SECRET', getenv('GOOGLE_CLIENT_SECRET') ?: '');
define('GOOGLE_REDIRECT_URL', getenv('GOOGLE_REDIRECT_URL') ?: 'https://nyayavedika.in/google_callback.php');
?>
