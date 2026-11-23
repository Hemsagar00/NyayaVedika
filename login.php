<?php
// login.php - COMPLETE VERSION WITH GOOGLE LOGIN
session_start();
require 'google_config.php'; // Load Google settings

// Generate the Google Login URL
$google_login_url = 'https://accounts.google.com/o/oauth2/auth?scope=' . urlencode('email profile') . '&redirect_uri=' . urlencode(GOOGLE_REDIRECT_URL) . '&response_type=code&client_id=' . GOOGLE_CLIENT_ID . '&access_type=online';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Nyaya Vedika</title>
    <style>
        :root { --bg-color: #ffffff; --text-main: #1a1a1a; --accent: #223456; --input-bg: #f8f9fa; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: var(--bg-color); display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        
        .auth-container { 
            width: 100%; max-width: 400px; padding: 40px; 
            text-align: center; animation: fadeInUp 0.6s ease-out; 
        }

        h2 { font-family: 'Georgia', serif; color: var(--accent); font-size: 2rem; margin-bottom: 10px; }
        p { color: #666; margin-bottom: 30px; }

        input { width: 100%; padding: 15px; margin-bottom: 15px; border: 1px solid #e1e4e8; border-radius: 8px; background: var(--input-bg); box-sizing: border-box; font-size: 1rem; }
        
        button { width: 100%; padding: 15px; background: var(--accent); color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; transition: opacity 0.2s; }
        button:hover { opacity: 0.9; }

        .google-btn {
            display: flex; align-items: center; justify-content: center; gap: 10px;
            margin-top: 15px; padding: 12px; 
            border: 1px solid #ddd; border-radius: 8px; 
            text-decoration: none; color: #333; font-weight: 500; 
            transition: background 0.2s; background: #fff;
        }
        .google-btn:hover { background-color: #f1f1f1; }

        .divider { margin: 20px 0; color: #999; font-size: 0.8rem; position: relative; }
        .divider::before, .divider::after { content: ""; position: absolute; top: 50%; width: 40%; height: 1px; background: #eee; }
        .divider::before { left: 0; } .divider::after { right: 0; }

        .toggle-link { margin-top: 20px; display: block; color: var(--accent); text-decoration: none; font-size: 0.9rem; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>

    <div class="auth-container">
        <h2>Nyaya Vedika</h2>
        <p>Access your intelligent legal workspace.</p>

        <form action="auth.php" method="POST">
            <input type="email" name="email" placeholder="Email Address" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" name="login">Sign In</button>
        </form>

        <div class="divider">OR</div>

        <a href="<?php echo $google_login_url; ?>" class="google-btn">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" style="width: 20px; height: 20px;">
            Sign in with Google
        </a>

        <a href="register.php" class="toggle-link">Create a new account</a>
        <a href="index.html" class="toggle-link" style="color: #999; font-size: 0.8rem;">← Back to Home</a>
    </div>

</body>
</html>