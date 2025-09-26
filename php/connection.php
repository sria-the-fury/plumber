<?php
// Get the database URL from the Heroku environment variable
$db_url = getenv('JAWSDB');

if ($db_url) {
    // Parse the URL to get the connection details
    $db_parts = parse_url($db_url);

    $hostname = $db_parts['host'];
    $username = $db_parts['user'];
    $password = $db_parts['pass'];
    $database = ltrim($db_parts['path'], '/');
} else {
    // Fallback for local development
    $hostname = '127.0.0.1';
    $username = 'root';
    $password = '';
    $database = 'plumberdb';
}

// Create connection
$conn = new mysqli($hostname, $username, $password, $database);

$create_testimony = "CREATE TABLE IF NOT EXISTS testimony (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    clientName VARCHAR(50) NOT NULL,
    clientLocation VARCHAR(100) NOT NULL,
    clientRating INT(1) NOT NULL,
    testimony TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$create_message = "CREATE TABLE IF NOT EXISTS message (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

mysqli_query($conn, $create_testimony);
mysqli_query($conn, $create_message);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$connection_sql = $conn;
