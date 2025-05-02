document.addEventListener('DOMContentLoaded', function() {
    loadFinancialData();
    setupFilters();
    setupPaymentForm();
});

function loadFinancialData(type = 'all', searchTerm = '') {
    // Get only approved applications with loans
    let approvedLoans = applicationData.filter(app => app.status === 'approved' && app.loan);
    
    // Filter by type if specified
    if (type !== 'all') {
        approvedLoans = approvedLoans.filter(app => app.type === type);
    }
    
    // Filter by search term if provided
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        approvedLoans = approvedLoans.filter(app => app.name.toLowerCase().includes(term));
    }
    
    // Update summary statistics
    updateLoanSummary(approvedLoans);
    
    // Populate loans table
    populateLoansTable(approvedLoans);
}

function updateLoanSummary(loans) {
    const totalLoans = loans.length;
    let totalAmount = 0;
    let collectedAmount = 0;
    let outstandingAmount = 0;
    
    loans.forEach(loan => {
        totalAmount += loan.loan.loanAmount;
        collectedAmount += loan.loan.totalPaid;
        outstandingAmount += (loan.loan.loanAmount - loan.loan.totalPaid);
    });
    
    document.getElementById('total-loans').textContent = totalLoans;
    document.getElementById('total-amount').textContent = formatCurrency(totalAmount);
    document.getElementById('collected-amount').textContent = formatCurrency(collectedAmount);
    document.getElementById('outstanding-amount').textContent = formatCurrency(outstandingAmount);
}

function populateLoansTable(loans) {
    const tableBody = document.getElementById('loans-table');
    if (!tableBody) return;
    
    let tableContent = '';
    
    if (loans.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="empty-state">No active loans found</td></tr>';
        return;
    }
    
    loans.forEach(loan => {
        const progressPercentage = (loan.loan.termsPaid / loan.loan.termsTotal) * 100;
        
        tableContent += `
            <tr>
                <td>${loan.name}</td>
                <td>${loan.type === 'ofw' ? 'OFW' : 'STUDENT'}</td>
                <td>${formatCurrency(loan.loan.loanAmount)}</td>
                <td>${formatCurrency(loan.loan.monthlyPayment)}</td>
                <td>${loan.loan.termsPaid} / ${loan.loan.termsTotal}</td>
                <td>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                    </div>
                </td>
                <td><button class="btn secondary" onclick="openPaymentModal('${loan.id}')">Manage</button></td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableContent;
}

function setupFilters() {
    const loanType = document.getElementById('loanType');
    const searchLoan = document.getElementById('searchLoan');
    
    // Type filter change
    if (loanType) {
        loanType.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    // Search input
    if (searchLoan) {
        searchLoan.addEventListener('input', function() {
            applyFilters();
        });
    }
}

function applyFilters() {
    const type = document.getElementById('loanType').value;
    const searchTerm = document.getElementById('searchLoan').value;
    
    loadFinancialData(type, searchTerm);
}

function setupPaymentForm() {
    const paymentForm = document.getElementById('paymentForm');
    if (!paymentForm) return;
    
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const applicationId = this.getAttribute('data-application-id');
        const amount = document.getElementById('paymentAmount').value;
        const date = document.getElementById('paymentDate').value;
        
        if (recordPayment(applicationId, amount, date)) {
            // Close modal
            const modal = document.getElementById('paymentModal');
            if (modal) {
                modal.classList.remove('open');
            }
            
            // Refresh data
            applyFilters();
            
            // Alert success (in a real app, you'd use a nicer notification)
            alert('Payment recorded successfully!');
        } else {
            alert('Failed to record payment. Please try again.');
        }
    });
}

// Function to refresh page data
function refreshPageData() {
    applyFilters();
}