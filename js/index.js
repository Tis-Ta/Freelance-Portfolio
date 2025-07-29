"use strict";

/* Make header-bar stick to top of screen once scrolled past the 'hero section' */

const headerFlex = document.querySelector(".header--flex");
const heroSection = document.querySelector(".hero-section");

const observerOptions = {
  root: null, // viewport
  threshold: 0.05, // trigger when any part is visible
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("sticky");
      headerFlex.classList.add("header-flex-sticky");
    } else {
      header.classList.remove("sticky");
      headerFlex.classList.remove("header-flex-sticky");
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(heroSection);

/* Change which section is highlighted in the nav-bar */

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-bar__item a");

  const observerOptions = {
    root: null,
    threshold: 0.25,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(
          `.nav-bar__item a[href="#${id}"]`
        );

        navLinks.forEach((link) => link.classList.remove("active"));

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

/* End the animation for the header once complete */

const header = document.querySelector(".header");

header.addEventListener("animationend", () => {
  header.classList.add("animate-end");
});

/* Nav-bar Event Listeners */

const hamburgerBtn = document.querySelector(".hamburger-btn");
const navBar = document.querySelector(".nav-bar");

hamburgerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navBar.classList.toggle("hamburger-btn__open");
  hamburgerBtn.classList.toggle("active");

  if (hamburgerBtn.getAttribute("aria-expanded") === "false") {
    hamburgerBtn.setAttribute("aria-expanded", "true");
  } else {
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (e) => {
  if (
    !navBar.classList.contains("hamburger-btn__open") ||
    e.target === navBar ||
    e.target === hamburgerBtn
  )
    return;

  navBar.classList.remove("hamburger-btn__open");
  hamburgerBtn.classList.remove("active");
  hamburgerBtn.setAttribute("aria-expanded", "false");
});

/* Change 'hero-section' depending on screen size */

const mediaQuery = window.matchMedia("(min-width: 1080px)");
const heroSectionBlock = document.querySelector(".hero-section__block");
const heroSectionLeftBlock = document.querySelector(".hero-section-left-block");

function handleScreenChange() {
  if (mediaQuery.matches) {
    heroSectionBlock.classList.add("hidden");
    heroSectionLeftBlock.classList.remove("hidden");
  } else {
    heroSectionLeftBlock.classList.add("hidden");
    heroSectionBlock.classList.remove("hidden");
  }
}
handleScreenChange();

mediaQuery.addEventListener("change", handleScreenChange);
