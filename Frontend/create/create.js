/* 🔐 PROTECT CREATE PROPOSAL PAGE */
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
    window.location.href = "../../index.html";
}

/* 📝 HANDLE PROPOSAL FORM SUBMIT */
document.getElementById("proposal-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const recipient = document.getElementById("recipient").value;
    const description = document.getElementById("description").value;
    const message = document.getElementById("message").value;
    const imageFile = document.getElementById("image").files[0];
    const theme = document.getElementById("theme").value;

    const proposal = {
        id: Date.now().toString(),
        userId: user.id,
        recipient,
        description,
        message,
        theme,
        createdAt: new Date().toISOString()
    };

    /* 📷 HANDLE IMAGE (BASE64 for now) */
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = () => {
            proposal.image = reader.result;
            showGeneratedLink(proposal);
        };
        reader.readAsDataURL(imageFile);
    } else {
        showGeneratedLink(proposal);
    }
});

/* 🔗 GENERATE SHAREABLE LINK (FRONTEND ONLY) */
function showGeneratedLink(proposal) {
    // TEMP: store proposal locally (will move to backend later)
    const proposals = JSON.parse(localStorage.getItem("proposals")) || [];
    proposals.push(proposal);
    localStorage.setItem("proposals", JSON.stringify(proposals));

    const link = `${window.location.origin}/proposal.html?id=${proposal.id}`;

    const linkEl = document.getElementById("proposal-link");
    linkEl.href = link;
    linkEl.textContent = link;

    document.getElementById("link-display").style.display = "block";
}
