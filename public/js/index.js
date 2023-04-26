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
