// Document requirement data
const applicantRequirements = [
    { title: "PASSPORT", isBold: true },
    { title: "VISA", isBold: true },
    { title: "OEC", subtitle: "(OVERSEAS EMPLOYMENT CERTIFICATE)", isBold: true },
    { title: "PROOF OF RESIDENCE IN PHILIPPINES", isBold: true },
    { title: "NBI", subtitle: "or POLICE CLEARANCE", isBold: true },
];

const coBorrowerRequirements = [
    { title: "GOVERNMENT ID", isBold: true },
    { title: "PAYSLIP", subtitle: "or CERTIFICATE OF EMPLOYMENT", isBold: true },
    {
        title: "BUSINESS PERMIT",
        subtitle: "and LATEST AUDITED FINANCIAL STATEMENT and ITR",
        isBold: true,
        multiline: true,
    },
];

// Function to create requirement cards
function createRequirementCard(requirement) {
    const card = document.createElement('div');
    card.className = 'requirement-card';
    if (requirement.multiline) {
        card.style.height = '137px';
    }

    const titleDiv = document.createElement('div');
    titleDiv.className = `requirement-title ${requirement.isBold ? 'bold' : ''}`;
    titleDiv.textContent = requirement.title;
    if (requirement.subtitle) {
        const subtitle = document.createElement('span');
        subtitle.style.fontWeight = 'normal';
        subtitle.textContent = ' ' + requirement.subtitle;
        titleDiv.appendChild(subtitle);
    }

    const uploadButton = document.createElement('button');
    uploadButton.className = 'upload-button';
    uploadButton.textContent = 'UPLOAD';
    uploadButton.addEventListener('click', () => handleUpload(requirement.title));

    card.appendChild(titleDiv);
    card.appendChild(uploadButton);

    return card;
}

// Function to handle file upload
function handleUpload(requirementType) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(`Uploading ${file.name} for ${requirementType}`);
        }
    };
    input.click();
}

// Function to show success message
function showSuccessMessage() {
    const successPopup = document.createElement('div');
    successPopup.className = 'success-popup';
    successPopup.innerHTML = `
        <div class="success-content">
            <p>Submitted successfully!</p>
        </div>
    `;
    document.body.appendChild(successPopup);
    
    // Remove the popup after 3 seconds
    setTimeout(() => {
        successPopup.remove();
    }, 3000);
}

// Function to show GDPR popup
function showGDPRPopup() {
    const gdprPopup = document.getElementById('gdprPopup');
    gdprPopup.style.display = 'block';
    
    // Add event listener to close button
    const closeBtn = gdprPopup.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        gdprPopup.style.display = 'none';
    });
    
    // Add event listener to confirm button
    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.addEventListener('click', () => {
        const isChecked = document.getElementById('gdprConsent').checked;
        if (isChecked) {
            // Hide GDPR popup
            gdprPopup.style.display = 'none';
            // Show success message
            showSuccessMessage();
        } else {
            alert('Please agree to the GDPR terms before submitting.');
        }
    });
    
    // Close popup when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === gdprPopup) {
            gdprPopup.style.display = 'none';
        }
    });
}

// Initialize the requirements lists and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    const applicantList = document.getElementById('applicant-requirements');
    const coBorrowerList = document.getElementById('coborrower-requirements');

    applicantRequirements.forEach(req => {
        applicantList.appendChild(createRequirementCard(req));
    });

    coBorrowerRequirements.forEach(req => {
        coBorrowerList.appendChild(createRequirementCard(req));
    });

    // Update submit button functionality to show GDPR popup
    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        showGDPRPopup();
    });

    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'form(OFW).html';
        });
    }
    
    // Initially hide the GDPR popup
    document.getElementById('gdprPopup').style.display = 'none';
});