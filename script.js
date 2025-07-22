document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Services Carousel Functionality (Existing)
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playPauseBtn = document.querySelector('.carousel-play-pause');
    const playPauseIcon = playPauseBtn.querySelector('i');

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 seconds

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            goToSlide(index);
            pauseAutoSlide(); // Pause if user interacts
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        if (!slideInterval) { // Prevent multiple intervals
            slideInterval = setInterval(nextSlide, intervalTime);
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        }
    }

    function pauseAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = null; // Reset interval
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseAutoSlide();
    });

    playPauseBtn.addEventListener('click', () => {
        if (slideInterval) {
            pauseAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // Initialize services carousel
    showSlide(currentSlide);
    startAutoSlide();


    // MODAL FUNCTIONALITY (Existing)
    const moreDetailsButtons = document.querySelectorAll('.more-details-btn');
    const closeButtons = document.querySelectorAll('.modal .close-button');
    const modals = document.querySelectorAll('.modal');

    moreDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceId = button.dataset.service;
            const modal = document.getElementById(`modal-${serviceId}`);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });

    // Close modal if clicking outside modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    // Handle 'Price Plans' button to link to contact form with pre-filled subject
    document.querySelectorAll('.price-plans-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Get the service name from the parent slide's h3 or data attribute
            const serviceName = e.target.closest('.carousel-slide').querySelector('h3').textContent.trim().replace(/\s*<i[^>]*>.*?<\/i>\s*/g, '').trim(); // Remove icon tag
            const subjectInput = document.getElementById('subject');
            if (subjectInput) {
                subjectInput.value = `Enquiry about Pricing for ${serviceName}`;
                document.getElementById('message').focus(); // Optionally focus on message
            }
            // Smooth scroll to contact section
            document.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Adjust modal contact button to also pre-fill subject
    document.querySelectorAll('.modal-contact-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Close the modal first
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }

            // Get the service name from the modal's h3
            const serviceName = e.target.closest('.modal-content').querySelector('h3').textContent.replace(': Deep Dive', '').trim();
            const subjectInput = document.getElementById('subject');
            if (subjectInput) {
                subjectInput.value = `Enquiry about ${serviceName}`;
                document.getElementById('message').focus();
            }
            // Smooth scroll to contact section
            document.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // NEW: Team Carousel Functionality
    const teamSlides = document.querySelectorAll('.team-carousel-slide');
    const teamDotsContainer = document.querySelector('.team-carousel-dots');
    const teamPrevBtn = document.querySelector('.team-prev-btn');
    const teamNextBtn = document.querySelector('.team-next-btn');
    const teamPlayPauseBtn = document.querySelector('.team-carousel-play-pause');
    const teamPlayPauseIcon = teamPlayPauseBtn.querySelector('i');

    let currentTeamSlide = 0;
    let teamSlideInterval;
    const teamIntervalTime = 7000; // 7 seconds for team slides, slightly longer

    // Create team dots
    teamSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('team-carousel-dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            goToTeamSlide(index);
            pauseAutoTeamSlide();
        });
        teamDotsContainer.appendChild(dot);
    });

    const teamDots = document.querySelectorAll('.team-carousel-dot');

    function showTeamSlide(index) {
        teamSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            teamDots[i].classList.remove('active');
        });
        teamSlides[index].classList.add('active');
        teamDots[index].classList.add('active');
    }

    function nextTeamSlide() {
        currentTeamSlide = (currentTeamSlide + 1) % teamSlides.length;
        showTeamSlide(currentTeamSlide);
    }

    function prevTeamSlide() {
        currentTeamSlide = (currentTeamSlide - 1 + teamSlides.length) % teamSlides.length;
        showTeamSlide(currentTeamSlide);
    }

    function goToTeamSlide(index) {
        currentTeamSlide = index;
        showTeamSlide(currentTeamSlide);
    }

    function startAutoTeamSlide() {
        if (!teamSlideInterval) {
            teamSlideInterval = setInterval(nextTeamSlide, teamIntervalTime);
            teamPlayPauseIcon.classList.remove('fa-play');
            teamPlayPauseIcon.classList.add('fa-pause');
        }
    }

    function pauseAutoTeamSlide() {
        clearInterval(teamSlideInterval);
        teamSlideInterval = null;
        teamPlayPauseIcon.classList.remove('fa-pause');
        teamPlayPauseIcon.classList.add('fa-play');
    }

    teamPrevBtn.addEventListener('click', () => {
        prevTeamSlide();
        pauseAutoTeamSlide();
    });

    teamNextBtn.addEventListener('click', () => {
        nextTeamSlide();
        pauseAutoTeamSlide();
    });

    teamPlayPauseBtn.addEventListener('click', () => {
        if (teamSlideInterval) {
            pauseAutoTeamSlide();
        } else {
            startAutoTeamSlide();
        }
    });

    // Initialize team carousel
    showTeamSlide(currentTeamSlide);
    startAutoTeamSlide();
});


