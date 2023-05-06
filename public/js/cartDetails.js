let product = JSON.parse(localStorage.getItem("products"));
let productId = localStorage.getItem("productId");
let itemDom = document.querySelector(".item_details");

let productDetails = product.find((item) => item.id == productId);

itemDom.innerHTML = `
<img src="${productDetails.imageUrl}" alt="">
<h2>  ${productDetails.title} </h2>
<h2> size ${productDetails.size} </h2>
`;


