<?php
require_once "db_config.php";

$eid = isset($_POST['EID']) ? $_POST['EID'] : "";

$fname = isset($_POST['FName']) ? $_POST['FName'] : "";
$lname = isset($_POST['LName']) ? $_POST['LName'] : "";
$dob = isset($_POST['DoB']) ? $_POST['DoB'] : "";
$medicare = isset($_POST['Medicare_Number']) ? $_POST['Medicare_Number'] : "";
$phone_number = isset($_POST['Telephone_Number']) ? $_POST['Telephone_Number'] : "";
$address = isset($_POST['Address']) ? $_POST['Address'] : "";
$city = isset($_POST['City']) ? $_POST['City'] : "";
$province = isset($_POST['Province']) ? $_POST['Province'] : "";
$postal_code = isset($_POST['Postal_Code']) ? $_POST['Postal_Code'] : "";
$citizenship = isset($_POST['Citizenship']) ? $_POST['Citizenship'] : "";
$email = isset($_POST['Email']) ? $_POST['Email'] : "";



// Update the Employees table
$sql_employees = "UPDATE Employees SET FName = ?, LName = ?, DoB = ?, Medicare_Number = ?, Telephone_Number = ?, Address = ?, City = ?, Province = ?, Postal_Code = ?, Citizenship = ?, Email = ? WHERE EID = ?";
$stmt_employees = $conn->prepare($sql_employees);
$stmt_employees->bind_param("sssisssssssi", $fname, $lname, $dob, $medicare, $phone_number, $address, $city, $province, $postal_code, $citizenship, $email, $eid);


if ($stmt_employees->execute()) {
    if ($stmt_employees->affected_rows > 0) {
        $response = ["status" => "success"];
    } else {
        $response = ["status" => "error", "message" => "No rows affected. Data might be the same as before."];
    }
} else {
    $response = ["status" => "error", "message" => $stmt_employees->error];
}

echo json_encode($response);

$stmt_employees->close();
$conn->close();
?>