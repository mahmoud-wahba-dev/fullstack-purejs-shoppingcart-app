// import { products } from "./products";

let product = JSON.parse(localStorage.getItem("products"));
let productId = localStorage.getItem("productId");
let itemDom = document.querySelector(".item_details");

var products;
fetch("http://127.0.0.1:4000/foods")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    logDataset();
  });

function logDataset() {
  // write code here
  let productDetails = products.find((item) => item._id == productId);

  itemDom.innerHTML = `
<img height="50px" src="${productDetails.image}" alt="">
<h2>  ${productDetails.name} </h2>
<h3>  ${productDetails.details} </h3>
<h2> Price ${productDetails.price} $ </h2>
`;
}
