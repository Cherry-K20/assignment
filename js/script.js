const close_btn = document.getElementById("btn");

const form = document.getElementById("promotion_form");
const promotion = document.getElementById("promotion");

if (close_btn && promotion) {
    close_btn.addEventListener("click", function () {
        promotion.style.display = "none";
    });
}

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Thank you! Your 10% discount is ready.");
    });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let buttons = document.querySelectorAll(".cart_btn");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let card = button.parentElement.parentElement;

        let name = card.querySelector(".product_name").textContent;

        let price = parseFloat(
            card.querySelector(".price").textContent.replace("$", "")
        );

        let found = false;

        for (let i = 0; i < cart.length; i++) {

            if (cart[i].name === name) {
                cart[i].quantity++;
                found = true;
            }

        }

        if (!found) {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(name + " added to cart!");

    });

});


let cartItems = document.getElementById("cartItems");

if (cartItems) {

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty.</p>";

        document.getElementById("cartSubtotal").textContent = "0.00";
        document.getElementById("cartTax").textContent = "0.00";
        document.getElementById("cartTotal").textContent = "0.00";

    }

    else {

        cartItems.innerHTML = "";

        cart.forEach(function(product, index) {

            let item = document.createElement("div");

            item.className = "cart_item";

            item.innerHTML =
                "<div class='cart_product'>" +
                    "<h2>" + product.name + "</h2>" +
                    "<p>$" + product.price.toFixed(2) + "</p>" +
                "</div>" +

                "<div class='quantity'>" +
                    "<button type='button' class='minus_btn'>-</button>" +
                    "<span>" + product.quantity + "</span>" +
                    "<button type='button' class='plus_btn'>+</button>" +
                "</div>" +

                "<p>$" +
                    (product.price * product.quantity).toFixed(2) +
                "</p>" +

                "<button type='button' class='remove_btn'>" +
                    "REMOVE" +
                "</button>";

            cartItems.appendChild(item);

            item.querySelector(".plus_btn").addEventListener(
                "click",
                function() {

                    product.quantity++;

                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );

                    location.reload();

                }
            );

            item.querySelector(".minus_btn").addEventListener(
                "click",
                function() {

                    if (product.quantity > 1) {

                        product.quantity--;

                    }

                    else {

                        cart.splice(index, 1);

                    }

                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );

                    location.reload();

                }
            );

            item.querySelector(".remove_btn").addEventListener(
                "click",
                function() {

                    cart.splice(index, 1);

                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );

                    location.reload();

                }
            );

        });

        let subtotal = 0;

        cart.forEach(function(product) {

            subtotal += product.price * product.quantity;

        });

        let tax = subtotal * 0.05;

        let shipping = 3;

        let total = subtotal + tax + shipping;

        document.getElementById("cartSubtotal").textContent =
            subtotal.toFixed(2);

        document.getElementById("cartTax").textContent =
            tax.toFixed(2);

        document.getElementById("cartTotal").textContent =
            total.toFixed(2);

    }

}


let checkoutButton = document.querySelector(".checkout_btn");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function() {

        if (cart.length === 0) {

            alert("Your cart is empty!");

        }

        else {

            let total = 0;

            cart.forEach(function(product) {

                total += product.price * product.quantity;

            });

            let tax = total * 0.05;

            let finalTotal = total + tax + 3;

            alert(
                "Thank you for your order! Total: $" +
                finalTotal.toFixed(2)
            );

            cart = [];

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            location.reload();

        }

    });

}



let coffeeSearch = document.getElementById("coffeeSearch");

if (coffeeSearch) {

    coffeeSearch.addEventListener("input", function() {

        let searchText = coffeeSearch.value.toLowerCase();

        let products =
            document.querySelectorAll(".coffee_blends_box");

        products.forEach(function(product) {

            let productName =
                product.querySelector(".product_name")
                .textContent
                .toLowerCase();

            if (productName.includes(searchText)) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

}
const registerForm = document.querySelector("#registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirmPassword").value;

        if (firstName === "" || lastName === "" || email === "") {
            alert("Please fill in all your information.");
            return;
        } if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        } if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
          }
           alert("Registration successful!");
    });
}
const slideBox = document.querySelector(".slide_box");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (slideBox && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", function() {
        slideBox.scrollLeft += 370;
    });

    prevBtn.addEventListener("click", function() {
        slideBox.scrollLeft -= 370;
    });
}

