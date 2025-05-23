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
                    </header>

        <div class="title-banner">
            <h1><span class="green">LOAN APPLICATION</span> FORM <span class="green-text">(STUDENT)</span></h1>
        </div>

        <form id="loanForm">

            <!-- Step 1: Personal Information -->
            <div class="form-step active">
                <h2>PERSONAL INFORMATION</h2>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Nickname:</label>
                        <input type="text">
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" required>
                    </div>
                    <div class="form-group">
                        <label>Messenger:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Contact No.:</label>
                        <input type="tel" required>
                    </div>
                    <div class="form-group">
                        <label>Birthday:</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Birthplace:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Gender:</label>
                        <select required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Age:</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>Civil Status:</label>
                        <select required>
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Citizenship:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group full-width">
                        <label>Address in Philippines:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Barangay:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>City/Municipality:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Province:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Postal Code:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>SSS Number:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>TIN:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Passport Number:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Date of Issue:</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Expiry Date:</label>
                        <input type="date" required>
                    </div>
                </div>
                <div class="step-navigation">
                    <button class="next-btn">Next</button>
                </div>
            </div>
        
            <!-- Step 2: Foreign Employment -->
            <div class="form-step">
                <h2>FOREIGN EMPLOYMENT INFORMATION</h2>
                <div class="form-grid">
                    <div class="form-group">
                        <label>VISA Number/Reference Code:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Date of Issue:</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Expiry Date:</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>OEC Number:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Date of Issue:</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Expiry Date:</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Country of Destination:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Name of School:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Contact Person:</label>
                        <input type="text" required>
                    </div>
                     <div class="form-group">
                        <label>Contact Information:</label>
                        <input type="tel" required>
                    </div> \
                    <div class="form-group full-width">
                        <label>Address of School:</label>
                        <input type="text" required>
                    </div>
                  
                </div>
                <div class="step-navigation">
                    <button class="prev-btn">Previous</button>
                    <button class="next-btn">Next</button>
                </div>
            </div>
        
            <!-- Step 3: Family Background -->
            <div class="form-step">
                <h2>FAMILY BACKGROUND</h2>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Father's Name:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Father's Address:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Father's Email:</label>
                        <input type="email">
                    </div>
                    <div class="form-group">
                        <label>Father's Contact No.:</label>
                        <input type="tel">
                    </div>
                    <div class="form-group">
                        <label>Mother's Name (Maiden Name):</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Mother's Address:</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Mother's Email:</label>
                        <input type="email">
                    </div>
                    <div class="form-group">
                        <label>Mother's Contact No.:</label>
                        <input type="tel">
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
                    <button class="prev-btn">Previous</button>
                    <button class="next-btn">Next</button>
                </div>
            </div>
        
            <!-- Step 4: Co-Borrower Info -->
            <div class="form-step">
                <h2>CO-BORROWER INFORMATION</h2>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text">
                    </div>
                    <div class="form-group">
                        <label>Address:</label>
                        <input type="text">
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email">
                    </div>
                    <div class="form-group">
                        <label>Contact No.:</label>
                        <input type="tel">
                    </div>
                    <div class="form-group">
                        <label>Valid Government ID:</label>
                        <input type="text">
                    </div>
                    <div class="form-group">
                        <label>ID Number:</label>
                        <input type="text">
                    </div>
                    <div class="form-group">
                        <label>Employer/Business Name:</label>
                        <input type="text">
                    </div>
                    <div class="form-group">
                        <label>Contact No.:</label>
                        <input type="tel">
                    </div>
                    <div class="form-group">
                        <label>Relationship to Applicant:</label>
                        <input type="text">
                    </div>
                    <div class="form-group">
                        <label>Monthly Income:</label>
                        <input type="number">
                    </div>
                </div>
                <div class="step-navigation">
                    <button class="prev-btn">Previous</button>
                    <button class="next-btn">Next</button>
                </div>
            </div>
        
            <!-- Step 5: Loan Details -->
            <div class="form-step">
                <h2>LOAN DETAILS</h2>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Loan Amount:</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group full-width">
                        <label>Purpose:</label>
                        <textarea required></textarea>
                    </div>
                </div>
                <div class="payment-methods">
                    <h3>PREFERRED MODE OF LOAN RELEASE</h3>
                    <div class="bank-details">
                        <div class="form-group">
                            <label>Bank:</label>
                            <input type="text">
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
                    <button class="prev-btn">Previous</button>   
                </div> 
                <button type="submit" class="submit-btn">Submit</button> 
            </div>
        </form>
        
    </div>
    

    <script src="form(OFW).js"></script>
</body>
</html>