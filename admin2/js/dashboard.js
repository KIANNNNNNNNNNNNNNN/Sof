document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});

function loadDashboardData() {
    updateStatistics();
    createCharts();
    loadRecentApplications();
}

function updateStatistics() {
    // Count applications by type and status
    const stats = {
        total: applicationData.length,
        approved: applicationData.filter(app => app.status === 'approved').length,
        pending: applicationData.filter(app => app.status === 'pending').length,
        declined: applicationData.filter(app => app.status === 'declined').length,
        ofw: {
            total: applicationData.filter(app => app.type === 'ofw').length,
            approved: applicationData.filter(app => app.type === 'ofw' && app.status === 'approved').length,
            pending: applicationData.filter(app => app.type === 'ofw' && app.status === 'pending').length,
            declined: applicationData.filter(app => app.type === 'ofw' && app.status === 'declined').length
        },
        student: {
            total: applicationData.filter(app => app.type === 'student').length,
            approved: applicationData.filter(app => app.type === 'student' && app.status === 'approved').length,
            pending: applicationData.filter(app => app.type === 'student' && app.status === 'pending').length,
            declined: applicationData.filter(app => app.type === 'student' && app.status === 'declined').length
        }
    };
    
    // Update summary cards
    document.querySelector('.total-applications').textContent = stats.total;
    document.querySelector('.approved-applications').textContent = stats.approved;
    document.querySelector('.pending-applications').textContent = stats.pending;
    document.querySelector('.declined-applications').textContent = stats.declined;
    
    // Update OFW stats
    document.querySelector('.ofw-total').textContent = stats.ofw.total;
    document.querySelector('.ofw-approved').textContent = stats.ofw.approved;
    document.querySelector('.ofw-pending').textContent = stats.ofw.pending;
    document.querySelector('.ofw-declined').textContent = stats.ofw.declined;
    
    // Update Student stats
    document.querySelector('.student-total').textContent = stats.student.total;
    document.querySelector('.student-approved').textContent = stats.student.approved;
    document.querySelector('.student-pending').textContent = stats.student.pending;
    document.querySelector('.student-declined').textContent = stats.student.declined;
}

function createCharts() {
    // OFW Chart
    const ofwStats = {
        approved: applicationData.filter(app => app.type === 'ofw' && app.status === 'approved').length,
        pending: applicationData.filter(app => app.type === 'ofw' && app.status === 'pending').length,
        declined: applicationData.filter(app => app.type === 'ofw' && app.status === 'declined').length
    };
    
    const ofwCtx = document.getElementById('ofwChart').getContext('2d');
    new Chart(ofwCtx, {
        type: 'doughnut',
        data: {
            labels: ['Approved', 'Pending', 'Declined'],
            datasets: [{
                data: [ofwStats.approved, ofwStats.pending, ofwStats.declined],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Student Chart
    const studentStats = {
        approved: applicationData.filter(app => app.type === 'student' && app.status === 'approved').length,
        pending: applicationData.filter(app => app.type === 'student' && app.status === 'pending').length,
        declined: applicationData.filter(app => app.type === 'student' && app.status === 'declined').length
    };
    
    const studentCtx = document.getElementById('studentChart').getContext('2d');
    new Chart(studentCtx, {
        type: 'doughnut',
        data: {
            labels: ['Approved', 'Pending', 'Declined'],
            datasets: [{
                data: [studentStats.approved, studentStats.pending, studentStats.declined],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function loadRecentApplications() {
    const tableBody = document.getElementById('recent-applications-table');
    if (!tableBody) return;
    
    // Sort by most recent date
    const recentApplications = [...applicationData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5); // Take only the 5 most recent
    
    let tableContent = '';
    
    if (recentApplications.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="empty-state">No applications found</td></tr>';
        return;
    }
    
    recentApplications.forEach(app => {
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

// Function to refresh page data (used after status updates)
function refreshPageData() {
    loadDashboardData();
}