function goBack() {
    window.location.href = 'index.html';
}

// Optional password validation before form submits
document.getElementById('signupForm').addEventListener('submit', function (event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        event.preventDefault(); // Stop form from submitting
        alert('Passwords do not match!');
    }
});
