document.addEventListener("DOMContentLoaded", () => {
  const expandTriggers = document.querySelectorAll(".expand-arrow");
  const expandMessageCardTrigger = document.querySelectorAll(".envelope-icon");
  const reviewCards = document.querySelectorAll(".review-card");
  const messageCards = document.querySelectorAll(".message-card");
  const expandedClass = "expanded";
  const expandedMsgClass = "expanded-msg";

  const closeAllCards = () => {
    reviewCards.forEach((card) => {
      const arrowUp = card.querySelector(".arrow-up");
      const arrowDown = card.querySelector(".arrow-down");
      card.classList.remove(expandedClass);

      if (arrowUp && arrowDown) {
        arrowUp.style.display = "none";
        arrowDown.style.display = "block";
      }
    });
  };

  const closeAllMessages = () => {
    messageCards.forEach((card) => {
      card.classList.remove(expandedMsgClass);
      const openMessage = card.querySelector(".open-message");
      const closeMessage = card.querySelector(".close-message");

      if (openMessage && closeMessage) {
        openMessage.style.display = "block";
        closeMessage.style.display = "none";
      }
    });
  };

  // Expand/collapse review cards

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

  expandMessageCardTrigger.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const parentCard = this.closest(".message-card");

      if (!parentCard) return;

      const isCurrentlyExpanded =
        parentCard.classList.contains(expandedMsgClass);

      closeAllMessages();

      if (!isCurrentlyExpanded) {
        parentCard.classList.add(expandedMsgClass);

        const openMessage = parentCard.querySelector(".open-message");
        const closeMessage = parentCard.querySelector(".close-message");

        if (openMessage && closeMessage) {
          openMessage.style.display = "none";
          closeMessage.style.display = "block";
        }
      }
    });
  });

  // delete review
  document
    .getElementById("review-list")
    .addEventListener("click", function (e) {
      if (
        e.target.classList.contains("delete-button") ||
        e.target.closest(".delete-button")
      ) {
        const reviewCard = e.target.closest(".review-card");
        const deleteId = reviewCard.dataset.id;

        if (confirm("Are you sure you want to delete this review?")) {
          deleteReview(deleteId, reviewCard);
        }
      }

      if (
        e.target.classList.contains("approved-button") ||
        e.target.closest(".approved-button")
      ) {
        const reviewCard = e.target.closest(".review-card");
        const reviewId = reviewCard.dataset.id;

        if (confirm("Mark this review as approved?")) {
          checkedReviews(reviewId, reviewCard);
        }
      }

      if (
        e.target.classList.contains("archive-button") ||
        e.target.closest(".archive-button")
      ) {
        const reviewCard = e.target.closest(".review-card");
        const reviewId = reviewCard.dataset.id;

        if (
          confirm(
            "If this review does not satisfy or an old review, you can archive this or delete this. Are you sure to archive this? "
          )
        ) {
          markReviewAsArchived(reviewId, reviewCard);
        }
      }
    });

  document
    .getElementById("message-list")
    .addEventListener("click", function (e) {
      if (
        e.target.classList.contains("message-delete") ||
        e.target.closest(".message-delete")
      ) {
        const messageCard = e.target.closest(".message-card");
        const messageId = messageCard.dataset.id;
        if (confirm("Are you sure you want to delete this message?")) {
          deleteMessage(messageId, messageCard);
        }
      }

      if (
        e.target.classList.contains("reply-email") ||
        e.target.closest(".reply-email")
      ) {
        const messageCard = e.target.closest(".message-card");
        const messageId = messageCard.dataset.id;
        markMessageAsResponded(messageId);
      }

      if (
        e.target.classList.contains("mark-as-read") ||
        e.target.closest(".mark-as-read")
      ) {
        const messageCard = e.target.closest(".message-card");
        const messageId = messageCard.dataset.id;
        markMessageAsSeen(messageId, messageCard);
      }
    });

  // functions
  async function deleteReview(id, reviewCard) {
    try {
      const formData = new FormData();
      formData.append("id", id);

      const response = await fetch("delete_review.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        reviewCard.remove();
        const getTotalReviews = document.getElementById("total-reviews");
        let currentCount = parseInt(getTotalReviews.textContent, 10);
        getTotalReviews.textContent = currentCount - 1;
        alert("Review deleted successfully.");
      } else {
        alert("Error deleting item: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to the server.");
    }
  }

  async function checkedReviews(reviewId, reviewCard) {
    try {
      const id = reviewId;
      const formData = new FormData();
      formData.append("id", id);
      formData.append("approved", 1);
      formData.append("archived", 0);

      const response = await fetch("update_review_status.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        reviewCard.remove();
      } else {
        console.log("Error updating status: ", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to the server.");
    }
  }

  async function markReviewAsArchived(reviewId, reviewCard) {
    try {
      const id = reviewId;
      const formData = new FormData();
      formData.append("id", id);
      formData.append("archived", 1);
      formData.append("approved", 0);

      const response = await fetch("review_archive.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        reviewCard.remove();
      } else {
        console.log("Error updating status: ", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to the server.");
    }
  }

  async function markMessageAsResponded(id) {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("responded", 1);

      const response = await fetch("message_response_status.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        window.location.reload();
      } else {
        console.log("Error updating status: ", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to the server.");
    }
  }

  async function markMessageAsSeen(id, card) {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("seen", 1);

      const response = await fetch("message_read_status.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        card.remove();
      } else {
        console.log("Error updating status: ", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to the server.");
    }
  }

  async function deleteMessage(id, card) {
    try {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch("delete_message.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        card.remove();
        const getTotalMessage = document.getElementById("total-messages");
        let currentCount = parseInt(getTotalMessage.textContent, 10);
        getTotalMessage.textContent = currentCount - 1;
        alert("Message deleted successfully");
      } else {
        alert("Error deleting Message: " + result.message);
      }
    } catch {
      console.error("Error:", error);
      alert("Could not connect to the server.");
    }
  }
});
