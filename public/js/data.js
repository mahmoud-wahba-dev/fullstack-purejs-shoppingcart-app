let productsDB = [
  {
    id: 1,
    title: "glasses item",
    size: "small",
    imageUrl: "imgs/products/glasses.jpg",
    qty: 1,
    price: 10,
  },
  {
    id: 2,
    title: "head phone item",
    size: "large",
    imageUrl: "imgs/products/headphone.jpg",
    qty: 1,
    price: 20,

  },
  {
    id: 3,
    title: "laptob item",
    size: "large",
    imageUrl: "imgs/products/laptob.jpg",
    qty: 1,
    price: 30,

  },
  {
    id: 4,
    title: "watch item",
    size: "medium",
    imageUrl: "imgs/products/watch.jpg",
    qty: 1,
    price: 40,

  },
];

localStorage.setItem("products", JSON.stringify(productsDB));
