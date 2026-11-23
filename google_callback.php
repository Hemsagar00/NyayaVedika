<?php
session_start();
require 'db_connect.php';
require 'google_config.php';

if (isset($_GET['code'])) {
    $token_url = 'https://oauth2.googleapis.com/token';
    $params = [
        'code' => $_GET['code'],
        'client_id' => GOOGLE_CLIENT_ID,
        'client_secret' => GOOGLE_CLIENT_SECRET,
        'redirect_uri' => GOOGLE_REDIRECT_URL,
        'grant_type' => 'authorization_code'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $token_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // Check if your server has internet access
    if(curl_errno($ch)){
        die('Server Connection Error: ' . curl_error($ch));
    }
    
    $response = curl_exec($ch);
    $token_data = json_decode($response, true);

    // --- SHOW THE EXACT ERROR ---
    if (isset($token_data['error'])) {
        echo "<h2 style='color:red'>Google Login Error</h2>";
        echo "<strong>Error Code:</strong> " . $token_data['error'] . "<br>";
        echo "<strong>Description:</strong> " . $token_data['error_description'] . "<br>";
        echo "<br><strong>To Fix This:</strong><br>";
        if($token_data['error'] == 'redirect_uri_mismatch') {
            echo "1. Go to Google Cloud Console.<br>2. Check 'Authorized redirect URIs'.<br>3. Make sure it is EXACTLY: <code>" . GOOGLE_REDIRECT_URL . "</code>";
        } else if($token_data['error'] == 'invalid_client') {
            echo "1. Check your google_config.php file.<br>2. You might have pasted the Client Secret incorrectly (check for extra spaces).";
        }
        die();
    }

    if (isset($token_data['access_token'])) {
        // Get User Info
        $user_info_url = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' . $token_data['access_token'];
        curl_setopt($ch, CURLOPT_URL, $user_info_url);
        $user_info_response = curl_exec($ch);
        curl_close($ch);
        $google_user = json_decode($user_info_response, true);

        $email = $google_user['email'];
        $name = $google_user['name'];
        $google_id = $google_user['id'];

        // Login Logic
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($user_id);
            $stmt->fetch();
            // Update Google ID if missing
            $conn->query("UPDATE users SET google_id = '$google_id' WHERE id = $user_id");
            $_SESSION['user_id'] = $user_id;
            $_SESSION['user_name'] = $name;
            header("Location: dashboard.php");
        } else {
            // Register New User
            $insert = $conn->prepare("INSERT INTO users (full_name, email, google_id) VALUES (?, ?, ?)");
            $insert->bind_param("sss", $name, $email, $google_id);
            if ($insert->execute()) {
                $_SESSION['user_id'] = $insert->insert_id;
                $_SESSION['user_name'] = $name;
                header("Location: dashboard.php");
            } else {
                die("Database Insert Error: " . $conn->error);
            }
        }
    } else {
        echo "Unknown Error. Raw Response from Google:<br>";
        var_dump($response);
    }
} else {
    echo "No Code Received. Did you just refresh the page? Go back to Login and click the button again.";
}
?>