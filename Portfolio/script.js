
document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // 1. ACTIVE NAVIGATION ON SCROLL
  // ========================================

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#nav-links a");

  function setActive(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
    });
  }

  function updateActiveSection() {
    if (!sections.length) return;

    const scrollPosition = window.scrollY + window.innerHeight * 0.35;
    const documentHeight = document.documentElement.scrollHeight;
    let currentId = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentId = section.id;
      }
    });

    // Highlight Contact when the visitor reaches the bottom.
    if (
      window.innerHeight + window.scrollY >=
      documentHeight - 5
    ) {
      currentId = "contact";
    }

    setActive(currentId);
  }

  window.addEventListener("scroll", updateActiveSection, {
    passive: true
  });

  window.addEventListener("resize", updateActiveSection);


  // ========================================
  // 2. HAMBURGER MENU
  // ========================================

  const hamburger = document.getElementById("hamburger");
  const navLinksBox = document.getElementById("nav-links");

  function closeMenu() {
    if (navLinksBox) {
      navLinksBox.classList.remove("open");
    }

    if (hamburger) {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");
    }
  }

  if (hamburger && navLinksBox) {
    hamburger.setAttribute("aria-expanded", "false");

    hamburger.addEventListener("click", () => {
      const isOpen = navLinksBox.classList.toggle("open");

      hamburger.setAttribute("aria-expanded", String(isOpen));
      hamburger.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    navLinksBox.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
      if (
        navLinksBox.classList.contains("open") &&
        !navLinksBox.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Close the mobile menu when returning to desktop layout.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }


  // ========================================
  // 3. PROJECT READ MORE / READ LESS
  // ========================================

  const readMoreBtns = document.querySelectorAll(".read-more");

  readMoreBtns.forEach((button) => {
    const projectBox = button.closest(".project-box");

    if (!projectBox) return;

    const fullText = projectBox.querySelector(".full-text");

    if (!fullText) return;

    // Start with the extended description hidden.
    fullText.style.display = "none";

    button.textContent = "Read More";
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const isExpanded =
        button.getAttribute("aria-expanded") === "true";

      fullText.style.display = isExpanded ? "none" : "block";

      button.textContent = isExpanded ? "Read More" : "Read Less";
      button.setAttribute("aria-expanded", String(!isExpanded));
    });
  });


  // ========================================
  // 4. DARK / LIGHT THEME TOGGLE
  // ========================================

  const toggleBtn = document.getElementById("theme-toggle");

  if (toggleBtn) {
    function updateThemeButton() {
      const isLight = document.body.classList.contains("light");

      toggleBtn.textContent = isLight ? "☀️" : "🌙";
      toggleBtn.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
      toggleBtn.setAttribute("aria-pressed", String(isLight));
    }

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      updateThemeButton();
    });

    updateThemeButton();
  }


  // ========================================
  // 5. INITIALIZE ACTIVE NAVIGATION
  // ========================================

  updateActiveSection();
});


function toggleProjectDetails(button) {
    const card = button.closest(".project-box");
    const details = card.querySelector(".project-details");
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    details.hidden = isExpanded;
    button.setAttribute("aria-expanded", String(!isExpanded));

    button.innerHTML = isExpanded
        ? 'View Details <i class="bx bx-chevron-down"></i>'
        : 'Hide Details <i class="bx bx-chevron-up"></i>';
}


