<?php
require_once "db_config.php";

$fname = isset($_POST['fname']) ? $_POST['fname'] : "";
$lname = isset($_POST['lname']) ? $_POST['lname'] : "";
$dob = isset($_POST['dob']) ? $_POST['dob'] : "";
$medicare = isset($_POST['medicare']) ? $_POST['medicare'] : "";
$phone_number = isset($_POST['telephone']) ? $_POST['telephone'] : "";
$address = isset($_POST['address']) ? $_POST['address'] : "";
$city = isset($_POST['city']) ? $_POST['city'] : "";
$province = isset($_POST['province']) ? $_POST['province'] : "";
$postal_code = isset($_POST['postal_code']) ? $_POST['postal_code'] : "";
$citizenship = isset($_POST['citizenship']) ? $_POST['citizenship'] : "";
$email = isset($_POST['email']) ? $_POST['email'] : "";
$fid = isset($_POST['fid']) ? $_POST['fid'] : "";
$role = isset($_POST['role']) ? $_POST['role'] : "";
$start_date = isset($_POST['start_date']) ? $_POST['start_date'] : "";
$end_date = isset($_POST['end_date']) && !empty($_POST['end_date']) ? $_POST['end_date'] : NULL;


$sql = "INSERT INTO Employees (FName, LName, DoB, Medicare_Number, Telephone_Number, Address, City, Province, Postal_Code, Citizenship, Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssisssssss", $fname, $lname, $dob, $medicare, $phone_number, $address, $city, $province, $postal_code, $citizenship, $email);

if ($stmt->execute()) {
    $eid = $conn->insert_id; // Get the EID of the inserted employee

    // Insert a new entry in Roles
    $sql_roles = "INSERT INTO Roles (EID, FID, Title, Start_Date, End_Date) VALUES (?, ?, ?, ?, ?)";
    $stmt_roles = $conn->prepare($sql_roles);
    $stmt_roles->bind_param("iisss", $eid, $fid, $role, $start_date, $end_date);

    if ($stmt_roles->execute()) {
        $response = ["status" => "success", "eid" => $eid];
    } else {
        $response = ["status" => "error_roles", "error" => $stmt_roles->error];
    }
    $stmt_roles->close();
} else {
    $response = ["status" => "error_employees", "error" => $stmt->error];
}
echo json_encode($response);

$stmt->close();
$conn->close();
?>
