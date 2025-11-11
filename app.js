document.addEventListener("DOMContentLoaded", function () {
  // --- Firebase Configuration ---
  // IMPORTANT: Make sure you've secured your API key using Firebase App Check
  // or by restricting it in your Google Cloud console.
  const firebaseConfig = {
    apiKey: "AIzaSyASe8RMzNaNc5unnkJXvGYHZOx0iOmYZt8", // Per your code
    authDomain: "pipe-doctor-25.firebaseapp.com",
    projectId: "pipe-doctor-25",
    storageBucket: "pipe-doctor-25.firebasestorage.app",
    messagingSenderId: "872266294619",
    appId: "1:872266294619:web:e4d7ceca2d5d0618c5667e",
    measurementId: "G-PPGB40N6XD",
  };

  // --- Initialize Firebase ---
  let app;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  const auth = firebase.auth();

  // --- Form & Element Selection ---
  const form = document.getElementById("testimonial-form");
  const clientNameInput = document.getElementById("clientName");
  const emailInput = document.getElementById("client-email-verify");
  const locationInput = document.getElementById("location");
  const ratingInput = document.getElementById("rating-value");
  const testimonyInput = document.getElementById("testimony");
  const consentInput = document.getElementById("consent");
  const submitButton = form.querySelector("button[type='submit']");
  const statusMessageEl = document.getElementById("status-message");

  // --- Helper: Star Rating ---
  const stars = document.querySelectorAll(".star-rating-input .fa-star");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");
      ratingInput.value = value;
      stars.forEach((s) => {
        if (s.getAttribute("data-value") <= value) {
          s.classList.add("fa-solid");
          s.classList.remove("fa-regular");
        } else {
          s.classList.remove("fa-solid");
          s.classList.add("fa-regular");
        }
      });
    });
  });

  // --- Helper: Character Counter ---
  const charCountLabel = document.getElementById("count-char");
  testimonyInput.addEventListener("input", () => {
    const count = testimonyInput.value.length;
    charCountLabel.textContent = `Your Testimony [${count} / 200]`;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Check for rating
    if (parseInt(ratingInput.value, 10) === 0) {
      showStatus("Please select a rating (1-5 stars).", "error");
      return;
    }

    const email = emailInput.value;
    if (!email) {
      showStatus("Please enter your email address.", "error");
      return;
    }

    const reviewData = {
      clientName: clientNameInput.value,
      email: emailInput.value,
      location: locationInput.value,
      rating: ratingInput.value,
      testimony: testimonyInput.value,
    };

    try {
      window.localStorage.setItem(
        "pendingReviewData",
        JSON.stringify(reviewData)
      );

      window.localStorage.setItem("emailForSignIn", email);
    } catch (e) {
      console.error("Error saving to localStorage", e);
      showStatus(
        "A local storage error occurred. Please enable cookies/storage.",
        "error"
      );
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending link...";
    showStatus("Sending verification link...", "info");

    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };

    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        showStatus(
          "Verification link sent! Please check your email to complete your review.",
          "success"
        );
        form.reset(); // Clear the form
        submitButton.textContent = "Check Your Email";
      })
      .catch((error) => {
        console.error(error);
        showStatus(`Error: ${error.message}`, "error");
        submitButton.disabled = false;
        submitButton.textContent = "Submit Your Review";
        // Clear storage if link sending fails
        window.localStorage.removeItem("pendingReviewData");
        window.localStorage.removeItem("emailForSignIn");
      });
  });

  function handleEmailLinkSignIn() {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email to complete verify");
      }
      if (!email) {
        showStatus("Email is required to complete verify.", "error");
        return;
      }

      // Show loading state
      showStatus("Verifying your email, please wait...", "info");
      form.style.display = "none";

      auth
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          const user = result.user;

          const storedDataJSON =
            window.localStorage.getItem("pendingReviewData");
          console.log("storedDataJSON => ", storedDataJSON);

          if (storedDataJSON) {
            const reviewData = JSON.parse(storedDataJSON);
            console.log("reviewData parse => ", reviewData);

            reviewData.email = user.email;

            submitReviewToBackend(reviewData);
          } else {
            showStatus(
              "Email verified successfully! You can now submit a review.",
              "success"
            );
            form.style.display = "block";
          }

          window.localStorage.removeItem("emailForSignIn");
          window.localStorage.removeItem("pendingReviewData");

          // Clean the URL
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, window.location.pathname);
          }
        })
        .catch((error) => {
          console.error(error);
          showStatus(`Error signing in: ${error.message}`, "error");
          form.style.display = "block";
        });
    }
  }

  async function submitReviewToBackend(data) {
    showStatus("Submitting your review to the database...", "info");
    console.log("data in submit=> ", data);

    try {
      const response = await fetch("php/add_review.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        showStatus(
          "Success! Your review has been submitted. Thank you!",
          "success"
        );
        form.style.display = "none";
      } else {
        throw new Error(result.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showStatus(
        `Submission Failed: ${error.message}. Please try again.`,
        "error"
      );
      form.style.display = "block";
    }
  }

  // --- Helper: Show Status Message ---
  function showStatus(message, type = "info") {
    statusMessageEl.textContent = message;
    statusMessageEl.className = `status-message ${type}`; // 'info', 'success', 'error'
  }

  handleEmailLinkSignIn();
});
