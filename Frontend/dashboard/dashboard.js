const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'auth.html';
}

document.getElementById('username').textContent = currentUser;

document.getElementById('create-btn').addEventListener('click', () => {
    window.location.href = 'create.html';
});

const users = JSON.parse(localStorage.getItem('users')) || {};
const proposals = users[currentUser]?.proposals || [];
const list = document.getElementById('proposal-list');

proposals.forEach((prop, index) => {
    const li = document.createElement('li');
    li.textContent = `Proposal to ${prop.recipient}: ${prop.status} - Link: ${window.location.origin}/proposal.html?id=${prop.id}`;
    list.appendChild(li);
});