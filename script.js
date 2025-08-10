// ==== CONFIG ====
// !!! CHANGE THIS TO YOUR RAILWAY BACKEND URL !!!
const BACKEND_URL = "https://YOUR-BACKEND-URL.up.railway.app";

// Populate dropdown with profiles from backend
async function loadProfiles() {
  try {
    const res = await fetch(`${BACKEND_URL}/profiles`);
    const profiles = await res.json();
    const select = document.getElementById("profileSelect");

    profiles.forEach(profile => {
      const option = document.createElement("option");
      option.value = profile;
      option.textContent = profile;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading profiles:", error);
  }
}

// Send command to backend
async function sendCommand() {
  const profile = document.getElementById("profileSelect").value;
  const command = document.getElementById("commandInput").value;
  const responseBox = document.getElementById("response");

  responseBox.textContent = "Processing...";

  try {
    const res = await fetch(`${BACKEND_URL}/command`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, command })
    });

    const data = await res.json();
    responseBox.textContent = data.response || "No response from assistant.";
  } catch (error) {
    responseBox.textContent = "Error connecting to backend.";
    console.error(error);
  }
}

document.getElementById("sendBtn").addEventListener("click", sendCommand);
window.onload = loadProfiles;
