<?php
require_once "db_config.php";

$eid = isset($_POST['eid']) ? $_POST['eid'] : "";
$fid = isset($_POST['fid']) ? $_POST['fid'] : "";
$vdate = isset($_POST['vdate']) ? $_POST['vdate'] : "";
$brand = isset($_POST['brand']) ? $_POST['brand'] : "";
$dose_number = isset($_POST['dose_number']) ? $_POST['dose_number'] : "";
$original_vdate = isset($_POST['original_vdate']) ? $_POST['original_vdate'] : "";

// Update the Vaccination table
$sql_vaccination = "UPDATE Vaccination SET V_Date = ?, Brand = ?, Dose_Number = ? WHERE EID = ? AND FID = ? AND V_Date = ?";
$stmt_vaccination = $conn->prepare($sql_vaccination);
$stmt_vaccination->bind_param("ssiiis", $vdate, $brand, $dose_number, $eid, $fid, $original_vdate);

if ($stmt_vaccination->execute()) {
    if ($stmt_vaccination->affected_rows > 0) {
        $response = ["status" => "success"];
    } else {
        $response = ["status" => "error", "message" => "No rows affected. Data might be the same as before."];
    }
} else {
    $response = ["status" => "error", "message" => "Query execution failed: " . $conn->error . " | " . $stmt_vaccination->error];
}

echo json_encode($response);

$stmt_vaccination->close();
$conn->close();
?>

