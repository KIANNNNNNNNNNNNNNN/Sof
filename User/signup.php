<?php
session_start(); // Start the session to store success or error messages

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection details
    $host = "127.0.0.1";
    $dbname = "pinoyluminariesdb";
    $username = "root";
    $password = "";

    $conn = new mysqli($host, $username, $password, $dbname);

    // Check database connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve and sanitize input values
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password1 = $_POST['password'] ?? '';
    $password2 = $_POST['confirmPassword'] ?? '';

    // Validation
    if (empty($name) || empty($email) || empty($password1) || empty($password2)) {
        $error = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
    } elseif ($password1 !== $password2) {
        $error = "Passwords do not match.";
    } elseif (strlen($password1) < 6) {
        $error = "Password must be at least 6 characters long.";
    } else {
        // Check if the email already exists in the database
        $stmt = $conn->prepare("SELECT id FROM users_signedup WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $error = "Email is already registered.";
        } else {
            // Hash the password
            $hashedPassword = password_hash($password1, PASSWORD_DEFAULT);

            // Insert the user into the database
            $stmt = $conn->prepare("INSERT INTO users_signedup (name, email, password) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $name, $email, $hashedPassword);

            if ($stmt->execute()) {
                $_SESSION['signup_success'] = "Signup successful! Please log in.";
                header("Location: login.php"); // Redirect to login.php after successful sign-up
                exit;
            } else {
                $error = "Error: " . $stmt->error;
            }
        }

        $stmt->close();
    }

    // Store error message in session if validation fails
    if (isset($error)) {
        $_SESSION['error'] = $error;
        header("Location: signup.php"); // Redirect to show the error alert
        exit;
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