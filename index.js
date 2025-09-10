
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.nav-links a.active').classList.remove('active');
        this.classList.add('active');
        });
});

// open Nav
function openNav() {
    document.getElementById("sidePanel").style.width = "250px";
    document.getElementById("overlay").style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Close nav
function closeNav() {
    document.getElementById("sidePanel").style.width = "0";
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflow = "auto"; // Allow scrolling
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeNav();
    }
});
