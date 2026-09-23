let cart = [];
let total = 0;

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    total += price;

    updateCart();

    alert(name + " added to your cart! 🛒");
}

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartCount.textContent = cart.length;
    cartTotal.textContent = total;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const itemElement = document.createElement("p");

        itemElement.innerHTML =
            `${item.name} - ₹${item.price}
            <button onclick="removeItem(${index})">Remove</button>`;

        cartItems.appendChild(itemElement);
    });
}

function removeItem(index) {

    total -= cart[index].price;

    cart.splice(index, 1);

    updateCart();
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you! Your order has been placed. 🎉");

    cart = [];
    total = 0;

    updateCart();
}
