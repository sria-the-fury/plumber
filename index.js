

const contentDivs = document.querySelectorAll('.all-content');
function showContent(targetId) {
    // 4. Hide all content divs.
    contentDivs.forEach(div => {
        div.style.display = 'none';
    });

    // 5. Find the targeted div and show it.
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
