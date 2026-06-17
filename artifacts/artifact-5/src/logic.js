// --- DEIN API TOKEN ---
const API_ACCESS_TOKEN = "pSFsxCdB6y8ymYSVPwVz";

// --- 1. DATENVERWALTUNG (RESET BEIM NEULADEN) ---
let localCompanions = [
    { id: "admin_maxwise", name: "Maxwise", gender: "Männlich", species: "Hobbit", ration: "3 Lembas", fingerprint: true, isAdmin: true }
];

let deletedApiIds = [];
let allDisplayedCompanions = []; 
let currentUser = null; 
let isEditMode = false; 
let currentFingerprintStatus = false;

// --- 2. HTML ELEMENTE ---
const screenList = document.getElementById("screen-list");
const screenForm = document.getElementById("screen-form");
const screenDetail = document.getElementById("screen-detail");
const headerTitle = document.getElementById("headerTitle");
const backBtn = document.getElementById("backBtn");
const fellowshipList = document.getElementById("fellowshipList");
const saveUserBtn = document.getElementById("saveUserBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const formName = document.getElementById("formName");
const formGender = document.getElementById("formGender");
const formSpecies = document.getElementById("formSpecies");
const formRation = document.getElementById("formRation");

const formFingerprint = document.getElementById("formFingerprint");
const fpText = document.getElementById("fpText");

const toast = document.getElementById("toast");
const confirmModal = document.getElementById("confirmModal");
const confirmYesBtn = document.getElementById("confirmYesBtn");
const confirmNoBtn = document.getElementById("confirmNoBtn");

const discardModal = document.getElementById("discardModal");
const discardTitle = document.getElementById("discardTitle");
const discardYesBtn = document.getElementById("discardYesBtn");
const discardNoBtn = document.getElementById("discardNoBtn");

// --- 3. BERECHNUNG & FINGERABDRUCK ---
function calculateRation(species) {
    if (species === "Hobbit") return "3 Lembas";
    if (species === "Mensch") return "1 Lembas";
    if (species === "Zwerg") return "1.5 Lembas";
    if (species === "Elb") return "0.25 Lembas";
    if (species === "Maia") return "0.5 Lembas";
    return "Unbekannt";
}

formSpecies.addEventListener("change", function() {
    formRation.value = calculateRation(this.value);
});

// Fingerabdruck Scan-Logik 
formFingerprint.onclick = () => {
    currentFingerprintStatus = true;
    formFingerprint.classList.add("scanned");
    fpText.textContent = "Gescannt";
};

function resetFingerprintBox() {
    currentFingerprintStatus = false;
    formFingerprint.classList.remove("scanned");
    fpText.textContent = "Zum erfassen Finger anlegen";
}

function setFingerprintBoxScanned() {
    currentFingerprintStatus = true;
    formFingerprint.classList.add("scanned");
    fpText.textContent = "Finger erneut anlegen, um Abdruck zu ändern";
}

// --- POP-UP FUNKTION (TOAST) ---
function showToast(message, isError = false) {
    toast.innerHTML = message; // innerHTML, damit wir <br> für Umbrüche nutzen können
    
    if (isError) {
        toast.classList.add("error");
    } else {
        toast.classList.remove("error");
    }
    
    toast.classList.add("show");
    setTimeout(() => { 
        toast.classList.remove("show"); 
    }, 3000); 
}

// --- 4. API ABRUF & LISTE ZEICHNEN ---
async function fetchAndRenderList() {
    try {
        const namesToFetch = ["Legolas", "Gandalf", "Aragorn II Elessar", "Gimli", "Boromir", "Meriadoc Brandybuck", "Frodo Baggins", "Samwise Gamgee", "Peregrin Took"];
        let apiCompanions = [];

        const requests = namesToFetch.map(name => 
            fetch(`https://the-one-api.dev/v2/character?name=${name}`, {
                headers: { 'Authorization': `Bearer ${API_ACCESS_TOKEN}` }
            }).then(res => res.ok ? res.json() : null)
        );

        const results = await Promise.all(requests);

        results.forEach(data => {
            if (data && data.docs && data.docs.length > 0) {
                const char = data.docs[0];
                
                let mappedGender = "Unbekannt";
                if(char.gender) {
                    let g = char.gender.toLowerCase();
                    if(g === "male" || (g.includes("male") && !g.includes("female"))) mappedGender = "Männlich";
                    else if(g === "female" || g.includes("female")) mappedGender = "Weiblich";
                }

                let mappedSpecies = "Unbekannt";
                if(char.race === "Elf") mappedSpecies = "Elb";
                else if(char.race && char.race.includes("Human")) mappedSpecies = "Mensch";
                else if(char.race === "Dwarf") mappedSpecies = "Zwerg";
                else if(char.race && char.race.includes("Hobbit")) mappedSpecies = "Hobbit";
                else if(char.race && (char.race.includes("Maia") || char.race.includes("Wizard"))) mappedSpecies = "Maia";
                
                let displayName = char.name.split(" ")[0]; 
                let charId = "api_" + displayName; 

                if (!deletedApiIds.includes(charId) && !localCompanions.some(c => c.id === charId)) {
                    apiCompanions.push({
                        id: charId,
                        name: displayName,
                        gender: mappedGender, 
                        species: mappedSpecies,
                        ration: calculateRation(mappedSpecies),
                        fingerprint: true, 
                        isAdmin: false
                    });
                }
            }
        });

        allDisplayedCompanions = [...localCompanions, ...apiCompanions];
        renderCards();

    } catch (error) {
        console.error("API Fehler:", error);
        allDisplayedCompanions = [...localCompanions];
        renderCards();
    }
}

function renderCards() {
    fellowshipList.innerHTML = "";
    
    // SORTIERUNG: Admin immer oben, danach alphabetisch nach Name
    allDisplayedCompanions.sort((a, b) => {
        if (a.isAdmin) return -1;
        if (b.isAdmin) return 1;
        return a.name.localeCompare(b.name);
    });

    allDisplayedCompanions.forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";
        let adminText = user.isAdmin ? '<div class="admin-badge">ADMIN</div>' : ''; 
        
        card.innerHTML = `
            <div class="user-card-info" style="width: 100%;">
                ${adminText}
                <div>NAME: ${user.name}</div>
                <div>SPEZIES: ${user.species}</div>
            </div>
        `;
        card.onclick = () => openUserDetails(user);
        fellowshipList.appendChild(card);
    });
}

