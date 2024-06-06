document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const referralCode = document.getElementById('referralCode').value;

  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, referralCode }),
  });

  const data = await response.json();
console.log(data,"data")
  if (response.status === 201) {
    localStorage.setItem('user', JSON.stringify(data.user)); // Store the entire user object
    window.location.href = '/home'; // Redirect to the home page
  } else {
    const messageElement = document.getElementById('message');
    messageElement.textContent = data.message || 'Registration failed. Please try again.';
    messageElement.style.color = 'red';
  }
});
