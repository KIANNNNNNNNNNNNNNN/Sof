 // Function to go back
 function goBack() {
    window.location.href = 'index.html';
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const progressBar = document.getElementById('progressBar');
    const submitButton = document.getElementById('submitButton');

    // Validate email format
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Update progress bar based on form completion
    function updateProgressBar() {
        let progress = 0;
        
        if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) {
            progress += 50;
        }
        
        if (passwordInput.value.length >= 6) {
            progress += 50;
        }
        
        progressBar.style.setProperty('--progress', `${progress}%`);
        progressBar.querySelector('::after').style.width = `${progress}%`;
    }

    // Event listeners for real-time validation
    emailInput.addEventListener('input', function() {
        if (!isValidEmail(this.value.trim())) {
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
        updateProgressBar();
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.length < 6) {
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
        updateProgressBar();
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        
        if (!isValidEmail(emailInput.value.trim())) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        if (passwordInput.value.length < 6) {
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }
        
        if (isValid) {
            // Form is valid, proceed with submission
            alert('Form submitted successfully!');
            // Here you would typically send the data to a server
            // For example: fetch('/api/signup', { method: 'POST', body: JSON.stringify({ email: emailInput.value, password: passwordInput.value }) });
            
            // Reset form
            form.reset();
            progressBar.querySelector('::after').style.width = '0%';
        }
    });

    // Initialize progress bar
    progressBar.style.setProperty('--progress', '0%');
});

document.getElementById('submitButton').addEventListener('click', function() {
    window.location.href = 'account/account.html'; 
});