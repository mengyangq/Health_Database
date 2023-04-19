<?php
require_once "db_config.php";

if (isset($_POST["eid"]) && isset($_POST["fid"]) && isset($_POST["date"]) && isset($_POST["start_time"]) && isset($_POST["end_time"])) {
    $eid = $_POST["eid"];
    $fid = $_POST["fid"];
    $date = $_POST["date"];
    $start_time = $_POST["start_time"];
    $end_time = $_POST["end_time"];

    // Delete the schedule with matching EID, FID, date, start_time, and end_time
    $sql = "DELETE FROM Schedule WHERE EID = ? AND FID = ? AND date = ? AND start_time = ? AND end_time = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("iisss", $eid, $fid, $date, $start_time, $end_time);
        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "Error: " . $stmt->error;
        }
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "Error: Required parameters not provided.";
}

$conn->close();
?>
