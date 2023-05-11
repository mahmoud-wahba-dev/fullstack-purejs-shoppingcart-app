let userName = document.querySelector("#user_name");
let email = document.querySelector("#email_input");
let password = document.querySelector("#password");
let dvDebug = document.querySelector("#dv_debug");
let registerBtn = document.querySelector("#sign_up_btn");
var toast = new bootstrap.Toast(dvDebug);

function validateEmail(input) {
  let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (input.value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

registerBtn.addEventListener("click", register);

function register(eo) {
  eo.preventDefault();

  if (userName.value == "" || password.value == "" || email.value == "") {
    toast.show();
    dvDebug.innerHTML = "please fill missing data";
  } else if (validateEmail(email) == false) {
    dvDebug.innerHTML = "Not valid syntax for Email";
    toast.show();

  } else {
    checkUserData();
  }
}

async function checkUserData() {
  let response = await fetch("http://127.0.0.1:4000/users/register", {
    method: "POST",
    body: JSON.stringify({
      username: userName.value,
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
    dvDebug.classList.add("bg-success", "text-white")
    // localStorage.setItem("userToken" , data.token);
    toast.show();

    setTimeout(() => {
        window.location.href = "login.html"
    }, 2000);
  }else {
    dvDebug.innerHTML = data.message
    toast.show();
  }
}
