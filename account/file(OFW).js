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
            // Here you would typically handle the file upload to a server
            console.log(`Uploading ${file.name} for ${requirementType}`);
            alert(`File "${file.name}" selected for ${requirementType}. Upload functionality would be implemented here.`);
        }
    };
    input.click();
}

// Initialize the requirements lists
document.addEventListener('DOMContentLoaded', () => {
    const applicantList = document.getElementById('applicant-requirements');
    const coBorrowerList = document.getElementById('coborrower-requirements');

    applicantRequirements.forEach(req => {
        applicantList.appendChild(createRequirementCard(req));
    });

    coBorrowerRequirements.forEach(req => {
        coBorrowerList.appendChild(createRequirementCard(req));
    });

    // Add submit button functionality
    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', () => {
        alert('Form submission would be implemented here.');
    });

    const backButton = document.querySelector('.back-button'); // Assuming you have a back button with class 'back-button'
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'form(OFW).html';
        });
    }
});