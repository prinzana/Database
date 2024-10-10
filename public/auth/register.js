
        const form = document.getElementById('registrationForm');
        const messageDiv = document.getElementById('message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            try {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.success) {
                    messageDiv.className = 'message success'; // Set message class to success
                    messageDiv.innerText = data.message; // Display success message
                } else {
                    messageDiv.className = 'message error'; // Set message class to error
                    messageDiv.innerText = data.message; // Display error message
                }
                messageDiv.style.display = 'block'; // Show message div
            } catch (error) {
                messageDiv.className = 'message error'; // Set message class to error
                messageDiv.innerText = 'An error occurred. Please try again.'; // Display error message
                messageDiv.style.display = 'block'; // Show message div
            }
        });

