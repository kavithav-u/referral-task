document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user,"user")

  if (user) {
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('referralCode').textContent = user.referralCode;
    document.getElementById('referralLink').innerHTML = `<a href="${user.referralLink}" target="_blank">${user.referralLink}</a>`;
    document.getElementById('referralCount').textContent = user.referralCount;
  } else {
    window.location.href = '/login';
  }

  document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  });
});
