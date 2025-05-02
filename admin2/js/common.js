// Common JavaScript functionality used across all pages

// Toggle sidebar
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // For mobile view
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('expanded');
            }
        });
    }
    
    // Close any open modals with the close button
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('open');
            }
        });
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const openModals = document.querySelectorAll('.modal.open');
        openModals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('open');
            }
        });
    });
});

// Format currency
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Get status class
function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'approved':
            return 'approved';
        case 'pending':
            return 'pending';
        case 'declined':
            return 'declined';
        default:
            return '';
    }
}

// Open application modal
function openApplicationModal(applicationId) {
    const application = applicationData.find(app => app.id === applicationId);
    if (!application) return;
    
    const modalBody = document.getElementById('applicationModalBody');
    if (!modalBody) return;
    
    let modalContent = '';
    
    // Basic application details
    modalContent += `
        <div class="application-detail">
            <h3>Application Information</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Application No.</span>
                    <span class="detail-value">${application.id}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Applicant Name</span>
                    <span class="detail-value">${application.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Application Type</span>
                    <span class="detail-value">${application.type === 'ofw' ? 'OFW' : 'STUDENT'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Status</span>
                    <span class="status ${getStatusClass(application.status)}">${application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Date Applied</span>
                    <span class="detail-value">${formatDate(application.date)}</span>
                </div>
            </div>
        </div>
    `;
    
    // Personal information
    modalContent += `
        <div class="application-detail">
            <h3>Personal Information</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Age</span>
                    <span class="detail-value">${application.details.personalInfo.age}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Gender</span>
                    <span class="detail-value">${application.details.personalInfo.gender}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${application.details.personalInfo.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${application.details.personalInfo.phone}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Address</span>
                    <span class="detail-value">${application.details.personalInfo.address}</span>
                </div>
            </div>
        </div>
    `;
    
    // OFW specific information
    if (application.type === 'ofw') {
        modalContent += `
            <div class="application-detail">
                <h3>Employment Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Employer</span>
                        <span class="detail-value">${application.details.employmentInfo.employer}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Position</span>
                        <span class="detail-value">${application.details.employmentInfo.position}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Country</span>
                        <span class="detail-value">${application.details.employmentInfo.country}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Monthly Income</span>
                        <span class="detail-value">${application.details.employmentInfo.monthlyIncome}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Years Employed</span>
                        <span class="detail-value">${application.details.employmentInfo.yearsEmployed}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Student specific information
    if (application.type === 'student') {
        modalContent += `
            <div class="application-detail">
                <h3>Education Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">University</span>
                        <span class="detail-value">${application.details.educationInfo.university}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Course</span>
                        <span class="detail-value">${application.details.educationInfo.course}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Year Level</span>
                        <span class="detail-value">${application.details.educationInfo.yearLevel}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">GPA</span>
                        <span class="detail-value">${application.details.educationInfo.gpa}</span>
                    </div>
                </div>
            </div>
            <div class="application-detail">
                <h3>Guardian Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Name</span>
                        <span class="detail-value">${application.details.guardianInfo.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Relationship</span>
                        <span class="detail-value">${application.details.guardianInfo.relationship}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Occupation</span>
                        <span class="detail-value">${application.details.guardianInfo.occupation}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Monthly Income</span>
                        <span class="detail-value">${application.details.guardianInfo.monthlyIncome}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Loan information
    modalContent += `
        <div class="application-detail">
            <h3>Loan Request</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Requested Amount</span>
                    <span class="detail-value">${application.details.loanInfo.requestedAmount}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Purpose</span>
                    <span class="detail-value">${application.details.loanInfo.purpose}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Preferred Terms</span>
                    <span class="detail-value">${application.details.loanInfo.preferredTerms} months</span>
                </div>
            </div>
        </div>
    `;
    
    // Status update buttons (if pending)
    if (application.status === 'pending') {
        modalContent += `
            <div class="action-buttons">
                <button class="btn primary" onclick="updateApplicationStatus('${application.id}', 'approved')">Approve</button>
                <button class="btn secondary" onclick="updateApplicationStatus('${application.id}', 'declined')">Decline</button>
            </div>
        `;
    }
    
    modalBody.innerHTML = modalContent;
    
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.classList.add('open');
    }
}

// Open payment modal
function openPaymentModal(applicationId) {
    const application = applicationData.find(app => app.id === applicationId);
    if (!application || !application.loan) return;
    
    const modalBody = document.getElementById('paymentModalBody');
    if (!modalBody) return;
    
    const loan = application.loan;
    const remainingTerms = loan.termsTotal - loan.termsPaid;
    const remainingAmount = loan.loanAmount - loan.totalPaid;
    const progressPercentage = (loan.termsPaid / loan.termsTotal) * 100;
    
    let modalContent = '';
    
    // Loan details
    modalContent += `
        <div class="loan-detail">
            <h3>Borrower Information</h3>
            <div class="loan-info">
                <div class="loan-info-item">
                    <span class="loan-info-label">Borrower Name</span>
                    <span class="loan-info-value">${application.name}</span>
                </div>
                <div class="loan-info-item">
                    <span class="loan-info-label">Application No.</span>
                    <span class="loan-info-value">${application.id}</span>
                </div>
                <div class="loan-info-item">
                    <span class="loan-info-label">Loan Type</span>
                    <span class="loan-info-value">${application.type === 'ofw' ? 'OFW' : 'STUDENT'}</span>
                </div>
                <div class="loan-info-item">
                    <span class="loan-info-label">Date Approved</span>
                    <span class="loan-info-value">${formatDate(application.date)}</span>
                </div>
            </div>
        </div>
    
        <div class="loan-detail">
            <h3>Loan Details</h3>
            <div class="loan-info">
                <div class="loan-info-item">
                    <span class="loan-info-label">Loan Amount</span>
                    <span class="loan-info-value">${formatCurrency(loan.loanAmount)}</span>
                </div>
                <div class="loan-info-item">
                    <span class="loan-info-label">Monthly Payment</span>
                    <span class="loan-info-value">${formatCurrency(loan.monthlyPayment)}</span>
                </div>
                <div class="loan-info-item">
                    <span class="loan-info-label">Total Terms</span>
                    <span class="loan-info-value">${loan.termsTotal} months</span>
                </div>
                <div class="loan-info-item">
                    <span class="loan-info-label">Terms Paid</span>
                    <span class="loan-info-value">${loan.termsPaid} months</span>
                </div>
                <div class="loan-info-item">
                    <span class="loan-info-label">Terms Remaining</span>
                    <span class="loan-info-value">${remainingTerms} months</span>
                </div>
                <div class="loan-info-item">
                    <span class="loan-info-label">Total Paid</span>
                    <span class="loan-info-value">${formatCurrency(loan.totalPaid)}</span>
                </div>
                <div class="loan-info-item">
                    <span class="loan-info-label">Remaining Balance</span>
                    <span class="loan-info-value">${formatCurrency(remainingAmount)}</span>
                </div>
            </div>
            
            <div class="loan-progress">
                <span class="loan-info-label">Repayment Progress</span>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="progress-info">
                    <span>${Math.round(progressPercentage)}% Complete</span>
                    <span class="terms-remaining">${remainingTerms} payments remaining</span>
                </div>
            </div>
        </div>
    `;
    
    // Payment history
    if (loan.payments && loan.payments.length > 0) {
        modalContent += `
            <div class="payment-history">
                <h3>Payment History</h3>
                <div class="payment-list">
        `;
        
        loan.payments.forEach(payment => {
            modalContent += `
                <div class="payment-item">
                    <span class="payment-date">${formatDate(payment.date)}</span>
                    <span class="payment-amount">${formatCurrency(payment.amount)}</span>
                </div>
            `;
        });
        
        modalContent += `
                </div>
            </div>
        `;
    }
    
    modalBody.innerHTML = modalContent;
    
    // Set up payment form with application ID
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.setAttribute('data-application-id', applicationId);
        
        // Set today as default date
        const paymentDate = document.getElementById('paymentDate');
        if (paymentDate) {
            const today = new Date();
            paymentDate.value = today.toISOString().split('T')[0];
        }
        
        // Set monthly payment as default amount
        const paymentAmount = document.getElementById('paymentAmount');
        if (paymentAmount) {
            paymentAmount.value = loan.monthlyPayment;
        }
    }
    
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.add('open');
    }
}

