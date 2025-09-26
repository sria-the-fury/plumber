<?php
include 'connection.php';

header('Content-Type: application/json');
$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $service = $_POST['service'];
    $message = $_POST['message'];
    $quary = "INSERT INTO message (name, email, service, message) VALUES ('$name', '$email', '$service', '$message')";
    $result = mysqli_query($connection_sql, $quary);
    if ($result) {
        $response['success'] = true;
        $response['message'] = "Data inserted successfully!";
    } else {
        $response['success'] = false;
        $response['message'] = "Error in inserting data: " . mysqli_error($connection_sql);
    }
    echo json_encode($response);
}
