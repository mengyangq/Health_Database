<?php
require_once "db_config.php";
// Database connection parameters
$servername = "your_server";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST values from the form
$eid = $_POST['eid'];
$dose_number = $_POST['dose_number'];

// Delete from Vaccinated_in table
$sql_delete_vaccinated_in = "DELETE FROM Vaccinated_in WHERE EID = '$eid' AND Dose_Number = '$dose_number'";
if ($conn->query($sql_delete_vaccinated_in) === TRUE) {
    echo "Vaccination record deleted successfully from Vaccinated_in table.";
} else {
    echo "Error: " . $sql_delete_vaccinated_in . "<br>" . $conn->error;
}

// Delete from Vaccination table
$sql_delete_vaccination = "DELETE FROM Vaccination WHERE EID = '$eid' AND Dose_Number = '$dose_number'";
if ($conn->query($sql_delete_vaccination) === TRUE) {
    echo "Vaccination record deleted successfully from Vaccination table.";
} else {
    echo "Error: " . $sql_delete_vaccination . "<br>" . $conn->error;
}

$conn->close();
?>
