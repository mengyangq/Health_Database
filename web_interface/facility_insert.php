<?php
require_once "db_config.php";

$name = isset($_POST['name']) ? $_POST['name'] : "";
$address = isset($_POST['address']) ? $_POST['address'] : "";
$city = isset($_POST['city']) ? $_POST['city'] : "";
$province = isset($_POST['province']) ? $_POST['province'] : "";
$postal_code = isset($_POST['postal_code']) ? $_POST['postal_code'] : "";
$phone_number = isset($_POST['phone_number']) ? $_POST['phone_number'] : "";
$web_address = isset($_POST['web_address']) ? $_POST['web_address'] : "";
$type = isset($_POST['type']) ? $_POST['type'] : "";
$capacity = isset($_POST['capacity']) ? $_POST['capacity'] : "";

$sql = "INSERT INTO Facilities (FName, Address, City, Province, Postal_Code, Phone_Number, Web_Address, FType, Capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssssi", $name, $address, $city, $province, $postal_code, $phone_number, $web_address, $type, $capacity);

if ($stmt->execute()) {
    $response = ["status" => "success", "fid" => $conn->insert_id];
} else {
    $response = ["status" => "error"];
}
echo json_encode($response);

$stmt->close();
$conn->close();
?>
