let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".no_products");
let price = document.getElementById("price");
let checkoutSec = document.getElementById("checkout_sec");
let checkoutForm = document.getElementById("checkout_form");
let totalPrice = 0;
let recipientName = document.getElementById("recipient_name");
let recipientEmail = document.getElementById("recipient_email");
let recipientPhone = document.getElementById("recipient_phone");
let locationDeliver = document.getElementById("location_deliver");
let container = document.querySelector(".container");
let cancelOrderBtn = document.getElementById("cancel_order_btn");

function drawCartProductsUi(allProducts = []) {
  let localSrorageLength = JSON.parse(localStorage.getItem("productsInCart"))
    .length;

  console.log(localSrorageLength);
  if (localSrorageLength == 0) {
    console.log(0);
    noProductsDom.innerHTML = `Cart Is Empty Go To Products To Continue Shopping <div> <a class="products_page_anc" href="products.html"> Products </a> </div> `;
    price.innerHTML = 0;
    checkoutSec.style.display = "none";
  }
  let products =
    JSON.parse(localStorage.getItem("productsInCart")) || allProducts;

  let productsUi = products.map((item) => {
    return `
              <div class="product_item">
              <img src="${item.image}" class="product_item_img" alt="" />
              <div class="product-item-desc">
                <h2>
                  ${item.name}
                </h2>
                <div> Quantity : ${item.qty} </div>
                <div> Price : ${item.price} </div>
              </div>
              <div class="product_item_actions">
                <button id="addCart" class="add_to_cart" onclick="removeItemFromCart('${item._id}')">Remove from cart</button>
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
    let filteredItems = items.filter((item) => item._id !== id);
    localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
    drawCartProductsUi(filteredItems);
    totalPrice = 0;
    calculateTotalPrice();
  }
}

function calculateTotalPrice() {
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  productsInCart.forEach((item) => {
    // totalPrice += item.qty * item.price;
    totalPrice += item.price;
    console.log(totalPrice, "z");
    price.innerHTML = totalPrice;
    // totalPrice +=item.price
    // console.log(totalPrice, "total");
  });
}

checkoutForm.addEventListener("submit", (eo) => {
  eo.preventDefault();
  let error_occurred = false;
  if (
    recipientName.value.trim() == "" ||
    recipientEmail.value.trim() == "" ||
    recipientPhone.value.trim() == "" ||
    locationDeliver.value.trim() == ""
  ) {
    console.log("error");
    error_occurred = true;
  }

  if (error_occurred == false) {
    console.log(" no error");
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

    fetch("http://127.0.0.1:4000/orders", {
      method: "POST",
      body: JSON.stringify({
        username: recipientName.value,
        email: recipientEmail.value,
        phone: recipientPhone.value,
        location: locationDeliver.value,
        orders: productsInCart,
        total: price.innerHTML,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          console.log(json, "truesssssssssss");
          let successModal = document.createElement("div");

          successModal.innerHTML = `
              <div class="modal fade" id="exModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Done</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="bg-success p-4 fw-bold rounded-5 text-center text-white">
                    Success Order <i class="px-4 fa-regular fa-thumbs-up fa-beat fa-2xl"></i>
                  </div>
                  </div>
                  </div>
                </div>
              </div>    `;
          container.prepend(successModal);
          let myModal = new bootstrap.Modal(document.getElementById("exModal"));
          cancelOrderBtn.click();
          myModal.show();
        } else {
          alert("error on sending order please try again");
        }
      });
  }
});
