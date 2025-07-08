document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((p) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<span>${p.name} - $${p.price.toFixed(2)}</span>
    <button data-id = ${p.id}>Add to cart</button>`;

    productList.appendChild(productDiv);
  });
  cartRender();
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productID = parseInt(e.target.getAttribute("data-id"));
      // console.log(productID);
      const product = products.find((p) => p.id === productID);
      addToCart(product);
    }
  });

  function addToCart(p) {
    cart.push(p);
    saveCart();
    cartRender();
  }
  function cartRender() {
    let totalPrice = 0;
    cartItems.innerHTML = "";
    if (cart.length) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((p, index) => {
        totalPrice += p.price;
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("product");
        cartItemDiv.innerHTML = `<span>${p.name} - $${p.price}</span>
        <button data-id = ${index} >Remove</button>
        `;
        cartItems.appendChild(cartItemDiv);
      });
      totalPriceDisplay.textContent = totalPrice;
    } else {
      cartItems.innerHTML = `<p id="empty-cart">Your cart is empty.</p>`;
      // emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
  }
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    saveCart();
    alert("Check out success");
    cartRender();
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = parseInt(e.target.getAttribute("data-id"));
      // console.log(productID);
      cart.splice(index, 1);
      // console.log(cart);
      saveCart();
      cartRender();
    }
  });
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
