<?php
//this file will use later if we need to fetch testimony using js and php using api call

// // --- Database Connection ---
// $hostname = "localhost";
// $username = "root";
// $password = "";
// $database = "my_database"; // Use the same database as the previous example
// $dsn = "mysql:host=$hostname;dbname=$database;charset=utf8mb4";

// try {
//     // Create a PDO connection
//     $pdo = new PDO($dsn, $username, $password);
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//     // --- Fetch Data ---
//     // Prepare and execute the query
//     $stmt = $pdo->query("SELECT clientName, clientLocation, clientRating, testimony FROM testimony");

//     // Fetch all results into an associative array
//     $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

//     header('Content-Type: application/json');

//     // Encode the PHP array into a JSON string and output it
//     echo json_encode($users);

// } catch (PDOException $e) {
//     // If there is an error, send back a JSON error message
//     header('Content-Type: application/json');
//     // It's good practice to not expose detailed database errors to the public
//     echo json_encode(['error' => 'Database error']);
// }

// // The connection is automatically closed when the script ends
// $pdo = null;
