// Toggle Password Visibility
document.querySelectorAll(".toggle-password").forEach((icon) => {
  icon.addEventListener("click", () => {
    const input = icon.previousElementSibling;
    const type = input.type === "password" ? "text" : "password";
    input.type = type;
    icon.classList.toggle("fa-eye-slash");
  });
});

// Simple Registration Form
const registerForm = document.querySelector(".register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const password = this.elements.password.value;
    const confirmPassword = this.elements.confirmPassword.value;

    // Simple validation
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (!this.elements.agreeTerms.checked) {
      alert("You must agree to the terms");
      return;
    }
  });
}
