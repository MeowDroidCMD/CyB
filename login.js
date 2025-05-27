document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const users = JSON.parse(localStorage.getItem('cybUsers')) || [];

  const userByUsername = users.find(user => user.username === username);
  const userByPassword = users.find(user => user.password === password);
  const matchedUser = users.find(user => user.username === username && user.password === password);

  if (matchedUser) {
    // Show welcome message
    showNotification(`Welcome "${username}"`, 'success');

    // Save login session (optional)
    localStorage.setItem('cybLoggedInUser', username);

    // Redirect after delay
    setTimeout(() => {
      window.location.href = 'loading.html';
    }, 3000); // 3-second delay
  } else if (userByUsername && userByUsername.password !== password) {
    showNotification('Incorrect Password', 'error');
  } else if (userByPassword && userByPassword.username !== username) {
    showNotification('Incorrect Username', 'error');
  } else {
    showNotification('Unidentified Account. Please Sign Up.', 'error');
  }
});

function showNotification(message, type = 'success') {
  const notif = document.getElementById('notification');
  notif.textContent = message;
  notif.style.backgroundColor = (type === 'error') ? '#e74c3c' : '#4BB543';
  notif.style.display = 'block';

  setTimeout(() => {
    notif.style.display = 'none';
  }, 5000);
}
