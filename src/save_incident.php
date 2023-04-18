<?php
include 'db.php';

$chemical = $_POST["chemical"];
$scale = $_POST["scale"];
$duration = $_POST["duration"];
$port_shore = $_POST["port_shore"];
$wind_strength_direction = $_POST["wind_strength_direction"];
$weather = $_POST["weather"];
$receptors = $_POST["receptors"];

$sql = "INSERT INTO incidents (chemical, scale, duration, port_shore, wind_strength_direction, weather, receptors) VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $chemical, $scale, $duration, $port_shore, $wind_strength_direction, $weather, $receptors);

if ($stmt->execute()) {
    echo "New incident saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
