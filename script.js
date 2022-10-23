let toggleButton = document.getElementById("burger");
let navigation = document.getElementById("nav");
toggleButton.addEventListener("click", function () {
  navigation.classList.toggle("navigation-active");
  toggleButton.classList.toggle("li-active");
});
// slider
let data = [
  {
    id: 1,
    imageurl: "./images/slick2.jpg",
    title: " ",
    url: "",
  },
  {
    id: 2,
    imageurl: "./images/slick3.jpg",
    title: " ",
    url: "",
  },
  {
    id: 3,
    imageurl: "./images/slick4.jpg",
    title: " ",
    url: "",
  },
];

const arrowleft = document.getElementById("arrow-left");
const arrowright = document.getElementById("arrow-right");
const slidercontent = document.getElementById("slider-content");
let dotselement = document.getElementsByClassName("dots");
let sliderindex = 0;

//create a tag
function createatagslider(item) {
  const atagelement = document.createElement("a");
  atagelement.setAttribute("href", item.url);
  atagelement.classList.add("slide");
  return atagelement;
}

// create img
function createimgtagslider(item) {
  // const tagimage = document.createElement("img");
  const tagimage = document.createElement("div");
  tagimage.style.backgroundImage = `url('${item.imageurl}')`;
  tagimage.classList.add("slide-bg");
  // tagimage.setAttribute("src", item.imageurl);
  // tagimage.setAttribute("alt", item.title);
  return tagimage;
}
// create title tag
function createh2tagslider(item) {
  let tagtitle = document.createElement("h2");
  tagtitle.classList.add("title");
  tagtitle.innerText = item.title;
  return tagtitle;
}
// create dots
function createdots(item) {
  const dotsparent = document.createElement("div");
  dotsparent.classList.add("dotsparent");
  data.forEach((element) => {
    const dots = document.createElement("div");
    dots.classList.add("dots");
    dots.setAttribute("data-id", element.id - 1);

    dots.addEventListener("click", function (event) {
      console.log(event.target);
      let id = event.target.getAttribute("data-id");

      sliderindex = id;
      setslide();
    });
    dotsparent.appendChild(dots);
  });
  return dotsparent;
}
function setslide() {
  slidercontent.innerHTML = "";
  const slideitem = createatagslider(data[sliderindex]);
  const imgtag = createimgtagslider(data[sliderindex]);
  const h2tag = createh2tagslider(data[sliderindex]);
  const dots = createdots();
  slideitem.appendChild(imgtag);
  slideitem.appendChild(h2tag);
  slidercontent.appendChild(slideitem);
  slidercontent.appendChild(dots);
  currentdotsactive();
}
//add active class on dots and styles
function currentdotsactive() {
  dotselement[sliderindex].classList.add("active");
}
//events on arrows
function arrowLeftClick() {
  if (sliderindex == 0) {
    sliderindex = data.length - 1;
    setslide();
    return;
  }
  // sliderIndex-=1;
  sliderindex--;
  setslide();
}

function arrowRightCLick() {
  if (sliderindex == data.length - 1) {
    sliderindex = 0;
    setslide();
    return;
  }
  // sliderIndex +=1;
  sliderindex++;
  setslide();
}
arrowleft.addEventListener("click", arrowLeftClick);
arrowright.addEventListener("click", arrowRightCLick);

// setInterval(() => {
//   arrowrightclick;
// }, 3000);
setslide();
/*FORM VALIDATION*/
const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");

const form = document.querySelector("#signup");

const checkUsername = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);
//Listen for click events
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element isn't our show password checkbox, bail
    if (event.target.id !== "show_password") return;

    // Get the password field
    var password = document.querySelector("#password");
    if (!password) return;

    // Check if the password should be shown or hidden
    if (event.target.checked) {
      // Show the password
      password.type = "text";
    } else {
      // Hide the password
      password.type = "password";
    }
  },
  false
);
// accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
//cookies
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 30);
    }
  }
}
//სერვერიდან ინფორმაცია - (get, post, delete methods) - axios an xml an fetch , WILL DELETE AFTER THE CERTIFICATE ))

let postBlock = document.getElementById("post-block");
let overlay = document.getElementById("overlay");
let postContent = document.getElementById("postcontent");
let closePopup = document.getElementById("close");
let addPost = document.getElementById("add");
let postOverlayAdd = document.getElementById("postForm");
let formApi = document.getElementById("addPostForm");
let input = document.getElementById("posttitle");

function ajax(url, callback) {
  let requistAjax = new XMLHttpRequest();
  requistAjax.open("GET", url);
  requistAjax.addEventListener("load", function () {
    let getData = JSON.parse(requistAjax.responseText);
    callback(getData);
  });

  requistAjax.send();
}
function createPost(item) {
  let divTag = document.createElement("div");
  divTag.classList.add("posts");
  divTag.setAttribute("data-id", item.id);

  let postId = document.createElement("h2");
  postId.innerText = item.id;

  let postTitle = document.createElement("h3");
  postTitle.innerText = item.title;

  let deleteButton = document.createElement("i");
  deleteButton.classList.add("fa-solid", "fa-trash");
  deleteButton.setAttribute("data-id", item.id);
  divTag.appendChild(postId);
  divTag.appendChild(postTitle);
  divTag.appendChild(deleteButton);

  divTag.addEventListener("click", function (event) {
    let id = event.target.getAttribute("data-id");
    overlay.classList.add("active");
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function (getData) {
      overflayFunction(getData);
    });
  });

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    let id = event.target.getAttribute("data-id");
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
      method: "DELETE",
    }).then(() => divTag.remove());
  });

  postBlock.appendChild(divTag);
}

ajax("https://jsonplaceholder.typicode.com/posts", function (getData) {
  getData.forEach((item) => {
    createPost(item);
  });
});

function overflayFunction(item) {
  let postDescription = document.createElement("p");
  postDescription.innerText = item.body;
  postDescription.classList.add("postis-teksti");

  postContent.appendChild(postDescription);
}

closePopup.addEventListener("click", function () {
  overlay.classList.remove("active");
  postContent.innerHTML = "";
});

addPost.addEventListener("click", function () {
  postOverlayAdd.classList.add("addActive");
  input.value = "";
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let formData = {
    title: event.target[0].value,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((post) => {
      postOverlayAdd.classList.remove("addActive");
      createPost(post);
    });
});
