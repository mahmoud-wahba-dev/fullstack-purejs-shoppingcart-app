// define product
let productsDom = document.querySelector(".products");
let cartProductDom = document.querySelector(".carts_products div");
let cartProductMenu = document.querySelector(".carts_products");
let cartIconContainer = document.querySelector(".cart_icon_container");
let badgeDom = document.querySelector(".badge_notification");
let imgModal = document.querySelector("#img_modal");
let imgCaption = document.querySelector("#img_caption");



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
  productsDom.innerHTML = "";
  prods.forEach((item) => {
    let box = `
                <div class="col-md-3" >
                <div class="card_container">
                  <div  class="img_container">
                    <img src="${item.image}" class="img-fluid" alt="" />
                  </div>
                  <div class="prod_details">
                    <div class="prod_title ">
                    <a onclick="saveItemData('${item._id}')"   class="fw-bold " >
                             ${item.name}
                    </a>
                    </div>
                    <p class="prod_desc">
                    ${item.details} 
                    </p>
                    <div class="price">
                    ${item.price} $
                    </div>
                    <div class="icons_wrapper">
                      <div data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showImgModal('${item.image}' , '${item.name}')" class="icon_container">
                        <i class="fa-solid fa-magnifying-glass prod_icon"></i>

 








                      </div>
                      <div onclick="addedToCart('${item._id}')" class="icon_container">
                        <i class="fa-solid fa-bag-shopping prod_icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
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
    cartProductDom.innerHTML += `<p class='fs_14 d-flex justify-content-between align-align-items-center'>${item.name}   <span> <img src='${item.image}' class="rounded-circle" width='50px' height='50px'  alt=""/> </span> </p>`;
  });
  badgeDom.style.display = "block";
  badgeDom.innerHTML = addedItem.length;
} else {
  badgeDom.style.display = "none";
  badgeDom.innerHTML = "";
}

// add to cart
function addedToCart(id) {
  let product = products.find((item) => item._id == id);

  let isProductInCart = addedItem.some((i) => i._id == product._id);
  console.log(isProductInCart, "isProductInCart");
  if (isProductInCart) {
    addedItem = addedItem.map((p) => {
      console.log("herezzzzzzzzzzzzz");
      if (p._id == product._id) {
        p.qty += 1;

      }
      return p;
    });
  } else {
    addedItem.push(product);
  }
  cartProductDom.innerHTML = "";
  addedItem.forEach((item) => {
    console.log(item , "ffffff");
    item.qty = 1;
    console.log(item , "after");

    cartProductDom.innerHTML += `<p class='fs_14 d-flex justify-content-between align-align-items-center'>${item.name}   <span> <img src='${item.image}' class="rounded-circle" width='50px' height='50px'  alt=""/> </span>   </p>`;
  });
  localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  badgeDom.style.display = "block";
  let cartproductsLength = document.querySelectorAll(".carts_products div p");
  badgeDom.innerHTML = cartproductsLength.length;
}

// open popup cart menu
cartIconContainer.addEventListener("click", (e) => {
  if (cartProductDom.innerHTML != "") {
    cartProductMenu.classList.toggle("d-block");
  }
});

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
  drawProductsUi(arr);
}

cartProductMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});


function showImgModal(img , namee) {
  console.log("img" , img);
  console.log("namee" , namee);
  imgModal.innerHTML = `

    <img class="img-fluid" src="${img}" />

  `;
  imgCaption.innerHTML =  namee;

}