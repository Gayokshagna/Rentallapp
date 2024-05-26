const form = document.getElementById('registrationForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            password,
            userType
        })
    });

    if (response.ok) {
        // Handle successful registration (e.g., redirect to login page)
        console.log('Registration successful!');
    } else {
        // Handle registration errors
        console.error('Registration failed!');
    }
});

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const forgetPasswordLink = document.getElementById('forget-password');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Replace with your actual login validation logic (e.g., fetch data from backend)
  if (email !== 'user@example.com' || password !== 'password123') {
    errorMessage.textContent = 'Invalid username or password!';
    errorMessage.style.display = 'block';
    return;
  }

  // Successful login (replace with logic to redirect to appropriate page)
  console.log('Login successful!');
});

forgetPasswordLink.addEventListener('click', (event) => {
  event.preventDefault();

  // Implement logic to handle forget password functionality (e.g., send reset email)
  console.log('User clicked on forget password');
  alert('A password reset link has been sent to your email (if implemented)');
});

const sellerDashboard = document.getElementById('seller-dashboard');
const addPropertyButton = document.getElementById('add-property');
const addPropertyForm = document.getElementById('add-property-form');
const propertyForm = document.getElementById('property-form');

// Seller dashboard toggle (replace with actual logic based on login state)
if (  isLoggedInSeller  ) {
    sellerDashboard.style.display = 'block';
}

addPropertyButton.addEventListener('click', () => {
    addPropertyForm.style.display = 'block';
});

// Handle form submission for adding a property (replace with logic to send data to backend)
propertyForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const place = document.getElementById('place').value;
    const area = document.getElementById('area').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const details = document.getElementById('details').value;
    const image = document.getElementById('image').files[0]; // Assuming image upload

    const formData = new FormData();
    formData.append('place', place);
    formData.append('area', area);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('details', details);
    if (image) {
        formData.append('image', image);
    }

    // Send data to backend using fetch or your preferred method
    const response = await fetch('/api/add-property', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        // Handle successful property addition (e.g., clear form, update property list)
        console.log('Property added successfully!');
    } else {
        console.error('Failed to add property!');
    }
});