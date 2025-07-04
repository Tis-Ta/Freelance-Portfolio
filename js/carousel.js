"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.testimonials-carousel');
  const allBlocks = document.querySelectorAll('.testimonials-block');
  const dots = Array.from(document.querySelectorAll('.dot')); 
  const totalDisplayedBlocks = allBlocks.length; 
  let blocksPerSlide = 1;
  let currentSlide = 0;
  let isDragging = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let dragStartTime = 0;
  let totalSlides;

  // Calculate current block width (each slide element, including buffer, has same width) / container.clientWidth is the full width of the container
  const getBlockWidth = () => container.clientWidth / blocksPerSlide;

  function setInitialScroll() {
    container.scrollLeft = getBlockWidth();
  }

  function updateResponsiveSettings() {
    const width = window.innerWidth;
    
    if (width >= 1180) {
      blocksPerSlide = 3;
    } else if (width >= 780) {
      blocksPerSlide = 2;
    } else {
      blocksPerSlide = 1;
    }
    
    totalSlides = totalDisplayedBlocks - blocksPerSlide + 1;
    
    // Update dots, show only totalSlides dots
    dots.forEach((dot, i) => {
      if (i < totalSlides) {
        dot.style.display = 'inline-block';
        dot.setAttribute('data-index', i);
      } else {
        dot.style.display = 'none';
      }
    });
  }

  updateResponsiveSettings();
  setInitialScroll();

  // When a dot is clicked, scroll to the correct block:
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      const blockWidth = getBlockWidth();

      container.scrollTo({
        left: blockWidth * (index + 1),
        behavior: "smooth"
      });

      currentSlide = index;
      updateActiveSlide(currentSlide);
    });
  });

  function updateActiveSlide(index) {
    dots.forEach(dot => dot.classList.remove('active'));

    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }

  // Drag functions for both touch and mouse:
  function startDrag(x) {
    isDragging = true;
    dragStartTime = Date.now();
    startX = x;
    scrollLeftStart = container.scrollLeft;
    container.style.scrollBehavior = 'auto';
  }

  function duringDrag(x) {
    if (!isDragging) return;

    const walk = (x - startX);

    container.scrollLeft = scrollLeftStart - walk;
  }

  function endDrag(x) {
    if (!isDragging) return;

    const dragTime = Date.now() - dragStartTime;
    const dragDistance = x - startX;
    const blockWidth = getBlockWidth();
    let slideIndex = container.scrollLeft / blockWidth;
    
    // The first real block starts at position index 1 (due to the buffer)
    if (dragTime < 200 && Math.abs(dragDistance) > 20) {
      
      if (dragDistance < 0 && currentSlide < totalSlides - 1) {
        currentSlide++;
      } else if (dragDistance > 0 && currentSlide > 0) {
        currentSlide--;
      }
      
    } else {
      currentSlide = Math.round(slideIndex) - 1;
      currentSlide = Math.max(0, Math.min(currentSlide, totalSlides - 1));
    }

    container.style.scrollBehavior = 'smooth';

    container.scrollTo({
      left: blockWidth * (currentSlide + 1),
      behavior: 'smooth'
    });

    updateActiveSlide(currentSlide);
    isDragging = false;
  }

  // Touch events
  container.addEventListener('touchstart', (e) => {
    startDrag(e.touches[0].clientX);
  }, { passive: true }
  );

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    e.preventDefault();
    duringDrag(e.touches[0].clientX);
  }, { passive: false }
  );

  window.addEventListener('touchend', (e) => {
    endDrag(e.changedTouches[0].clientX);
  });

  // Mouse events
  function onMouseMove(e) {
    duringDrag(e.pageX - container.offsetLeft);
  }

  function onMouseUp(e) {
    endDrag(e.pageX - container.offsetLeft);
    
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  container.addEventListener('mousedown', (e) => {
    startDrag(e.pageX - container.offsetLeft);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  window.addEventListener("resize", () => {
    const blockWidth = getBlockWidth();

    updateResponsiveSettings();

    container.style.scrollBehavior = "auto";
    container.scrollLeft = blockWidth * (currentSlide + 1); 
  });

  updateActiveSlide(currentSlide);
});