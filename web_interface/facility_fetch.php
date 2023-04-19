<?php
require_once "db_config.php";

$fid = isset($_GET["fid"]) ? $_GET["fid"] : "";

$result = $conn->query("SELECT * FROM Facilities WHERE FID = '$fid'");
$row = $result->fetch_assoc();

header("Content-Type: application/json");
echo json_encode($row);

$conn->close();
?>
