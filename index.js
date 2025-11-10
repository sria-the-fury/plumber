const contentDivs = document.querySelectorAll(".all-content");
function showContent(targetId) {
  contentDivs.forEach((div) => {
    div.style.display = "none";
  });

  const targetDiv = document.getElementById(targetId);
  if (targetDiv) {
    targetDiv.style.display = "block";
  }
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const getTargetId = link.getAttribute("data-target");
    showContent(getTargetId);
    document.querySelector(".nav-links a.active").classList.remove("active");
    this.classList.add("active");
  });
});

document.querySelectorAll(".side-panel a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const getTargetId = link.getAttribute("data-target");
    showContent(getTargetId);
    document.querySelector(".side-panel a.active").classList.remove("active");
    this.classList.add("active");
    closeNav();
  });
});

// open Nav
function openNav() {
  document.getElementById("sidePanel").style.width = "250px";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("open_nav").style.display = "none";
  document.getElementById("close_nav").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Close nav
function closeNav() {
  document.getElementById("sidePanel").style.width = "0";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("open_nav").style.display = "block";
  document.getElementById("close_nav").style.display = "none";
  document.body.style.overflow = "auto"; // Allow scrolling
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeNav();
  }
});

// This area for testimony submission form

document.addEventListener("DOMContentLoaded", function () {
  // Star Rating Interaction
  const stars = document.querySelectorAll(".star-rating-input i");
  const ratingValueInput = document.getElementById("rating-value");

  stars.forEach((star) => {
    star.addEventListener("mouseover", function () {
      resetStars();
      const currentValue = this.dataset.value;
      for (let i = 0; i < currentValue; i++) {
        stars[i].classList.replace("fa-regular", "fa-solid");
      }
    });

    star.addEventListener("mouseout", function () {
      resetStars();
      const selectedValue = ratingValueInput.value;
      if (selectedValue > 0) {
        for (let i = 0; i < selectedValue; i++) {
          stars[i].classList.replace("fa-regular", "fa-solid");
        }
      }
    });

    star.addEventListener("click", function () {
      ratingValueInput.value = this.dataset.value;
    });
  });

  function resetStars() {
    stars.forEach((s) => s.classList.replace("fa-solid", "fa-regular"));
  }

  // Form Submission
  const formTestimony = document.getElementById("testimonial-form");
  formTestimony.addEventListener("submit", function (event) {
    event.preventDefault();

    const rating = ratingValueInput.value;
    if (rating === "0") {
      alert("Please select a star rating.");
      return;
    }

    const formData = new FormData(formTestimony);
    const formDataLen = Array.from(formData.entries()).length;

    if (formDataLen == 5) {
      fetch("php/add_testimony.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })

        .then((data) => {
          alert(
            "Thank you for your review! It has been submitted successfully. It will be visible once approved."
          );

          formTestimony.reset();
          resetStars();
          ratingValueInput.value = "0";
          deleteAllCookies();
          window.location.reload();
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  });
});

// for testimonial card

document.addEventListener("DOMContentLoaded", () => {
  const cardWrapper = document.querySelector(".card-wrapper");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (leftArrow && rightArrow && cardWrapper) {
    leftArrow.addEventListener("click", () => {
      cardWrapper.scrollBy({
        left: -300, // Scrolls to the left
        behavior: "smooth",
      });
    });

    rightArrow.addEventListener("click", () => {
      cardWrapper.scrollBy({
        left: 300, // Scrolls to the right
        behavior: "smooth",
      });
    });
  }
});

//count testimony char
document.addEventListener("DOMContentLoaded", function () {
  const testimonyInput = document.getElementById("testimony");
  const countCharLabel = document.getElementById("count-char");

  testimonyInput.addEventListener("input", () => {
    const currentLength = testimonyInput.value.length;
    countCharLabel.textContent = `Your Review [${currentLength} / 200]`;
  });

  function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

      const cookieName = name.trim();

      console.log(`Deleting cookie: ${cookieName}`);
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
});
