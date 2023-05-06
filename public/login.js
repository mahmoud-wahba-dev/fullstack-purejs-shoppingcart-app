let userName = document.querySelector("#user_name");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign_in_btn");

let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", login);

function login(eo) {
  eo.preventDefault();

  if (userName.value == "" || password.value == "") {
    alert("please fill missing data");
  } else {
    if (
      getUser &&
      getUser == userName.value &&
      getPassword &&
      getPassword == password.value
    ) {
      alert("true");

      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
    } else {
      alert("username or password is wrong");
    }
  }
}
