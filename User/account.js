document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation elements
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('nav a');
    
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
    
    // Check for stored active nav on page load
    const storedActiveNav = localStorage.getItem('activeNav');
    if (storedActiveNav) {
        setActiveNav(storedActiveNav);
    }
    
    // Update active nav on scroll (optional)
    window.addEventListener('scroll', function() {
        // You can keep this if you want scroll-based highlighting too
        // But it might conflict with the click-based persistence
    });
});

// Function to open the modal
function openModal() {
    const modal = document.getElementById('loanModal');
    modal.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('loanModal');
    modal.style.display = 'none';
}

// Function to handle card redirects
function redirectToForm(cardType) {
    const type = cardType.toLowerCase(); // Keep it lowercase
    window.location.href = `form(${type}).html`; // Use correct naming convention
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get the apply now button and add click handler
    const applyButton = document.querySelector('.start-btn');
    if (applyButton) {
        applyButton.addEventListener('click', openModal);
    }

    const modal = document.getElementById('loanModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Prevent closing when clicking inside the modal
        if (modalContent) {
            modalContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }

        // Add click handlers for the cards
        const cards = document.querySelectorAll('.loan-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                // Get the card type from the h2 text content
                const cardType = this.querySelector('h2').textContent.trim();
                redirectToForm(cardType);
            });
        });
    }
});

document.getElementById('dashboard').addEventListener('click', function() {
    window.location.href = 'dashboard.html'; 
});