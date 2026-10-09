function notify(message) {
    if (typeof Toastify === "function") {
        Toastify({ text: message, duration: 2500, gravity: "top", position: "right" }).showToast();
    } else {
        alert(message);
    }
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem("wishlist", JSON.stringify(wishlist)); }

function addCart(name, price) {
    let item = cart.find(product => product.name === name);
    if (item) item.quantity++;
    else cart.push({ name: name, price: parseFloat(String(price).replace("$", "")), quantity: 1 });
    saveCart();
    notify(name + " added to cart!");
}
const promotion = document.getElementById("promotion");
const closeBtn = document.getElementById("btn");
const promotionForm = document.getElementById("promotion_form");

if (closeBtn && promotion) closeBtn.onclick = () => promotion.style.display = "none";

if (promotionForm) promotionForm.onsubmit = event => {
    event.preventDefault();
    notify("Thank you! Your 10% discount is ready.");
    if (promotion) promotion.style.display = "none";
    promotionForm.reset();
};
document.querySelectorAll(".nav_list li a").forEach(link => {
    if (link.href === window.location.href) link.classList.add("current");
});

const menuBtn = document.querySelector(".menu_btn");
const navList = document.querySelector(".nav_list");

if (menuBtn && navList) menuBtn.onclick = () => navList.classList.toggle("show");

document.addEventListener("click", event => {
    const button = event.target.closest(".cart_btn");
    if (!button) return;

    const card = button.closest(".coffee_card, .coffee_blends_box, .wishlist_card, .equipment_card, .equipment_box, .product_box");
    if (!card) return;

    const name = card.querySelector(".product_name");
    const price = card.querySelector(".price");

    if (name && price) addCart(name.textContent.trim(), price.textContent.trim());
});
const cartItems = document.getElementById("cartItems");

