document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Edit buttons functionality
  const editButtons = document.querySelectorAll(".edit-btn, .edit-avatar-btn");

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // In a real app, this would open a form/modal for editing
      alert("Edit functionality would open here in a full implementation");
    });
  });

  // Add favorite button
  const addFavoriteBtn = document.querySelector(".add-favorite-btn");

  addFavoriteBtn.addEventListener("click", function () {
    // In a real app, this would open a menu to add favorites
    alert("Menu to add favorites would appear here");
  });

  // Simple animation for profile elements
  const profileCards = document.querySelectorAll(
    ".detail-card, .order-history"
  );

  profileCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 200 * index);
  });
});
