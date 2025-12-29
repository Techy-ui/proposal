const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode') || 'login';
const title = document.getElementById('title');
const toggleLink = document.getElementById('toggle-link');
let isLogin = mode === 'login';

title.textContent = isLogin ? 'Login' : 'Sign Up';
toggleLink.textContent = isLogin ? 'Sign Up' : 'Login';

document.getElementById('auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (isLogin) {
        if (users[username] && users[username].password === password) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    } else {
        if (users[username]) {
            alert('User already exists');
        } else {
            users[username] = { password, proposals: [] };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', username);
            window.location.href = 'dashboard.html';
        }
    }
});

toggleLink.addEventListener('click', () => {
    isLogin = !isLogin;
    title.textContent = isLogin ? 'Login' : 'Sign Up';
    toggleLink.textContent = isLogin ? 'Sign Up' : 'Login';
});