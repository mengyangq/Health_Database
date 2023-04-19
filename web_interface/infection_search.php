<?php

require_once "db_config.php";

$eid = isset($_GET["eid"]) ? $_GET["eid"] : "";
$infection_number = isset($_GET["infection_number"]) ? $_GET["infection_number"] : "";
$i_date = isset($_GET["i_date"]) ? $_GET["i_date"] : "";
$nature = isset($_GET["nature"]) ? implode(",", array_map(function($nature) { return "'$nature'"; }, (array) $_GET["nature"])) : "";

$sql = "SELECT * FROM Infection WHERE 1";

if (!empty($eid)) {
    $sql .= " AND EID = '$eid'";
}

if (!empty($infection_number)) {
    $sql .= " AND Infection_Number = '$infection_number'";
}

if (!empty($i_date)) {
    $sql .= " AND I_Date = '$i_date'";
}

if (!empty($nature)) {
    $sql .= " AND Nature IN ($nature)";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table class='table table-bordered'>";
    echo "<thead>";
    echo "<tr>";
    echo "<th>EID</th>";
    echo "<th>Infection_Number</th>";
    echo "<th>Nature</th>";
    echo "<th>I_Date</th>";
    echo "<th>Action</th>";
    echo "</tr>";
    echo "</thead>";   
    echo "<tbody>";
    while ($row = $result->fetch_assoc()) {
        $row_data = json_encode($row);
        echo "<tr>";
        echo "<td>" . $row["EID"] . "</td>";
        echo "<td>" . $row["Infection_Number"] . "</td>";
        echo "<td>" . $row["Nature"] . "</td>";
        echo "<td>" . $row["I_Date"] . "</td>";
        echo "<td><button class='btn btn-info update-btn' style='width: 75px; margin-bottom: 4px;' data-row='" . htmlspecialchars($row_data) . "'>Update</button></td>";
        echo "</tr>";
    }
    echo "</tbody>";
    echo "</table>";
} else {
    echo "<p>No results found</p>";
}

$conn->close();
?>
