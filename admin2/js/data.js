// Sample data for the application
const applicationData = [
    {
        id: "APP-OFW-001",
        name: "Juan Dela Cruz",
        type: "ofw",
        status: "approved",
        date: "2025-03-15",
        details: {
            personalInfo: {
                age: 32,
                gender: "Male",
                email: "juan.delacruz@example.com",
                phone: "+63 912 345 6789",
                address: "123 Main St, Manila, Philippines"
            },
            employmentInfo: {
                employer: "Global Solutions Inc.",
                position: "IT Specialist",
                country: "Singapore",
                monthlyIncome: "$3,500",
                yearsEmployed: 4
            },
            loanInfo: {
                requestedAmount: "$15,000",
                purpose: "House renovation",
                preferredTerms: 36
            }
        },
        loan: {
            loanAmount: 15000,
            monthlyPayment: 500,
            termsTotal: 36,
            termsPaid: 6,
            totalPaid: 3000,
            payments: [
                { date: "2025-03-30", amount: 500 },
                { date: "2025-04-30", amount: 500 },
                { date: "2025-05-30", amount: 500 },
                { date: "2025-06-30", amount: 500 },
                { date: "2025-07-30", amount: 500 },
                { date: "2025-08-30", amount: 500 }
            ]
        }
    },
    {
        id: "APP-OFW-002",
        name: "Maria Santos",
        type: "ofw",
        status: "approved",
        date: "2025-03-20",
        details: {
            personalInfo: {
                age: 28,
                gender: "Female",
                email: "maria.santos@example.com",
                phone: "+63 917 123 4567",
                address: "456 Rizal Ave, Quezon City, Philippines"
            },
            employmentInfo: {
                employer: "Dubai Medical Center",
                position: "Nurse",
                country: "UAE",
                monthlyIncome: "$3,000",
                yearsEmployed: 3
            },
            loanInfo: {
                requestedAmount: "$10,000",
                purpose: "Family business",
                preferredTerms: 24
            }
        },
        loan: {
            loanAmount: 10000,
            monthlyPayment: 458.33,
            termsTotal: 24,
            termsPaid: 2,
            totalPaid: 916.66,
            payments: [
                { date: "2025-04-05", amount: 458.33 },
                { date: "2025-05-05", amount: 458.33 }
            ]
        }
    },
    {
        id: "APP-OFW-003",
        name: "Roberto Reyes",
        type: "ofw",
        status: "pending",
        date: "2025-04-02",
        details: {
            personalInfo: {
                age: 35,
                gender: "Male",
                email: "roberto.reyes@example.com",
                phone: "+63 918 765 4321",
                address: "789 Sampaguita St, Cebu City, Philippines"
            },
            employmentInfo: {
                employer: "Ocean Marine Services",
                position: "Marine Engineer",
                country: "United States",
                monthlyIncome: "$4,500",
                yearsEmployed: 6
            },
            loanInfo: {
                requestedAmount: "$20,000",
                purpose: "Property investment",
                preferredTerms: 48
            }
        }
    },
    {
        id: "APP-OFW-004",
        name: "Sophia Garcia",
        type: "ofw",
        status: "declined",
        date: "2025-03-25",
        details: {
            personalInfo: {
                age: 30,
                gender: "Female",
                email: "sophia.garcia@example.com",
                phone: "+63 919 876 5432",
                address: "321 Mabini St, Davao City, Philippines"
            },
            employmentInfo: {
                employer: "Hong Kong Hospitality Group",
                position: "Hotel Staff",
                country: "Hong Kong",
                monthlyIncome: "$2,200",
                yearsEmployed: 1
            },
            loanInfo: {
                requestedAmount: "$12,000",
                purpose: "Education fund",
                preferredTerms: 36
            }
        }
    },
    {
        id: "APP-STU-001",
        name: "Miguel Bautista",
        type: "student",
        status: "approved",
        date: "2025-03-10",
        details: {
            personalInfo: {
                age: 22,
                gender: "Male",
                email: "miguel.bautista@example.com",
                phone: "+63 912 987 6543",
                address: "567 University Ave, Manila, Philippines"
            },
            educationInfo: {
                university: "University of the Philippines",
                course: "Computer Science",
                yearLevel: "4th Year",
                gpa: 3.8
            },
            guardianInfo: {
                name: "Eduardo Bautista",
                relationship: "Father",
                occupation: "Civil Engineer",
                monthlyIncome: "$1,800"
            },
            loanInfo: {
                requestedAmount: "$5,000",
                purpose: "Tuition fees",
                preferredTerms: 24
            }
        },
        loan: {
            loanAmount: 5000,
            monthlyPayment: 229.17,
            termsTotal: 24,
            termsPaid: 4,
            totalPaid: 916.68,
            payments: [
                { date: "2025-03-15", amount: 229.17 },
                { date: "2025-04-15", amount: 229.17 },
                { date: "2025-05-15", amount: 229.17 },
                { date: "2025-06-15", amount: 229.17 }
            ]
        }
    },
    {
        id: "APP-STU-002",
        name: "Isabella Lopez",
        type: "student",
        status: "approved",
        date: "2025-03-18",
        details: {
            personalInfo: {
                age: 21,
                gender: "Female",
                email: "isabella.lopez@example.com",
                phone: "+63 917 456 7890",
                address: "234 College Rd, Baguio City, Philippines"
            },
            educationInfo: {
                university: "Ateneo de Manila University",
                course: "Business Administration",
                yearLevel: "3rd Year",
                gpa: 3.6
            },
            guardianInfo: {
                name: "Carmela Lopez",
                relationship: "Mother",
                occupation: "Accountant",
                monthlyIncome: "$1,500"
            },
            loanInfo: {
                requestedAmount: "$6,000",
                purpose: "Thesis project and living expenses",
                preferredTerms: 30
            }
        },
        loan: {
            loanAmount: 6000,
            monthlyPayment: 220,
            termsTotal: 30,
            termsPaid: 3,
            totalPaid: 660,
            payments: [
                { date: "2025-04-01", amount: 220 },
                { date: "2025-05-01", amount: 220 },
                { date: "2025-06-01", amount: 220 }
            ]
        }
    },
    {
        id: "APP-STU-003",
        name: "Gabriel Aquino",
        type: "student",
        status: "pending",
        date: "2025-04-05",
        details: {
            personalInfo: {
                age: 20,
                gender: "Male",
                email: "gabriel.aquino@example.com",
                phone: "+63 918 234 5678",
                address: "876 Education St, Iloilo City, Philippines"
            },
            educationInfo: {
                university: "De La Salle University",
                course: "Engineering",
                yearLevel: "2nd Year",
                gpa: 3.5
            },
            guardianInfo: {
                name: "Antonio Aquino",
                relationship: "Father",
                occupation: "Small Business Owner",
                monthlyIncome: "$1,200"
            },
            loanInfo: {
                requestedAmount: "$4,500",
                purpose: "Tuition and books",
                preferredTerms: 24
            }
        }
    },
    {
        id: "APP-STU-004",
        name: "Sophia Mendoza",
        type: "student",
        status: "declined",
        date: "2025-03-22",
        details: {
            personalInfo: {
                age: 19,
                gender: "Female",
                email: "sophia.mendoza@example.com",
                phone: "+63 919 345 6789",
                address: "543 Student Dorm, Bacolod City, Philippines"
            },
            educationInfo: {
                university: "University of Santo Tomas",
                course: "Nursing",
                yearLevel: "1st Year",
                gpa: 3.0
            },
            guardianInfo: {
                name: "Ricardo Mendoza",
                relationship: "Father",
                occupation: "Farmer",
                monthlyIncome: "$800"
            },
            loanInfo: {
                requestedAmount: "$7,000",
                purpose: "Full year tuition",
                preferredTerms: 36
            }
        }
    },
    {
        id: "APP-OFW-005",
        name: "Antonio Villanueva",
        type: "ofw",
        status: "pending",
        date: "2025-04-08",
        details: {
            personalInfo: {
                age: 38,
                gender: "Male",
                email: "antonio.villanueva@example.com",
                phone: "+63 915 678 9012",
                address: "987 Bonifacio St, Makati City, Philippines"
            },
            employmentInfo: {
                employer: "Qatar Construction Company",
                position: "Civil Engineer",
                country: "Qatar",
                monthlyIncome: "$4,000",
                yearsEmployed: 5
            },
            loanInfo: {
                requestedAmount: "$18,000",
                purpose: "Small business for family",
                preferredTerms: 36
            }
        }
    },
    {
        id: "APP-STU-005",
        name: "Lucas Ramos",
        type: "student",
        status: "pending",
        date: "2025-04-10",
        details: {
            personalInfo: {
                age: 22,
                gender: "Male",
                email: "lucas.ramos@example.com",
                phone: "+63 916 789 0123",
                address: "654 Scholar Rd, Cagayan de Oro, Philippines"
            },
            educationInfo: {
                university: "Mindanao State University",
                course: "Agriculture",
                yearLevel: "4th Year",
                gpa: 3.7
            },
            guardianInfo: {
                name: "Elena Ramos",
                relationship: "Mother",
                occupation: "Teacher",
                monthlyIncome: "$900"
            },
            loanInfo: {
                requestedAmount: "$3,500",
                purpose: "Thesis project and graduation fees",
                preferredTerms: 18
            }
        }
    }
];