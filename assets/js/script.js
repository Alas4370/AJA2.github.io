// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add style on navbar when scrolling
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// Select all navbar links or add active css
const navLinks = document.querySelectorAll('#navbar ul li a');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        navLinks.forEach(nav => nav.classList.remove('active'));
        // Add active class to the clicked link
        this.classList.add('active');
    });
});

// Scrolly
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-center a');

    // Function to remove 'active' class from all links
    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Function to add 'active' class to the current section's nav link
    function addActiveClass(sectionId) {
        const activeLink = document.querySelector(`.navbar-center a[href="#${sectionId}"]`);
        if (activeLink) {
            removeActiveClasses();
            activeLink.classList.add('active');
        }
    }

    // Scroll event listener to track current section
    window.addEventListener('scroll', function () {
        let currentSection = '';

        // If scrolled to the very top of the page, activate 'Home' link
        if (window.scrollY === 0) {
            currentSection = 'hero'; // Set 'hero' (Home) section as active
        } else {
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const nextSection = sections[index + 1]; // Check if there is a next section

                // Regular case: Trigger when section reaches the top of the viewport   
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }

                // Check if the section's top is at the very top of the viewport
                if (sectionTop >= 0 && sectionTop == sectionHeight) {
                    currentSection = section.getAttribute('id');
                }

                // Special case for the last section: Activate when nearing the bottom of the page
                if (!nextSection && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    currentSection = section.getAttribute('id'); // Last section becomes active
                }
            });
        }

        // Update the active link based on the current section
        if (currentSection) {
            addActiveClass(currentSection);
        }
    });
});

// Some transition effects when scrolling
document.addEventListener('DOMContentLoaded', function () {
    const elementsToCheck = [
        document.querySelectorAll('.section-title'),
        document.querySelectorAll('#about .container p'),
        document.querySelectorAll('.resume-item'),
        document.querySelectorAll('.contact-wrap')
    ];

    function checkVisibility() {
        const triggerBottom = window.innerHeight / 5 * 4; // Adjusts when to trigger the animation
        elementsToCheck.forEach(group => {
            group.forEach(item => {
                const boxTop = item.getBoundingClientRect().top;
                if (boxTop < triggerBottom) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            });
        });
    }

    // Initial check
    checkVisibility();

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
});

// Navbar Toggle
const toggleButton = document.querySelector('.navbar-toggle');
const navbarCenter = document.querySelector('.navbar-center');
const navbarRight = document.querySelector('.navbar-right');

toggleButton.addEventListener('click', () => {
    navbarCenter.classList.toggle('show'); // Toggle visibility of navbar-center
    navbarRight.classList.toggle('show'); // Toggle visibility of navbar-right
});

// Download PDF Resume
function downloadPDF() {
    const link = document.createElement('a');
    link.href = 'https://alas4370.github.io/AJA2.github.io/assets/pdf/AJA_Resume.pdf'; // Replace with the actual path to your PDF file
    link.download = 'AJA_Resume.pdf'; // Replace with the desired file name for download
    link.click();
}

// Function to animate percentage value
function animatePercentage(element, targetValue) {
    let currentValue = 0;
    const interval = setInterval(() => {
        if (currentValue < targetValue) {
            currentValue++;
            element.innerHTML = currentValue + '%';
        } else {
            clearInterval(interval);
        }
    }, 20); // Speed of the percentage increment
}

// Function to animate progress bar
function animateProgressBar(element) {
    const targetValue = element.getAttribute('data-progress');
    const duration = targetValue * 0.02; // Transition duration proportional to the value

    // Reset progress bar for animation
    element.style.transition = 'none'; // Disable transition for reset
    element.style.width = '0'; // Set width to 0 for reset
    // Force reflow (flush CSS changes to make sure reset is applied)
    element.offsetHeight; // Trigger a reflow to apply the width = 0
    setTimeout(() => {
        // Enable smooth transition again and animate to the target width
        element.style.transition = `width ${duration}s ease`;
        element.style.width = targetValue + '%'; // Animate to the target width
    }, 100); // Delay to ensure reset is visible
}

// Set up Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the progress bar enters the center of the viewport
            const progressBar = entry.target.querySelector('.progress-bar');
            const percentage = entry.target.querySelector('.val');

            // Reset the percentage value
            percentage.innerHTML = '0%';

            // Animate both the progress bar and the percentage value
            const targetValue = parseInt(percentage.getAttribute('data-value'));
            animatePercentage(percentage, targetValue);
            animateProgressBar(progressBar);
        }
    });
}, {
    root: null, // Use the viewport as the root
    threshold: 0.5 // Trigger when 50% of the element is in the viewport
});

// Observe all progress elements
document.querySelectorAll('.progress').forEach(progress => {
    observer.observe(progress);
});