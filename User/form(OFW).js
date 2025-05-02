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
        // Allow backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13].includes(e.keyCode) ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) || 
            (e.keyCode === 67 && e.ctrlKey === true) || 
            (e.keyCode === 86 && e.ctrlKey === true) || 
            (e.keyCode === 88 && e.ctrlKey === true) ||
            // Allow home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
        }
        // Ensure it's a number
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }

    function validateContactNumber(input) {
        // Remove non-numeric characters
        input.value = input.value.replace(/\D/g, '');
        
        // Limit to 11 digits and starts with 09
        if (input.value.length > 11) {
            input.value = input.value.slice(0, 11);
        }
        
        if (input.value.length > 0 && !input.value.startsWith('09')) {
            input.setCustomValidity('Contact number must start with 09');
        } else {
            input.setCustomValidity('');
        }
    }

    function validateAge(input) {
        // Remove non-numeric characters
        input.value = input.value.replace(/\D/g, '');
        
        // Limit to 2 digits (max 99)
        if (input.value.length > 2) {
            input.value = input.value.slice(0, 2);
        }
        
        // Validate range
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

    document.getElementById('age').addEventListener('input', function() {
        validateAge(this);
    });

    document.getElementById('email').addEventListener('input', function() {
        validateEmail(this);
    });

    // Character References Management
    const referencesContainer = document.getElementById('referencesContainer');
    const addReferenceBtn = document.getElementById('addReference');

    function createReferenceTemplate() {
        const reference = document.createElement('div');
        reference.className = 'reference-item';
        reference.innerHTML = `
            <button type="button" class="remove-btn">Remove</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Address:</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Employer:</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Contact Information:</label>
                    <input type="tel" required>
                </div>
                <div class="form-group">
                    <label>Relationship to Applicant:</label>
                    <input type="text" required>
                </div>
            </div>
        `;
        
        // Add validation to the new contact field
        const telInput = reference.querySelector('input[type="tel"]');
        telInput.addEventListener('input', () => validateContactNumber(telInput));
        
        return reference;
    }

    // Add initial reference
    referencesContainer.appendChild(createReferenceTemplate());

    addReferenceBtn.addEventListener('click', () => {
        if (referencesContainer.children.length < 3) {
            referencesContainer.appendChild(createReferenceTemplate());
        }
    });

    // Siblings Management
    const siblingsContainer = document.getElementById('siblingsContainer');
    const addSiblingBtn = document.getElementById('addSibling');

    function createSiblingTemplate() {
        const sibling = document.createElement('div');
        sibling.className = 'sibling-item';
        sibling.innerHTML = `
            <button type="button" class="remove-btn">Remove</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text">
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email">
                </div>
                <div class="form-group">
                    <label>Contact No.:</label>
                    <input type="tel">
                </div>
                <div class="form-group full-width">
                    <label>Address in Philippines:</label>
                    <input type="text">
                </div>
            </div>
        `;
        
        // Add validation to the new fields
        const telInput = sibling.querySelector('input[type="tel"]');
        if (telInput) {
            telInput.addEventListener('input', () => validateContactNumber(telInput));
        }
        
        const emailInput = sibling.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                validateEmail(this);
            });
        }
        
        return sibling;
    }

    addSiblingBtn.addEventListener('click', () => {
        if (siblingsContainer.children.length < 3) {
            siblingsContainer.appendChild(createSiblingTemplate());
        }
    });

    // Handle remove buttons for both references and siblings
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            e.target.closest('.reference-item, .sibling-item').remove();
        }
    });

    // Spouse Management
    const spouseContainer = document.getElementById('spouseContainer');
    const addSpouseBtn = document.getElementById('addSpouse');

    function createSpouseTemplate() {
        const spouse = document.createElement('div');
        spouse.className = 'spouse-item';
        spouse.innerHTML = `
            <button type="button" class="remove-btn">Remove</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text">
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email">
                </div>
                <div class="form-group">
                    <label>Contact No.:</label>
                    <input type="tel">
                </div>
                <div class="form-group full-width">
                    <label>Address in Philippines:</label>
                    <input type="text">
                </div>
            </div>
        `;
        
        // Add validation to the new fields
        const telInput = spouse.querySelector('input[type="tel"]');
        if (telInput) {
            telInput.addEventListener('input', () => validateContactNumber(telInput));
        }
        
        const emailInput = spouse.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                validateEmail(this);
            });
        }
        
        return spouse;
    }

    // Optional: Allow only 1 spouse
    addSpouseBtn.addEventListener('click', () => {
        if (spouseContainer.children.length < 1) {
            spouseContainer.appendChild(createSpouseTemplate());
        }
    });

    // Form submission
    const form = document.getElementById('loanForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        // Get all required input fields
        const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let allFilled = true;
    
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.border = '2px solid red'; // Optional: Highlight missing fields
            } else {
                input.style.border = ''; // Reset border if valid
            }
        });
    
        if (allFilled) {
            // All fields are filled, go to next step
            window.location.href = 'files(OFW).html';
        } else {
            alert('Please fill in all required fields before proceeding.');
        }
    });
});

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