// Record payment (mock function)
function recordPayment(applicationId, amount, date) {
    const appIndex = applicationData.findIndex(app => app.id === applicationId);
    if (appIndex === -1 || !applicationData[appIndex].loan) return false;
    
    const loan = applicationData[appIndex].loan;
    
    // Add new payment
    loan.payments.push({ date: date, amount: parseFloat(amount) });
    
    // Update loan data
    loan.termsPaid += 1;
    loan.totalPaid += parseFloat(amount);
    
    // Sort payments by date
    loan.payments.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return true;
}

// Update application status (mock function)
function updateApplicationStatus(applicationId, newStatus) {
    const appIndex = applicationData.findIndex(app => app.id === applicationId);
    if (appIndex === -1) return false;
    
    applicationData[appIndex].status = newStatus;
    
    // If approved, create a loan object
    if (newStatus === 'approved' && !applicationData[appIndex].loan) {
        const amount = parseFloat(applicationData[appIndex].details.loanInfo.requestedAmount.replace(/[^0-9.-]+/g, ''));
        const terms = applicationData[appIndex].details.loanInfo.preferredTerms;
        const monthlyPayment = amount / terms;
        
        applicationData[appIndex].loan = {
            loanAmount: amount,
            monthlyPayment: monthlyPayment,
            termsTotal: terms,
            termsPaid: 0,
            totalPaid: 0,
            payments: []
        };
    }
    
    // Close modal
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.classList.remove('open');
    }
    
    // Refresh page data
    if (typeof refreshPageData === 'function') {
        refreshPageData();
    }
    
    return true;
}