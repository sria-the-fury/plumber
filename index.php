<html lang="en">

<head>
    <title>Pipe Doctor - We Build, We Fix</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Epunda+Slab:ital,wght@0,300..900;1,300..900&family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="index.css">
</head>

<body>
    <!-- Will create NAV bar-->
    <nav class="navbar">
        <div class="logo">
            <i class="fa-solid fa-faucet-drip"></i>
            <span class="business-name">Doctor</span>
        </div>

        <ul class="nav-links">
            <li><a href="#" class="active" data-target="home-content">Home</a></li>
            <li><a href="#" data-target="our-works-content">Our Works</a></li>
            <li><a href="#" data-target="contacts-content">Contacts</a></li>
        </ul>
        <button class="menu-toggle" onclick="openNav()" id="open_nav">☰</button>
        <button class="close-btn menu-toggle" id="close_nav" onclick="closeNav()">X</button>
    </nav>
    <!-- Overlay -->
    <div id="overlay" class="overlay" onclick="closeNav()"></div>
    <div id="sidePanel" class="side-panel">
        <a href="#" class="active" data-target="home-content">Home</a>
        <a href="#" data-target="our-works-content"> Our Works</a>
        <a href="#" data-target="contacts-content"> Contacts</a>
    </div>
    <div class="container ">
        <!--Homepage html started-->
        <div class="homepage-container all-content" id="home-content">
            <div class="introduction backdrop-blur-l frosted-glass fade-in">
                <h2> Welcome to</h2>
                <h1>Pipe Doctor</h1>
                <blockquote class="fancy-quote backdrop-blur-m">
                    <p>We build, we fix</p>
                </blockquote>
                <p>Your trusted experts for reliable, fast, and professional plumbing solutions in Vilnius.</p>
                <div class="button round-corner backdrop-blur">
                    <a href="#">Free Consultation</a>

                </div>

            </div>
            <div class="parallax-1 parallax-section"></div>

            <div class="news-area">
                <h2> Our News</h2>

                <div class="all-news-cards">
                    <?php
                    include 'php/connection.php';
                    $sql = "SELECT * FROM news ORDER BY published_at DESC";
                    $result = $connection_sql->query($sql);
                    if ($result->num_rows > 0) {

                        while ($row = $result->fetch_assoc()) {
                            $publish_time = date('D, d M, H:i', strtotime($row['published_at']));

                            echo '
                            <div class="news-card highlight">
                                <small>
                                ' . $publish_time . '
                                </small>
                                <h4 class="card-title"> ' . $row['title'] . '</h4>
                                <p class="card-text">
                                    ' . $row['article'] . '
                                 </p>
                             </div>
                            ';
                        }
                    }

                    ?>


                </div>

            </div>
            <div class="our-services backdrop-blur-l frosted-glass fade-in-on-scroll visible">
                <h2>Our Services</h2>
                <p>We offer a wide range of plumbing services to meet your needs. No job is too big or too small.</p>
                <div class="cards-container">
                    <div class="card">
                        <i class="fa-solid fa-wrench"></i>
                        <div class="card-title">
                            Emergency Repairs
                        </div>
                        <p class="card-details">
                            Available 24/7 for burst pipes, major leaks, and other urgent issues. We respond quickly to minimize damage.
                        </p>
                    </div>
                    <div class="card">
                        <i class="fa-solid fa-house-signal"></i>
                        <div class="card-title">
                            Smart Plumbing Systems
                        </div>
                        <p class="card-details">
                            Upgrade your home with modern smart plumbing solutions. We install and service water leak detectors, smart water shut-off valves, and high-efficiency fixtures to help you conserve water and protect your property from damage.
                        </p>
                    </div>

                    <div class="card">
                        <i class="fa-solid fa-shield"></i>
                        <div class="card-title">
                            Installations & Upgrades
                        </div>
                        <p class="card-details">
                            From new faucets and toilets to complete bathroom and kitchen plumbing installations, we do it all with precision.
                        </p>
                    </div>

                    <div class="card">
                        <i class="fa-solid fa-droplet"></i>
                        <div class="card-title">
                            Leak Detection
                        </div>
                        <p class="card-details">
                            Using the latest technology, we can find and fix hidden leaks in your walls, floors, and underground pipes.
                        </p>
                    </div>

                </div>
            </div>

            <div class="why-best">
                <div class="emp-image-container">
                    <img class="round-corner emp-image" src="https://scoutnetworkblog.com/wp-content/uploads/2018/11/Plumber-Sink-201709-003.jpg" alt="Our Employee" />

                </div>
                <div class="why-best-content">
                    <h2>Why we are the best choice for you</h2>
                    <p>
                        We are dedicated to providing the highest quality service with a focus on customer satisfaction and lasting results.
                    </p>
                    <div class="our-offer">
                        <p><i class="fa-solid fa-angles-right"></i>Licensed & Insured Professionals</p>
                        <p><i class="fa-solid fa-angles-right"></i>Upfront & Honest Pricing</p>
                        <p><i class="fa-solid fa-angles-right"></i>24/7 Emergency Availability</p>
                        <p><i class="fa-solid fa-angles-right"></i>Satisfaction Guaranteed</p>
                    </div>

                </div>
            </div>

        </div>

    </div>

    <!--here will be end of html of the homepage-->

    <!--here will be the Our Working page code-->
    <div class="our-works-container all-content" id="our-works-content">
        <section id="hero">
            <div class="hero-content">
                <h2>Quality Craftsmanship You Can See.</h2>
                <p>From routine maintenance to complex renovations, our team provides expert plumbing solutions across all of Lithuania, from the historic Old Town (Senamiestis) of Vilnius to the modern neighborhoods of whole Lithuania. We ensure quality and care in every project.</p>
                <p>View Our Recent Works</p>
                <a href="#projects" class="down-arrow-btn"><i class="fa-solid fa-arrow-down"></i></a>
            </div>
        </section>

        <section id="projects" class="projects-container">
            <h2>Our Recent Work</h2>
            <p class="section-description">We believe the best way to show our commitment to quality is through our work. Here is a selection of recent projects.</p>
            <div class="project-grid grid-2-cols">

                <div class="project-card backdrop-blur-m">
                    <img src="https://cdn.home-designing.com/wp-content/uploads/2018/05/large-luxury-bathrooms.jpg" alt="Modern Bathroom Remodel">
                    <div class="card-content">
                        <h3>Luxury Bathroom Remodel in Antakalnis</h3>
                        <div class="tags">
                            <span>Residential</span>
                            <span>Remodeling</span>
                        </div>
                        <p>Installed all plumbing for a master bathroom remodel, including a floating vanity, freestanding tub, and a multi-jet walk-in shower system.</p>
                    </div>
                </div>

                <div class="project-card backdrop-blur-m">
                    <img src="https://st.hzcdn.com/simgs/pictures/kitchens/burgundy-kitchen-ldi-studio-img~c3a152c50e95f25c_8-5817-1-2ec3cc3.jpg" alt="Kitchen Re-piping">
                    <div class="card-content">
                        <h3>Full Kitchen Re-piping in Naujamiestis</h3>
                        <div class="tags">
                            <span>Residential</span>
                            <span>Piping</span>
                        </div>
                        <p>Replaced old galvanized pipes with modern PEX piping, installed a new water heater, and upgraded all sink fixtures to improve water pressure.</p>
                    </div>
                </div>
                <div class="project-card backdrop-blur-m">
                    <img src="https://st.hzcdn.com/simgs/pictures/pools/simply-modern-vernon-wentz-img~84013d60099c72f4_8-1576-1-b2167f9.jpg" alt="Kitchen Re-piping">
                    <div class="card-content">
                        <h3>Pool renovation in Baltupiai</h3>
                        <div class="tags">
                            <span>Residential</span>
                            <span>Piping</span>
                            <span>Remodeling</span>
                        </div>
                        <p>This well-placed modern pool was designed to fit in a small space and with keeping the area open has a large feel. The use of many types of finishes gives this home a lot of character with even more charm.</p>
                    </div>
                </div>

                <div class="project-card backdrop-blur-m">
                    <img src="https://thorntonandgrooms.com/uploads/_tf/blog/_1600xAUTO_crop_center-center_none/16113/Thornton-Grooms-Sump-Pump-Repair.m1738691846.webp" alt="Sump Pump Installation">
                    <div class="card-content">
                        <h3>Emergency Sump Pump Installation</h3>
                        <div class="tags">
                            <span>Emergency</span>
                            <span>Waterproofing</span>
                        </div>
                        <p>Responded to an emergency call for a flooded basement. Installed a high-capacity sump pump with a battery backup system to prevent future issues.</p>
                    </div>
                </div>

            </div>
        </section>

        <div class="testimonials">
            <h2>What Our Clients Are Saying</h2>
            <p class="section-description">Our reputation is built on trust and customer satisfaction. We're proud to serve our community.</p>

            <div class="carousel-container">
                <div class="carousel-arrow left-arrow" id="left-arrow-review">&#10094;</div>
                <div class="card-wrapper" id="tesimony-data">
                    <?php
                    include 'php/connection.php';
                    $sql = "SELECT clientName, clientLocation, clientRating, testimony FROM reviews WHERE approved = TRUE AND archived = FALSE ORDER BY created_at DESC";
                    $result = $connection_sql->query($sql);
                    if ($result->num_rows > 0) {
                        // Output data of each row
                        while ($row = $result->fetch_assoc()) {
                            echo '<div class="testimony-card backdrop-blur-m round-corner frosted-glass">';
                            echo '<cite>~ ' . htmlspecialchars($row["clientName"]) . '</cite>';
                            echo '<address>' . htmlspecialchars($row["clientLocation"]) . '</address>';
                            echo '<div class="stars">';
                            for ($i = 0; $i < intval($row["clientRating"]); $i++) {
                                echo '<i class="fas fa-star"></i>';
                            }
                            for ($i = intval($row["clientRating"]); $i < 5; $i++) {
                                echo '<i class="fa-regular fa-star"></i>';
                            }
                            echo '</div>';
                            echo '<blockquote>"' . htmlspecialchars($row["testimony"]) . '"</blockquote>';
                            echo '</div>';
                        }
                    }
                    $connection_sql->close();
                    ?>
                </div>
                <div class="carousel-arrow right-arrow" id="right-arrow-review">&#10095;</div>
            </div>

        </div>

        <section id="add-testimonial" class="add-testimonial">
            <h2>Had a Great Experience? Leave Us a Review!</h2>
            <p class="section-description">Your review helps us and lets your neighbors know they can count on us.</p>
            <div class="backdrop-blur-l round frosted-glass testimonial-form">

                <form id="testimonial-form" method="POST">


                    <div class="form-group">
                        <label for="clientName">Your Name</label>
                        <input type="text" id="clientName" name="clientName" required maxlength="30">
                    </div>
                    <div class="form-group">
                        <label for="client-email">Your Email</label>
                        <input type="email" id="client-email-verify" name="client-email" required maxlength="35">
                    </div>
                    <div class="form-group">
                        <label for="location">Your Location (e.g., City or Neighborhood)</label>
                        <input type="text" id="location" name="location" required maxlength="50">
                    </div>

                    <div class="form-group">
                        <label>Overall Rating</label>
                        <div class="star-rating-input">
                            <i class="fa-regular fa-star" data-value="1"></i>
                            <i class="fa-regular fa-star" data-value="2"></i>
                            <i class="fa-regular fa-star" data-value="3"></i>
                            <i class="fa-regular fa-star" data-value="4"></i>
                            <i class="fa-regular fa-star" data-value="5"></i>
                        </div>
                        <input type="hidden" name="rating" id="rating-value" value="0" required>
                    </div>
                    <div class="form-group">
                        <label for="testimony" id="count-char">Your Testimony [0 / 200]</label>
                        <textarea maxlength="200" id="testimony" name="testimony" rows="5" required></textarea>
                    </div>
                    <div class="form-group-checkbox">
                        <input type="checkbox" id="consent" name="consent" required>
                        <label for="consent">I agree that my name, location, and review can be displayed on this website.</label>
                    </div>
                    <p id="status-message"></p>
                    <button type="submit" class="round-corner button ">Submit Your Review</button>

                </form>
            </div>


        </section>

    </div>

    <!--here will be the Contacts page code-->
    <div class="contact-container all-content" id="contacts-content">
        <section class="hero-contact">
            <div class="container">
                <h2>Get In Touch With Our Local Plumbing Experts</h2>
                <p>We're here to help with all your plumbing needs, big or small. Reach out today!</p>
            </div>
        </section>
        <section class="contact-details-section">
            <div class="container grid-2-cols">
                <div class="contact-card backdrop-blur-m">
                    <i class="fas fa-phone-alt icon"></i>
                    <h3>Call Us Anytime</h3>
                    <p>For immediate assistance or to schedule a service.</p>
                    <a href="tel:+37069000000" class="btn btn-primary">+370 690 00 000</a>
                </div>
                <div class="contact-card backdrop-blur-m">
                    <i class="fas fa-envelope icon"></i>
                    <h3>Email Us</h3>
                    <p>For inquiries, quotes, or non-urgent questions.</p>
                    <a href="mailto:info@pipedoctor.lt" class="btn btn-primary">info@pipedoctor.lt</a>
                </div>
                <div class="contact-card backdrop-blur-m frosted-glass">
                    <i class="fas fa-map-marker-alt icon"></i>
                    <h3>Our Location</h3>
                    <p>Serving whole area of Lithuania.</p>
                    <p>Didlaukio g. 58, Vilnius, Lithuania</p>
                </div>
                <div class="contact-card emergency-highlight backdrop-blur frosted-glass">
                    <i class="fas fa-exclamation-triangle icon"></i>
                    <h3>Emergency Service!</h3>
                    <p>Burst pipe? Leaking water heater? Don't wait!</p>
                    <a href="tel:+370 690 00 000" class="btn btn-emergency">Call Emergency: +370 690 00 000</a>
                </div>
            </div>
        </section>

        <section class="map-section">
            <div class="container">
                <h2>Our Service Area</h2>
                <p>Proudly serving homes and businesses in Lithuania and surrounding communities.</p>
                <div class="map-embed">

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d147496.0664972583!2d25.17621943806306!3d54.67243918987483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd94fb5d7c8005%3A0x400d188d8b91950!2sVilnius%2C%20Vilnius%20City%20Municipality%2C%20Lithuania!5e0!3m2!1sen!2s!4v1677610000000" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </section>

    </div>


    <!--Here will be the same footer area for every page-->
    <div class="footer-container backdrop-blur">
        <div class="footer-contents">
            <h2>Are you ready to solve your plumbing problems?</h2>
            <p>Don't wait for a small leak to become a big problem. Contact our expert team today for a free.</p>
            <div class="button round-corner">
                <a href="#">Contact us</a>
            </div>
            <p>&copy; 2025 Pipe Doctor. All rights reserved.</p>
            <div class="social-links">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>

        </div>

    </div>
    </div>
    <!--footer html end here-->
    <!--In here the js code-->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
    <script src="app.js"></script>
    <script src="index.js"></script>
</body>

</html>