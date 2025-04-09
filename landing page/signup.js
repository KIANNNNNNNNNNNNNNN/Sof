function goBack() {
    window.location.href = 'index.html';
}
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, password });
    
    // Clear form
    event.target.reset();
}