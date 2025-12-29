const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
if (!id) {
    alert('Invalid proposal link');
    return;
}

const proposals = JSON.parse(localStorage.getItem('proposals')) || {};
const proposal = proposals[id];
if (!proposal) {
    alert('Proposal not found');
    return;
}

const contentDiv = document.getElementById('proposal-content');
contentDiv.innerHTML = `
    <p><strong>From:</strong> Someone special</p>
    <p><strong>Description:</strong> ${proposal.description}</p>
    <p><strong>Message:</strong> ${proposal.message}</p>
    ${proposal.image ? `<img src="${proposal.image}" alt="Proposal Image">` : ''}
    <p><strong>Theme:</strong> ${proposal.theme}</p>
`;

document.getElementById('response-form').style.display = 'block';

document.getElementById('response-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const response = document.getElementById('response').value;
    const answer = document.getElementById('answer').value;
    proposal.responses.push({ response, answer, date: new Date().toISOString() });
    proposal.status = answer === 'yes' ? 'Accepted' : answer === 'no' ? 'Rejected' : 'Pending';
    localStorage.setItem('proposals', JSON.stringify(proposals));
    document.getElementById('response-form').style.display = 'none';
    document.getElementById('thank-you').style.display = 'block';
});