<?php
// Database connection
$servername = "localhost";  // Host, usually 'localhost'
$username = "root";         // Your database username (default is 'root')
$password = "";             // Your database password (default is empty for XAMPP, MAMP, etc.)
$dbname = "pinoyluminariesdb"; // The database you created

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
