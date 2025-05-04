


<?php
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

// Fetch applications from the database
$sql = "SELECT id, full_name, loan_purpose, application_date, 'Pending' AS status FROM ofwloan_applications ORDER BY application_date DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pinoy Luminaries</title>
    <link href="https://fonts.googleapis.com/css?family=Inter:400,700" rel="stylesheet">
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>
    <!-- Header -->
    <header>
        <div class="logo-nav">
            <img src="images/image 1.png" alt="Pinoy Luminaries Logo" class="logo">
            <nav>
                <a href="account.php" class="active">HOME</a>
            </nav>
        </div>
        <div class="auth">
            <a href="#dashboard" class="active">DASHBOARD</a>
            <img class="logout" alt="" src="/image-2.png" />
        </div>
    </header>

    <!-- Dashboard Banner -->
    <div class="banner">
        <div class="banner-green-light"></div>
        <div class="banner-green-dark"></div>
        <div class="banner-black"></div>
        <div class="banner-text">
            <span class="green">DASH</span><span class="white">BOARD</span>
        </div>
    </div>

    <!-- Notification Message -->
    <div class="notification">
        Your application has been successfully submitted. An email
        will be sent to you whenever your application's status
        changes. To find out the status of your application, you
        can also return here.
    </div>

    <!-- Application Table -->
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>APPLICATION NO.</th>
                    <th>DETAILS</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($row['id']); ?></td>
                            <td><?php echo htmlspecialchars($row['loan_purpose']); ?></td>
                            <td><?php echo htmlspecialchars($row['status']); ?></td>
                            <td><?php echo htmlspecialchars($row['application_date']); ?></td>
                            <td><a href="#">View</a></td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="5">No applications found.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <script src="dashboard.js"></script>
</body>
</html>

<?php
$conn->close();
?>
