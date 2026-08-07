"use strict";
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/index.js";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/ScrollTrigger.js";

/* Make header-bar stick to top of screen once scrolled past the 'hero section' */

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

const headerFlex = document.querySelector(".header--flex");
const heroSection = document.querySelector(".hero-section-left-block");

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
          `.nav-bar__item a[href="#${id}"]`,
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

function gsapScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  /* return; */
  console.log("ewfuihphfewhufuhi");
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 10);

  /*   ScrollTrigger.defaults({ markers: true }); */

  const animatedElements = document.querySelectorAll(
    "[data-animate]:not([data-animate-group] [data-animate])",
  );

  animatedElements.forEach((el) => {
    const animationType = el.dataset.animate;
    const isReversible = el.hasAttribute("data-reversible");
    const addScrub = el.hasAttribute("data-scrub");
    let animationStyles = { opacity: 0, duration: 1, ease: "power3.out" };

    switch (animationType) {
      case "slide-up":
        animationStyles = { ...animationStyles, y: 150 };
        break;
      case "slide-down":
        animationStyles = { ...animationStyles, y: -150 };
        break;
      case "slide-left":
        animationStyles = { ...animationStyles, x: -150 };
        break;
      case "slide-right":
        animationStyles = { ...animationStyles, x: 150 };
        break;
      case "slide-up-fast":
        animationStyles = { ...animationStyles, y: 150, duration: 0.2 };
        break;
      case "slide-down-fast":
        animationStyles = { ...animationStyles, y: -150, duration: 0.2 };
        break;
      case "slide-left-fast":
        animationStyles = { ...animationStyles, x: -150, duration: 0.2 };
        break;
      case "slide-right-fast":
        animationStyles = { ...animationStyles, x: 150, duration: 0.2 };
        break;
      case "fade-in":
      default:
        animationStyles = { ...animationStyles, scale: 0.8, duration: 1 };
        break;
      case "scale-up":
        animationStyles = { ...animationStyles, scale: 0.85, duration: 1.5 };
        break;
      case "scale-down":
        gsap.from(el, {
          scale: 1.75,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          clearProps: "transform, opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
          },
        });
        return;
      case "shutter-left":
        animationStyles = {
          ...animationStyles,
          clipPath: "inset(0 100% 0 0)",
          opacity: 1,
          duration: 0.85,
        };
        break;
      case "shutter-horizontal":
        gsap.fromTo(
          el,
          { clipPath: "inset(0 50% 0 50%)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            duration: 0.75,
            ease: "power1.out",
            clearProps: "transform, opacity",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          },
        );
        return;
      case "shutter-vertical":
        gsap.fromTo(
          el,
          { clipPath: "inset(50% 0 50% 0)" },
          {
            clipPath: "inset(-10% -10% -10% -10%)",
            duration: 2.5,
            ease: "power2.out",
            clearProps: "transform, opacity",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
            },
          },
        );
        return;
    }

    gsap.from(el, {
      ...animationStyles,
      clearProps: "transform, opacity",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "top 45%",
        toggleActions: isReversible
          ? "play none none reverse"
          : "play none none none",
      },
    });
  });

  document.querySelectorAll("[data-animate-group]").forEach((group) => {
    const triggerStartPoint = group.dataset.animateStart || "top 70%";
    const hasStagger = group.dataset.animateStagger || "0";

    group.querySelectorAll("[data-animate]").forEach((el) => {
      const animationType = el.dataset.animate;
      let animationStyles = { opacity: 0, ease: "power3.out" };

      switch (animationType) {
        case "slide-left":
          animationStyles.x = -120;
          break;
        case "slide-right":
          animationStyles.x = 120;
          break;
        case "slide-up":
          animationStyles.y = 120;
          break;
        case "slide-down":
          animationStyles.y = -120;
          break;
      }

      gsap.set(el, animationStyles);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: group,
        start: triggerStartPoint,
      },
    });

    tl.to(group.querySelectorAll("[data-animate]"), {
      x: 0,
      y: 0,
      opacity: 1,
      ease: "power1.out",
      duration: 0.5,
      stagger: hasStagger,
    });
  });
}
gsapScrollAnimations();
