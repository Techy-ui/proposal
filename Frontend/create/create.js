const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'auth.html';
}

document.getElementById('proposal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const description = document.getElementById('description').value;
    const message = document.getElementById('message').value;
    const image = document.getElementById('image').files[0];
    const theme = document.getElementById('theme').value;

    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    const proposal = { id, recipient, description, message, theme, status: 'Pending', responses: [] };
    if (image) {
        const reader = new FileReader();
        reader.onload = () => {
            proposal.image = reader.result;
            saveProposal(proposal);
        };
        reader.readAsDataURL(image);
    } else {
        saveProposal(proposal);
    }
});

function saveProposal(proposal) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[currentUser].proposals.push(proposal);
    localStorage.setItem('users', JSON.stringify(users));

    const link = `${window.location.origin}/proposal.html?id=${proposal.id}`;
    document.getElementById('proposal-link').href = link;
    document.getElementById('proposal-link').textContent = link;
    document.getElementById('link-display').style.display = 'block';
}