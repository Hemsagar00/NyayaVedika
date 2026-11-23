<?php
session_start();
require 'db_connect.php'; // Ensures we are connected to the database

// --- LOGIN LOGIC ---
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login'])) {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Secure search for the user
    $stmt = $conn->prepare("SELECT id, full_name, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $full_name, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            // SUCCESS: Password matches
            $_SESSION['user_id'] = $id;
            $_SESSION['user_name'] = $full_name;
            header("Location: dashboard.php"); // Send them to the main app
            exit();
        } else {
            echo "<script>alert('Incorrect Password'); window.location.href='login.php';</script>";
        }
    } else {
        echo "<script>alert('No account found with this email.'); window.location.href='register.php';</script>";
    }
    $stmt->close();
}
$conn->close();
?>
