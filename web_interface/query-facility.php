<?php
require_once "db_config.php";

$query = $_POST['query'];
$facilityID = $_POST['facilityID'];

$stmt = $conn->prepare($query);

$stmt->bind_param('i', $facilityID);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Output the table header
    echo "<table class='table table-bordered custom-table'>";
    echo "<thead>";
    echo "<tr>";
    while ($column = $result->fetch_field()) {
        echo "<th>" . $column->name . "</th>";
    }
    echo "</tr>";
    echo "</thead>";
    echo "<tbody>";

    // Output the table rows
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        foreach ($row as $cell) {
            echo "<td>" . $cell . "</td>";
        }
        echo "</tr>";
    }

    echo "</tbody>";
    echo "</table>";
} else {
    echo "No results found.";
}



$conn->close();
?>