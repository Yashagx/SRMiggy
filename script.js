let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalAmount = 0;

function addToCart(item, price) {
    const cartItem = cart.find(i => i.name === item);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ name: item, price: price, quantity: 1 });
    }
    totalAmount += price;
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item} added to your cart!`);
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = '';
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`;
            cartItemsDiv.appendChild(itemDiv);
        });
        document.getElementById('totalAmount').textContent = `Total: ₹${totalAmount}`;
    }
}

function goToCartPage() {
    window.location.href = 'cart.html';
}