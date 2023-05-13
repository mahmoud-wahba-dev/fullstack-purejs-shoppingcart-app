let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign_in_btn");
let dvDebug = document.querySelector("#dv_debug");
var toast = new bootstrap.Toast(dvDebug);

loginBtn.addEventListener("click", login);

function login(eo) {
  eo.preventDefault();

  if (email.value == "" || password.value == "") {
    toast.show();
    dvDebug.innerHTML = "please fill missing data";
  } else {
    checkUserData();
  }
}

async function checkUserData() {
  let response = await fetch("http://127.0.0.1:4000/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let data = await response.json();
  if (data.username) {
    dvDebug.innerHTML = "Success";
    dvDebug.classList.add("bg-success", "text-white");
    localStorage.setItem("userToken", data.token);

    setTimeout(() => {
      window.location.href = "products.html";
    }, 2000);
  } else {
    dvDebug.innerHTML = data.message;
    toast.show();
  }
}

// check if user already login from last time
// let userToken = localStorage.getItem("userToken")
window.onload = function () {
  if (userToken) {
    window.location = "index.html";
  }
};
