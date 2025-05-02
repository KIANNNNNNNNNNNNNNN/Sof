document.addEventListener('DOMContentLoaded', function() {
    loadApplicationsData();
    setupFilters();
    setupFormNavigation();
    setupApprovalForm();
});

function loadApplicationsData(type = 'all', status = 'all', searchTerm = '') {
    const tableBody = document.getElementById('applications-table');
    if (!tableBody) return;
    
    // Filter applications based on criteria
    let filteredApplications = [...applicationData];
    
    // Filter by type
    if (type !== 'all') {
        filteredApplications = filteredApplications.filter(app => app.type === type);
    }
    
    // Filter by status
    if (status !== 'all') {
        filteredApplications = filteredApplications.filter(app => app.status === status);
    }
    
    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredApplications = filteredApplications.filter(app => 
            app.name.toLowerCase().includes(term) || 
            app.id.toLowerCase().includes(term)
        );
    }
    
    // Sort by most recent date
    filteredApplications.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update section title based on filters
    updateSectionTitle(type, status);
    
    let tableContent = '';
    
    if (filteredApplications.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="empty-state">No applications found matching the criteria</td></tr>';
        return;
    }
    
    filteredApplications.forEach(app => {
        tableContent += `
            <tr>
                
                <td>${app.id}</td>
                <td>${app.name}</td>
                <td>${app.type === 'ofw' ? 'OFW' : 'STUDENT'}</td>
                <td><span class="status ${getStatusClass(app.status)}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span></td>
                <td>${formatDate(app.date)}</td>
                <td><button class="btn secondary" onclick="openApplicationModal('${app.id}')">View</button></td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableContent;
}

function setupFormNavigation() {
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStep = currentStep.nextElementSibling;
            
            if (nextStep && nextStep.classList.contains('form-step')) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
            } else {
                // Show loan approval section when reaching the end of the form
                const loanApproval = document.getElementById('loanApproval');
                if (loanApproval) {
                    loanApproval.style.display = 'block';
                }
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStep = currentStep.previousElementSibling;
            
            if (prevStep && prevStep.classList.contains('form-step')) {
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
            }
        });
    });
}

function setupApprovalForm() {
    const approvalOptions = document.querySelectorAll('.approval-option');
    const approvalDetails = document.querySelectorAll('.approval-details');
    const approvalForm = document.getElementById('approvalForm');
    
    approvalOptions.forEach(option => {
        option.addEventListener('click', function() {
            const status = this.dataset.status;
            
            // Remove selected class from all options
            approvalOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Hide all detail sections
            approvalDetails.forEach(detail => detail.classList.remove('active'));
            
            // Show relevant detail section
            const detailSection = document.getElementById(`${status}Details`);
            if (detailSection) {
                detailSection.classList.add('active');
            }
        });
    });
    
    if (approvalForm) {
        approvalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedOption = document.querySelector('.approval-option.selected');
            if (!selectedOption) {
                alert('Please select a decision (Approve, On Hold, or Decline)');
                return;
            }
            
            const status = selectedOption.dataset.status;
            const applicationId = this.dataset.applicationId;
            
            let decisionData = {
                status: status
            };
            
            // Collect relevant data based on status
            if (status === 'approved') {
                decisionData.approvedAmount = document.getElementById('approvedAmount').value;
                decisionData.monthlyAmortization = document.getElementById('monthlyAmortization').value;
                decisionData.termsOfPayment = document.getElementById('termsOfPayment').value;
            } else if (status === 'on-hold') {
                decisionData.requiredDocs = document.getElementById('requiredDocs').value;
            } else if (status === 'declined') {
                decisionData.declineReason = document.getElementById('declineReason').value;
            }
            
            // Update application status
            updateApplicationStatus(applicationId, decisionData);
        });
    }
}

function updateApplicationStatus(applicationId, decisionData) {
    const appIndex = applicationData.findIndex(app => app.id === applicationId);
    if (appIndex === -1) return false;
    
    applicationData[appIndex].status = decisionData.status;
    
    // Add decision details based on status
    if (decisionData.status === 'approved') {
        applicationData[appIndex].loan = {
            loanAmount: parseFloat(decisionData.approvedAmount),
            monthlyPayment: parseFloat(decisionData.monthlyAmortization),
            termsTotal: parseInt(decisionData.termsOfPayment),
            termsPaid: 0,
            totalPaid: 0,
            payments: []
        };
    } else if (decisionData.status === 'on-hold') {
        applicationData[appIndex].requiredDocs = decisionData.requiredDocs;
    } else if (decisionData.status === 'declined') {
        applicationData[appIndex].declineReason = decisionData.declineReason;
    }
    
    // Close modal
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.classList.remove('open');
    }
    
    // Refresh page data
    loadApplicationsData();
    
    return true;
}

function openApplicationModal(applicationId) {
    const application = applicationData.find(app => app.id === applicationId);
    if (!application) return;
    
    // Populate form fields with application data
    populateApplicationForm(application);
    
    // Show submitted documents
    populateFilesList(application);
    
    // Set up approval form
    const approvalForm = document.getElementById('approvalForm');
    if (approvalForm) {
        approvalForm.dataset.applicationId = applicationId;
    }
    
    // Show/hide approval section based on status
    const loanApproval = document.getElementById('loanApproval');
    if (loanApproval) {
        loanApproval.style.display = application.status === 'pending' ? 'block' : 'none';
    }
    
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.classList.add('open');
    }
}

function populateApplicationForm(application) {
    // Populate personal information
    document.querySelector('input[type="text"][required]').value = application.name;
    document.querySelector('input[type="email"]').value = application.details.personalInfo.email;
    document.querySelector('input[type="tel"]').value = application.details.personalInfo.phone;
    // ... populate other fields
}

function populateFilesList(application) {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;
    
    // Example files (in a real application, these would come from the database)
    const files = [
        { name: 'Passport', type: 'image' },
        { name: 'Visa', type: 'image' },
        { name: 'OEC', type: 'image' },
        { name: 'Proof Of Residence in Philippines', type: 'image' },
        { name: 'NBI', type: 'image' },
        { name: 'Government ID', type: 'image' },
        { name: 'Payslip', type: 'image' },
        { name: 'Business Permit', type: 'image' }
    ];
    
    let fileContent = '';
    files.forEach(file => {
        fileContent += `
            <div class="file-item">
                <div class="file-name">${file.name}</div>
                <div class="file-actions">
                    <button class="btn secondary" onclick="viewFile('${file.name}')">View</button>

                </div>
            </div>
        `;
    });
    
    fileList.innerHTML = fileContent;
}

// Mock functions for file handling
function viewFile(fileName) {
    alert(`Viewing ${fileName}`);
}

function downloadFile(fileName) {
    alert(`Downloading ${fileName}`);
}

function setupFilters() {
    const applicationType = document.getElementById('applicationType');
    const applicationStatus = document.getElementById('applicationStatus');
    const searchApplication = document.getElementById('searchApplication');
    
    // Type filter change
    if (applicationType) {
        applicationType.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    // Status filter change
    if (applicationStatus) {
        applicationStatus.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    // Search input
    if (searchApplication) {
        searchApplication.addEventListener('input', function() {
            applyFilters();
        });
    }
}

function applyFilters() {
    const type = document.getElementById('applicationType').value;
    const status = document.getElementById('applicationStatus').value;
    const searchTerm = document.getElementById('searchApplication').value;
    
    loadApplicationsData(type, status, searchTerm);
}

function updateSectionTitle(type, status) {
    const sectionTitle = document.getElementById('applications-section-title');
    if (!sectionTitle) return;
    
    let title = '';
    
    // Type part
    if (type === 'all') {
        title += 'All';
    } else if (type === 'ofw') {
        title += 'OFW';
    } else if (type === 'student') {
        title += 'STUDENT';
    }
    
    title += ' Applications';
    
    // Status part
    if (status !== 'all') {
        title += ` - ${status.charAt(0).toUpperCase() + status.slice(1)}`;
    }
    
    sectionTitle.textContent = title;
}

// Function to refresh page data
function refreshPageData() {
    applyFilters();
}