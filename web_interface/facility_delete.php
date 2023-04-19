<?php

require_once "db_config.php";

if (isset($_POST["fid"])) {
    $fid = $_POST["fid"];
    $sql = "DELETE FROM Facilities WHERE FID = ?";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $fid);
        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "Error: " . $stmt->error;
        }
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "Error: FID not provided.";
}

$conn->close();
?>