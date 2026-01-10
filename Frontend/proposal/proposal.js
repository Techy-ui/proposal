const API_BASE = "https://proposal-fuwy.onrender.com";

const params = new URLSearchParams(window.location.search);
const proposalId = params.get("id");

if (!proposalId) {
  document.body.innerHTML = "<h2>Invalid Proposal Link</h2>";
}

fetch(`${API_BASE}/api/proposals/${proposalId}`)
  .then(res => res.json())
  .then(proposal => {
    if (proposal.message === "Proposal not found") {
      document.body.innerHTML = "<h2>Proposal not found 💔</h2>";
      return;
    }

    document.body.classList.add(proposal.theme);

    document.getElementById("recipientName").innerText =
      `Dear ${proposal.recipient} 💖`;

    document.getElementById("description").innerText = proposal.description;
    document.getElementById("message").innerText = proposal.message;
    document.getElementById("themeText").innerText = `Theme: ${proposal.theme}`;

    if (proposal.image) {
      const img = document.getElementById("proposalImage");
      img.src = proposal.image;
      img.style.display = "block";
    }
  })
  .catch(() => {
    document.body.innerHTML = "<h2>Error loading proposal</h2>";
  });
