<?php
require_once "db_config.php";

// Get POST values from the form
$eid = $_POST['eid'];
$fid = $_POST['fid'];
$brand = $_POST['brand'];
$vdate = $_POST['vdate'];

// Build the SQL query
$sql_fetch_vaccination = "SELECT v.EID, vi.FID, v.Dose_Number, v.Brand, v.V_date
                          FROM Vaccination v
                          JOIN Vaccinated_in vi ON v.EID = vi.EID AND v.Dose_Number = vi.Dose_Number
                          WHERE 1";

if (!empty($eid)) {
    $sql_fetch_vaccination .= " AND v.EID = '$eid'";
}

if (!empty($fid)) {
    $sql_fetch_vaccination .= " AND vi.FID = '$fid'";
}

if (!empty($brand)) {
    $sql_fetch_vaccination .= " AND v.Brand = '$brand'";
}

if (!empty($vdate)) {
    $sql_fetch_vaccination .= " AND v.V_date = '$vdate'";
}

// Execute the query and fetch the results
$result = $conn->query($sql_fetch_vaccination);

// Display the results as an HTML table
if ($result->num_rows > 0) {
    echo "<table class='table table-striped'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Facility ID</th>
                    <th>Dose Number</th>
                    <th>Brand</th>
                    <th>Vaccination Date</th>
                </tr>
            </thead>
            <tbody>";

    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $row["EID"] . "</td>
                <td>" . $row["FID"] . "</td>
                <td>" . $row["Dose_Number"] . "</td>
                <td>" . $row["Brand"] . "</td>
                <td>" . $row["V_date"] . "</td>
              </tr>";
    }

    echo "</tbody>
        </table>";
} else {
    echo "0 results";
}

$conn->close();
?>
