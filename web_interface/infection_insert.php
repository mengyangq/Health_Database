<?php
require_once "db_config.php";

$eid = isset($_POST['eid']) ? $_POST['eid'] : "";
$nature = isset($_POST['nature']) ? $_POST['nature'] : "";
$i_date = isset($_POST['i_date']) ? $_POST['i_date'] : "";

$sql = "INSERT INTO Infection (EID, Nature, I_Date) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $eid, $nature, $i_date);

if ($stmt->execute()) {
    $response = ["status" => "success", "eid" => $eid];
} else {
    $response = ["status" => "error", "error" => $stmt->error];
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
