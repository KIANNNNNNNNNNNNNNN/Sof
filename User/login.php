<?php
ob_start(); // Start output buffering
session_start();

// Database connection
$host = 'localhost';
$dbname = 'pinoyluminariesdb';
$username = 'root';
$password = '';
$conn = new mysqli($host, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Dummy admin credentials
$correct_email = 'admin@gmail.com';
$correct_password = 'admin123';

// Flag to track success
$login_successful = false;
$user_role = ''; // admin or user

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if email and password match the admin credentials
    if ($email === $correct_email && $password === $correct_password) {
        $_SESSION['user_id'] = 1;
        $_SESSION['email'] = $email;
        $_SESSION['role'] = 'admin';
        $user_role = 'admin';
        $login_successful = true;
        // Redirect will happen after SweetAlert
    } else {
        // Check if email and password match a user in the users_signedup table
        $stmt = $conn->prepare("SELECT * FROM users_signedup WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            
            // Verify password
            if (password_verify($password, $user['password'])) {
                // Password matches, start session for the user
                $_SESSION['user_id'] = $user['id'];  // Assuming 'id' is the primary key for users_signedup
                $_SESSION['email'] = $email;
                $_SESSION['role'] = 'user';
                $user_role = 'user';
                $login_successful = true;
                // Redirect will happen after SweetAlert
            } else {
                $error = "Invalid email or password.";
            }
        } else {
            $error = "No account found with this email.";
        }
    }
}

// Close the connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="login.css">
    <!-- SweetAlert CDN -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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

            <form method="POST" action="">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <div class="progress-bar"></div>

                <button type="submit" class="submit-button" id="submitButton">
                    <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </form>

            <?php if (isset($error)): ?>
                <p style="color:red; text-align:center;"><?= $error ?></p>
            <?php endif; ?>
        </div>
    </div>

    <script>
    // Check if login was successful and show SweetAlert
    <?php if ($login_successful): ?>
        <?php if ($user_role == 'admin'): ?>
            Swal.fire({
                title: 'Admin Login Successful!',
                icon: 'success',
                confirmButtonText: 'Okay',
                confirmButtonColor: '#28a745'
            }).then(() => {
                window.location.href = '../admin/dashboard.php'; // Admin redirect remains the same
            });
        <?php elseif ($user_role == 'user'): ?>
            Swal.fire({
                title: 'Login Successful!',
                icon: 'success',
                confirmButtonText: 'Okay',
                confirmButtonColor: '#28a745'
            }).then(() => {
                window.location.href = 'account.php'; // Updated path to account.php
            });
        <?php endif; ?>
    <?php endif; ?>
    </script>

</body>
</html>
