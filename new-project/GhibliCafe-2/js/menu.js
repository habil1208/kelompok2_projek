// Filter Menu Items by Category
const categoryButtons = document.querySelectorAll(".category-btn");
const menuItems = document.querySelectorAll(".menu-item");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter items
    const category = button.dataset.category;
    menuItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
