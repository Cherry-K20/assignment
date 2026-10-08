const closeBtn = document.getElementById("btn");
const promotion = document.getElementById("promotion");
const promotionForm = document.getElementById("promotion_form");

if (closeBtn && promotion) {
    closeBtn.onclick = function() {
        promotion.style.display = "none";
    };
}

if (promotionForm) {
    promotionForm.onsubmit = function(event) {
        event.preventDefault();

        alert("Thank you! Your 10% discount is ready.");
    };
}
const navLinks = document.querySelectorAll(".nav_list li a");

navLinks.forEach(function(link) {

    if (link.href === window.location.href) {
        link.classList.add("current");
    }

});
const menuBtn = document.querySelector(".menu_btn");
const navList = document.querySelector(".nav_list");

if (menuBtn && navList) {

    menuBtn.onclick = function() {
        navList.classList.toggle("show");
    };

}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".cart_btn").forEach(function(button) {

    button.onclick = function() {

        let card = button.closest(
            ".coffee_card, .coffee_blends_box, .wishlist_card"
        );

        if (!card) {
            return;
        }

        let name =
            card.querySelector(".product_name").textContent.trim();

        let price =
            parseFloat(
                card.querySelector(".price").textContent.replace("$", "")
            );

        let product = cart.find(function(item) {
            return item.name === name;
        });

        if (product) {

            product.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(name + " added to cart!");

    };

});
const cartItems = document.getElementById("cartItems");

if (cartItems) {

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty.</p>";

        document.getElementById("cartSubtotal").textContent = "0.00";
        document.getElementById("cartTax").textContent = "0.00";
        document.getElementById("cartTotal").textContent = "0.00";

    } else {

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
                    "<button class='minus_btn'>-</button>" +
                    "<span>" + product.quantity + "</span>" +
                    "<button class='plus_btn'>+</button>" +
                "</div>" +

                "<p>$" +
                    (product.price * product.quantity).toFixed(2) +
                "</p>" +

                "<button class='remove_btn'>REMOVE</button>";

            cartItems.appendChild(item);
            item.querySelector(".plus_btn").onclick = function() {

                product.quantity++;

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );

                location.reload();

            };
            item.querySelector(".minus_btn").onclick = function() {

                if (product.quantity > 1) {

                    product.quantity--;

                } else {

                    cart.splice(index, 1);

                }

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );

                location.reload();

            };
             item.querySelector(".remove_btn").onclick = function() {

                cart.splice(index, 1);

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );

                location.reload();

            };

        });
 let subtotal = 0;

        cart.forEach(function(product) {

            subtotal += product.price * product.quantity;

        });

        let tax = subtotal * 0.05;

        let total = subtotal + tax + 3;

        document.getElementById("cartSubtotal").textContent =
            subtotal.toFixed(2);

        document.getElementById("cartTax").textContent =
            tax.toFixed(2);

        document.getElementById("cartTotal").textContent =
            total.toFixed(2);

    }

}
const checkoutButton =
    document.querySelector(".checkout_btn");

if (checkoutButton) {

    checkoutButton.onclick = function() {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }

        let total = 0;

        cart.forEach(function(product) {

            total += product.price * product.quantity;

        });

        total = total + total * 0.05 + 3;

        alert(
            "Thank you for your order! Total: $" +
            total.toFixed(2)
        );

        cart = [];

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        location.reload();

    };

}
const eventForm =
    document.getElementById("eventForm");

if (eventForm) {

    eventForm.onsubmit = function(event) {

        event.preventDefault();

        alert("Registration successful!");

        eventForm.reset();

    };

}
const productSearch =
    document.getElementById("productSearch");

const productType =
    document.getElementById("productType");

