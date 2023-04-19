<?php
require_once "db_config.php";

$eid = isset($_GET["eid"]) ? $_GET["eid"] : "";

$sql = "SELECT *
        FROM Employees e
        WHERE e.EID = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $eid);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

header("Content-Type: application/json");
echo json_encode($row);

$stmt->close();
$conn->close();
?>
