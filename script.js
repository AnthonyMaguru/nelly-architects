// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
        document.querySelector('nav ul').classList.remove('show');
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-buttons button');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Initialize all sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(n) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        slides[n].classList.add('active');
        slides[n].style.opacity = '1';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance hero slides every 5 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');

    function showTestimonial(n) {
        testimonials.forEach(t => {
            t.classList.remove('active');
            t.style.opacity = '0';
            t.style.transform = 'translateX(100%)';
        });
        testimonials[n].classList.add('active');
        testimonials[n].style.opacity = '1';
        testimonials[n].style.transform = 'translateX(0)';
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Set up testimonial controls
    if (testimonials.length > 0) {
        let testimonialInterval = setInterval(nextTestimonial, 4000);

        // Add click event listeners to the navigation buttons
        prevButton.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            prevTestimonial();
            testimonialInterval = setInterval(nextTestimonial, 4000);
        });

        nextButton.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            nextTestimonial();
            testimonialInterval = setInterval(nextTestimonial, 4000);
        });
    }

    // Add click handlers for the controls
    document.querySelector('.prev-testimonial').addEventListener('click', () => {
        clearInterval(intervalId); // Stop auto-advance when user interacts
        prevTestimonial();
    });

    document.querySelector('.next-testimonial').addEventListener('click', () => {
        clearInterval(intervalId); // Stop auto-advance when user interacts
        nextTestimonial();
    });
});

// Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});