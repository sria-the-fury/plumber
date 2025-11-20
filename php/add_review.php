<?php
include 'connection.php';

header('Content-Type: application/json');
$response = [];


ini_set('display_errors', 0);
error_reporting(0);

try {

    $create_review = "CREATE TABLE IF NOT EXISTS reviews (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        clientName VARCHAR(50) NOT NULL,
        clientEmail VARCHAR(100) NOT NULL,
        clientLocation VARCHAR(100) NOT NULL,
        clientRating INT(1) NOT NULL,
        testimony TEXT NOT NULL,
        approved BOOLEAN DEFAULT FALSE NOT NULL,
        archived BOOLEAN DEFAULT FALSE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if (!$connection_sql->query($create_review)) {
        throw new Exception("Error creating table: " . $connection_sql->error);
    }


    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        if (json_last_error() !== JSON_ERROR_NONE || $data === null) {
            throw new Exception('Invalid JSON data received.');
        }


        // Get data from the $data array (from JSON)
        $name = $data['clientName'] ?? null;
        $email = $data['email'] ?? null;
        $location = $data['location'] ?? null;
        $rating = $data['rating'] ?? null;
        $testimony = $data['testimony'] ?? null;

        // Simple validation
        if (empty($name) || empty($email) || empty($location) || empty($rating) || empty($testimony)) {
            throw new Exception('Missing required fields.');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format.');
        }

        $rating_int = intval($rating);
        if ($rating_int < 1 || $rating_int > 5) {
            throw new Exception('Invalid rating value.');
        }


        $insert_query = "INSERT INTO reviews (clientName, clientEmail, clientLocation, clientRating, testimony) VALUES (?, ?, ?, ?, ?)";


        $stmt = $connection_sql->prepare($insert_query);

        if ($stmt === false) {
            throw new Exception("Error preparing statement: " . $connection_sql->error);
        }


        // 'sss' means string, string, string, integer, string
        $stmt->bind_param("sssis", $name, $email, $location, $rating_int, $testimony);


        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Data inserted successfully!";
        } else {
            throw new Exception("Error inserting data: " . $stmt->error);
        }

        $stmt->close();
    } else {
        throw new Exception('Invalid request method.');
    }
} catch (Exception $e) {

    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

echo json_encode($response);

$connection_sql->close(); 
