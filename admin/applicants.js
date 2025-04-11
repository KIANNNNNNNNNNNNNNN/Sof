// Updated Application Data with different statuses
const applications = {
    ofw: [
        { id: "OFW-001", details: "OFW Loan Application", status: "Pending", date: "04/04/24" },
        { id: "OFW-002", details: "OFW Education Grant", status: "Approved", date: "04/05/24" },
        { id: "OFW-003", details: "OFW Business Loan", status: "Declined", date: "04/06/24" },
        { id: "OFW-004", details: "OFW Housing Loan", status: "Pending", date: "04/07/24" },
        { id: "OFW-005", details: "OFW Medical Aid", status: "Approved", date: "04/08/24" },
        { id: "OFW-006", details: "OFW Family Support", status: "Declined", date: "04/09/24" }
    ],
    student: [
        { id: "STU-001", details: "Student Loan Application", status: "Pending", date: "04/05/24" },
        { id: "STU-002", details: "Student Scholarship", status: "Approved", date: "04/06/24" },
        { id: "STU-003", details: "Student Emergency Fund", status: "Approved", date: "04/07/24" },
        { id: "STU-004", details: "Student Research Grant", status: "Declined", date: "04/08/24" },
        { id: "STU-005", details: "Student Tuition Fee", status: "Pending", date: "04/09/24" },
        { id: "STU-006", details: "Student Book Allowance", status: "Declined", date: "04/10/24" }
    ]
};

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
            <td>${app.id}</td>
            <td>${app.details}</td>
            <td><span class="status-${app.status.toLowerCase()}">${app.status}</span></td>
            <td>${app.date}</td>
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
            alert(`Input of Loan Amount: ${appId}`);
        }
    });
});