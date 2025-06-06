// Quote Form Handling
document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    coverage: formData.get("coverage"),
  };

  console.log("Quote request submitted:", data);

  // Show success message
  showNotification(
    "Quote request submitted successfully! We'll contact you soon.",
    "success"
  );

  // Reset form
  this.reset();
});

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#2563eb"};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", function () {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animateElements = document.querySelectorAll(
    ".coverage-card, .testimonial-card, .stat-item"
  );
  animateElements.forEach((el) => observer.observe(el));
});

// Form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/\s/g, ""));
}

// Enhanced form validation
document.querySelectorAll('#quoteForm input[type="email"]').forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value && !validateEmail(this.value)) {
      this.style.borderColor = "#ef4444";
      showValidationError(this, "Please enter a valid email address");
    } else {
      this.style.borderColor = "#10b981";
      removeValidationError(this);
    }
  });
});

document.querySelectorAll('#quoteForm input[type="tel"]').forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value && !validatePhone(this.value)) {
      this.style.borderColor = "#ef4444";
      showValidationError(this, "Please enter a valid phone number");
    } else {
      this.style.borderColor = "#10b981";
      removeValidationError(this);
    }
  });
});

function showValidationError(input, message) {
  removeValidationError(input);
  const error = document.createElement("div");
  error.className = "validation-error";
  error.textContent = message;
  error.style.cssText = "color: #ef4444; font-size: 14px; margin-top: 4px;";
  input.parentNode.appendChild(error);
}

function removeValidationError(input) {
  const error = input.parentNode.querySelector(".validation-error");
  if (error) {
    error.remove();
  }
}

// Get Quote button handlers
document.querySelectorAll(".coverage-card .btn").forEach((button) => {
  button.addEventListener("click", function () {
    const coverageType =
      this.closest(".coverage-card").querySelector("h3").textContent;

    // Scroll to quote form
    document.querySelector(".quote-form-card").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Pre-select the coverage type
    setTimeout(() => {
      const select = document.querySelector(
        '#quoteForm select[name="coverage"]'
      );
      const options = {
        "Auto Insurance": "auto",
        "Home Insurance": "home",
        "Life Insurance": "life",
        "Business Insurance": "business",
      };

      if (options[coverageType]) {
        select.value = options[coverageType];
        select.style.borderColor = "#2563eb";
      }
    }, 500);
  });
});

// Add notification styles to document
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;

// Inject notification styles
const styleSheet = document.createElement("style");
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
