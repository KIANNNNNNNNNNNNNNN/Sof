document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation elements
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('nav a');
    const startNowBtn = document.querySelector('.start-btn');
    
    // Function to handle smooth scrolling
    function smoothScroll(target) {
        if (target === '#' || target === '') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetElement = document.querySelector(target);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Function to set active nav link
    function setActiveNav(target) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === target) {
                link.classList.add('active');
            }
        });
    }
    
    // Add click event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            setActiveNav(target);
            smoothScroll(target);
            
            // Store the active link in localStorage
            localStorage.setItem('activeNav', target);
        });
    });
    
    // Add click event listener for logo
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNav('#');
            smoothScroll('#');
            localStorage.setItem('activeNav', '#');
        });
    }
    
    // Add event listener for Start Now button
    if (startNowBtn) {
        startNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('.register');
        });
    }
    
    const storedActiveNav = localStorage.getItem('activeNav');
    if (storedActiveNav) {
        setActiveNav(storedActiveNav);
    }
    
    // Update active nav on scroll (optional)
    window.addEventListener('scroll', function() {
    });
});

document.getElementById('signupButton').addEventListener('click', function() {
    window.location.href = 'signup.php'; 
});

document.getElementById('loginButton').addEventListener('click', function() {
    window.location.href = 'login.php'; 
});