document.addEventListener("DOMContentLoaded", function () {
  // Data Menu (sama dengan versi asli)
  const menuItems = [
    {
      id: 1,
      name: "Pizza totoro",
      price: 100000,
      category: "food",
      desc: "Pizza lezat dengan saus tomat segar dan keju meleleh, dihias dengan karakter Totoro yang menggemaskan.",
      image: "../assets/assets/pizza.jpeg",
      tag: "special",
    },
    {
      id: 2,
      name: "Milkshake",
      price: 15000,
      category: "drinks",
      desc: "Susu kocok yang creamy dan lezat, terinspirasi dari studio Ghibli dengan hiasan karakter-karakter lucu.",
      image: "../assets/assets/milkshake.jpg",
      tag: "spirited",
    },
    {
      id: 3,
      name: "Ghibli Dessert",
      price: 40000,
      category: "desserts",
      desc: "Makanan penutup yang terinspirasi dari film Studio Ghibli, dengan cita rasa manis yang menggugah selera.",
      image: "../assets/assets/desert.jpg",
      tag: "special",
    },
    {
      id: 4,
      name: "Ghibli Birthday Cake",
      price: 115000,
      category: "food",
      desc: "Kue ulang tahun yang terinspirasi dari film Studio Ghibli, dengan hiasan karakter-karakter lucu.",
      image: "../assets/assets/cake-birthday.jpg",
      tag: "sweet",
    },
    {
      id: 5,
      name: "Matcha totoro",
      price: 25000,
      category: "drinks",
      desc: "teh hijau khas Jepang yang disajikan dengan hiasan Totoro",
      image: "../assets/assets/macha-totoro.jpg",
      tag: "spirited",
    },
    {
      id: 6,
      name: "Cloud cake",
      price: 50000,
      category: "desserts",
      desc: "Kue lembut yang terinspirasi dari awan, dengan bentuk dari karakter Studio Ghibli yang lucu.",
      image: "../assets/assets/cake-flufy.jpg",
      tag: "special",
    },
  ];

  // Keranjang Belanja
  let cart = [];
  const menuContainer = document.querySelector(".menu-items");
  const cartContainer = document.querySelector(".cart-items");
  const totalDisplay = document.getElementById("total-price");
  const orderBtn = document.querySelector(".place-order-btn");

  // Tampilkan Menu
  function showMenu() {
    menuContainer.innerHTML = "";

    menuItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "menu-item";
      itemElement.innerHTML = `
        <div class="item-image" style="background-image: url('${
          item.image
        }')"></div>
        <div class="item-details">
          <div class="item-header">
            <span class="item-name">${item.name}</span>
            <span class="item-price">Rp${item.price.toLocaleString()}</span>
          </div>
          <p class="item-desc">${item.desc}</p>
          <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        </div>
      `;
      menuContainer.appendChild(itemElement);
    });

    // tombol add to cart
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", function () {
        addToCart(parseInt(this.getAttribute("data-id")));
      });
    });
  }
  // Tambahkan ke Keranjang
  function addToCart(itemId) {
    const item = menuItems.find((i) => i.id === itemId);
    const existingItem = cart.find((i) => i.id === itemId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        ...item,
        quantity: 1,
      });
    }

    updateCart();
  }

  // Update Keranjang
  function updateCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-quantity">
          <button class="quantity-btn decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.id}">+</button>
        </div>
        <div class="cart-item-price">Rp${itemTotal.toLocaleString()}</div>
      `;
      cartContainer.appendChild(cartItem);
    });

    // Event listener untuk tombol quantity
    document.querySelectorAll(".quantity-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        const isIncrease = this.classList.contains("increase");
        updateQuantity(id, isIncrease);
      });
    });

    totalDisplay.textContent = `Rp${total.toLocaleString()}`;
    orderBtn.disabled = cart.length === 0;
  }

  // Update Quantity
  function updateQuantity(itemId, isIncrease) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      if (isIncrease) {
        cart[itemIndex].quantity++;
      } else {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity <= 0) {
          cart.splice(itemIndex, 1);
        }
      }
      updateCart();
    }
  }

  // Place Order
  orderBtn.addEventListener("click", function () {
    if (cart.length === 0) return;

    alert(
      `Order placed! Total: Rp${cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toLocaleString()}`
    );
    cart = [];
    updateCart();
  });

  // Inisialisasi
  showMenu();
});
