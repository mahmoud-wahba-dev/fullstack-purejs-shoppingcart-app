let noOfOrders = document.getElementById("no_of_orders");
let noOfProds = document.getElementById("no_of_prods");
let noOfUsers = document.getElementById("no_of_users");

let orders;
let products;
let users;

let tBody = document.getElementById("tBody");
let productsTBody = document.getElementById("productsTBody");
let usersTBody = document.getElementById("usersTBody");

let productBtn = document.querySelectorAll(".product_btn");
let ordersBtn = document.querySelectorAll(".orders_btn");
let usersBtn = document.querySelectorAll(".users_btn");


let ordersTableContainer = document.getElementById("orders_table_container");
let producTableContainer = document.getElementById("product_table_container");
let usersTableContainer = document.getElementById("users_table_container");

window.addEventListener("DOMContentLoaded", function () {
  fetchOrdersNumber();
  fetchProdsNumber();
  fetchUsersNumber();
});

async function fetchOrdersNumber() {
  let response = await fetch("http://127.0.0.1:4000/orders");
  let data = await response.json();
  let ordersLength = data.length;
  noOfOrders.innerHTML = ordersLength;
}

async function fetchProdsNumber() {
  let response = await fetch("http://127.0.0.1:4000/foods");
  let data = await response.json();
  let prodsLength = data.length;
  noOfProds.innerHTML = prodsLength;
}
async function fetchUsersNumber() {
  let response = await fetch("http://127.0.0.1:4000/users/count-users");
  let data = await response.json();
  let usersLength = data.message;
  noOfUsers.innerHTML = usersLength;
}
// ----------------

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


async function fetchUsers() {
  let response = await fetch("http://127.0.0.1:4000/users/users-all");
  let data = await response.json();
  users = data;
  console.log(users , "users");
  drawUsers();
}
// ----------------

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


function drawUsers() {
  users.forEach((item, index) => {
    usersTBody.innerHTML += `
                          <tr>
                          <th scope="row"> ${index + 1} </th>
                          <td> ${item.username} </td>
                          <td> ${item.email} </td>
                          <td> ${item.createdAt} </td>
                          </tr>
                          `;
  });
}

// ----------------

ordersBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    producTableContainer.style.display = "none";
    ordersTableContainer.style.display = "block";
    fetchOrders();
  });
})



productBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    ordersTableContainer.style.display = "none";
    producTableContainer.style.display = "block";
    fetchProducts();
  });
})




usersBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    ordersTableContainer.style.display = "none";
    producTableContainer.style.display = "none";
    usersTableContainer.style.display = "block";
    fetchUsers();
  });
})






