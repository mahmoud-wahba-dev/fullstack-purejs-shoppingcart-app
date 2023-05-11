let orders;
let products;
let tBody = document.getElementById("tBody");
let productsTBody = document.getElementById("productsTBody");

let productBtn = document.getElementById("product_btn");
let ordersBtn = document.getElementById("orders_btn");
let ordersTableContainer = document.getElementById("orders_table_container");
let producTableContainer = document.getElementById("product_table_container");



window.onload =function(){
    fetchOrders();
}
async function fetchOrders() {
  let response = await fetch("http://127.0.0.1:4000/orders");
  let data = await response.json();
  orders = data;
  drawOrders();
}

async function fetchProducts() {
  let response = await fetch("http://127.0.0.1:4000/foods");
  let data = await response.json();
  products = data;
  drawProducts();
}

function drawOrders() {
  orders.forEach((item, index) => {
    let date = new Date(item.createdAt);
    let itemDate = date.toUTCString();

    tBody.innerHTML += `
                        <tr>
                        <th scope="row"> ${index + 1} </th>
                        <td> ${item.username} </td>
                        <td> ${item.email} </td>
                        <td> ${item.phone} </td>
                        <td > <div class="img_order_container">  
                        
                        ${item.orders
                          .map(
                            (prod) =>
                              ` <div class="m-2 border border-2 border-primary rounded-circle"> <img class="img_order" src="${prod.image}"/> </div> `
                          )
                          .join("")}
                        </div>  </td>
                        <td> ${item.total} </td>
                        <td> ${item.location} </td>
                        <td> ${itemDate} </td>
                      
                        </tr>

                        `;
  });
}

function drawProducts() {
  products.forEach((item, index) => {
    productsTBody.innerHTML += `
                          <tr>
                          <th scope="row"> ${index + 1} </th>
                          <td ><img src="${
                            item.image
                          }" class="img_order"  />  </td>
                          <td> ${item.name} </td>
                          <td> ${item.details} </td>
                          <td> ${item.category} </td>
                          <td> ${item.price} </td>
                          </tr>
                          `;
  });
}

ordersBtn.addEventListener("click", (e) => {
  producTableContainer.style.display = "none";
  ordersTableContainer.style.display = "block";
  fetchOrders();
});
productBtn.addEventListener("click", (e) => {
  ordersTableContainer.style.display = "none";
  producTableContainer.style.display = "block";
  fetchProducts();
});
