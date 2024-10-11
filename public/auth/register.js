// Registration Script
const form = document.getElementById('signup-form'); // Ensure this matches your form ID
const messageDiv = document.getElementById('message'); // Ensure this matches your message div ID

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form); // Collect form data

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (response.ok) { // Use response.ok to check for success
            messageDiv.className = 'message success'; // Set message class to success
            messageDiv.innerText = data.message; // Display success message
        } else {
            messageDiv.className = 'message error'; // Set message class to error
            messageDiv.innerText = data.message; // Display error message
        }
        messageDiv.style.display = 'block'; // Show message div
    } catch (error) {
        console.error('Registration error:', error); // Log error for debugging
        messageDiv.className = 'message error'; // Set message class to error
        messageDiv.innerText = 'An error occurred. Please try again.'; // Display error message
        messageDiv.style.display = 'block'; // Show message div
    }
});

// Login Script
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from submitting the default way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) { // Use response.ok to check for success
            // Store the token in localStorage
            localStorage.setItem('authToken', result.token);
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';
            document.getElementById('success-message').textContent = result.message;

            // Redirect to profile page or another protected page
            window.location.href = '/profile.html'; // Example redirect to profile page
        } else {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('success-message').style.display = 'none';
            document.getElementById('error-message').textContent = result.message;
        }
    } catch (error) {
        console.error('Login error:', error); // Log error for debugging
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    }
});
