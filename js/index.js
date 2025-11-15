const contentDivs = document.querySelectorAll(".all-content");
function showContent(targetId) {
  contentDivs.forEach((div) => {
    div.style.display = "none";
  });

  const targetDiv = document.getElementById(targetId);
  if (targetDiv) {
    targetDiv.style.display = "block";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    targetDiv.scrollTop = 0;
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
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  const cardWrapper = document.querySelector(".card-wrapper");
  const leftArrow = document.querySelector("#left-arrow-review");
  const rightArrow = document.querySelector("#right-arrow-review");

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
