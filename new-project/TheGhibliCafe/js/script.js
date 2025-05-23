// Toggle menu for mobile devices
const menuToggle = document.getElementById("menu-toggle");
const navUl = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  navUl.classList.toggle("show");
});

// Optional: Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar")) {
    navUl.classList.remove("show");
  }
});
