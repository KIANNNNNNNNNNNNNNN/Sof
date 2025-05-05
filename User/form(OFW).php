<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection details
    $host = "127.0.0.1";
    $dbname = "pinoyluminariesdb";
    $username = "root";
    $password = "";

    $conn = new mysqli($host, $username, $password, $dbname);

    session_start();
    if (!isset($_SESSION['user_id'])) {
    die("Please login first");
    }
    $userId = $_SESSION['user_id'];

    // Check database connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve and sanitize input values
    $fullName = trim($_POST['fullName'] ?? '');
    $nickname = trim($_POST['nickname'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $messenger = trim($_POST['messenger'] ?? '');
    $contactNo = trim($_POST['contact_no'] ?? '');
    $birthday = $_POST['birthday'] ?? null;
    $birthplace = trim($_POST['birthplace'] ?? '');
    $gender = trim($_POST['gender'] ?? '');
    $age = intval($_POST['age'] ?? 0);
    $civilStatus = trim($_POST['civilStatus'] ?? '');
    $citizenship = trim($_POST['citizenship'] ?? '');
    $address = trim($_POST['phAddress'] ?? '');
    $barangay = trim($_POST['barangay'] ?? '');
    $city = trim($_POST['city_municipality'] ?? '');
    $province = trim($_POST['province'] ?? '');
    $postalCode = trim($_POST['postalCode'] ?? '');
    $sssNumber = trim($_POST['sssNumber'] ?? '');
    $tinNumber = trim($_POST['tin'] ?? '');
    $passportNumber = trim($_POST['passportNumber'] ?? '');
    $passportIssueDate = $_POST['passportIssueDate'] ?? null;
    $passportExpiryDate = $_POST['passportExpiryDate'] ?? null;
    $visaNumber = trim($_POST['visaNumber'] ?? '');
    $oecNumber = trim($_POST['oecNumber'] ?? '');
    $destinationCountry = trim($_POST['destinationCountry'] ?? '');
    $employerName = trim($_POST['employerName'] ?? '');
    $employerContact = trim($_POST['employerContact'] ?? '');
    $contractYears = intval($_POST['contractYears'] ?? 0);
    $contractMonths = intval($_POST['contractMonths'] ?? 0);
    $jobTitle = trim($_POST['jobTitle'] ?? '');
    $monthlySalary = floatval($_POST['monthlySalary'] ?? 0);
    $allowance = floatval($_POST['allowance'] ?? 0);
    $employerAddress = trim($_POST['employerAddress'] ?? '');
    $loanAmount = floatval($_POST['loanAmount'] ?? 0);
    $loanPurpose = trim($_POST['loanPurpose'] ?? '');
    $bankName = trim($_POST['bankName'] ?? '');
    $preferredReleaseMethod = trim($_POST['preferredReleaseMethod'] ?? '');
    $applicationDate = date("Y-m-d H:i:s");

    // Modify your SQL statement to include the id field
// Modify the SQL statement to match exactly what you're inserting
$stmt = $conn->prepare("INSERT INTO ofwloan_applications (
    id, full_name, nickname, email, messenger, contact_no, birthday, birthplace, 
    gender, age, civil_status, citizenship, address, barangay, 
    city_municipality, province, postal_code, sss_number, tin, 
    passport_number, passport_issue_date, passport_expiry_date, 
    visa_number, oec_number, destination_country, employer_name, 
    employer_contact, contract_years, contract_months, job_title, 
    salary, allowance, employer_address, loan_amount, loan_purpose, 
    preferred_bank, preferred_release_method, application_date
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

// Make sure all variables are set in the same order as the SQL statement
$stmt->bind_param(
    "isssssssisssssssssssssssssiiisddsddsss",
    $userId,
    $fullName, 
    $nickname, 
    $email,
    $messenger,
    $contactNo, 
    $birthday, 
    $birthplace, 
    $gender, 
    $age, 
    $civilStatus, 
    $citizenship, 
    $address, 
    $barangay, 
    $city, 
    $province, 
    $postalCode, 
    $sssNumber, 
    $tinNumber, 
    $passportNumber, 
    $passportIssueDate, 
    $passportExpiryDate, 
    $visaNumber, 
    $oecNumber, 
    $destinationCountry, 
    $employerName, 
    $employerContact, 
    $contractYears, 
    $contractMonths, 
    $jobTitle, 
    $monthlySalary, 
    $allowance, 
    $employerAddress, 
    $loanAmount, 
    $loanPurpose, 
    $bankName, 
    $preferredReleaseMethod, 
    $applicationDate
);

if ($stmt->execute()) {
    echo "<script>
            alert('Application successfully submitted!');
            window.location.href = 'dashboard.php';
          </script>";
    exit();
} else {
    echo "<script>alert('Error details: " . mysqli_error($conn) . "');</script>";
    // Add error logging
    error_log("Database Error: " . mysqli_error($conn));
}

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OFW Loan Application</title>
    <link rel="stylesheet" href="form(OFW).css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header>
            <div class="logo-nav">
                <img src="images/image 1.png" alt="Pinoy Luminaries Logo" class="logo">
                <nav>
                    <a href="account.php" class="active">HOME</a>
                </nav>
            </div>
        </header>

        <div class="title-banner">
            <h1><span class="green">LOAN APPLICATION</span> FORM <span class="green-text">(OFW)</span></h1>
        </div>

        <form id="loanForm" method="POST" action="form(OFW).php">
       

<!-- Step 1: Personal Information -->
<div class="form-step active">
    <h2>PERSONAL INFORMATION</h2>
    <div class="form-grid">
        <div class="form-group">
            <label for="fullName">Name:</label>
            <input type="text" id="fullName" name="fullName" required>
        </div>
        <div class="form-group">
            <label for="nickname">Nickname:</label>
            <input type="text" id="nickname" name="nickname">
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="messenger">Messenger:</label>
            <input type="text" id="messenger" name="messenger" required>
        </div>
        <div class="form-group">
            <label for="contactNumber">Contact No.:</label>
            <input type="tel" id="contactNumber" name="contact_no" placeholder="09XXXXXXXXX" required>
        </div>
        <div class="form-group">
            <label for="birthday">Birthday:</label>
            <input type="date" id="birthday" name="birthday" required>
        </div>
        <div class="form-group">
            <label for="birthplace">Birthplace:</label>
            <input type="text" id="birthplace" name="birthplace" required>
        </div>
        <div class="form-group">
            <label for="gender">Gender:</label>
            <select id="gender" name="gender" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" required>
        </div>
        <div class="form-group">
            <label for="civilStatus">Civil Status:</label>
            <select id="civilStatus" name="civilStatus" required>
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
            </select>
        </div>
        <div class="form-group">
            <label for="citizenship">Citizenship:</label>
            <input type="text" id="citizenship" name="citizenship" required>
        </div>
        <div class="form-group full-width">
            <label for="phAddress">Address in Philippines:</label>
            <input type="text" id="phAddress" name="phAddress" required>
        </div>
        <div class="form-group">
            <label for="barangay">Barangay:</label>
            <input type="text" id="barangay" name="barangay" required>
        </div>
        <div class="form-group">
            <label for="city">City/Municipality:</label>
            <input type="text" id="city" name="city_municipality" required>
        </div>
        <div class="form-group">
            <label for="province">Province:</label>
            <input type="text" id="province" name="province" required>
        </div>
        <div class="form-group">
            <label for="postalCode">Postal Code:</label>
            <input type="number" id="postalCode" name="postalCode" required>
        </div>
        <div class="form-group">
            <label for="sssNumber">SSS Number:</label>
            <input type="number" id="sssNumber" name="sssNumber" required>
        </div>
        <div class="form-group">
            <label for="tinNumber">TIN:</label>
            <input type="text" id="tinNumber" name="tin" required>
        </div>
        <div class="form-group">
            <label for="passportNumber">Passport Number:</label>
            <input type="number" id="passportNumber" name="passportNumber" required>
        </div>
        <div class="form-group">
            <label for="passportIssueDate">Date of Issue:</label>
            <input type="date" id="passportIssueDate" name="passportIssueDate" required>
        </div>
        <div class="form-group">
            <label for="passportExpiryDate">Expiry Date:</label>
            <input type="date" id="passportExpiryDate" name="passportExpiryDate" required>
        </div>
    </div>
    <div class="step-navigation">
        <button type="button" class="next-btn">Next</button>
    </div>
</div>

<!-- Step 2: Foreign Employment -->
<div class="form-step">
    <h2>FOREIGN EMPLOYMENT INFORMATION</h2>
    <div class="form-grid">
        <div class="form-group">
            <label for="visaNumber">VISA Number/Reference Code:</label>
            <input type="number" id="visaNumber" name="visaNumber" required>
        </div>
        <div class="form-group">
            <label for="visaIssueDate">Date of Issue:</label>
            <input type="date" id="visaIssueDate" name="visaIssueDate" required>
        </div>
        <div class="form-group">
            <label for="visaExpiryDate">Expiry Date:</label>
            <input type="date" id="visaExpiryDate" name="visaExpiryDate" required>
        </div>
        <div class="form-group">
            <label for="oecNumber">OEC Number:</label>
            <input type="text" id="oecNumber" name="oecNumber" required>
        </div>
        <div class="form-group">
            <label for="oecIssueDate">Date of Issue:</label>
            <input type="date" id="oecIssueDate" name="oecIssueDate" required>
        </div>
        <div class="form-group">
            <label for="oecExpiryDate">Expiry Date:</label>
            <input type="date" id="oecExpiryDate" name="oecExpiryDate" required>
        </div>
        <div class="form-group">
            <label for="destinationCountry">Country of Destination:</label>
            <input type="text" id="destinationCountry" name="destinationCountry" required>
        </div>
        <div class="form-group">
            <label for="employerName">Name of Foreign Employer:</label>
            <input type="text" id="employerName" name="employerName" required>
        </div>
        <div class="form-group">
            <label for="employerContact">Contact No.:</label>
            <input type="tel" id="employerContact" name="employerContact" placeholder="09XXXXXXXXX" required>
        </div>
        <div class="form-group">
            <label for="contractYears">Length of Contract (Years):</label>
            <input type="number" id="contractYears" name="contractYears" required>
        </div>
        <div class="form-group">
            <label for="contractMonths">Length of Contract (Months):</label>
            <input type="number" id="contractMonths" name="contractMonths" required>
        </div>
        <div class="form-group">
            <label for="jobTitle">Job Title:</label>
            <input type="text" id="jobTitle" name="jobTitle" required>
        </div>
        <div class="form-group">
            <label for="monthlySalary">Monthly Basic Salary:</label>
            <input type="number" id="monthlySalary" name="monthlySalary" required>
        </div>
        <div class="form-group">
            <label for="allowance">Allowance:</label>
            <input type="number" id="allowance" name="allowance" required>
        </div>
        <div class="form-group full-width">
            <label for="employerAddress">Address of Foreign Employer:</label>
            <input type="text" id="employerAddress" name="employerAddress" required>
        </div>
    </div>
    <div class="step-navigation">
        <button type="button" class="prev-btn">Previous</button>
        <button type="button" class="next-btn">Next</button>
    </div>
</div>

<!-- Step 3: Family Background -->
<div class="form-step">
    <h2>FAMILY BACKGROUND</h2>
    <div class="form-grid">
        <div class="form-group">
            <label for="fatherName">Father's Name:</label>
            <input type="text" id="fatherName" name="fatherName" required>
        </div>
        <div class="form-group">
            <label for="fatherAddress">Father's Address:</label>
            <input type="text" id="fatherAddress" name="fatherAddress" required>
        </div>
        <div class="form-group">
            <label for="fatherEmail">Father's Email:</label>
            <input type="email" id="fatherEmail" name="fatherEmail">
        </div>
        <div class="form-group">
            <label for="fatherContact">Father's Contact No.:</label>
            <input type="tel" id="fatherContact" name="fatherContact" placeholder="09XXXXXXXXX">
        </div>
        <div class="form-group">
            <label for="motherName">Mother's Name:</label>
            <input type="text" id="motherName" name="motherName" required>
        </div>
        <div class="form-group">
            <label for="motherAddress">Mother's Address:</label>
            <input type="text" id="motherAddress" name="motherAddress" required>
        </div>
        <div class="form-group">
            <label for="motherEmail">Mother's Email:</label>
            <input type="email" id="motherEmail" name="motherEmail">
        </div>
        <div class="form-group">
            <label for="motherContact">Mother's Contact No.:</label>
            <input type="tel" id="motherContact" name="motherContact" placeholder="09XXXXXXXXX">
        </div>
    </div>
    <div class="subsection">
        <h3>SIBLINGS (If Applicable)</h3>
        <div class="siblings-container" id="siblingsContainer"></div>
        <button type="button" class="add-btn" id="addSibling">Add Sibling</button>
    </div>
    <div class="subsection">
        <h3>SPOUSE (If Applicable)</h3>
        <div class="spouse-container" id="spouseContainer"></div>
        <button type="button" class="add-btn" id="addSpouse">Add Spouse</button>
    </div>
    <div class="section">
        <h2>CHARACTER REFERENCES</h2>
        <div class="references-container" id="referencesContainer"></div>
        <button type="button" class="add-btn" id="addReference">Add Reference</button>
    </div>
    <div class="step-navigation">
        <button type="button" class="prev-btn">Previous</button>
        <button type="button" class="next-btn">Next</button>
    </div>
</div>

<!-- Step 4: Co-Borrower Info -->
<div class="form-step">
    <h2>CO-BORROWER INFORMATION</h2>
    <div class="form-grid">
        <div class="form-group">
            <label for="coBorrowerName">Name:</label>
            <input type="text" id="coBorrowerName" name="coBorrowerName">
        </div>
        <div class="form-group">
            <label for="coBorrowerAddress">Address:</label>
            <input type="text" id="coBorrowerAddress" name="coBorrowerAddress">
        </div>
        <div class="form-group">
            <label for="coBorrowerEmail">Email:</label>
            <input type="email" id="coBorrowerEmail" name="coBorrowerEmail">
        </div>
        <div class="form-group">
            <label for="coBorrowerContact">Contact No.:</label>
            <input type="tel" id="coBorrowerContact" name="coBorrowerContact">
        </div>
        <div class="form-group">
            <label for="coBorrowerIdType">Valid Government ID:</label>
            <input type="text" id="coBorrowerIdType" name="coBorrowerIdType">
        </div>
        <div class="form-group">
            <label for="coBorrowerIdNumber">ID Number:</label>
            <input type="text" id="coBorrowerIdNumber" name="coBorrowerIdNumber">
        </div>
        <div class="form-group">
            <label for="coBorrowerEmployer">Employer/Business Name:</label>
            <input type="text" id="coBorrowerEmployer" name="coBorrowerEmployer">
        </div>
        <div class="form-group">
            <label for="coBorrowerEmployerContact">Contact No.:</label>
            <input type="tel" id="coBorrowerEmployerContact" name="coBorrowerEmployerContact" placeholder="09XXXXXXXXX">
        </div>
        <div class="form-group">
            <label for="coBorrowerRelationship">Relationship to Applicant:</label>
            <input type="text" id="coBorrowerRelationship" name="coBorrowerRelationship">
        </div>
        <div class="form-group">
            <label for="coBorrowerIncome">Monthly Income:</label>
            <input type="number" id="coBorrowerIncome" name="coBorrowerIncome">
        </div>
    </div>
    <div class="step-navigation">
        <button type="button" class="prev-btn">Previous</button>
        <button type="button" class="next-btn">Next</button>
    </div>
</div>

<!-- Step 5: Loan Details -->
<div class="form-step">
    <h2>LOAN DETAILS</h2>
    <div class="form-grid">
        <div class="form-group">
            <label for="loanAmount">Loan Amount:</label>
            <input type="number" id="loanAmount" name="loanAmount" required>
        </div>
        <div class="form-group full-width">
            <label for="loanPurpose">Purpose:</label>
            <textarea id="loanPurpose" name="loanPurpose" required></textarea>
        </div>
    </div>
    <div class="payment-methods">
        <h3>PREFERRED MODE OF LOAN RELEASE</h3>
        <div class="bank-details">
            <div class="form-group">
                <label for="bankName">Bank:</label>
                <input type="text" id="bankName" name="bankName">
            </div>
        </div>
        <div class="separator">OR</div>
        <div class="method-grid">
            <div class="method">
                <img src="images/image 11.png" alt="M Lhuillier">
                <span>M Lhuillier</span>
            </div>
            <div class="method">
                <img src="images/image 12.png" alt="Palawan">
                <span>Palawan Express</span>
            </div>
            <div class="method active">
                <img src="images/image 13.png" alt="GCash">
                <span>GCash</span>
            </div>
        </div>
    </div>
    <div class="step-navigation">
        <button type="submit" class="submit-btn">Next</button>
    </div>
</form>
</div>

    <script src="form(OFW).js"></script>
</body>
</html>

