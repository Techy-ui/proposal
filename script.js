// Page Navigation
const namePage = document.getElementById('namePage');
const proposalPage = document.getElementById('proposalPage');
const replyPage = document.getElementById('replyPage');
const nameInput = document.getElementById('nameInput');
const submitName = document.getElementById('submitName');
const proposalTitle = document.getElementById('proposalTitle');
const toReply = document.getElementById('toReply');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');

let userName = '';

// Submit Name and Go to Proposal
submitName.addEventListener('click', () => {
    userName = nameInput.value.trim();
    if (userName) {
        proposalTitle.textContent = `Will You Be My Valentine, ${userName}?`;
        namePage.classList.remove('active');
        proposalPage.classList.add('active');
    } else {
        alert('Please enter a name!');
    }
});

// Go to Reply Page
toReply.addEventListener('click', () => {
    proposalPage.classList.remove('active');
    replyPage.classList.add('active');
});

// Yes Button
yesBtn.addEventListener('click', () => {
    response.textContent = `Yay! I love you, ${userName}! 💖 Let's celebrate!`;
});

// No Button - Moves on Hover
noBtn.addEventListener('mouseover', () => {
    const container = document.querySelector('#replyPage .container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Random position within container bounds
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
});

// If No is somehow clicked (rare), show a fun message
noBtn.addEventListener('click', () => {
    response.textContent = `Nice try! But I know you'll say yes, ${userName}! 😘`;
});