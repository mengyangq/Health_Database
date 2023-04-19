<?php
require_once "db_config.php";

$eid = isset($_POST['eid']) ? $_POST['eid'] : "";
$infection_number = isset($_POST['infection_number']) ? $_POST['infection_number'] : "";
$nature = isset($_POST['nature']) ? $_POST['nature'] : "";
$i_date = isset($_POST['i_date']) ? $_POST['i_date'] : "";

// Update the Infection table
$sql_infection = "UPDATE Infection SET Nature = ?, i_date = ? WHERE EID = ? AND Infection_Number = ?";
$stmt_infection = $conn->prepare($sql_infection);
$stmt_infection->bind_param("ssii", $nature, $i_date, $eid, $infection_number);

if ($stmt_infection->execute()) {
    if ($stmt_infection->affected_rows > 0) {
        $response = ["status" => "success", "eid" => $eid, "infection_number" => $infection_number];
    } else {
        $response = ["status" => "error", "message" => "No rows affected. Data might be the same as before."];
    }
} else {
    $response = ["status" => "error", "message" => $stmt_infection->error];
}

echo json_encode($response);

$stmt_infection->close();
$conn->close();
?>