if (productSearch && productType) {

    function filterCoffee() {

        let search =
            productSearch.value.toLowerCase();

        let type =
            productType.value;

        document
            .querySelectorAll(".coffee_blends_box")
            .forEach(function(product) {

                let name =
                    product
                        .querySelector(".product_name")
                        .textContent
                        .toLowerCase();

                let category =
                    product.dataset.type;

                let searchMatch =
                    name.includes(search);

                let typeMatch =
                    type === "all" ||
                    category.includes(type);

                if (searchMatch && typeMatch) {

                    product.style.display = "block";

                } else {

                    product.style.display = "none";

                }

            });

    }

    productSearch.oninput = filterCoffee;

    productType.onchange = filterCoffee;

}

const coffeeKey =
    new URLSearchParams(window.location.search).get("coffee");

const coffeeData = {

    berry: {
        name: "BERRY BLOOM",
        image: "../image/berry.png",
        category: "COFFEE BLEND",
        description:
            "A bright and fruity blend with a lively aroma and refreshing acidity.",
        weight: "250g",
        roast: "Light Roast",
        taste: "Berry, Citrus",
        brew: "Pour Over",
        origin: "-",
        price: "$20.00"
    },

    caramel: {
        name: "CARAMEL CLOUD",
        image: "../image/caramel.png",
        category: "COFFEE BLEND",
        description:
            "A smooth and sweet blend with a warm caramel aroma and mellow finish.",
        weight: "250g",
        roast: "Medium Roast",
        taste: "Caramel, Nutty",
        brew: "French Press",
        origin: "-",
        price: "$22.00"
    },

    hazelnut: {
        name: "HAZELNUT HARMONY",
        image: "../image/hazelnut.png",
        category: "COFFEE BLEND",
        description:
            "A warm, nutty blend with a smooth body and gentle sweetness.",
        weight: "250g",
        roast: "Medium Roast",
        taste: "Hazelnut, Chocolate",
        brew: "French Press",
        origin: "-",
        price: "$25.00"
    },

    velvet: {
        name: "VELVET MOCHA",
        image: "../image/velvet.png",
        category: "COFFEE BLEND",
        description:
            "A comforting blend with a deep chocolate character and a creamy finish.",
        weight: "250g",
        roast: "Dark Roast",
        taste: "Cocoa, Hazelnut",
        brew: "Moka Pot",
        origin: "-",
        price: "$23.00"
    },

    midnight: {
        name: "MIDNIGHT ROAST",
        image: "../image/midnight.png",
        category: "COFFEE BLEND",
        description:
            "A dark roast for coffee lovers who enjoy a rich and intense cup.",
        weight: "250g",
        roast: "Dark Roast",
        taste: "Roasted Nuts, Smokey Finish",
        brew: "Espresso",
        origin: "-",
        price: "$24.00"
    },

    sunrise: {
        name: "MORNING SUNRISE",
        image: "../image/sunrise.png",
        category: "COFFEE BLEND",
        description:
            "A smooth and balanced blend made for an easy, refreshing start to the day.",
        weight: "250g",
        roast: "Light Roast",
        taste: "Milk Chocolate, Caramel",
        brew: "Pour Over",
        origin: "-",
        price: "$24.00"
    },

    ethiopia: {
        name: "ETHIOPIA YIRGACHEFFE",
        image: "../image/ethiopian.png",
        category: "SINGLE ORIGIN",
        description:
            "A delicate coffee with floral aromas and bright fruity flavours.",
        weight: "250g",
        roast: "Light Roast",
        taste: "Jasmine, Berry",
        brew: "Pour Over",
        origin: "Ethiopia",
        price: "$28.00"
    },

    colombia: {
        name: "COLOMBIA SUPREMO",
        image: "../image/colambia.png",
        category: "SINGLE ORIGIN",
        description:
            "A smooth and sweet coffee with a balanced body and pleasant finish.",
        weight: "250g",
        roast: "Medium Roast",
        taste: "Caramel, Red Berry",
        brew: "Pour Over",
        origin: "Colombia",
        price: "$27.00"
    },

    brazil: {
        name: "BRAZIL SANTOS",
        image: "../image/brazil.png",
        category: "SINGLE ORIGIN",
        description:
            "A mellow coffee with a nutty aroma, gentle sweetness and smooth body.",
        weight: "250g",
        roast: "Medium Roast",
        taste: "Almond, Milk Chocolate",
        brew: "French Press",
        origin: "Brazil",
        price: "$25.00"
    },

    guatemala: {
        name: "GUATEMALA ANTIGUA",
        image: "../image/guatamala.png",
        category: "SINGLE ORIGIN",
        description:
            "A rich and balanced coffee with cocoa flavours and a gentle spicy finish.",
        weight: "250g",
        roast: "Medium Roast",
        taste: "Cocoa, Spice",
        brew: "Pour Over",
        origin: "Guatemala",
        price: "$29.00"
    },

    kenya: {
        name: "KENYA AA",
        image: "../image/kenya.png",
        category: "SINGLE ORIGIN",
        description:
            "A bright and lively coffee with juicy fruit flavours and refreshing acidity.",
        weight: "250g",
        roast: "Light Roast",
        taste: "Blackcurrant, Citrus",
        brew: "Pour Over",
        origin: "Kenya",
        price: "$23.00"
    },

    costa_rica: {
        name: "COSTA RICA TARRAZÚ",
        image: "../image/costa_rica.png",
        category: "SINGLE ORIGIN",
        description:
            "A clean and bright coffee with a refreshing citrus character and honey sweetness.",
        weight: "250g",
        roast: "Medium Roast",
        taste: "Orange, Honey",
        brew: "Pour Over",
        origin: "Costa Rica",
        price: "$28.00"
    }

};