function showCart() {
    if (!cartItems) return;

    cartItems.innerHTML = "";
    let subtotal = 0;

    if (!cart.length) cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";

    cart.forEach((product, index) => {
        const item = document.createElement("div");
        item.className = "cart_item";

        item.innerHTML = "<div class='cart_product'><h2></h2><p></p></div>" +
            "<div class='quantity'><button class='minus_btn' type='button'>-</button><span></span><button class='plus_btn' type='button'>+</button></div>" +
            "<p class='item_total'></p><button class='remove_btn' type='button'>REMOVE</button>";

        item.querySelector("h2").textContent = product.name;
        item.querySelector(".cart_product p").textContent = "$" + product.price.toFixed(2);
        item.querySelector(".quantity span").textContent = product.quantity;
        item.querySelector(".item_total").textContent = "$" + (product.price * product.quantity).toFixed(2);

        cartItems.appendChild(item);
        subtotal += product.price * product.quantity;

        item.querySelector(".plus_btn").onclick = () => {
            product.quantity++;
            saveCart();
            showCart();
        };

        item.querySelector(".minus_btn").onclick = () => {
            if (product.quantity > 1) product.quantity--;
            else cart.splice(index, 1);
            saveCart();
            showCart();
        };

        item.querySelector(".remove_btn").onclick = () => {
            cart.splice(index, 1);
            saveCart();
            showCart();
        };
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax + (cart.length ? 3 : 0);

    const subtotalEl = document.getElementById("cartSubtotal");
    const taxEl = document.getElementById("cartTax");
    const totalEl = document.getElementById("cartTotal");

    if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = tax.toFixed(2);
    if (totalEl) totalEl.textContent = total.toFixed(2);
}

showCart();
const checkoutButton = document.querySelector(".checkout_btn");

if (checkoutButton) checkoutButton.onclick = () => {
    if (!cart.length) {
        notify("Your cart is empty!");
        return;
    }

    let total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    total = total * 1.05 + 3;

    notify("Thank you for your order! Total: $" + total.toFixed(2));

    cart = [];
    saveCart();
    showCart();
};
const eventForm = document.getElementById("eventForm");

if (eventForm) eventForm.onsubmit = event => {
    event.preventDefault();
    notify("Registration successful!");
    eventForm.reset();
};
const productSearch = document.getElementById("productSearch");
const productType = document.getElementById("productType");
const coffeeBanner = document.querySelector(".coffee_collection_banner");

function filterCoffee() {
    const search = productSearch.value.toLowerCase();
    const type = productType.value;

    document.querySelectorAll(".product_box .coffee_blends_box").forEach(product => {
        const name = product.querySelector(".product_name");
        const category = product.dataset.type || "";

        product.style.display =
            name &&
            name.textContent.toLowerCase().includes(search) &&
            (type === "all" || category.split(" ").includes(type))
                ? ""
                : "none";
    });

    if (coffeeBanner) {
        coffeeBanner.style.display =
            type === "all" && search === "" ? "" : "none";
    }
}

if (productSearch && productType) {
    productSearch.oninput = filterCoffee;
    productType.onchange = filterCoffee;
}

const coffeeData = {
    berry: { name: "BERRY BLOOM", image: "berry.png", category: "COFFEE BLEND", description: "A bright and fruity blend with a lively aroma and refreshing acidity.", weight: "250g", roast: "Light Roast", taste: "Berry, Citrus", brew: "Pour Over", origin: "-", price: "$20.00" },
    caramel: { name: "CARAMEL CLOUD", image: "caramel.png", category: "COFFEE BLEND", description: "A smooth and sweet blend with a warm caramel aroma and mellow finish.", weight: "250g", roast: "Medium Roast", taste: "Caramel, Nutty", brew: "French Press", origin: "-", price: "$22.00" },
    hazelnut: { name: "HAZELNUT HARMONY", image: "hazelnut.png", category: "COFFEE BLEND", description: "A warm, nutty blend with a smooth body and gentle sweetness.", weight: "250g", roast: "Medium Roast", taste: "Hazelnut, Chocolate", brew: "French Press", origin: "-", price: "$25.00" },
    velvet: { name: "VELVET MOCHA", image: "velvet.png", category: "COFFEE BLEND", description: "A comforting blend with a deep chocolate character and a creamy finish.", weight: "250g", roast: "Dark Roast", taste: "Cocoa, Hazelnut", brew: "Moka Pot", origin: "-", price: "$23.00" },
    midnight: { name: "MIDNIGHT ROAST", image: "midnight.png", category: "COFFEE BLEND", description: "A dark roast for coffee lovers who enjoy a rich and intense cup.", weight: "250g", roast: "Dark Roast", taste: "Roasted Nuts, Smokey Finish", brew: "Espresso", origin: "-", price: "$24.00" },
    sunrise: { name: "MORNING SUNRISE", image: "sunrise.png", category: "COFFEE BLEND", description: "A smooth and balanced blend made for an easy, refreshing start to the day.", weight: "250g", roast: "Light Roast", taste: "Milk Chocolate, Caramel", brew: "Pour Over", origin: "-", price: "$24.00" },
    ethiopia: { name: "ETHIOPIA YIRGACHEFFE", image: "ethiopian.png", category: "SINGLE ORIGIN", description: "A delicate coffee with floral aromas and bright fruity flavours.", weight: "250g", roast: "Light Roast", taste: "Jasmine, Berry", brew: "Pour Over", origin: "Ethiopia", price: "$28.00" },
    colombia: { name: "COLOMBIA SUPREMO", image: "colambia.png", category: "SINGLE ORIGIN", description: "A smooth and sweet coffee with a balanced body and pleasant finish.", weight: "250g", roast: "Medium Roast", taste: "Caramel, Red Berry", brew: "Pour Over", origin: "Colombia", price: "$27.00" },
    brazil: { name: "BRAZIL SANTOS", image: "brazil.png", category: "SINGLE ORIGIN", description: "A mellow coffee with a nutty aroma, gentle sweetness and smooth body.", weight: "250g", roast: "Medium Roast", taste: "Almond, Milk Chocolate", brew: "French Press", origin: "Brazil", price: "$25.00" },
    guatemala: { name: "GUATEMALA ANTIGUA", image: "guatamala.png", category: "SINGLE ORIGIN", description: "A rich and balanced coffee with cocoa flavours and a gentle spicy finish.", weight: "250g", roast: "Medium Roast", taste: "Cocoa, Spice", brew: "Pour Over", origin: "Guatemala", price: "$29.00" },
    kenya: { name: "KENYA AA", image: "kenya.png", category: "SINGLE ORIGIN", description: "A bright and lively coffee with juicy fruit flavours and refreshing acidity.", weight: "250g", roast: "Light Roast", taste: "Blackcurrant, Citrus", brew: "Pour Over", origin: "Kenya", price: "$23.00" },
    costa_rica: { name: "COSTA RICA TARRAZÚ", image: "costa_rica.png", category: "SINGLE ORIGIN", description: "A clean and bright coffee with citrus character and honey sweetness.", weight: "250g", roast: "Medium Roast", taste: "Orange, Honey", brew: "Pour Over", origin: "Costa Rica", price: "$28.00" }
};

const coffeeKey = new URLSearchParams(window.location.search).get("coffee");
const coffee = coffeeData[coffeeKey];

if (coffee) {
    const fields = ["detailName", "detailImage", "detailCategory", "detailDescription", "detailWeight", "detailRoast", "detailTaste", "detailBrew", "detailOrigin", "detailPrice"];
    const values = [coffee.name, coffee.image, coffee.category, coffee.description, coffee.weight, coffee.roast, coffee.taste, coffee.brew, coffee.origin, coffee.price];

    fields.forEach((id, index) => {
        const element = document.getElementById(id);
        if (!element) return;

        if (id === "detailImage") {
            element.src = "../image/" + values[index];
            element.alt = coffee.name;
        } else {
            element.textContent = values[index];
        }
    });

    const originRow = document.getElementById("originRow");
    if (originRow && coffee.origin === "-") originRow.style.display = "none";
}

const detailCart = document.querySelector(".detail_cart");
if (detailCart && coffee) detailCart.onclick = () => addCart(coffee.name, coffee.price);

document.addEventListener("click", event => {
    const button = event.target.closest(".wishlist_btn");
    if (!button) return;

    event.preventDefault();

    const card = button.closest(".coffee_blends_box, .coffee_card");
    if (!card) return;

    const name = card.querySelector(".product_name");
    const price = card.querySelector(".price");
    const image = card.querySelector("img");

    if (!name || !price || !image) return;

    const productName = name.textContent.trim();

    if (wishlist.some(item => item.name === productName)) {
        notify(productName + " is already in your wishlist!");
        return;
    }

    wishlist.push({ name: productName, image: image.src, price: price.textContent.trim() });
    saveWishlist();

    const icon = button.querySelector("i");
    if (icon) icon.className = "fa-solid fa-star";

    notify(productName + " added to wishlist!");
});


const wishlistItems = document.getElementById("wishlistItems");

if (wishlistItems) {
    if (!wishlist.length) {
        wishlistItems.innerHTML = "<p class='empty_wishlist'>Your wishlist is empty!</p>";
    } else {
        wishlistItems.innerHTML = wishlist.map(product =>
            "<div class='coffee_blends_box wishlist_card'><div class='coffee_blend'><img src='" +
            product.image + "' alt='" + product.name + "'></div><div class='blend_info'><h2 class='product_name'>" +
            product.name + "</h2><p class='price'>" + product.price +
            "</p><button class='cart_btn wishlist_cart' type='button'>ADD TO CART</button>" +
            "<button class='remove_wishlist' type='button'><i class='fa-solid fa-trash'></i> REMOVE</button></div></div>"
        ).join("");

        wishlistItems.querySelectorAll(".remove_wishlist").forEach((button, index) => {
            button.onclick = () => {
                wishlist.splice(index, 1);
                saveWishlist();
                location.reload();
            };
        });
    }
}


const subscribeBtn = document.getElementById("subscribeBtn");
const subscriptionPopup = document.getElementById("subscriptionPopup");
const closeSubscription = document.getElementById("closeSubscription");
const subscriptionForm = document.getElementById("subscriptionForm");

if (subscribeBtn && subscriptionPopup) {
    subscribeBtn.onclick = () => subscriptionPopup.style.display = "flex";
}

if (closeSubscription && subscriptionPopup) {
    closeSubscription.onclick = () => subscriptionPopup.style.display = "none";
}

if (subscriptionPopup) subscriptionPopup.onclick = event => {
    if (event.target === subscriptionPopup) subscriptionPopup.style.display = "none";
};

if (subscriptionForm) subscriptionForm.onsubmit = event => {
    event.preventDefault();

    const body = "Name: " + document.getElementById("subName").value +
        "\nEmail: " + document.getElementById("subEmail").value +
        "\nSubscription: " + document.getElementById("subPlan").value;

    window.location.href = "mailto:beanboutique@gmail.com?subject=" +
        encodeURIComponent("Bean Boutique Subscription") + "&body=" + encodeURIComponent(body);
};

if (document.querySelector(".coffeeSwiper") && typeof Swiper !== "undefined") {
    new Swiper(".coffeeSwiper", {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: false,
        navigation: {
            nextEl: ".coffeeSwiper .swiper-button-next",
            prevEl: ".coffeeSwiper .swiper-button-prev"
        },
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 20 },
            481: { slidesPerView: 2, spaceBetween: 25 },
            769: { slidesPerView: 3, spaceBetween: 25 }
        }
    });
}

if (typeof AOS !== "undefined") AOS.init();