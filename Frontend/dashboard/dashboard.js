/* 🔐 PROTECT DASHBOARD */
const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");

if (!token || !userData) {
    window.location.href = "../../index.html";
}

/* 👤 SHOW USER NAME */
const user = JSON.parse(userData);
document.getElementById("username").innerText = user.name;

/* 🚪 LOGOUT */
function logout() {
    localStorage.clear();
    window.location.href = "../../index.html";
}
