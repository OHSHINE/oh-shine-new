document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MOBILE NAVIGATION
  ========================= */

  const menuButton = document.querySelector(".menu-button");
  const mainNav = document.querySelector(".main-nav");

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
      mainNav.classList.toggle("open");

      const isOpen = mainNav.classList.contains("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     SMOOTH SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* =========================
     COLLECTION FILTER
  ========================= */

  const filterButtons = document.querySelectorAll(".filter-button");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      productCards.forEach((card) => {
        const cardCategory = card.dataset.category;

        if (
          selectedCategory === "all" ||
          selectedCategory === cardCategory
        ) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* =========================
     IMAGE SAFETY
  ========================= */

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.visibility = "hidden";
    });
  });

  /* =========================
     CURRENT YEAR
  ========================= */

  const yearElement = document.querySelector("[data-current-year]");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