// --- 5. NAVIGATION & ZURÜCK-BUTTON LOGIK ---
function showScreen(screenName, title) {
    screenList.classList.remove("active");
    screenForm.classList.remove("active");
    screenDetail.classList.remove("active");
    
    if (screenName === "list") {
        screenList.classList.add("active");
        backBtn.style.display = "none";
        renderCards();
    } else if (screenName === "form") {
        screenForm.classList.add("active");
        backBtn.style.display = "block";
    } else if (screenName === "detail") {
        screenDetail.classList.add("active");
        backBtn.style.display = "block";
    }
    headerTitle.innerHTML = title; // innerHTML, damit wir <br> nutzen können
}

backBtn.onclick = () => {
    if (screenForm.classList.contains("active")) {
        discardTitle.textContent = isEditMode ? "Änderung verwerfen?" : "Neues Profil verwerfen?";
        discardModal.style.display = "flex";
    } else {
        showScreen("list", "PROFILE<br>VERWALTEN");
    }
};

discardNoBtn.onclick = () => {
    discardModal.style.display = "none";
};

discardYesBtn.onclick = () => {
    discardModal.style.display = "none";
    if (isEditMode) {
        showToast("Änderung verworfen");
        showScreen("detail", "PROFIL<br>DETAILS");
    } else {
        showToast("Profil verworfen");
        showScreen("list", "PROFILE<br>VERWALTEN");
    }
};

// --- 6. DETAILS ANZEIGEN ---
function openUserDetails(user) {
    currentUser = user;
    document.getElementById("viewName").textContent = user.name;
    document.getElementById("viewGender").textContent = user.gender;
    document.getElementById("viewSpecies").textContent = user.species;
    document.getElementById("viewRation").textContent = user.ration;
    
    // Fingerabdruck Bild/SVG für Details (Größer und deutlicher gemacht)
    let fpSVG = user.fingerprint 
        ? `<div style="display:flex; flex-direction:column; align-items:center; gap:5px;">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                 <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                 <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                 <path d="M2 12a10 10 0 0 1 18-6" />
                 <path d="M2 16h.01" />
                 <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                 <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
                 <path d="M8.65 22c.21-.66.45-1.32.57-2" />
                 <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
             </svg>
             <span style="color: #4CAF50; font-size: 0.95rem; font-weight: bold;">Erfasst</span>
           </div>` 
        : `<div style="display:flex; flex-direction:column; align-items:center; gap:5px;">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#a38a6b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                 <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                 <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                 <path d="M2 12a10 10 0 0 1 18-6" />
                 <path d="M2 16h.01" />
                 <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                 <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
                 <path d="M8.65 22c.21-.66.45-1.32.57-2" />
                 <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
             </svg>
             <span style="color: #a38a6b; font-size: 0.95rem;">Nicht erfasst</span>
           </div>`;
           
    document.getElementById("viewFingerprint").innerHTML = fpSVG;
    
    if(user.isAdmin) {
        deleteBtn.style.display = "none";
        editBtn.style.display = "block"; 
    } else {
        deleteBtn.style.display = "block";
        editBtn.style.display = "block";
    }
    
    // Zweizeilig für perfekten Fit neben dem Zurück-Button
    showScreen("detail", "PROFIL<br>DETAILS");
}

