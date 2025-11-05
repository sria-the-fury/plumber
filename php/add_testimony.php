<?php
include 'connection.php';
//api call to add testimony
header('Content-Type: application/json');
$response = [];

$create_testimony = "CREATE TABLE IF NOT EXISTS testimony (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    clientName VARCHAR(50) NOT NULL,
    clientLocation VARCHAR(100) NOT NULL,
    clientRating INT(1) NOT NULL,
    testimony TEXT NOT NULL,
    approved BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

mysqli_query($connection_sql, $create_testimony);
if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $name = $_POST['clientName'];
    $location = $_POST['location'];
    $rating = $_POST['rating'];
    $testimony = $_POST['testimony'];
    $insert_query = "INSERT INTO testimony (clientName, clientLocation, clientRating, testimony) VALUES ('$name', '$location', '$rating', '$testimony')";

    $result = mysqli_query($connection_sql, $insert_query);
    if ($result) {
        $response['success'] = true;
        $response['message'] = "Data inserted successfully!";
    } else {
        $response['success'] = false;
        $response['message'] = "Error in inserting data: " . mysqli_error($connection_sql);
    }
    echo json_encode($response);
}
