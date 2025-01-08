document.addEventListener("DOMContentLoaded", function() {
    fetchOrders();
    
    function fetchOrders() {
        fetch("fetch_orders.php")
        .then(response => {
            if (!response.ok) {
                console.error("HTTP error: " + response.status + " " + response.statusText);
                throw new Error("HTTP error " + response.status);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log("Fetched data:", data); // Log the fetched data for debugging

            let tableBody = document.querySelector("#orderTable tbody");
            tableBody.innerHTML = ""; // Clear the table

            // Loop through the orders and create table rows
            data.forEach(order => {
                let row = document.createElement("tr");

                // Parse the cart JSON string to an object
                const cartItems = JSON.parse(order.cart);
                let cartDetails = '';

                // Construct the cart details string
                cartItems.forEach(item => {
                    cartDetails += `${item.name} (Price: ${item.price}, Quantity: ${item.quantity})<br>`;
                });

                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.orderNumber}</td>
                    <td>${order.totalAmount}</td>
                    <td>${order.orderDate}</td>
                    <td>${cartDetails || 'No items'}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("Error fetching orders. Check console for details.");
        });
    }

    // Auto-refresh the orders every 30 seconds
    setInterval(fetchOrders, 30000);
});