if (coffeeKey && coffeeData[coffeeKey]) {

    let coffee = coffeeData[coffeeKey];

    document.getElementById("detailName").textContent =
        coffee.name;

    document.getElementById("detailImage").src =
        coffee.image;

    document.getElementById("detailImage").alt =
        coffee.name;

    document.getElementById("detailCategory").textContent =
        coffee.category;

    document.getElementById("detailDescription").textContent =
        coffee.description;

    document.getElementById("detailWeight").textContent =
        coffee.weight;

    document.getElementById("detailRoast").textContent =
        coffee.roast;

    document.getElementById("detailTaste").textContent =
        coffee.taste;

    document.getElementById("detailBrew").textContent =
        coffee.brew;

    document.getElementById("detailOrigin").textContent =
        coffee.origin;

    document.getElementById("detailPrice").textContent =
        coffee.price;

    if (coffee.origin === "-") {

        document.getElementById("originRow").style.display =
            "none";

    }

}
const detailCart =
    document.querySelector(".detail_cart");

if (detailCart && coffeeKey && coffeeData[coffeeKey]) {

    detailCart.onclick = function() {

        let coffee = coffeeData[coffeeKey];

        let product = cart.find(function(item) {

            return item.name === coffee.name;

        });

        if (product) {

            product.quantity++;

        } else {

            cart.push({
                name: coffee.name,
                price: parseFloat(
                    coffee.price.replace("$", "")
                ),
                quantity: 1
            });

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert(coffee.name + " added to cart!");

    };

}
let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];
document
    .querySelectorAll(".wishlist_btn")
    .forEach(function(button) {

        button.onclick = function(event) {

            event.preventDefault();

            let card =
                button.closest(
                    ".coffee_blends_box, .coffee_card"
                );

            if (!card) {
                return;
            }

            let name =
                card
                    .querySelector(".product_name")
                    .textContent;

            let image =
                card.querySelector("img").src;

            let price =
                card
                    .querySelector(".price")
                    .textContent;

            let exists =
                wishlist.some(function(item) {

                    return item.name === name;

                });

            if (exists) {

                alert(
                    name +
                    " is already in your wishlist!"
                );

            } else {

                wishlist.push({
                    name: name,
                    image: image,
                    price: price
                });

                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(wishlist)
                );

                button.querySelector("i").className =
                    "fa-solid fa-star";

                alert(
                    name +
                    " added to wishlist!"
                );

            }

        };

    });
