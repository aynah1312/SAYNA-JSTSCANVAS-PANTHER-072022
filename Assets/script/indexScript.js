const pantherPlus = document.querySelector("#blackPanther-plus");
const princeAncre = document.getElementById("prince");

pantherPlus.addEventListener("click", function () {
  princeAncre.scrollIntoView({
    behavior: "smooth",
  });
});

const photo = document.getElementsByClassName("photo");

const titre = document.getElementsByClassName("titre");
const para = document.getElementsByClassName("para");

const conteneurDescr = document.getElementsByClassName("itemTxt");

const btnSuivant = document.querySelector(".chevron");

const urlCarrousel = "./json/carrousel.json";
fetch(urlCarrousel)
  .then((result) => result.json())
  .then((carrousel) => {
    drawCarrousel(carrousel);
  })
  .catch((err) => {
    console.log(`erreur de chargement de donné ${err}`);
  });

let i = 0;

function drawCarrousel(carrousel) {
  
  function animation() {
    for (let j = 0; j < conteneurDescr.length; j++) {
      conteneurDescr[j].classList.add("fade");
      setTimeout(function () {
        conteneurDescr[j].classList.remove("fade");
      }, 500);
    }
    for (let j = 0; j < photo.length; j++) {
      photo[j].classList.add("fade");
      setTimeout(function () {
        photo[j].classList.remove("fade");
      }, 500);
    }
  }
  
  function initialiseDescr(carrousel) {
    for (let j = 0; j < titre.length; j++) {
      titre[j].textContent = carrousel[j + i - 1].titre;
      para[j].textContent = carrousel[j + i - 1].description;
    }
  }

  function initialiseIllustration() {
    for (let j = 0; j < photo.length; j++) {
      photo[j].src = `./illustrations+Logo/Accueil/Pantherhome_slider_${
        j + i
      }.png`;
    }
  }
  
  function initialiseCarrousel(carrousel) {
    
    setTimeout(() => {
      initialiseIllustration();
    }, 400);
    setTimeout(() => {
      initialiseDescr(carrousel);
    }, 400);
    i++;
  }
  
  initialiseCarrousel(carrousel);

  btnSuivant.addEventListener("click", function () {
    if (i < carrousel.length - 2) {
      
      animation();
      initialiseCarrousel(carrousel);
    }
    
    else if (i <= carrousel.length - 2) {
      const long = carrousel.length;
      animation();
      initialiseDescr(carrousel);
      photo[0].src = `./illustration + Logo/1_Landing_page/Pantherhome_slider_${
        i + 1
      }.png`;
      photo[1].src = `./illustration + Logo/1_Landing_page/Pantherhome_slider_${long}.png`;
      photo[2].src = `./illustrations + Logo/1_Landing_page/Pantherhome_slider_${1}.png`;
      i++;
    } else if (i <= carrousel.length - 1) {
      const long = carrousel.length;
      animation();
      photo[0].src = `./illustration + Logo/1_Landing_page/Pantherhome_slider_${long}.png`;
      titre[0].textContent = carrousel[i].titre;
      para[0].textContent = carrousel[i].description;
      photo[1].src = `./illustrations + Logo/1_Landing_page/Pantherhome_slider_${1}.png`;
      titre[1].textContent = carrousel[0].titre;
      para[1].textContent = carrousel[0].description;
      photo[2].src = `./illustrations + Logo/1_Landing_page/Pantherhome_slider_${2}.png`;
      i++;
    } else {
      i = 0;
      animation();
      initialiseCarrousel(carrousel);
    }
  });
}

const btnConfirm = document.getElementById("btnConfirm");
const btnClose = document.getElementById("btnClose");
const overlay = document.querySelector(".overlay");

const validator = document.getElementsByClassName("validator");
const inputForm = document.getElementsByClassName("inputForm");

btnConfirm.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (
    inputForm[0].value === "" ||
    inputForm[1].value === "" ||
    inputForm[2].value === ""
  ) {
    if (inputForm[0].value === "") {
      validator[0].textContent = `Veuillez enter votre identité`;
    }
    if (inputForm[1].value === "") {
      validator[1].textContent = `Veuillez enter votre adresse email`;
    }
    if (inputForm[2].value === "") {
      validator[2].textContent = `Veuillez enter votre message`;
    }
  } else {
    for (let i = 0; i < inputForm.length; i++) {
      inputForm[i].value = ``;
      validator[i].textContent = ``;
    }
    ouvrirFenetre();
  }
});

function ouvrirFenetre() {
  overlay.style.display = "block";
}

btnClose.addEventListener("click", fermerFenetre);

function fermerFenetre() {
  overlay.style.display = "none";
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "../illustrations + Logo/logo_souris_BP2_blanc.png";

let mouseX = 320;
let mouseY = 80;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
let pressed = false;

img.onload = function () {
  canvas.addEventListener("mousemove", (evt) => {
    if (!pressed) {
      mouseX = evt.clientX - this.offsetLeft;
      mouseY = evt.clientY - this.offsetTop;
    }
  });

  function drawImageWithMouse() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, mouseX - img.width / 2, mouseY - img.height / 2);
    requestAnimationFrame(drawImageWithMouse);
  }
  drawImageWithMouse();

  canvas.addEventListener("click", () => {
    if (!pressed) {
      cancelAnimationFrame(drawImageWithMouse);
      mouseX = width / 3.3;
      mouseY = height / 2.7;
      pressed = true;
    }
  });

  canvas.addEventListener("mouseout", function () {
    requestAnimationFrame(drawImageWithMouse);
    pressed = false;
  });
};