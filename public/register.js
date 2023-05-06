let userName = document.querySelector("#user_name");
let email = document.querySelector("#email_input");
let password = document.querySelector("#password");

let registerBtn = document.querySelector("#sign_up_btn");

registerBtn.addEventListener("click", register);

function register(eo) {
    console.log("s");
  eo.preventDefault();
  if (userName.value == "" || email.value == "" || password.value == "") {
    alert("please fill missing data");
  } else {
    localStorage.setItem("username", userName.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }
}
