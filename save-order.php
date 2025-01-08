<?php
// Enable CORS for cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$host = 'localhost'; // XAMPP default MySQL server
$user = 'root';      // XAMPP default user
$password = '';      // Default password for XAMPP (empty)
$dbname = 'srmiggy_orders'; // Your database name

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get the POST data
$orderData = json_decode(file_get_contents('php://input'), true);

// Check if order data is received correctly
if (!$orderData) {
    die(json_encode(['status' => 'error', 'message' => 'Invalid order data received']));
}

// Extract order details
$orderNumber = $conn->real_escape_string($orderData['orderNumber']);
$cart = $conn->real_escape_string(json_encode($orderData['cart']));
$totalAmount = $conn->real_escape_string($orderData['totalAmount']);

// SQL query to insert data into orders table
$sql = "INSERT INTO orders (orderNumber, cart, totalAmount) VALUES ('$orderNumber', '$cart', '$totalAmount')";

// Execute the query and return appropriate response
if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success', 'message' => 'Order saved successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $conn->error]);
}

// Close the database connection
$conn->close();
?>