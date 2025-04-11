// Updated Application Data with different statuses
const applications = {
        ofw: [
            { borrower: "eskalabermberm clyvix", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "OFW-002", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "OFW-003", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "OFW-004", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "OFW-005", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "OFW-006", amount: "6,000,0000", monthly: "6,000", terms: "2/12" }
        ],
        student: [
            { borrower: "STU-001", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "STU-002", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "STU-003", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "STU-004", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "STU-005", amount: "6,000,0000", monthly: "6,000", terms: "2/12" },
            { borrower: "STU-006", amount: "6,000,0000", monthly: "6,000", terms: "2/12" }
        ]
    }

let currentTab = 'ofw';
let currentStatus = 'all';

function renderTable() {
    const tableBody = document.getElementById('applicationTableBody');
    if (!tableBody) return;
    
    let filteredApps = applications[currentTab];
    
    if (currentStatus !== 'all') {
        filteredApps = filteredApps.filter(app => 
            app.status.toLowerCase() === currentStatus
        );
    }
    
    tableBody.innerHTML = filteredApps.map(app => `
        <tr>
            <td>${app.borrower}</td>
            <td>${app.amount}</td>
            <td>${app.monthly}</td>
            <td>${app.terms}</td>
            <td style="text-align: right;">
                <button class="view-btn"> > </button>
            </td>
        </tr>
    `).join('');
}

function setupTabs() {
    // Main tabs (OFW/Student)
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.tab.active').classList.remove('active');
            tab.classList.add('active');
            currentTab = tab.dataset.type;
            renderTable();
        });
    });
    
    // Status tabs
    document.querySelectorAll('.status-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.status-tab.active').classList.remove('active');
            tab.classList.add('active');
            currentStatus = tab.dataset.status;
            renderTable();
            
            // Update colors when status changes
            updateStatusTabColors();
        });
    });
}

function updateStatusTabColors() {
    const statusTabs = document.querySelectorAll('.status-tab');
    statusTabs.forEach(tab => {
        const status = tab.dataset.status;
        if (tab.classList.contains('active')) {
            if (status === 'approved' || status === 'all') {
                tab.style.backgroundColor = '#3dd23d'; // Green
            } else if (status === 'pending') {
                tab.style.backgroundColor = '#fdd657'; // Yellow
            } else if (status === 'declined') {
                tab.style.backgroundColor = '#f44336'; // Red
            }
        } else {
            // Reset non-active tabs to default
            if (status === 'approved' || status === 'all') {
                tab.style.backgroundColor = '#3dd23d80'; // Semi-transparent green
            } else if (status === 'pending') {
                tab.style.backgroundColor = '#fdd65780'; // Semi-transparent yellow
            } else if (status === 'declined') {
                tab.style.backgroundColor = '#f4433680'; // Semi-transparent red
            }
        }
    });
}

function adjustTableHeight() {
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const tabsHeight = document.querySelector('.tabs-container').offsetHeight;
        const searchHeight = document.querySelector('.search-bar').offsetHeight;
        
        const availableHeight = window.innerHeight - headerHeight - tabsHeight - searchHeight - 50;
        tableContainer.style.maxHeight = `${availableHeight}px`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    setupTabs();
    adjustTableHeight();
    updateStatusTabColors(); // Initialize tab colors
    
    window.addEventListener('resize', adjustTableHeight);
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-btn')) {
            const row = e.target.closest('tr');
            const appId = row.querySelector('td:first-child').textContent;
            alert(`Manage Loan of: ${appId}`);
        }
    });
});