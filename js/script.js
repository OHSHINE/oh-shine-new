/* =========================================
   OH SHINE — WEBSITE INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- MOBILE NAVIGATION ---------- */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuButton.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuButton.classList.remove("active");
      });
    });
  }


  /* ---------- SMOOTH CATEGORY NAVIGATION ---------- */

  document.querySelectorAll("[data-scroll]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      const target = document.querySelector(
        button.getAttribute("data-scroll")
      );

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* ---------- PRODUCT IMAGE LIGHTBOX ---------- */

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");

  document.querySelectorAll(".product-image img").forEach(image => {
    image.addEventListener("click", () => {

      if (!lightbox || !lightboxImage) return;

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt || "OH SHINE jewellery";

      lightbox.classList.add("open");
      document.body.classList.add("lightbox-open");
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
  }


  /* ---------- COLLECTION FILTER ---------- */

  const filterButtons = document.querySelectorAll("[data-filter]");
  const productCards = document.querySelectorAll("[data-category]");

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const selected = button.dataset.filter;

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      productCards.forEach(card => {

        const category = card.dataset.category;

        if (selected === "all" || category === selected) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }

      });

    });

  });


  /* ---------- SCROLL REVEAL ---------- */

  const revealElements = document.querySelectorAll(
    ".section, .category-card, .product-card, .story-inner"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.08
      }
    );

    revealElements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* ---------- CURRENT YEAR ---------- */

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  /* ---------- CLOSE MOBILE MENU WHEN RESIZING ---------- */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 600 && nav) {
      nav.classList.remove("active");

      if (menuButton) {
        menuButton.classList.remove("active");
      }
    }

  });

});