// --- 7. PROFIL ANLEGEN / BEARBEITEN ---
document.getElementById("goToAddBtn").onclick = () => {
    isEditMode = false;
    formName.value = "";
    formGender.value = "";
    formSpecies.value = "";
    formRation.value = "";
    resetFingerprintBox();
    saveUserBtn.textContent = "PROFIL SPEICHERN"; 
    showScreen("form", "NEUES<br>PROFIL");
};

editBtn.onclick = () => {
    isEditMode = true;
    formName.value = currentUser.name;
    formGender.value = currentUser.gender;
    formSpecies.value = currentUser.species;
    formRation.value = currentUser.ration;
    
    if(currentUser.fingerprint) setFingerprintBoxScanned();
    else resetFingerprintBox();

    saveUserBtn.textContent = "ÄNDERUNG SPEICHERN"; 
    showScreen("form", "PROFIL<br>BEARBEITEN");
};

saveUserBtn.onclick = () => {
    
    // Präzise Fehlerermittlung
    let missingFields = [];
    if (formName.value.trim() === "") missingFields.push("Name");
    if (formGender.value === "") missingFields.push("Geschlecht");
    if (formSpecies.value === "") missingFields.push("Spezies");
    if (!currentFingerprintStatus) missingFields.push("Fingerabdruck");
    
    if (missingFields.length > 0) {
        let missingText = missingFields.join(", ");
        let errorMsg = "";
        
        if (isEditMode) {
            errorMsg = `Fehler: Profil konnte nicht geändert werden.<br><br><span style="font-size: 0.9rem; font-weight: normal;">Es fehlt: ${missingText}</span>`;
        } else {
            errorMsg = `Fehler: Profil konnte nicht angelegt werden.<br><br><span style="font-size: 0.9rem; font-weight: normal;">Es fehlt: ${missingText}</span>`;
        }
        
        showToast(errorMsg, true); // true = Fehler Styling
        return;
    }

    if (isEditMode) {
        currentUser.name = formName.value;
        currentUser.gender = formGender.value;
        currentUser.species = formSpecies.value;
        currentUser.ration = formRation.value;
        currentUser.fingerprint = currentFingerprintStatus;
        
        if (!localCompanions.some(c => c.id === currentUser.id)) {
            localCompanions.push(currentUser);
        }
        
        showToast("Profil erfolgreich bearbeitet");
        openUserDetails(currentUser);

    } else {
        const newUser = {
            id: "local_" + Date.now(),
            name: formName.value,
            gender: formGender.value,
            species: formSpecies.value,
            ration: formRation.value,
            fingerprint: currentFingerprintStatus,
            isAdmin: false
        };
        localCompanions.push(newUser);
        allDisplayedCompanions.push(newUser);
        
        showToast("Profil erfolgreich angelegt");
        showScreen("list", "PROFILE<br>VERWALTEN");
    }
};

// --- 8. PROFIL LÖSCHEN ---
deleteBtn.onclick = () => {
    if (currentUser.isAdmin) return; 
    confirmModal.style.display = "flex"; 
};

confirmNoBtn.onclick = () => {
    confirmModal.style.display = "none"; 
};

confirmYesBtn.onclick = () => {
    confirmModal.style.display = "none"; 

    localCompanions = localCompanions.filter(c => c.id !== currentUser.id);

    if (currentUser.id.startsWith("api_")) {
        deletedApiIds.push(currentUser.id);
    }

    allDisplayedCompanions = allDisplayedCompanions.filter(c => c.id !== currentUser.id);
    
    showToast("Profil erfolgreich gelöscht");
    showScreen("list", "PROFILE<br>VERWALTEN");
};

// Start!
fetchAndRenderList();
