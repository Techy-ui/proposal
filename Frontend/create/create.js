const API_BASE = "https://proposal-fuwy.onrender.com";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
  window.location.href = "../../index.html";
}

document.getElementById("proposal-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const recipient = document.getElementById("recipient").value;
  const description = document.getElementById("description").value;
  const message = document.getElementById("message").value;
  const imageFile = document.getElementById("image").files[0];
  const theme = document.getElementById("theme").value;

  let imageBase64 = null;

  if (imageFile) {
    imageBase64 = await toBase64(imageFile);
  }

  try {
    const res = await fetch(`${API_BASE}/api/proposals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        recipient,
        description,
        message,
        theme,
        image: imageBase64
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to create proposal");
      return;
    }

    const link = `https://techy-ui.github.io/proposal/Frontend/proposal/proposal.html?id=${proposal.id}`;

    document.getElementById("proposal-link").href = link;
    document.getElementById("proposal-link").textContent = link;
    document.getElementById("link-display").style.display = "block";

  } catch (err) {
    alert("Server error");
  }
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
