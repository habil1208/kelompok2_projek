document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const registerForm = document.querySelector(".register-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const agreeTermsCheckbox = document.getElementById("agree-terms");
  const togglePasswordIcons = document.querySelectorAll(".toggle-password");
  const registerBtn = document.querySelector(".register-btn");

  // Toggle password visibility
  togglePasswordIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const input = icon.parentElement.querySelector("input");
      const type = input.type === "password" ? "text" : "password";
      input.type = type;
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  });

  // Form submission handler
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset error messages
    clearErrors();

    // Validate inputs
    const isUsernameValid = validateUsername(usernameInput.value.trim());
    const isEmailValid = validateEmail(emailInput.value.trim());
    const isPasswordValid = validatePassword(passwordInput.value.trim());
    const doPasswordsMatch = checkPasswordMatch(
      passwordInput.value.trim(),
      confirmPasswordInput.value.trim()
    );
    const isTermsAgreed = validateTerms(agreeTermsCheckbox.checked);

    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      doPasswordsMatch &&
      isTermsAgreed
    ) {
      try {
        setLoadingState(true);
        await mockRegistration(
          usernameInput.value.trim(),
          emailInput.value.trim(),
          passwordInput.value.trim()
        );
        showSuccessMessage();
      } catch (error) {
        showError("registration", error.message);
      } finally {
        setLoadingState(false);
      }
    }
  });

  // Validation functions
  function validateUsername(username) {
    if (!username) {
      showError("username", "Username is required");
      return false;
    }
    if (username.length < 3) {
      showError("username", "Username must be at least 3 characters");
      return false;
    }
    return true;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError("email", "Email is required");
      return false;
    }
    if (!re.test(email)) {
      showError("email", "Please enter a valid email");
      return false;
    }
    return true;
  }

  function validatePassword(password) {
    if (!password) {
      showError("password", "Password is required");
      return false;
    }
    if (password.length < 8) {
      showError("password", "Password must be at least 8 characters");
      return false;
    }
    return true;
  }

  function checkPasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
      showError("confirm-password", "Passwords don't match");
      return false;
    }
    return true;
  }

  function validateTerms(agreed) {
    if (!agreed) {
      showError("agree-terms", "You must agree to the terms");
      return false;
    }
    return true;
  }

  // Helper functions
  function showError(fieldId, message) {
    let errorElement;

    if (fieldId === "agree-terms") {
      errorElement =
        agreeTermsCheckbox.parentElement.querySelector(".error-message");
    } else {
      errorElement =
        document.getElementById(fieldId).nextElementSibling ||
        document.getElementById(fieldId).parentElement.nextElementSibling;
    }

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
      registerBtn.disabled = true;
      registerBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    } else {
      registerBtn.disabled = false;
      registerBtn.innerHTML = "<span>Create Account</span>";
    }
  }

  // Mock registration function (replace with real API call)
  function mockRegistration(username, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        const isSuccess = Math.random() > 0.2; // 80% success rate

        if (isSuccess) {
          // In a real app, you would handle the successful registration
          resolve();
        } else {
          // Simulate different error cases
          const errors = [
            "Email already exists",
            "Username is taken",
            "Registration service unavailable",
            "Network error",
          ];
          const randomError = errors[Math.floor(Math.random() * errors.length)];
          reject(new Error(randomError));
        }
      }, 1500);
    });
  }

  function showSuccessMessage() {
    // Create a success message element
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Welcome to Ghibli Cafe!</h3>
            <p>Your account has been created successfully</p>
            <button id="continue-btn">Continue to Cafe</button>
        `;

    // Style it with JavaScript (could also be in CSS)
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
    successDiv.querySelector("p").style.marginBottom = "2rem";

    const continueBtn = successDiv.querySelector("#continue-btn");
    continueBtn.style.padding = "12px 30px";
    continueBtn.style.background = "var(--ghibli-blue)";
    continueBtn.style.color = "white";
    continueBtn.style.border = "none";
    continueBtn.style.borderRadius = "8px";
    continueBtn.style.fontWeight = "600";
    continueBtn.style.cursor = "pointer";
    continueBtn.style.transition = "all 0.3s";

    continueBtn.addEventListener("mouseenter", () => {
      continueBtn.style.background = "var(--ghibli-green)";
    });

    continueBtn.addEventListener("mouseleave", () => {
      continueBtn.style.background = "var(--ghibli-blue)";
    });

    continueBtn.addEventListener("click", () => {
      window.location.href = "../index.html";
    });

    document.body.appendChild(successDiv);
  }
});
