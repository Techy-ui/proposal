/* 🔍 GET PROPOSAL ID FROM URL */
const params = new URLSearchParams(window.location.search);
const proposalId = params.get("id");

if (!proposalId) {
    document.body.innerHTML = "<h2>Invalid Proposal Link</h2>";
}

/* 📦 GET SAVED PROPOSALS (TEMP LOCAL STORAGE) */
const proposals = JSON.parse(localStorage.getItem("proposals")) || [];

/* 🔎 FIND MATCHING PROPOSAL */
const proposal = proposals.find(p => p.id === proposalId);

if (!proposal) {
    document.body.innerHTML = "<h2>Proposal not found 💔</h2>";
} else {
    /* APPLY THEME */
    document.body.classList.add(proposal.theme);

    /* FILL CONTENT */
    document.getElementById("recipientName").innerText =
        `Dear ${proposal.recipient} 💖`;

    document.getElementById("description").innerText =
        proposal.description;

    document.getElementById("message").innerText =
        proposal.message;

    document.getElementById("themeText").innerText =
        `Theme: ${proposal.theme}`;

    /* SHOW IMAGE IF EXISTS */
    if (proposal.image) {
        const img = document.getElementById("proposalImage");
        img.src = proposal.image;
        img.style.display = "block";
    }
}
