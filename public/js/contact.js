let nameInput = document.getElementById("name_input");
let phoneInput = document.getElementById("phone_input");
let emailInput = document.getElementById("email_input");
let textAreaInput = document.getElementById("text_area_input");
let contactForm = document.getElementById("contact_form");
let allInputs = document.querySelectorAll(".input_class");
let dvDebug = document.getElementById("dv_debug");
function setErrorFor(input, message) {
  let parentElement = input.parentElement;
  let errorMsg = parentElement.querySelector(".error_msg");
  errorMsg.innerText = message;
  errorMsg.classList.add("invalid-feedback");
  errorMsg.style.display = "block";
  input.classList.add("is-invalid");
}

function setSuccessFor(input) {
  let parentElement = input.parentElement;
  let errorMsg = parentElement.querySelector(".error_msg");
  errorMsg.innerText = "";

  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

function validateEmail(input) {
  let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (input.value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

function validatePhone(input) {
  let validRegex = /^01[0125][0-9]{8}$/;
  if (input.value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

contactForm.addEventListener("submit", (eo) => {
  eo.preventDefault();
  let error_occurred = false;
  //   validate name
  if (nameInput.value == "") {
    setErrorFor(nameInput, "The field is required");
    error_occurred = true;
  } else {
    setSuccessFor(nameInput);
  }
  //   validate name
  //   validate phone
  if (phoneInput.value == "") {
    setErrorFor(phoneInput, "The field is required");
    error_occurred = true;
  } else if (validatePhone(phoneInput) == false) {
    setErrorFor(phoneInput, "Not a valid syntax");
    error_occurred = true;
  } else {
    setSuccessFor(phoneInput);
  }
  //   validate phone
  //   validate email
  if (emailInput.value == "") {
    setErrorFor(emailInput, "The field is required");
    error_occurred = true;
  } else if (validateEmail(emailInput) == false) {
    setErrorFor(emailInput, "Not a valid syntax");
    error_occurred = true;
  } else {
    setSuccessFor(emailInput);
  }
  //   validate email
  //   validate textarea
  if (textAreaInput.value == "") {
    setErrorFor(textAreaInput, "The field is required");
    error_occurred = true;
  } else {
    setSuccessFor(textAreaInput);
  }
  //   validate textarea

  //   no error
  if (error_occurred == false) {
    console.log("no error");
    var toastLiveExample = document.getElementById("liveToast");
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
    sendMails()
  console.log("send mails1");


    allInputs.forEach((item) => {
      item.value = "";
      item.classList.remove("is-valid");
    });
  } else {
    console.log("error");
  }
});


 function sendMails() {
  console.log("send mails");
    let params = {
        name : nameInput.value,
        email_id : emailInput.value,
        phone : phoneInput.value,
        message : textAreaInput.value,

    }
    emailjs.send("service_68x1m1n","template_ybkpufp", params).then((res) => {
      console.log("success", res.status); 
      console.log(params);
    })
}