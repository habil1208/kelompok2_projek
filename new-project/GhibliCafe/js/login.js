// Toggle Password Visibility
const togglePassword = document.querySelector(".toggle-password");
const passwordInput = document.getElementById("login-password");
if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.classList.toggle("fa-eye-slash");
  });
}

// Login Form
const loginForm = document.querySelector(".login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.elements.email.value;
    const password = this.elements.password.value;

    // validation
    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Mock login (in real app, this would be an API call)
    alert("Login successful! Redirecting...");
    window.location.href = "menu.html";
  });
}
