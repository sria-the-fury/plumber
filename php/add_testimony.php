<?php
include 'connection.php';

header('Content-Type: application/json');
$response = [];
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
