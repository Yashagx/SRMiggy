<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";  // Default password for XAMPP
$dbname = "srmiggy_orders";  // Ensure this is the correct database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch orders
$sql = "SELECT id, orderNumber, totalAmount, orderDate, cart FROM orders";
$result = $conn->query($sql);

if (!$result) {
    die("Error executing query: " . $conn->error);
}

$orders = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
} else {
    echo json_encode(["message" => "No orders found"]);
}

// Return the data in JSON format
header('Content-Type: application/json');
echo json_encode($orders);

// Close connection
$conn->close();
?>





