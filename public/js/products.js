// define product
let productsDom = document.querySelector(".products");
let cartProductDom = document.querySelector(".carts_products div");
let cartProductMenu = document.querySelector(".carts_products");
let cartIconContainer = document.querySelector(".cart_icon_container");
let badgeDom = document.querySelector(".badge_notification");
var products;
fetch("http://127.0.0.1:4000/foods")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    logDataset();
  });

function logDataset() {
  // write code here
  drawProductsUi();
}

// diaplay products

function drawProductsUi(prods = products) {
  console.log("hello");
  console.log(prods, "inside draw prods");
  productsDom.innerHTML = "";

  prods.forEach((item) => {
    let box = `
            <div class="product_item">
            <img src="${item.image}" class="product_item_img" alt="" />
            <div class="product-item-desc">
              <a class="fw-bold" onclick="saveItemData('${item._id}')">
                ${item.name}
              </a>
              <div>Details : ${item.details} </div>
              <div class="fw-bold">Price : ${item.price} </div>
            </div>
            <div class="product_item_actions">
            <button onclick="addedToCart('${item._id}')" id="addCart" class="add_to_cart">Add to cart</button> 

            </div>
            <div>z  ${item._id} </div>
          </div>
            `;
    productsDom.innerHTML += box;
  });
}

//  check if there is item in localStorage
let addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];
console.log(addedItem);
if (addedItem.length > 0) {
  addedItem.map((item) => {
    cartProductDom.innerHTML += `<p>${item.name}</p>`;
  });
  console.log(addedItem.length);
  console.log("added item true");
  badgeDom.style.display = "block";
  badgeDom.innerHTML = addedItem.length;
} else {
  console.log(addedItem);
  console.log(addedItem.length);

  console.log("added item false");

  badgeDom.style.display = "none";
  badgeDom.innerHTML = "";
}

// add to cart
function addedToCart(id) {
  let product = products.find((item) => item._id == id);

  let isProductInCart = addedItem.some((i) => i._id == product._id);
  console.log(isProductInCart);
  if (isProductInCart) {
    addedItem = addedItem.map((p) => {
      if (p._id == product._id) p.qty += 1;
      return p;
    });
  } else {
    addedItem.push(product);
  }
  cartProductDom.innerHTML = "";
  addedItem.forEach((item) => {
    cartProductDom.innerHTML += `<p>${item.name}   </p>`;
  });
  localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  badgeDom.style.display = "block";
  let cartproductsLength = document.querySelectorAll(".carts_products div p");
  badgeDom.innerHTML = cartproductsLength.length;
}

// open popup cart menu
cartIconContainer.addEventListener("click", openCartMenu);
function openCartMenu() {
  if (cartProductDom.innerHTML != "") {
    cartProductMenu.classList.toggle("d-block");
  }
}

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cart_details.html";
}
let input = document.getElementById("search");
input.addEventListener("keyup", (e) => {
  search(e.target.value.toLowerCase().trim());

  if (e.target.value.trim() == "") {
    drawProductsUi();
  }
});

// search function
function search(name) {
  let arr = products.filter(
    (item) => item.name.toLowerCase().indexOf(name) !== -1
  );
  console.log(arr);
  drawProductsUi(arr);
}

// export { products };
