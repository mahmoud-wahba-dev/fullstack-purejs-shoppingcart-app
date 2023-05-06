let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".no_products");
let price = document.getElementById("price");
let checkoutSec = document.getElementById("checkout_sec");


let totalPrice = 0;

function drawCartProductsUi(allProducts = []) {
  let localSrorageLength = JSON.parse(localStorage.getItem("productsInCart"))
    .length;

  if (localSrorageLength == 0) {
    console.log(0);
    noProductsDom.innerHTML = `Cart Is Empty Go To Products To Continue Shopping <div> <a class="products_page_anc" href="products.html"> Products </a> </div> `;
    price.innerHTML = 0
    checkoutSec.style.display = "none"
  }
  let products =
    JSON.parse(localStorage.getItem("productsInCart")) || allProducts;

  let productsUi = products.map((item) => {
    return `
              <div class="product_item">
              <img src="${item.imageUrl}" class="product_item_img" alt="" />
              <div class="product-item-desc">
                <h2>
                  ${item.title}
                </h2>
                <span>size : ${item.size} </span>
                <div> Quantity : ${item.qty} </div>
                <div> Price : ${item.price} </div>
              </div>
              <div class="product_item_actions">
                <button id="addCart" class="add_to_cart" onclick="removeItemFromCart(${item.id})">Remove from cart</button>
               </div>
            </div>
              
              `;
  });

  productsDom.innerHTML = productsUi;
  calculateTotalPrice();
}
drawCartProductsUi();

function removeItemFromCart(id) {
  let productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    let items = JSON.parse(productsInCart);
    let filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
    drawCartProductsUi(filteredItems);
    totalPrice = 0
    calculateTotalPrice();
  }
}

function calculateTotalPrice() {
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  productsInCart.forEach((item) => {
    totalPrice += item.qty * item.price;
    console.log(totalPrice, "z");
    price.innerHTML = totalPrice;
    // totalPrice +=item.price
    // console.log(totalPrice, "total");
  });
}
