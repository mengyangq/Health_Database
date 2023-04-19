<?php
require_once "db_config.php";

if (isset($_POST["eid"])) {
    $eid = $_POST["eid"];

    // First, delete the EID from Roles
    $sql_roles = "DELETE FROM Roles WHERE EID = ?";

    if ($stmt_roles = $conn->prepare($sql_roles)) {
        $stmt_roles->bind_param("i", $eid);
        if ($stmt_roles->execute()) {
            // Now, delete the EID from Employees
            $sql_employees = "DELETE FROM Employees WHERE EID = ?";

            if ($stmt_employees = $conn->prepare($sql_employees)) {
                $stmt_employees->bind_param("i", $eid);
                if ($stmt_employees->execute()) {
                    echo "success";
                } else {
                    echo "Error: " . $stmt_employees->error;
                }
            } else {
                echo "Error: " . $conn->error;
            }
        } else {
            echo "Error: " . $stmt_roles->error;
        }
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "Error: EID not provided.";
}

$conn->close();
?>
