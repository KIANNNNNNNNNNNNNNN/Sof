document.addEventListener('DOMContentLoaded', () => {
    // Payment method selection
    const methods = document.querySelectorAll('.method');
    methods.forEach(method => {
        method.addEventListener('click', () => {
            methods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
        });
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
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Relationship to Applicant:</label>
                    <input type="text" required>
                </div>
            </div>
        `;
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

