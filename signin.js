document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission for SRM Net ID sign-in
    const signInForm = document.querySelector('form');
    const netIdInput = document.getElementById('netid');
    const passwordInput = document.getElementById('password');

    signInForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const netId = netIdInput.value;
        const password = passwordInput.value;

        if (!netId || !password) {
            alert('Please enter both SRM Net ID and Password.');
            return;
        }

        // Send request to backend
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                netid: netId,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Signed in successfully!') {
                alert('Signed in successfully! Redirecting to home page...');
                window.location.href = 'index.html'; // Redirect after successful login
            } else {
                alert('Invalid SRM Net ID or Password.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while signing in.');
        });
    });

    // Toggle Password Visibility Function
    document.getElementById('togglePassword').addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        const eyeIcon = this.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'; // Show password
            eyeIcon.classList.remove('fa-eye'); // Change to eye-slash
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password'; // Hide password
            eyeIcon.classList.remove('fa-eye-slash'); // Change to eye
            eyeIcon.classList.add('fa-eye');
        }
    });
});
