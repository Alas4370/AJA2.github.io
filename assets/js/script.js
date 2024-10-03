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
        document.querySelectorAll('.skills-half-left'),
        document.querySelectorAll('.skills-half-right'),
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