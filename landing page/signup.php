<?php
session_start(); // Start the session to store success message

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $host = "localhost";
    $dbname = "pinoyluminariesdb";  // Or change to "signup" if needed
    $username = "root";
    $password = "";

    $conn = new mysqli($host, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password1 = $_POST['password'] ?? '';
    $password2 = $_POST['confirmPassword'] ?? '';

    if ($password1 !== $password2) {
        $error = "Passwords do not match.";
    } else {
        $hashedPassword = password_hash($password1, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users_signedup (name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $hashedPassword);

        if ($stmt->execute()) {
            $_SESSION['signup_success'] = "Signup successful!";
            header("Location: signup.php"); // Redirect to display the success alert
            exit;
        } else {
            $_SESSION['error'] = "Error: " . $stmt->error . " | SQL Error: " . $conn->error;
            header("Location: signup.php"); // Redirect to show error
            exit;
        }

        $stmt->close();
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up Page</title>
    <link rel="stylesheet" href="signup.css">
    <!-- Add SweetAlert CDN -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <div class="container">
        <!-- Left side -->
        <div class="left-side">
            <div class="left-content">
                <h2>Don't have an account?</h2>
                <h1><span class="green">SIGN</span> UP</h1>
                <h1>NOW!</h1>
                <p>to get started</p>
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

            <form id="signupForm" method="POST" action="signup.php">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>

                <div class="progress-bar"></div>

                <button type="submit" class="submit-button">
                    <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </form>
        </div>
    </div>

    <!-- SweetAlert Logic -->
    <script>
        <?php if (isset($_SESSION['signup_success'])): ?>
            Swal.fire({
                title: 'Success!',
                text: '<?php echo $_SESSION['signup_success']; ?>',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            <?php unset($_SESSION['signup_success']); ?>
        <?php elseif (isset($_SESSION['error'])): ?>
            Swal.fire({
                title: 'Error!',
                text: '<?php echo $_SESSION['error']; ?>',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            <?php unset($_SESSION['error']); ?>
        <?php endif; ?>
    </script>
</body>
</html>
