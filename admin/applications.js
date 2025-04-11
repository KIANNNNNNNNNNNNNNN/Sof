// Application Data
const ofwApplications = [
    {
        id: "OFW-001",
        details: "OFW Loan Application",
        status: "Pending",
        date: "04/04/24"
    },
    {
        id: "OFW-002",
        details: "OFW Education Grant",
        status: "Pending",
        date: "04/05/24"
    },
    {
        id: "OFW-003",
        details: "OFW Business Loan",
        status: "Pending",
        date: "04/06/24"
    },
    {
        id: "OFW-004",
        details: "OFW Housing Loan",
        status: "Pending",
        date: "04/07/24"
    },
    {
        id: "OFW-004",
        details: "OFW Housing Loan",
        status: "Pending",
        date: "04/07/24"
    },
    {
        id: "OFW-004",
        details: "OFW Housing Loan",
        status: "Pending",
        date: "04/07/24"
    },
    {
        id: "OFW-004",
        details: "OFW Housing Loan",
        status: "Pending",
        date: "04/07/24"
    },
    {
        id: "OFW-004",
        details: "OFW Housing Loan",
        status: "Pending",
        date: "04/07/24"
    },
    {
        id: "OFW-004",
        details: "OFW Housing Loan",
        status: "Pending",
        date: "04/07/24"
    },
    {
        id: "OFW-004",
        details: "OFW Housing Loan",
        status: "Pending",
        date: "04/07/24"
    },
    {
        id: "OFW-004",
        details: "OFW Housing Loan",
        status: "Pending",
        date: "04/07/24"
    }
];

const studentApplications = [
    {
        id: "STU-001",
        details: "Student Loan Application",
        status: "Pending",
        date: "04/05/24"
    },
    {
        id: "STU-002",
        details: "Student Scholarship",
        status: "Pending",
        date: "04/06/24"
    },
    {
        id: "STU-003",
        details: "Student Emergency Fund",
        status: "Pending",
        date: "04/07/24"
    },
    {
        id: "STU-004",
        details: "Student Research Grant",
        status: "Pending",
        date: "04/08/24"
    }
];

// Populate OFW Table
function populateOfwTable() {
    const tableBody = document.getElementById('ofwTableBody');
    if (tableBody) {
        tableBody.innerHTML = ofwApplications.map(app => `
            <tr>
                <td>${app.id}</td>
                <td>${app.details}</td>
                <td><span class="status-${app.status.toLowerCase()}">${app.status}</span></td>
                <td>${app.date}</td>
                <td style="text-align: right;">
                    <button class="view-btn">View Form</button>
                </td>
            </tr>
        `).join('');
    }
}

// Populate Student Table
function populateStudentTable() {
    const tableBody = document.getElementById('studentTableBody');
    if (tableBody) {
        tableBody.innerHTML = studentApplications.map(app => `
            <tr>
                <td>${app.id}</td>
                <td>${app.details}</td>
                <td><span class="status-${app.status.toLowerCase()}">${app.status}</span></td>
                <td>${app.date}</td>
                <td style="text-align: right;">
                    <button class="view-btn">View Form</button>
                </td>
            </tr>
        `).join('');
    }
}

// Tab Switching Functionality
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const ofwTable = document.getElementById('ofwTable');
    const studentTable = document.getElementById('studentTable');
    
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                document.querySelector('.tab.active').classList.remove('active');
                tab.classList.add('active');
                
                // Show/hide tables based on selected tab
                if (tab.textContent.trim() === 'OFW') {
                    ofwTable.style.display = 'block';
                    studentTable.style.display = 'none';
                } else if (tab.textContent.trim() === 'STUDENT') {
                    ofwTable.style.display = 'none';
                    studentTable.style.display = 'block';
                }
            });
        });
    }
}

// Adjust Table Height Based on Window Size
function adjustTableHeight() {
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const tabsHeight = document.querySelector('.tabs').offsetHeight;
        const searchHeight = document.querySelector('.search-bar').offsetHeight;
        
        const availableHeight = window.innerHeight - headerHeight - tabsHeight - searchHeight - 50; // 50px buffer
        tableContainer.style.maxHeight = `${availableHeight}px`;
    }
}

// View Button Click Handler
function setupViewButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-btn')) {
            const row = e.target.closest('tr');
            const appId = row.querySelector('td:first-child').textContent;
            alert(`Viewing application: ${appId}`);
            // Replace with actual view functionality
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateOfwTable();
    populateStudentTable();
    setupTabs();
    setupViewButtons();
    adjustTableHeight();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustTableHeight);
});