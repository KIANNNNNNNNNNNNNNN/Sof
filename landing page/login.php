<?php
// Include the database connection
include('db_connection.php');

// Start the session
session_start();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if the credentials match the admin credentials (hardcoded)
    if ($email == 'admin' && $password == 'admin123') {
        // Admin login is successful
        $_SESSION['user_id'] = 1; // Set user_id to 1 for admin
        $_SESSION['email'] = 'admin';
        $_SESSION['role'] = 'admin'; // Set role to admin

        // Redirect to the account page
        header("Location: account.html");
        exit;
    }

    // Query to check if the user exists for normal users
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    // Check if user exists
    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Correct credentials, set session and redirect to account page
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];

            // Redirect to the account page
            header("Location: account.php");
            exit;
        } else {
            // Invalid credentials
            echo "Invalid email or password.";
        }
    } else {
        echo "User does not exist.";
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up Page</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div class="container">
        <!-- Left side -->
        <div class="left-side">
            <div class="left-content">
                <h1><span class="green">LOG</span> IN</h1>
                <h1>NOW!</h1>
                <p>to access your loan account</br>and manage your application</br> securely.</p>
            </div>
        </div>

<!-- Right side -->
<div class="right-side">
    <div class="back-button">
        <button onclick="goBack()">
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </button>
        <span>BACK</span>
    </div>

    <form>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required>
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required>
        </div>

        <div class="progress-bar"></div>

        <button type="submit" class="submit-button" id="submitButton">
            <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </button>
    </form>
</div>
    <script src="login.js"></script>
</body>
</html>