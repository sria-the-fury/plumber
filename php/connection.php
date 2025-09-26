<?php
$hostname = "localhost";
$user = "root";
$password = "";
$db = "plumberdb";

$connection_sql = mysqli_connect($hostname, $user, $password, $db);

if ($connection_sql->connect_error) die("Connection failed: " . $connection_sql->connect_error);

