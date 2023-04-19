<?php

require_once "db_config.php";

$eid = isset($_GET["eid"]) ? $_GET["eid"] : "";
$fid = isset($_GET["fid"]) ? $_GET["fid"] : "";
$brand = isset($_GET["brand"]) ? $_GET["brand"] : "";
$vdate = isset($_GET["vdate"]) ? $_GET["vdate"] : "";

$sql = "SELECT v.EID, vi.FID, v.Dose_Number, v.Brand, v.V_Date
        FROM Vaccination v
        JOIN Vaccinated_in vi ON v.EID = vi.EID AND v.Dose_Number = vi.Dose_Number
        WHERE 1";

if (!empty($eid)) {
    $sql .= " AND v.EID = '$eid'";
}

if (!empty($fid)) {
    $sql .= " AND vi.FID = '$fid'";
}

if (!empty($brand)) {
    $sql .= " AND v.Brand = '$brand'";
}

if (!empty($vdate)) {
    $sql .= " AND v.V_Date = '$vdate'";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table class='table table-bordered'>";
    echo "<thead>";
    echo "<tr>";
    echo "<th>Employee ID</th>";
    echo "<th>Facility ID</th>";
    echo "<th>Dose Number</th>";
    echo "<th>Brand</th>";
    echo "<th>Vaccination Date</th>";
    //echo "<th>Action</th>";
    echo "</tr>";
    echo "</thead>";
    echo "<tbody>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>".$row['EID']."</td>";
        echo "<td>".$row['FID']."</td>";
        echo "<td>".$row['Dose_Number']."</td>"; // This line was swapped with the Brand column
        echo "<td>".$row['Brand']."</td>"; // This line was swapped with the Dose_Number column
        echo "<td>".$row['V_Date']."</td>";
        //echo "<td><button class='btn btn-info update-btn' data-row='".json_encode($row)."'>Update</button></td>";
        // Add other columns if needed
        echo "</tr>";
    }
    
    
    echo "</tbody>";
    echo "</table>";
} else {
    echo "<p>No results found</p>";
}

$conn->close();
?>
