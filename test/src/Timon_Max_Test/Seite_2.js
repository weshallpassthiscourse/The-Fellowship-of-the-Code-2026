let isAuthorized = false; // initial status

const statusTitle = document.getElementById("statusTitle");
const statusMessage = document.getElementById("statusMessage");
const scannerButton = document.querySelector(".scanner");
const statusBox = document.querySelector(".status");

function updateStatus(title, message, color){
    statusTitle.textContent = title;
    statusMessage.textContent = message;
    statusBox.style.backgroundColor = color;
}

 scannerButton.addEventListener("click", () => {
    scannerButton.style.backgroundColor = "#6b7356";
        setTimeout(() => {
            scannerButton.style.backgroundColor = "#5a6148";
        }, 200);

    let randomnumber = Math.random();
    if (randomnumber > 0.5) {
        isAuthorized = true;
        updateStatus ("🔓 Status 🔓", "Zugriff erlaubt", "#4CAF50");
    }
    else {
        isAuthorized = false;
        updateStatus ("🔒 Status 🔒", "Zugriff verweigert", "#d32f2f");
        setTimeout(() => {
            updateStatus ("🔐Status 🔐", "Warten auf Authentifizierung", "#2a2e20")
        }, 3000);
    }
});
document.querySelectorAll(".menu-button").forEach(button => {
    button.addEventListener("click", () => {
        window.location.href = "seite3.html";
    });
});
