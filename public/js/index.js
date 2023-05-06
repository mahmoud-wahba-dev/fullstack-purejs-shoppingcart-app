// function scroll top
let toTopBtn = document.getElementById("to_top_btn");
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    toTopBtn.style.opacity = 1;
  } else {
    toTopBtn.style.opacity = 0;
  }
};

// register page

let userInfo = document.querySelector("#user_info");
let  userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let logOut = document.querySelector("#log_out");



let registeredUser = localStorage.getItem("username");
  console.log(registeredUser);
if (registeredUser) {
  console.log("user existed");
  links.remove()
  userInfo.style.display = "flex"
  userDom.innerHTML = registeredUser
} else {
  console.log("msh fe");
}


// logOut.addEventListener("click",(eo) => {
//     localStorage.clear()
// })