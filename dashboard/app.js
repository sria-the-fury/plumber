// Wait for the HTML document to finish loading
document.addEventListener("DOMContentLoaded", function () {
  // 1. YOUR FIREBASE CONFIG
  const firebaseConfig = {
    apiKey: "AIzaSyASe8RMzNaNc5unnkJXvGYHZOx0iOmYZt8",
    authDomain: "pipe-doctor-25.firebaseapp.com",
    projectId: "pipe-doctor-25",
    storageBucket: "pipe-doctor-25.firebasestorage.app",
    messagingSenderId: "872266294619",
    appId: "1:872266294619:web:e4d7ceca2d5d0618c5667e",
    measurementId: "G-PPGB40N6XD",
  };

  // 2. Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  const loginDiv = document.getElementById("login-container");
  const dashboardDiv = document.getElementById("dashboard-container");

  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm["email"].value;
    const password = loginForm["password"].value;

    // 6. Sign in
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login was successful!
        console.log("User signed in:", userCredential.user);
        loginDiv.style.display = "none";
        dashboardDiv.style.display = "block";
      })
      .catch((error) => {
        // Handle errors
        console.error("Login failed:", error.message);
        alert("Error: " + error.message);
      });
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User email", user.email);

      dashboardDiv.style.display = "block";
      loginDiv.style.display = "none";

      const userDisplayName = document.getElementById("owner-name");
      if (user.email) {
        userDisplayName.style.fontWeight = "bold";
        userDisplayName.textContent = user.email;
      } else {
        userDisplayName.textContent = "Set Your name";
      }
    } else {
      // User is signed out
      dashboardDiv.style.display = "none";
      loginDiv.style.display = "block";
    }
  });

  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    const userConfirmed = confirm("Are you sure you want to sign out?");
    if (userConfirmed) {
      auth
        .signOut()
        .then(() => {
          alert("Signed out successfully.");
          loginDiv.style.display = "block";
          dashboardDiv.style.display = "none";
        })
        .catch((error) => {
          console.error("Sign out error:", error);
        });
    }
  });
});
