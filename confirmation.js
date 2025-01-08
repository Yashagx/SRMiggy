// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalAmount = 0;

// Function to display the order summary
function displayOrderSummary() {
    const orderNumber = Math.floor(Math.random() * 1000000); // Generate random order number
    document.getElementById('orderNumber').textContent = orderNumber;

    const orderDetailsDiv = document.getElementById('orderDetails');
    orderDetailsDiv.innerHTML = ''; // Clear previous order details

    totalAmount = 0; // Reset the totalAmount before accumulating

    // Calculate total amount and display order details
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity; // Calculate item total
        totalAmount += itemTotal; // Accumulate total amount
        
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} x ${item.quantity} = ₹${itemTotal.toFixed(2)}`; // Format with two decimals
        orderDetailsDiv.appendChild(itemDiv);
    });

    // Display total amount with proper formatting
    document.getElementById('totalAmount').textContent = `₹${totalAmount.toFixed(2)}`;
    
    // Send order to server
    sendOrderToServer(orderNumber, cart, totalAmount);
    
    // Clear local storage after displaying
    localStorage.clear();

    // Generate the ready times for the order
    generateReadyTimes();

    // Generate the PDF bill
    generatePDF();
}

// Function to send order data to server
function sendOrderToServer(orderNumber, cart, totalAmount) {
    const orderData = {
        orderNumber: orderNumber,
        cart: cart,
        totalAmount: totalAmount
    };

    console.log("Sending order data to server:", JSON.stringify(orderData)); // Log order data

    fetch('http://localhost/CAS/save-order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Server response:", data); // Log server response
        if (data.status === 'success') {
            alert('Order saved successfully');
        } else {
            alert('There was an error saving the order');
        }
    })
    .catch(error => {
        console.error("Error sending order data:", error); // Log any errors
        alert('Failed to send order. Please try again.');
    });
}

// Function to generate ready times
function generateReadyTimes() {
    const currentTime = new Date();
    const readyByTime = new Date(currentTime.getTime() + 10 * 60000); // 10 minutes from now
    const secondReadyByTime = new Date(currentTime.getTime() + 40 * 60000); // 30 minutes after the first ready time

    // Format the time
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    document.getElementById('readyByTime').textContent = readyByTime.toLocaleTimeString([], options);
    document.getElementById('secondReadyByTime').textContent = secondReadyByTime.toLocaleTimeString([], options);
}

// Function to generate PDF with enhanced styling and SRM logo
// Function to generate PDF with enhanced styling and SRM logo
// Function to generate PDF with enhanced styling and SRM logo
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('portrait', 'pt', 'a4'); // A4 size, portrait orientation

    // Add SRM Logo
    const img = new Image();
    img.src = 'srmlogo.png'; // Replace with the correct path to your logo image
    img.onload = function() {
        doc.addImage(img, 'PNG', 15, 15, 50, 50); // Add image at x=15, y=15, width=50, height=50

        // Title with enhanced color
        doc.setFontSize(24);
        doc.setTextColor(255, 102, 0); // Orange color for title (RGB: 255, 102, 0)
        doc.text('SRMIGGY - Order Confirmation', 70, 30);

        // Draw a line below the title
        doc.setDrawColor(255, 102, 0); // Set orange color for the line
        doc.setLineWidth(1.5);
        doc.line(15, 45, 585, 45); // Line from (x1, y1) to (x2, y2)

        // Add Order Summary header with enhanced color
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0); // Black color for "Order Summary"
        doc.text('Order Summary', 15, 60);

        // Draw a rectangle for order details section
        doc.setFillColor(240, 240, 240); // Light grey color for background
        doc.rect(15, 65, 570, 200, 'F'); // Draw filled rectangle

        // Set font for order items
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black color
        let y = 80; // Starting y position for order items

        // Draw a table header with colored text
        doc.setFontSize(16);
        doc.setTextColor(255, 102, 0); // Orange color for header
        doc.text('Item', 20, y);
        doc.text('Quantity', 150, y);
        doc.text('Price', 300, y);
        doc.text('Total', 400, y);
        y += 20; // Move to the next line

        // Draw a line under the header
        doc.setDrawColor(0); // Black line
        doc.line(15, y, 585, y);
        y += 10; // Space after header

        // Display each item in the order
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity; // Calculate item total
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0); // Black color
            doc.text(item.name, 20, y);
            doc.text(item.quantity.toString(), 150, y);
            doc.text(`₹${item.price.toFixed(2)}`, 300, y);
            doc.text(`₹${itemTotal.toFixed(2)}`, 400, y);
            y += 20; // Move to the next line
        });

        // Display total amount with proper formatting and color
        doc.setFontSize(16);
        doc.setTextColor(255, 102, 0); // Orange color for total amount
        doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 20, y + 10); // Add some space below the items

        // Add Order Ready Time details with black text
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0); // Black color
        doc.text("Order Ready Time:", 15, y + 40);
        doc.setFontSize(14);
        doc.text(`Current Waiting Time: 10 Minutes`, 20, y + 60);
        doc.text(`Your order will be ready by: ${document.getElementById('readyByTime').textContent}`, 20, y + 80);
        doc.text(`If not picked up by then, it will be ready again in 30 minutes at: ${document.getElementById('secondReadyByTime').textContent}`, 20, y + 100);
        doc.text("NOTE: A soft copy of the bill has been sent to your registered mail ID.", 20, y + 120);

        // Draw a line at the bottom of the order details
        doc.setDrawColor(255, 102, 0); // Orange line at the bottom
        doc.line(15, y + 140, 585, y + 140); // Line from (x1, y1) to (x2, y2)

        // Save the PDF
        doc.save('order_confirmation.pdf');
    };
}



// Log cart and total amount before displaying
console.log("Cart:", cart);
console.log("Total Amount:", totalAmount);

// Display the order summary
displayOrderSummary();
