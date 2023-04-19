<?php
require_once "db_config.php";

$eid = isset($_POST['eid']) ? $_POST['eid'] : "";
$fid = isset($_POST['fid']) ? $_POST['fid'] : "";
$date = isset($_POST['date']) ? $_POST['date'] : "";
$start_time = isset($_POST['start_time']) ? $_POST['start_time'] : "";
$end_time = isset($_POST['end_time']) ? $_POST['end_time'] : "";

$sql = "INSERT INTO Schedule (EID, FID, Date, Start_Time, End_Time) VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iisss", $eid, $fid, $date, $start_time, $end_time);

if ($stmt->execute()) {
    $response = ["status" => "success", "eid" => $eid, "fid" => $fid, "date" => $date, "start_time" => $start_time];
} else {
    $response = ["status" => "error", "error" => $stmt->error];
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>