// !! IMPORTANT !!
// Replace this URL with your deployed backend API base URL (Railway/Render/Heroku)
const BACKEND_URL = "https://web-production-9dded.up.railway.app";

// Load profiles on page load
window.onload = async () => {
    const profileDropdown = document.getElementById("profile");

    try {
        // Fetch profile list from backend
        const res = await fetch(`${BACKEND_URL}/profiles`);
        const profiles = await res.json();

        profiles.forEach(profile => {
            const opt = document.createElement("option");
            opt.value = profile;
            opt.innerText = profile;
            profileDropdown.appendChild(opt);
        });
    } catch (err) {
        console.error("Error loading profiles:", err);
    }
};

// Handle command sending
document.getElementById("sendBtn").addEventListener("click", async () => {
    const profile = document.getElementById("profile").value;
    const command = document.getElementById("command").value;
    const responseDiv = document.getElementById("response");

    if (!command) {
        responseDiv.innerText = "Please enter a command.";
        return;
    }

    try {
        const res = await fetch(`${BACKEND_URL}/run-command`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ profile, command })
        });

        const data = await res.json();
        responseDiv.innerText = JSON.stringify(data, null, 2);
    } catch (err) {
        console.error("Error:", err);
        responseDiv.innerText = "Error connecting to backend.";
    }
});
