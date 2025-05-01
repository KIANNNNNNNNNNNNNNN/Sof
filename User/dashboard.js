
// Application data
const applicationData = [
    {
      id: "238327458392",
      details: "OFW Loan Application",
      status: "Pending",
      date: "04/04/04",
    },
  ];
  
  // Function to populate the table
  function populateTable() {
    const tableBody = document.getElementById('applicationTableBody');
    
    applicationData.forEach(application => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${application.id}</td>
        <td>${application.details}</td>
        <td>${application.status}</td>
        <td>${application.date}</td>
        <td>
          <button class="cancel-btn" onclick="cancelApplication('${application.id}')">
            CANCEL APPLICATION
          </button>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
  }
  
  // Function to handle application cancellation
  function cancelApplication(id) {
    // Add your cancellation logic here
    console.log(`Cancelling application: ${id}`);
  }
  
  // Initialize the table when the page loads
  document.addEventListener('DOMContentLoaded', populateTable);

  function setupHeaderNavigation() {
    // Get logo and home elements (adjust selectors as needed)
    const logo = document.querySelector('.logo'); // or '#logo' if it's an ID
    const homeLink = document.querySelector('.home-link'); // or '#home' if it's an ID
    
    // Add click event listeners
    if (logo) {
      logo.addEventListener('click', () => {
        window.location.href = 'account.html';
      });
    }
    
    if (homeLink) {
      homeLink.addEventListener('click', () => {
        window.location.href = 'account.html';
      });
    }
  }
  
  // Call this function when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    setupHeaderNavigation();
  });