<?php

require_once "db_config.php";

$fid = isset($_GET["fid"]) ? $_GET["fid"] : "";
$fname = isset($_GET["fname"]) ? $_GET["fname"] : "";
$city = isset($_GET["city"]) ? implode(",", array_map(function($city) { return "'$city'"; }, (array) $_GET["city"])) : "";
$province = isset($_GET["province"]) ? implode(",", array_map(function($province) { return "'$province'"; }, (array) $_GET["province"])) : "";
$type = isset($_GET["type"]) ? implode(",", array_map(function($type) { return "'$type'"; }, (array) $_GET["type"])) : "";
$minCapacity = isset($_GET["minCapacity"]) ? $_GET["minCapacity"] : "";
$maxCapacity = isset($_GET["maxCapacity"]) ? $_GET["maxCapacity"] : "";

$sql = "SELECT * FROM Facilities WHERE 1";

if (!empty($fid)) {
    $sql .= " AND FID = '$fid'";
}

if (!empty($fname)) {
    $sql .= " AND FName LIKE '%$fname%'";
}

if (!empty($city)) {
    $sql .= " AND City IN ($city)";
}

if (!empty($province)) {
    $sql .= " AND Province IN ($province)";
}

if (!empty($type)) {
    $sql .= " AND FType IN ($type)";
}

if (!empty($minCapacity)) {
    $sql .= " AND Capacity >= $minCapacity";
}

if (!empty($maxCapacity)) {
    $sql .= " AND Capacity <= $maxCapacity";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table class='table table-bordered'>";
    echo "<thead>";
    echo "<tr>";
    echo "<th class='sortable' data-column-index='0' style='cursor:pointer;'>FID</th>";
    echo "<th class='sortable' data-column-index='1' style='cursor:pointer;'>Name</th>";
    echo "<th class='sortable' data-column-index='2' style='cursor:pointer;'>Address</th>";
    echo "<th class='sortable' data-column-index='3' style='cursor:pointer;'>City</th>";
    echo "<th class='sortable' data-column-index='4' style='cursor:pointer;'>Province</th>";
    echo "<th class='sortable' data-column-index='5' style='cursor:pointer;'>Postal_Code</th>";
    echo "<th class='sortable' data-column-index='6' style='cursor:pointer;'>Phone_Number</th>";
    echo "<th class='sortable' data-column-index='7' style='cursor:pointer;'>Web</th>";
    echo "<th class='sortable' data-column-index='8' style='cursor:pointer;'>Type</th>";
    echo "<th class='sortable' data-column-index='9' style='cursor:pointer;'>Capacity</th>";
    echo "<th>Action</th>";
    echo "</tr>";
    echo "</thead>";   
    echo "<tbody>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["FID"] . "</td>";
        echo "<td>" . $row["FName"] . "</td>";
        echo "<td class='address' style='cursor:help;'>" . $row["Address"] . "</td>";
        echo "<td class='city'>" . $row["City"] . "</td>";
        echo "<td class='province'>" . $row["Province"] . "</td>";
        echo "<td class='postal-code'>" . $row["Postal_Code"] . "</td>";
        echo "<td>" . $row["Phone_Number"] . "</td>";
        echo "<td>" . $row["Web_Address"] . "</td>";
        echo "<td>" . $row["FType"] . "</td>";
        echo "<td>" . $row["Capacity"] . "</td>";
        echo "<td><button class='btn btn-danger delete-btn' style='width: 75px; margin-bottom: 4px;margin-right: 4px;' data-fid='" . $row["FID"] . "'>Delete</button>";
        echo "<button class='btn btn-info update-btn' style='width: 75px; margin-bottom: 4px;' data-fid='" . $row["FID"] . "'>Update</button></td>";
        echo "</tr>";
    }
    echo "</tbody>";
    echo "</table>";
} else {
    echo "<p>No results found</p>";
}

$conn->close();
?>
