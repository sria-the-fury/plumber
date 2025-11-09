document.addEventListener("DOMContentLoaded", function () {
  // --- Firebase Configuration ---
  const firebaseConfig = {
    apiKey: "AIzaSyASe8RMzNaNc5unnkJXvGYHZOx0iOmYZt8", // IMPORTANT: Secure this key!
    authDomain: "pipe-doctor-25.firebaseapp.com",
    projectId: "pipe-doctor-25",
    storageBucket: "pipe-doctor-25.firebasestorage.app",
    messagingSenderId: "872266294619",
    appId: "1:872266294619:web:e4d7ceca2d5d0618c5667e",
    measurementId: "G-PPGB40N6XD",
  };

  // --- Initialize Firebase ---
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // --- Get DOM Elements ---
  // Select *all* verify forms using their class, as IDs must be unique
  const verifyForms = document.querySelectorAll(".verify-email-form");

  const contactFieldset = document.getElementById("ontact-form-fieldset");
  const reviewFieldset = document.getElementById("review-form-fieldset");

  if (verifyForms.length > 0) {
    verifyForms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailInput = form.querySelector("input[type='email']");
        const verifyButton = form.querySelector("button");
        const statusMessageP = form.querySelector("p"); // Get the <p> tag inside this form

        const email = emailInput.value;

        if (!email) {
          statusMessageP.textContent = "Please enter your email address.";
          return;
        }

        verifyButton.disabled = true;
        verifyButton.textContent = "Sending link...";
        statusMessageP.textContent = "Sending...";

        const actionCodeSettings = {
          url: window.location.href,
          handleCodeInApp: true,
        };

        auth
          .sendSignInLinkToEmail(email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem("emailForSignIn", email);
            statusMessageP.textContent =
              "A login link has been sent to your email!";
            verifyButton.textContent = "Link Sent!";
          })
          .catch((error) => {
            console.error(error);
            statusMessageP.textContent = `Error: ${error.message}`;
            verifyButton.disabled = false;
            verifyButton.textContent = "Verify your email";
          });
      });
    });
  }

  function handleEmailLinkSignIn() {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email to complete sign-in");
      }
      if (!email) {
        verifyForms.forEach((form) => {
          const statusMessageP = form.querySelector("p");
          if (statusMessageP)
            statusMessageP.textContent =
              "Email is required to complete sign-in.";
        });
        return;
      }

      auth
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");
          const user = result.user;
          checkUserPasswordStatus(user);

          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, window.location.pathname);
          }
        })
        .catch((error) => {
          console.error(error);

          verifyForms.forEach((form) => {
            const statusMessageP = form.querySelector("p");
            if (statusMessageP)
              statusMessageP.textContent = `Error signing in: ${error.message}`;
          });
        });
    }
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      checkUserPasswordStatus(user);
    } else {

      if (verifyForms) {
        verifyForms.forEach((form) => (form.style.display = "block"));
      }

      if (reviewFieldset) {
        reviewFieldset.disabled = true;
      }

      if (contactFieldset) {
        contactFieldset.disabled = true;
      }
    }
  });

  handleEmailLinkSignIn();

  async function checkUserPasswordStatus(user) {
    const email = user.email;
    if (!email) {
      return;
    }
    try {
      const signInMethods = await auth.fetchSignInMethodsForEmail(email);

      if (signInMethods.includes("emailLink")) {
        //here open

        if (verifyForms) {
          verifyForms.forEach((form) => (form.style.display = "none"));
        }

        if (reviewFieldset) {
          reviewFieldset.disabled = false;
        }

        if (contactFieldset) {
          contactFieldset.disabled = false;
        }
      } else {
        if (verifyForms) {
          verifyForms.forEach((form) => (form.style.display = "block"));
        }

        if (reviewFieldset) {
          reviewFieldset.disabled = true;
        }

        if (contactFieldset) {
          contactFieldset.disabled = true;
        }

        auth.signOut();
      }
    } catch (error) {
      console.error("Error fetching sign-in methods:", error);
      alert("Could not verify your account type. Please try again.");
      auth.signOut();
    }
  }
});
