document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    const messageElement = document.getElementById('message');
  
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/home';
    } else {
      messageElement.textContent = data.message || 'Login failed. Please try again.';
      messageElement.style.color = 'red';
    }
  });
  