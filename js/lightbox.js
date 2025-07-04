"use strict";

const worksImages = document.querySelectorAll(".works-section__image");
const overlay = document.querySelector(".overlay");
const modalContent = document.querySelector(".modal-content");
const textContent = document.querySelectorAll(".works-section__image-inner-text");
const closeButton = document.querySelector(".close-button");
const leftArrow = document.querySelector(".arrow-button.arrow-left");
const rightArrow = document.querySelector(".arrow-button.arrow-right");
let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  const modalImage = worksImages[currentIndex].cloneNode(true);   // Clone the clicked image for the modalContent
  const imageText = textContent[currentIndex];  

  imageText.classList.remove("hidden")
  modalContent.innerHTML = '';
  modalContent.appendChild(modalImage);
  modalContent.appendChild(imageText);
  modalImage.offsetWidth;

  setTimeout(() => {
    overlay.classList.add("active");
    document.body.classList.add("modal-active");

    updateArrows();
  }, 100);
}

function updateArrows() {
  if (currentIndex > 0) {                         // Left arrow: enabled if there's a previous image
    leftArrow.classList.remove("disabled");
  } else {
    leftArrow.classList.add("disabled");
  }
  
  if (currentIndex < worksImages.length - 1) {    // Right arrow: enabled if there's a next image
    rightArrow.classList.remove("disabled");
  } else {
    rightArrow.classList.add("disabled");
  }
}

function slideToImage(newIndex, direction) {
  if (newIndex < 0 || newIndex >= worksImages.length) return;
  
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const currentImg = modalContent.querySelector("img");
  const currentText = modalContent.querySelector("p");
  const newImg = worksImages[newIndex].cloneNode(true);
  const newText = textContent[newIndex];

  newText.classList.remove("hidden")

  if (!prefersReducedMotion) {
    newText.style.opacity = "0";
    newText.style.transition = "transform .4s ease, opacity 1s ease";
    newText.style.transform = direction === "right" ? "scale(1) translateX(150%)" : "scale(1) translateX(-150%)";
  
    newImg.style.opacity = "0";
    newImg.style.transition = "transform .4s ease, opacity .5s ease";
    newImg.style.transform = direction === "right" ? "scale(1) translateX(150%)" : "scale(1) translateX(-150%)";
  
    currentText.style.transition = "transform .4s ease, opacity .5s ease";
    currentText.style.transform = direction === "right" ? "scale(1) translateX(-150%)" : "scale(1) translateX(150%)";
  
    currentImg.style.transition = "transform .4s ease, opacity .5s ease";
    currentImg.style.transform = direction === "right" ? "scale(1) translateX(-150%)" : "scale(1) translateX(150%)";
    currentImg.style.opacity = "0";
  }
  
  modalContent.appendChild(newImg);
  modalContent.appendChild(newText);
  newImg.offsetWidth;

  newText.style.transform = "scale(1) translateX(0)";
  newText.style.opacity = "1";

  newImg.style.transform = "scale(1) translateX(0)";
  newImg.style.opacity = "1";

  currentText.style.transform = "none";
  currentText.remove();
  currentImg.remove();
  currentIndex = newIndex;
  updateArrows();

  modalContent.addEventListener("transitionend", () => {
    newImg.style.removeProperty("transform");
    newImg.style.removeProperty("transition");
    newText.style.removeProperty("transform");
    newText.style.removeProperty("transition");
    currentText.style.removeProperty("transform");
    currentText.style.removeProperty("transition");
  }, { once: true });
}

worksImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    openModal(index);
  });
});

leftArrow.addEventListener("click", (e) => {
  e.stopPropagation();

  if (currentIndex > 0) {
    slideToImage(currentIndex - 1, "left");
  }
});

rightArrow.addEventListener("click", (e) => {
  e.stopPropagation();

  if (currentIndex < worksImages.length - 1) {
    slideToImage(currentIndex + 1, "right");
  }
});

document.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("active")) return;
  
  if (e.key === "ArrowLeft") {
    if (currentIndex > 0) {
      slideToImage(currentIndex - 1, "left");
    }
  } else if (e.key === "ArrowRight") {
    if (currentIndex < worksImages.length - 1) {
      slideToImage(currentIndex + 1, "right");
    }
  } else if (e.key === "Escape") {
    closeModal();
  }
});
  
function closeModal() {
  overlay.classList.remove("active");

  setTimeout(() => {
    modalContent.innerHTML = '';
    document.body.classList.remove("modal-active");
  }, 250);
}

closeButton.addEventListener("click", () => closeModal());

overlay.addEventListener("click", () => closeModal());