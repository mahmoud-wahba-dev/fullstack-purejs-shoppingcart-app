// define product
let productsDom = document.querySelector(".products");
let cartProductDom = document.querySelector(".carts_products div");
let cartProductMenu = document.querySelector(".carts_products");
let cartIconContainer = document.querySelector(".cart_icon_container");
let badgeDom = document.querySelector(".badge_notification");
let products = JSON.parse(localStorage.getItem("products"));

// diaplay products

let drawProductsUi;
(drawProductsUi = function (products = []) {
  let productsUi = products.map((item) => {
    return `
            <div class="product_item">
            <img src="${item.imageUrl}" class="product_item_img" alt="" />
            <div class="product-item-desc">
              <a onclick="saveItemData(${item.id})">
                ${item.title}
              </a>
              <span>size : ${item.size} </span>
              <div> Price : ${item.price} </div>
            </div>
            <div class="product_item_actions">
              <button  id="addCart" class="add_to_cart" onclick="addedToCart(${item.id})">Add to cart</button>
              <i class="fa-regular fa-heart favourite"></i>
            </div>
          </div>
            `;
  });

  productsDom.innerHTML = productsUi;
})(JSON.parse(localStorage.getItem("products")));

// check if there is item in localStorage
let addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

if (addedItem) {
  addedItem.map((item) => {
    cartProductDom.innerHTML += `<p>${item.title}</p>`;
  });
  badgeDom.style.display = "block";
  badgeDom.innerHTML = addedItem.length;
}

// add to cart
function addedToCart(id) {
  let product = products.find((item) => item.id == id);
  let isProductInCart = addedItem.some((i) => i.id == product.id);
  if (isProductInCart) {
    addedItem = addedItem.map((p) => {
      if (p.id == product.id) p.qty += 1;
        return p;
      
    });
  } else {
    addedItem.push(product);
  }

  cartProductDom.innerHTML = "";
  addedItem.forEach((item) => {
    cartProductDom.innerHTML += `<p>${item.title}   ${item.qty}  </p>`;
  });


  localStorage.setItem("productsInCart", JSON.stringify(addedItem));

  badgeDom.style.display = "block";
  let cartproductsLength = document.querySelectorAll(".carts_products div p");

  badgeDom.innerHTML = cartproductsLength.length;
}


// open popup cart menu
function openCartMenu() {
  if (cartProductDom.innerHTML != "") {
    cartProductMenu.classList.toggle("d-block");
  }
}
cartIconContainer.addEventListener("click", openCartMenu);

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cart_details.html";
}
let input = document.getElementById("search");
input.addEventListener("keyup", (e) => {
  search(e.target.value, JSON.parse(localStorage.getItem("products")));

  if (e.target.value.trim() == "") {
    drawProductsUi(products);
  }
});

// search function
function search(title, myArray) {
  let arr = myArray.filter((item) => item.title.indexOf(title) !== -1);
  drawProductsUi(arr);
}
