

const contentDivs = document.querySelectorAll('.all-content');
function showContent(targetId) {
    contentDivs.forEach(div => {
        div.style.display = 'none';
    });

    const targetDiv = document.getElementById(targetId);
    if (targetDiv) {
        targetDiv.style.display = 'block';
    }
}


document.querySelectorAll('.nav-links a').forEach(link => {
    console.log(link);
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const getTargetId = link.getAttribute('data-target');
        showContent(getTargetId)
        document.querySelector('.nav-links a.active').classList.remove('active');
        this.classList.add('active');
        });
});


document.querySelectorAll('.side-panel a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const getTargetId = link.getAttribute('data-target');
        showContent(getTargetId)
        document.querySelector('.side-panel a.active').classList.remove('active');
        this.classList.add('active');
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

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeNav();
    }
});


// This area for testimony submission form

document.addEventListener('DOMContentLoaded', function() {
    // Star Rating Interaction
    const stars = document.querySelectorAll('.star-rating-input i');
    const ratingValueInput = document.getElementById('rating-value');

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            resetStars();
            const currentValue = this.dataset.value;
            for (let i = 0; i < currentValue; i++) {
                stars[i].classList.replace('fa-regular', 'fa-solid');
            }
        });

        star.addEventListener('mouseout', function() {
            resetStars();
            const selectedValue = ratingValueInput.value;
            if (selectedValue > 0) {
                for (let i = 0; i < selectedValue; i++) {
                    stars[i].classList.replace('fa-regular', 'fa-solid');
                }
            }
        });

        star.addEventListener('click', function() {
            ratingValueInput.value = this.dataset.value;
        });
    });

    function resetStars() {
        stars.forEach(s => s.classList.replace('fa-solid', 'fa-regular'));
    }

    // Form Submission
    const form = document.getElementById('testimonial-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop the form from submitting the traditional way

        const rating = ratingValueInput.value;
        if (rating === '0') {
            alert('Please select a star rating.');
            return;
        }

        // In a real application, you would send this data to a server.
        const formData = new FormData(form);
        console.log('Form data submitted:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        alert('Thank you for your review! It will be published after moderation.');
        form.reset();
        resetStars();
        ratingValueInput.value = '0';
    });
});


// for testimonial card

document.addEventListener('DOMContentLoaded', () => {

    const cardWrapper = document.querySelector('.card-wrapper');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (leftArrow && rightArrow && cardWrapper) {


        leftArrow.addEventListener('click', () => {

            cardWrapper.scrollBy({
                left: -300, // Scrolls to the left
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            cardWrapper.scrollBy({
                left: 300, // Scrolls to the right
                behavior: 'smooth'
            });
        });
    }
});
