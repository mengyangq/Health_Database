<?php
require_once "db_config.php";

$eid = isset($_POST['eid']) ? $_POST['eid'] : "";
$fid = isset($_POST['fid']) ? $_POST['fid'] : "";
$date = isset($_POST['date']) ? $_POST['date'] : "";
$original_start_time = isset($_POST['original_start_time']) ? $_POST['original_start_time'] : "";
$start_time = isset($_POST['start_time']) ? $_POST['start_time'] : "";
$end_time = isset($_POST['end_time']) ? $_POST['end_time'] : "";

// Update the Schedule table
$sql_schedule = "UPDATE Schedule SET start_time = ?, end_time = ? WHERE EID = ? AND FID = ? AND date = ? AND start_time = ?";
$stmt_schedule = $conn->prepare($sql_schedule);
$stmt_schedule->bind_param("ssiiss", $start_time, $end_time, $eid, $fid, $date, $original_start_time);

if ($stmt_schedule->execute()) {
    if ($stmt_schedule->affected_rows > 0) {
        $response = ["status" => "success"];
    } else {
        $response = ["status" => "error", "message" => "No rows affected. Data might be the same as before."];
    }
} else {
    $response = ["status" => "error", "message" => $stmt_schedule->error];
}

echo json_encode($response);

$stmt_schedule->close();
$conn->close();
?>
