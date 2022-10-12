document.getElementById("btn").addEventListener("click", function () {
  alert("Thanks for filling out our form! Feedback Sent Successfully");
});

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
