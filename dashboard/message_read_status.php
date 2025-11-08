<?php
include '../php/connection.php';

if ($conn->connect_error) {

    echo json_encode(['success' => false, 'message' => 'Connection Failed: ' . $conn->connect_error]);
    exit;
}

$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$read_status = isset($_POST['seen']) ? (int)$_POST['seen'] : 0;

$response = ['success' => false, 'message' => 'Invalid ID.'];

if ($id > 0) {

    $sql = "UPDATE message SET seen = ? WHERE id = ?";


    $stmt = $conn->prepare($sql);


    $stmt->bind_param("ii", $read_status, $id);


    if ($stmt->execute()) {

        if ($stmt->affected_rows > 0) {
            $response = ['success' => true];
        } else {

            $response = ['success' => false, 'message' => 'No Message found with that ID.'];
        }
    } else {

        $response = ['success' => false, 'message' => 'Database query failed.'];
    }

    $stmt->close();
}

$conn->close();


echo json_encode($response);
