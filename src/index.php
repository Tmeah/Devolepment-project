<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Replace the following with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "incidents";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  $stmt = $conn->prepare("INSERT INTO incidents (chemical, quantity, date, location, description, action, scale, duration, port_shore, wind_strength_direction, weather, receptors) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

  $stmt->bind_param(
    "ssssssssssss",
    $data["chemical"],
    $data["quantity"],
    $data["date"],
    $data["location"],
    $data["description"],
    $data["action"],
    $data["scale"],
    $data["duration"],
    $data["port_shore"],
    $data["wind_strength_direction"],
    $data["weather"],
    $data["receptors"]
  );

  $stmt->execute();

  $result = ["status" => "success", "message" => "Data saved successfully."];
  echo json_encode($result);

  $stmt->close();
  $conn->close();
} else {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}

if ($stmt->execute() === TRUE) {
    $result = ["status" => "success", "message" => "Data saved successfully."];
    echo json_encode($result);
  } else {
    $result = ["status" => "error", "message" => "Error: " . $stmt->error];
    echo json_encode($result);
  }
  
?>