const wishlistItems =
    document.getElementById("wishlistItems");

if (wishlistItems) {

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
            "<p class='empty_wishlist'>" +
            "Your wishlist is empty!" +
            "</p>";

    } else {

        wishlist.forEach(function(product) {

            wishlistItems.innerHTML +=

                "<div class='coffee_blends_box wishlist_card'>" +

                    "<div class='coffee_blend'>" +

                        "<img src='" +
                        product.image +
                        "' alt='" +
                        product.name +
                        "'>" +

                    "</div>" +

                    "<div class='blend_info'>" +

                        "<h2 class='product_name'>" +
                            product.name +
                        "</h2>" +

                        "<p class='price'>" +
                            product.price +
                        "</p>" +

                        "<button class='cart_btn wishlist_cart'>" +
                            "ADD TO CART" +
                        "</button>" +

                        "<button class='remove_wishlist'>" +
                            "<i class='fa-solid fa-trash'></i> REMOVE" +
                        "</button>" +

                    "</div>" +

                "</div>";

        });
document.querySelectorAll(".wishlist_cart")
            .forEach(function(button, index) {

                button.onclick = function() {

                    let product =
                        wishlist[index];

                    let cartProduct =
                        cart.find(function(item) {

                            return item.name === product.name;

                        });

                    if (cartProduct) {

                        cartProduct.quantity++;

                    } else {

                        cart.push({
                            name: product.name,
                            price: parseFloat(
                                product.price.replace("$", "")
                            ),
                            quantity: 1
                        });

                    }

                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );

                    alert(
                        product.name +
                        " added to cart!"
                    );

                };

            });
 document.querySelectorAll(".remove_wishlist")
            .forEach(function(button, index) {

                button.onclick = function() {

                    wishlist.splice(index, 1);

                    localStorage.setItem(
                        "wishlist",
                        JSON.stringify(wishlist)
                    );

                    location.reload();

                };

            });

    }

}
let subscribeBtn = document.getElementById("subscribeBtn");
let subscriptionPopup = document.getElementById("subscriptionPopup");
let closeSubscription = document.getElementById("closeSubscription");
let subscriptionForm = document.getElementById("subscriptionForm");

if (subscribeBtn) {

    subscribeBtn.onclick = function() {
        subscriptionPopup.style.display = "flex";
    };

}

if (closeSubscription) {

    closeSubscription.onclick = function() {
        subscriptionPopup.style.display = "none";
    };

}

if (subscriptionPopup) {

    subscriptionPopup.onclick = function(event) {

        if (event.target === subscriptionPopup) {
            subscriptionPopup.style.display = "none";
        }

    };

}

if (subscriptionForm) {

    subscriptionForm.onsubmit = function(event) {

        event.preventDefault();

        let name = document.getElementById("subName").value;
        let email = document.getElementById("subEmail").value;
        let plan = document.getElementById("subPlan").value;

        let subject = "Bean Boutique Subscription";
        let body =
            "Name: " + name +
            "\nEmail: " + email +
            "\nSubscription: " + plan;

        window.location.href =
            "mailto:beanboutique@gmail.com?subject=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body);

    };

}
const coffeeSwiper = document.querySelector(".coffeeSwiper");

if (coffeeSwiper && typeof Swiper !== "undefined") {

    new Swiper(".coffeeSwiper", {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: false,

        navigation: {
            nextEl: ".coffeeSwiper .swiper-button-next",
            prevEl: ".coffeeSwiper .swiper-button-prev"
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            481: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            769: {
                slidesPerView: 3,
                spaceBetween: 25
            }
        }
    });

}
if (typeof AOS !== "undefined") {
    AOS.init();
}