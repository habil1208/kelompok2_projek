document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        hamburger.classList.remove("active");
        nav.classList.remove("active");

        // Calculate position to scroll to
        const headerHeight =
          document.querySelector(".ghibli-header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Highlight active section in navigation
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const headerHeight = document.querySelector(".ghibli-header").offsetHeight;

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 50;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".main-nav a").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = this.elements[0].value;
      const email = this.elements[1].value;
      const message = this.elements[2].value;

      // Simple validation
      if (name && email && message) {
        alert(
          `Thank you, ${name}! Your message has been sent. We'll get back to you soon.`
        );
        this.reset();
      } else {
        alert("Please fill in all fields.");
      }
    });
  }

  // Animate elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".menu-item, .character, .hours-info"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  document
    .querySelectorAll(".menu-item, .character, .hours-info")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load
});
// Di file JavaScript Anda
document.addEventListener("DOMContentLoaded", function () {
  const profileButton = document.querySelector(".profile-button");
  const profileModal = document.createElement("div");
  profileModal.id = "profile-modal";
  profileModal.style.display = "none";

  // Isi modal dengan konten profil
  fetch("profile-content.html")
    .then((response) => response.text())
    .then((data) => {
      profileModal.innerHTML = data;
      document.body.appendChild(profileModal);
    });

  profileButton.addEventListener("click", function (e) {
    e.preventDefault();
    profileModal.style.display = "block";
  });

  // Tambahkan juga tombol close di modal
});
