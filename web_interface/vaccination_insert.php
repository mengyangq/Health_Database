<?php
require_once "db_config.php";

// Get POST values from the form
$eid = $_POST['eid'];
$fid = $_POST['fid'];
$brand = $_POST['brand'];
$vdate = $_POST['vdate'];

// Insert into Vaccination table
$sql_insert_vaccination = "INSERT INTO Vaccination (EID, Brand, V_date) VALUES (?, ?, ?)";
$stmt_vaccination = $conn->prepare($sql_insert_vaccination);
$stmt_vaccination->bind_param("iss", $eid, $brand, $vdate);

// Insert into Vaccinated_in table
$sql_insert_vaccinated_in = "INSERT INTO Vaccinated_in (FID, EID, Dose_Number) VALUES (?, ?, ?)";
$stmt_vaccinated_in = $conn->prepare($sql_insert_vaccinated_in);

if ($stmt_vaccination->execute()) {
    // Get the Dose_Number of the just inserted tuple
    $sql_select_dose_number = "SELECT Dose_Number FROM Vaccination WHERE EID = ? AND V_date = ? AND Brand = ?";
    $stmt_select_dose_number = $conn->prepare($sql_select_dose_number);
    $stmt_select_dose_number->bind_param("iss", $eid, $vdate, $brand);
    $stmt_select_dose_number->execute();
    $result = $stmt_select_dose_number->get_result();
    $row = $result->fetch_assoc();
    $dose_number = $row["Dose_Number"];

    // Write the Dose_Number to log.txt
    file_put_contents("log.txt", "Dose_Number: " . $dose_number . PHP_EOL, FILE_APPEND);

    // Bind parameters for Vaccinated_in after getting the Dose_Number
    $stmt_vaccinated_in->bind_param("iii", $fid, $eid, $dose_number);

    if ($stmt_vaccinated_in->execute()) {
        $response = [
            "status" => "success",
            "eid" => $eid,
            "fid" => $fid,
            "brand" => $brand,
            "vdate" => $vdate,
            "dose_number" => $dose_number
        ];
    } else {
        $response = [
            "status" => "error", "error" => $stmt_vaccinated_in->error
        ];
    }
} else {
    $response = [
        "status" => "error",
        "error" => $stmt_vaccination->error
    ];
}

echo json_encode($response);

$stmt_vaccination->close();
$stmt_vaccinated_in->close();
$stmt_select_dose_number->close();

?>
