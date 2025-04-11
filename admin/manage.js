// User data and application state
const applications = {
    ofw: [
        { name: "Juan Dela Cruz", username: "juan.dc", email: "juan.dc@example.com" },
        { name: "Maria Santos", username: "maria.s", email: "maria.s@example.com" },
        { name: "Pedro Bautista", username: "pedro.b", email: "pedro.b@example.com" }
    ],
    student: [
        { name: "Ana Reyes", username: "ana.r", email: "ana.r@example.com" },
        { name: "Luis Garcia", username: "luis.g", email: "luis.g@example.com" },
        { name: "Sofia Martinez", username: "sofia.m", email: "sofia.m@example.com" }
    ]
};

let currentTab = 'ofw';
let currentStatus = 'all';
let deleteMode = false;

// Render the table with user data
function renderTable() {
    const tableBody = document.getElementById('applicationTableBody');
    if (!tableBody) return;

    let filteredApps = applications[currentTab];

    if (currentStatus !== 'all') {
        filteredApps = filteredApps.filter(app => 
            app.status && app.status.toLowerCase() === currentStatus
        );
    }

    tableBody.innerHTML = filteredApps.map((app, index) => `
        <tr data-index="${index}">
            <td>
                ${deleteMode ? `<input type="checkbox" class="delete-checkbox" data-index="${index}">` : ''}
                ${app.name}
            </td>
            <td>${app.username}</td>
            <td>${app.email}</td>
            <td class="action-cell">
                ${deleteMode ? 
                    `<button class="delete-btn" disabled>✕</button>` : 
                    `<button class="view-btn"> > </button>`
                }
            </td>
        </tr>
    `).join('');

    // Add event listeners based on mode
    if (deleteMode) {
        setupDeleteModeEvents();
    } else {
        setupViewModeEvents();
    }
}

// Set up event listeners for delete mode
function setupDeleteModeEvents() {
    document.querySelectorAll('.delete-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const index = this.dataset.index;
            const deleteBtn = document.querySelector(`tr[data-index="${index}"] .delete-btn`);
            deleteBtn.disabled = !this.checked;
            deleteBtn.style.backgroundColor = this.checked ? '#f44336' : '#cccccc';
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
}

// Set up event listeners for view mode
function setupViewModeEvents() {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', handleView);
    });
}

// Handle delete action
function handleDelete(e) {
    const row = e.target.closest('tr');
    const index = parseInt(row.dataset.index);
    const user = applications[currentTab][index];
    
    const confirmDelete = confirm(`Are you sure you want to delete ${user.name}'s account?`);
    
    if (confirmDelete) {
        applications[currentTab].splice(index, 1);
        renderTable();
    }
}

// Handle view action
function handleView(e) {
    const row = e.target.closest('tr');
    const appId = row.querySelector('td:first-child').textContent.trim();
    alert(`Manage account of: ${appId}`);
}

// Toggle between delete and normal mode
function toggleDeleteMode() {
    deleteMode = !deleteMode;
    
    // Update the delete button text and color
    const deleteBtn = document.querySelector('.status-tab[data-status="approved"]');
    if (deleteBtn) {
        deleteBtn.textContent = deleteMode ? 'Cancel' : 'DELETE';
        deleteBtn.style.backgroundColor = deleteMode ? '#f44336' : '#3dd23d';
    }
    
    renderTable();
}

// Set up tab functionality
function setupTabs() {
    // Main tabs (OFW/Student)
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.tab.active').classList.remove('active');
            tab.classList.add('active');
            currentTab = tab.dataset.type;
            deleteMode = false; // Exit delete mode when switching tabs
            renderTable();
            updateStatusTabColors();
        });
    });

    // Status tabs (Delete button)
    document.querySelectorAll('.status-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.dataset.status === 'approved') {
                toggleDeleteMode();
            } else {
                document.querySelector('.status-tab.active').classList.remove('active');
                tab.classList.add('active');
                currentStatus = tab.dataset.status;
                deleteMode = false; // Exit delete mode when switching status
                renderTable();
            }
            updateStatusTabColors();
        });
    });
}

// Update status tab colors
function updateStatusTabColors() {
    const statusTabs = document.querySelectorAll('.status-tab');
    statusTabs.forEach(tab => {
        const status = tab.dataset.status;
        if (tab.classList.contains('active')) {
            // Different shades of red for different statuses
            if (status === 'approved') {
                tab.style.backgroundColor = '#f44336'; // Bright red
            } else if (status === 'pending') {
                tab.style.backgroundColor = '#d32f2f'; // Darker red
            } else if (status === 'declined') {
                tab.style.backgroundColor = '#b71c1c'; // Darkest red
            }
        } else {
            // Semi-transparent versions of the same colors
            if (status === 'approved') {
                tab.style.backgroundColor = '#f4433680';
            } else if (status === 'pending') {
                tab.style.backgroundColor = '#d32f2f80';
            } else if (status === 'declined') {
                tab.style.backgroundColor = '#b71c1c80';
            }
        }
    });
}

// Adjust table height based on window size
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

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize delete button text
    const deleteBtn = document.querySelector('.status-tab[data-status="approved"]');
    if (deleteBtn) {
        deleteBtn.textContent = 'DELETE';
    }

    renderTable();
    setupTabs();
    adjustTableHeight();
    updateStatusTabColors();

    window.addEventListener('resize', adjustTableHeight);
});