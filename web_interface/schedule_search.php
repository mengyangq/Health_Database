<?php

require_once "db_config.php";

$eid = isset($_GET["eid"]) ? $_GET["eid"] : "";
$fid = isset($_GET["fid"]) ? $_GET["fid"] : "";
$date = isset($_GET["date"]) ? $_GET["date"] : "";

$sql = "SELECT * FROM Schedule WHERE 1";

if (!empty($eid)) {
    $sql .= " AND EID = '$eid'";
}

if (!empty($fid)) {
    $sql .= " AND FID = '$fid'";
}

if (!empty($date)) {
    $sql .= " AND date = '$date'";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table class='table table-bordered'>";
    echo "<thead>";
    echo "<tr>";
    echo "<th>EID</th>";
    echo "<th>FID</th>";
    echo "<th>Date</th>";
    echo "<th>Start_Time</th>";
    echo "<th>End_Time</th>";
    echo "<th>Action</th>";
    echo "</tr>";
    echo "</thead>";   
    echo "<tbody>";
    while ($row = $result->fetch_assoc()) {
        $row_data = json_encode($row);
        echo "<tr>";
        echo "<td>" . $row["EID"] . "</td>";
        echo "<td>" . $row["FID"] . "</td>";
        echo "<td>" . $row["date"] . "</td>";
        echo "<td>" . $row["start_time"] . "</td>";
        echo "<td>" . $row["end_time"] . "</td>";
        echo "<td><button class='btn btn-danger delete-btn' style='width: 75px; margin-bottom: 4px;margin-right: 4px;' data-row='" . htmlspecialchars($row_data) . "'>Delete</button>";
        echo "<button class='btn btn-info update-btn' style='width: 75px; margin-bottom: 4px;' data-row='" . htmlspecialchars($row_data) . "'>Update</button></td>";
        echo "</tr>";
    }
    echo "</tbody>";
    echo "</table>";
} else {
    echo "<p>No results found</p>";
}

$conn->close();
?>
