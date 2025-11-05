document.addEventListener("DOMContentLoaded", () => {
  const expandTriggers = document.querySelectorAll(".expand-arrow");
  const reviewCards = document.querySelectorAll(".review-card");
  const expandedClass = "expanded";

  const closeAllCards = () => {
    reviewCards.forEach((card) => {
      const arrowUp = card.querySelector(".arrow-up");
      const arrowDown = card.querySelector(".arrow-down");

      if (arrowUp && arrowDown) {
        arrowUp.style.display = "none";
        arrowDown.style.display = "block";
      }
      card.classList.remove(expandedClass);
    });
  };

  expandTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const parentCard = this.closest(".review-card");

      if (!parentCard) return;

      const isCurrentlyExpanded = parentCard.classList.contains(expandedClass);

      closeAllCards();

      if (!isCurrentlyExpanded) {
        parentCard.classList.add(expandedClass);

        const arrowUp = parentCard.querySelector(".arrow-up");
        const arrowDown = parentCard.querySelector(".arrow-down");

        if (arrowUp && arrowDown) {
          arrowUp.style.display = "block";
          arrowDown.style.display = "none";
        }
      }
    });
  });
});
