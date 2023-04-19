<?php
require_once "db_config.php";

$fid = isset($_POST["FID"]) ? $_POST["FID"] : "";
$name = isset($_POST["FName"]) ? $_POST["FName"] : "";
$address = isset($_POST["Address"]) ? $_POST["Address"] : "";
$city = isset($_POST["City"]) ? $_POST["City"] : "";
$province = isset($_POST["Province"]) ? $_POST["Province"] : "";
$postal_code = isset($_POST["Postal_Code"]) ? $_POST["Postal_Code"] : "";
$phone_number = isset($_POST["Phone_Number"]) ? $_POST["Phone_Number"] : "";
$web_address = isset($_POST["Web_Address"]) ? $_POST["Web_Address"] : "";
$type = isset($_POST["FType"]) ? $_POST["FType"] : "";
$capacity = isset($_POST["Capacity"]) ? $_POST["Capacity"] : "";

$sql = "UPDATE Facilities SET FName = ?, Address = ?, City = ?, Province = ?, Postal_Code = ?, Phone_Number = ?, Web_Address = ?, FType = ?, Capacity = ? WHERE FID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssssis", $name, $address, $city, $province, $postal_code, $phone_number, $web_address, $type, $capacity, $fid);

if ($stmt->execute()) {
    $response = ["status" => "success", "fid" => $fid];
} else {
    $response = ["status" => "error"];
}
echo json_encode($response);

$stmt->close();
$conn->close();
?>
