// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Contact Form Validation and Submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formElements = this.elements;
    const name = formElements[0].value.trim();
    const email = formElements[1].value.trim();
    const message = formElements[2].value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      alert("Please enter your name.");
      formElements[0].focus();
      return;
    }

    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      formElements[1].focus();
      return;
    }

    if (!message) {
      alert("Please enter your message.");
      formElements[2].focus();
      return;
    }

    alert(`Thank you, ${name}! Your message has been sent.`);
    this.reset();
  });
}

// hamburger Menu Toggle for Mobile
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mainNav = document.querySelector(".main-nav");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    mainNav.classList.toggle("active");

    // Animate hamburger to X
    const spans = this.querySelectorAll("span");
    if (this.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "rotate(0) translate(0)";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "rotate(0) translate(0)";
    }
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove("active");
        mainNav.classList.remove("active");

        // Reset hamburger animation
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "rotate(0) translate(0)";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "rotate(0) translate(0)";
      }
    });
  });
});
//smooth hover effect
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.color = "var(--ghibli-blue)";
  });

  link.addEventListener("mouseleave", () => {
    if (!link.classList.contains("active")) {
      link.style.color = "inherit";
    }
  });
});
