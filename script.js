const foods = [

    {
        id: 1,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 12.99,
        image: "🍕",
        description: "Cheesy pizza topped with delicious pepperoni."
    },

    {
        id: 2,
        name: "Veggie Pizza",
        category: "Pizza",
        price: 11.49,
        image: "🍕",
        description: "Fresh vegetables, cheese and tomato sauce."
    },

    {
        id: 3,
        name: "Classic Burger",
        category: "Burgers",
        price: 8.99,
        image: "🍔",
        description: "Juicy beef burger with cheese and fresh lettuce."
    },

    {
        id: 4,
        name: "Chicken Burger",
        category: "Burgers",
        price: 9.49,
        image: "🍔",
        description: "Crispy chicken burger with creamy sauce."
    },

    {
        id: 5,
        name: "Fresh Lemonade",
        category: "Drinks",
        price: 3.49,
        image: "🍋",
        description: "Refreshing freshly squeezed lemonade."
    },

    {
        id: 6,
        name: "Cold Cola",
        category: "Drinks",
        price: 2.99,
        image: "🥤",
        description: "Ice-cold fizzy cola served with ice."
    },

    {
        id: 7,
        name: "Chocolate Cake",
        category: "Desserts",
        price: 6.49,
        image: "🍰",
        description: "Rich chocolate cake with creamy chocolate topping."
    },

    {
        id: 8,
        name: "Strawberry Dessert",
        category: "Desserts",
        price: 5.49,
        image: "🍓",
        description: "Sweet strawberries with delicious cream."
    }

];


let cart = [];


/* DISPLAY FOOD */

function displayFoods(foodList) {

    const container =
        document.getElementById("food-container");

    container.innerHTML = "";

    foodList.forEach(food => {

        container.innerHTML += `

            <div class="food-card">

                <div class="food-image">
                    ${food.image}
                </div>

                <div class="food-content">

                    <h3>
                        ${food.name}
                    </h3>

                    <p class="food-description">
                        ${food.description}
                    </p>

                    <div class="food-bottom">

                        <span class="price">
                            $${food.price.toFixed(2)}
                        </span>

                        <button
                            class="add-button"
                            onclick="addToCart(${food.id})">

                            + Add

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


/* FILTER CATEGORIES */

function filterFood(category) {

    if (category === "All") {

        displayFoods(foods);

    } else {

        const filteredFoods =
            foods.filter(food =>
                food.category === category
            );

        displayFoods(filteredFoods);

    }

}


/* ADD TO CART */

function addToCart(id) {

    const food = foods.find(
        food => food.id === id
    );

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }

    updateCart();

}


/* UPDATE CART */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";

    let total = 0;

    let itemCount = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

        itemCount +=
            item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-emoji">
                    ${item.image}
                </div>

                <div class="cart-item-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <div>
                        $${item.price.toFixed(2)}
                    </div>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})">

                        Remove

                    </button>

                </div>

            </div>

        `;

    });


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty 🛒</p>";

    }


    cartCount.innerText = itemCount;

    cartTotal.innerText =
        "$" + total.toFixed(2);

}


/* CHANGE QUANTITY */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    updateCart();

}


/* REMOVE ITEM */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document.getElementById("cart")
        .style.display = "block";

}


/* CLOSE CART */

function closeCart() {

    document.getElementById("cart")
        .style.display = "none";

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "🎉 Your order has been placed successfully!"
    );


    cart = [];

    updateCart();

    closeCart();

}


/* INITIAL DISPLAY */

displayFoods(foods);

updateCart();
