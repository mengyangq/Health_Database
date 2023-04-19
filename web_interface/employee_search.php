<?php

require_once "db_config.php";

$eid = isset($_GET["eid"]) ? $_GET["eid"] : "";
$fname = isset($_GET["fname"]) ? $_GET["fname"] : "";
$lname = isset($_GET["lname"]) ? $_GET["lname"] : "";
$fid = isset($_GET["fid"]) ? $_GET["fid"] : "";
$facility_name = isset($_GET["facilityName"]) ? $_GET["facilityName"] : "";
$roles = isset($_GET["role"]) ? implode(",", array_map(function($role) { return "'$role'"; }, (array) $_GET["role"])) : "";
$start_date = isset($_GET["startDate"]) ? $_GET["startDate"] : "";
$end_date = isset($_GET["endDate"]) ? $_GET["endDate"] : "";

$sql = "SELECT e.*, r.FID, f.FName as Facility_Name, r.title as Title, r.Start_Date, r.End_Date
        FROM Employees e
        JOIN Roles r ON e.EID = r.EID
        JOIN Facilities f ON r.FID = f.FID
        WHERE 1";

if (!empty($eid)) {
    $sql .= " AND e.EID = '$eid'";
}

if (!empty($fname)) {
    $sql .= " AND e.FName LIKE '%$fname%'";
}

if (!empty($lname)) {
    $sql .= " AND e.LName LIKE '%$lname%'";
}

if (!empty($fid)) {
    $sql .= " AND r.FID = '$fid'";
}

if (!empty($facility_name)) {
    $sql .= " AND f.FName LIKE '%$facility_name%'";
}

if (!empty($roles)) {
    $sql .= " AND r.title IN ($roles)";
}

if (!empty($start_date)) {
    $sql .= " AND r.Start_Date >= '$start_date'";
}

if (!empty($end_date)) {
    $sql .= " AND r.End_Date <= '$end_date'";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output the table header

    $sortable_columns = ["EID", "FID", "DoB","FName", "LName", "Facility_Name", "Title", "Start_Date", "End_Date"];
    $column_index = 0;

    echo "<table class='table table-bordered custom-table'>";
    echo "<thead>";
    echo "<tr>";
    while ($column = $result->fetch_field()) {
        if (in_array($column->name, $sortable_columns)) {
            echo "<th class='sortable' data-column-index='{$column_index}'>" . $column->name . "</th>";
        } else {
            echo "<th>" . $column->name . "</th>";
        }
        $column_index++;
        }
    echo "<th>Action</th>";
    echo "</tr>";
    echo "</thead>";
    echo "<tbody>";

    

    // Output the table rows
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        foreach ($row as $cell) {
            echo "<td>" . $cell . "</td>"; 
        }
        echo "<td><button class='btn btn-danger delete-btn' style='width: 60px; font-size: 10px; margin-bottom: 3px; margin-right: 2px;' data-eid='" . $row["EID"] . "'>Delete</button>";
        echo "<button class='btn btn-info update-btn' style='width: 60px; font-size: 10px; margin-bottom: 3px;' data-eid='" . $row["EID"] . "'>Update</button></td>";
        echo "</tr>";
    }

    echo "</tbody>";
    echo "</table>";
} else {
    echo "No results found.";
}

$conn->close();
?>