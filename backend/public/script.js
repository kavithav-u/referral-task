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
  
    if (response.status === 201) {
      document.getElementById('message').textContent = data.message;
    } else {
      document.getElementById('message').textContent = data.message || 'Registration failed. Please try again.';
      document.getElementById('message').style.color = 'red';
    }
  });
  