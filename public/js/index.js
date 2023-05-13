// function scroll top
let toTopBtn = document.getElementById("to_top_btn");
let dashboardIcon = document.getElementById("dashboard_icon");


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
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let log_out = document.querySelector("#log_out");

// check if user already login from last time
let userToken = localStorage.getItem("userToken");
document.addEventListener("DOMContentLoaded" , function () {
  if (userToken) {
    links.remove();
    userInfo.style.display = "flex";
    showUserName();
  } else {
    userInfo.remove();
  }
})

function showUserName() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:4000/users/profile", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      userDom.innerHTML = result.username;


      log_out.addEventListener("click", () => {
          localStorage.removeItem("userToken");
          window.location.href = "index.html";
        });


      if (result.isAdmin == "true") {
          dashboardIcon.style.display = "flex";

      }else{

        let path = window.location.pathname.substring(1);
        if (path == "dashboard.html") {
          document.write(` <h1> Not Authorized </h1> `)
          window.location.href = "index.html"
        }
      }



    })
}



// enable bbotstrap pop over 
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})