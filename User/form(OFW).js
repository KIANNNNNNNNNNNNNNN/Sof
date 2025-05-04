document.addEventListener('DOMContentLoaded', () => {
    // Payment method selection
    const methods = document.querySelectorAll('.method');
    methods.forEach(method => {
        method.addEventListener('click', () => {
            methods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
        });
    });

    // Input validation functions
    function validateNumericInput(e) {
        if ([46, 8, 9, 27, 13].includes(e.keyCode) || // Allow backspace, delete, tab, escape, enter
            (e.keyCode === 65 && e.ctrlKey === true) || // Allow Ctrl+A
            (e.keyCode === 67 && e.ctrlKey === true) || // Allow Ctrl+C
            (e.keyCode === 86 && e.ctrlKey === true) || // Allow Ctrl+V
            (e.keyCode === 88 && e.ctrlKey === true) || // Allow Ctrl+X
            (e.keyCode >= 35 && e.keyCode <= 39)) { // Allow home, end, left, right
            return;
        }
        // Ensure it's a number
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }

    function validateContactNumber(input) {
        input.value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (input.value.length > 11) {
            input.value = input.value.slice(0, 11); // Limit to 11 digits
        }
        if (input.value.length > 0 && !input.value.startsWith('09')) {
            input.setCustomValidity('Contact number must start with 09');
        } else {
            input.setCustomValidity('');
        }
    }

    function validateAge(input) {
        input.value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (input.value.length > 2) {
            input.value = input.value.slice(0, 2); // Limit to 2 digits
        }
        const age = parseInt(input.value) || 0;
        if (age < 18 || age > 99) {
            input.setCustomValidity('Age must be between 18 and 99');
        } else {
            input.setCustomValidity('');
        }
    }

    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            input.setCustomValidity('Please enter a valid email address');
        } else {
            input.setCustomValidity('');
        }
    }

    // Set up input validation
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('keydown', validateNumericInput);
    });

    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', () => validateContactNumber(input));
    });

    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.addEventListener('input', function () {
            validateAge(this);
        });
    }

    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function () {
            validateEmail(this);
        });
    }

    // Form submission
    const form = document.getElementById('loanForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            // Validate required fields
            const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.border = '2px solid red'; // Highlight missing fields
                } else {
                    input.style.border = ''; // Reset border if valid
                }
            });

            if (!isValid) {
                e.preventDefault(); // Prevent form submission if validation fails
                alert('Please fill in all required fields.');
            }
        });
    }

    // Step navigation
    const steps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const prevBtns = document.querySelectorAll(".prev-btn");

    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });
    }

    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    // Initially show the first step
    showStep(currentStep);
});