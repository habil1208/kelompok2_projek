document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const loginForm = document.querySelector(".login-form");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const rememberCheckbox = document.getElementById("remember-me");
  const togglePasswordIcon = document.querySelector(".toggle-password");
  const loginBtn = document.querySelector(".login-btn");

  // Check for remembered user
  checkRememberedUser();

  // Toggle password visibility
  if (togglePasswordIcon) {
    togglePasswordIcon.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      togglePasswordIcon.classList.toggle("fa-eye");
      togglePasswordIcon.classList.toggle("fa-eye-slash");
    });
  }

  // Form submission handler
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset error messages
    clearErrors();

    // Validate inputs
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const rememberMe = rememberCheckbox.checked;

    if (!validateEmail(email)) {
      showError("login-email", "Please enter a valid email");
      return;
    }

    if (!password || password.length < 6) {
      showError("login-password", "Password must be at least 6 characters");
      return;
    }

    try {
      setLoadingState(true);
      await mockLogin(email, password, rememberMe);
      handleSuccessfulLogin(rememberMe);
    } catch (error) {
      showError("login-password", error.message);
    } finally {
      setLoadingState(false);
    }
  });

  // Validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Check if user is remembered
  function checkRememberedUser() {
    const rememberedUser = localStorage.getItem("ghibliCafeRememberedUser");
    if (rememberedUser) {
      const { email, password } = JSON.parse(rememberedUser);
      emailInput.value = email;
      passwordInput.value = password;
      rememberCheckbox.checked = true;

      // Auto-submit after short delay
      setTimeout(() => {
        loginForm.dispatchEvent(new Event("submit"));
      }, 500);
    }
  }

  // Mock login function (replace with real API call)
  function mockLogin(email, password, rememberMe) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Valid users (replace with your actual user validation)
        const validUsers = [
          { email: "user@gmail.com", password: "123" },
          { email: "admin@gmail.com", password: "123" },
        ];

        const isValidUser = validUsers.some(
          (user) => user.email === email && user.password === password
        );

        if (isValidUser) {
          // Store user if "Remember me" is checked
          if (rememberMe) {
            localStorage.setItem(
              "ghibliCafeRememberedUser",
              JSON.stringify({ email, password })
            );
          } else {
            localStorage.removeItem("ghibliCafeRememberedUser");
          }
          resolve();
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  }
  // Handle successful login
  function handleSuccessfulLogin(rememberMe) {
    // Store login state in sessionStorage
    sessionStorage.setItem("ghibliCafeIsLoggedIn", "true");

    // Show welcome back message if remembered
    if (rememberMe) {
      // Redirect directly to menu section
      window.location.href = "..//theghiblicafe/menu.html";
    } else {
      // Show success message then redirect
      showSuccessMessage(() => {
        window.location.href = "..//theghiblicafe/menu.html";
      });
    }
  }

  // Show success message
  function showSuccessMessage(callback) {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Welcome back to Ghibli Cafe!</h3>
            <p>You're being redirected...</p>
        `;

    // Style it
    successDiv.style.position = "fixed";
    successDiv.style.top = "0";
    successDiv.style.left = "0";
    successDiv.style.width = "100%";
    successDiv.style.height = "100%";
    successDiv.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    successDiv.style.display = "flex";
    successDiv.style.flexDirection = "column";
    successDiv.style.justifyContent = "center";
    successDiv.style.alignItems = "center";
    successDiv.style.zIndex = "1000";
    successDiv.style.textAlign = "center";
    successDiv.style.padding = "20px";

    successDiv.querySelector("i").style.color = "var(--ghibli-green)";
    successDiv.querySelector("i").style.fontSize = "4rem";
    successDiv.querySelector("h3").style.color = "var(--ghibli-blue)";
    successDiv.querySelector("h3").style.margin = "1rem 0";
    successDiv.querySelector("p").style.color = "#666";

    document.body.appendChild(successDiv);

    // Redirect after delay
    setTimeout(callback, 1500);
  }

  // Helper functions
  function showError(fieldId, message) {
    const errorElement =
      document.getElementById(fieldId).nextElementSibling ||
      document.getElementById(fieldId).parentElement.nextElementSibling;
    errorElement.textContent = message;
    document.getElementById(fieldId).classList.add("error");
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
    });
    document.querySelectorAll(".error").forEach((el) => {
      el.classList.remove("error");
    });
  }

  function setLoadingState(isLoading) {
    if (isLoading) {
      loginBtn.disabled = true;
      loginBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    } else {
      loginBtn.disabled = false;
      loginBtn.innerHTML = "<span>Log In</span>";
    }
  }
});
