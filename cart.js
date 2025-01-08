let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalAmount = 0;

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    totalAmount = 0; // Reset totalAmount for each update
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`;
        cartItemsDiv.appendChild(itemDiv);
        totalAmount += item.price * item.quantity;
    });
    document.getElementById('totalAmount').textContent = `Total: ₹${totalAmount}`;
}

function generateBill() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    const paymentMethod = document.getElementById('paymentMethod').value;

    if (paymentMethod === 'cash') {
        alert('Payment pending. Pay to get your order.');
    }
    if (paymentMethod === 'card') {
        alert('OTP sent to your registered number.Getting Confirmation from Canteen Admin');
    }
    if (paymentMethod === 'upi') {
        alert('QR sent to your registered number.Getting Confirmation from Canteen Admin');
    }

    localStorage.setItem('totalAmount', totalAmount);
    window.location.href = 'confirmation.html';
}

updateCart();
