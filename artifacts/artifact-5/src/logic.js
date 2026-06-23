const API_ACCESS_TOKEN = "pSFsxCdB6y8ymYSVPwVz";

let localCompanions = [
    { id: "admin_maxwise", name: "Maxwise", gender: "Männlich", species: "Hobbit", ration: "3 Lembas", fingerprint: true, isAdmin: true }
];
let deletedApiIds = [];
let allDisplayedCompanions = [];
let currentUser = null;
let isEditMode = false;
let currentFingerprintStatus = false;

const screenList    = document.getElementById("screen-list");
const screenForm    = document.getElementById("screen-form");
const screenDetail  = document.getElementById("screen-detail");
const headerTitle   = document.getElementById("headerTitle");
const backBtn       = document.getElementById("backBtn");
const fellowshipList = document.getElementById("fellowshipList");
const formName      = document.getElementById("formName");
const formGender    = document.getElementById("formGender");
const formSpecies   = document.getElementById("formSpecies");
const formRation    = document.getElementById("formRation");
const formFingerprint = document.getElementById("formFingerprint");
const fpText        = document.getElementById("fpText");
const saveUserBtn   = document.getElementById("saveUserBtn");
const editBtn       = document.getElementById("editBtn");
const deleteBtn     = document.getElementById("deleteBtn");
const toast         = document.getElementById("toast");
const modal         = document.getElementById("modal");
const modalTitle    = document.getElementById("modalTitle");
const modalText     = document.getElementById("modalText");
const modalYesBtn   = document.getElementById("modalYesBtn");
const modalNoBtn    = document.getElementById("modalNoBtn");

function calculateRation(species) {
    const map = {
        Hobbit: "3 Lembas",
        Mensch: "1 Lembas",
        Zwerg: "1.5 Lembas",
        Elb: "0.25 Lembas",
        Maia: "0.5 Lembas"
    };
    return map[species] || "Unbekannt";
}

function fingerprintSVG(scanned) {
    const className = scanned ? "fp-display scanned" : "fp-display";
    return `<div class="${className}"></div>`;
}

function showToast(message, isError = false) {
    toast.innerHTML = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

function showModal({ title, text = "", onYes }) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.style.display = "flex";
    modalYesBtn.onclick = () => { modal.style.display = "none"; onYes(); };
    modalNoBtn.onclick  = () => { modal.style.display = "none"; };
}

function showScreen(screenName, title) {
    screenList.classList.remove("active");
    screenForm.classList.remove("active");
    screenDetail.classList.remove("active");

    // Zurück-Button nur auf List-Screen verstecken
    backBtn.style.display = screenName === "list" ? "none" : "block";

    if (screenName === "list") {
        screenList.classList.add("active");
        renderCards();
    } else if (screenName === "form") {
        screenForm.classList.add("active");
    } else if (screenName === "detail") {
        screenDetail.classList.add("active");
    }
    headerTitle.innerHTML = title;
}

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

async function fetchAndRenderList() {
    try {
        const namesToFetch = [
            "Legolas", "Gandalf", "Aragorn II Elessar", "Gimli", "Boromir",
            "Meriadoc Brandybuck", "Frodo Baggins", "Samwise Gamgee", "Peregrin Took"
        ];

        const results = await Promise.all(
            namesToFetch.map(name =>
                fetch(`https://the-one-api.dev/v2/character?name=${name}`, {
                    headers: { 'Authorization': `Bearer ${API_ACCESS_TOKEN}` }
                }).then(res => res.ok ? res.json() : null)
            )
        );

        const apiCompanions = [];
        results.forEach(data => {
            if (!data?.docs?.length) return;
            const char = data.docs[0];

            const g = char.gender?.toLowerCase() || "";
            const mappedGender = g.includes("female") ? "Weiblich" : g.includes("male") ? "Männlich" : "Unbekannt";

            const raceMap = { Elf: "Elb", Dwarf: "Zwerg" };
            let mappedSpecies = "Unbekannt";
            if (char.race) {
                if (raceMap[char.race]) mappedSpecies = raceMap[char.race];
                else if (char.race.includes("Human"))  mappedSpecies = "Mensch";
                else if (char.race.includes("Hobbit")) mappedSpecies = "Hobbit";
                else if (char.race.includes("Maia") || char.race.includes("Wizard")) mappedSpecies = "Maia";
            }

            const displayName = char.name.split(" ")[0];
            const charId = "api_" + displayName;

            if (!deletedApiIds.includes(charId) && !localCompanions.some(c => c.id === charId)) {
                apiCompanions.push({
                    id: charId, name: displayName, gender: mappedGender, species: mappedSpecies,
                    ration: calculateRation(mappedSpecies), fingerprint: true, isAdmin: false
                });
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
    allDisplayedCompanions.sort((a, b) => {
        if (a.isAdmin) return -1;
        if (b.isAdmin) return 1;
        return a.name.localeCompare(b.name);
    });
    allDisplayedCompanions.forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";
        card.innerHTML = `
            <div class="user-card-info">
                ${user.isAdmin ? '<div class="admin-badge">ADMIN</div>' : ''}
                <div>NAME: ${user.name}</div>
                <div>SPEZIES: ${user.species}</div>
            </div>`;
        card.onclick = () => openUserDetails(user);
        fellowshipList.appendChild(card);
    });
}

// Zurück-Button initial verstecken
backBtn.style.display = "none";

const detailFields = [
    { label: "Name",                  key: "name" },
    { label: "Geschlecht",            key: "gender" },
    { label: "Spezies",               key: "species" },
    { label: "Lembas-Bedarf pro Tag", key: "ration", highlight: true },
];

function openUserDetails(user) {
    currentUser = user;
    document.getElementById("detailInfo").innerHTML =
        detailFields.map(f => `
            <div class="detail-label">${f.label}:</div>
            <div class="detail-value ${f.highlight ? 'highlight' : ''}">${user[f.key]}</div>
        `).join("") + `
            <div class="detail-label">Fingerabdruck:</div>
            <div class="detail-value" id="viewFingerprint">${fingerprintSVG(user.fingerprint)}</div>
        `;

    deleteBtn.style.display = user.isAdmin ? "none" : "block";
    showScreen("detail", "PROFIL<br>DETAILS");
}

// Zurück-Button Handler
backBtn.onclick = () => {
    if (screenForm.classList.contains("active")) {
        showModal({
            title: isEditMode ? "Änderung verwerfen?" : "Neues Profil verwerfen?",
            onYes: () => {
                if (isEditMode) {
                    showToast("Änderung verworfen");
                    showScreen("detail", "PROFIL<br>DETAILS");
                } else {
                    showToast("Profil verworfen");
                    showScreen("list", "PROFILE<br>VERWALTEN");
                }
            }
        });
    } else {
        showScreen("list", "PROFILE<br>VERWALTEN");
    }
};

document.getElementById("goToAddBtn").onclick = () => {
    isEditMode = false;
    formName.value = formGender.value = formSpecies.value = formRation.value = "";
    resetFingerprintBox();
    saveUserBtn.textContent = "PROFIL HINZUFÜGEN";
    showScreen("form", "NEUES<br>PROFIL");
};

editBtn.onclick = () => {
    isEditMode = true;
    formName.value    = currentUser.name;
    formGender.value  = currentUser.gender;
    formSpecies.value = currentUser.species;
    formRation.value  = currentUser.ration;
    currentUser.fingerprint ? setFingerprintBoxScanned() : resetFingerprintBox();
    saveUserBtn.textContent = "ÄNDERUNG SPEICHERN";
    showScreen("form", "PROFIL<br>BEARBEITEN");
};

formSpecies.addEventListener("change", function () {
    formRation.value = this.value ? calculateRation(this.value) : "";
});

formFingerprint.onclick = () => {
    currentFingerprintStatus = true;
    formFingerprint.classList.add("scanned");
    fpText.textContent = "Gescannt";
};

saveUserBtn.onclick = () => {
    const missingFields = [];
    if (!formName.value.trim())      missingFields.push("Name");
    if (!formGender.value)           missingFields.push("Geschlecht");
    if (!formSpecies.value)          missingFields.push("Spezies");
    if (!currentFingerprintStatus)   missingFields.push("Fingerabdruck");

    if (missingFields.length > 0) {
        const aktion = isEditMode ? "geändert" : "angelegt";
        showToast(
            `Fehler: Profil konnte nicht ${aktion} werden.<br><br>` +
            `<span style="font-size:0.9rem; font-weight:normal;">Es fehlt: ${missingFields.join(", ")}</span>`,
            true
        );
        return;
    }

    if (isEditMode) {
        currentUser.name        = formName.value;
        currentUser.gender      = formGender.value;
        currentUser.species     = formSpecies.value;
        currentUser.ration      = formRation.value;
        currentUser.fingerprint = currentFingerprintStatus;

        if (!localCompanions.some(c => c.id === currentUser.id)) {
            localCompanions.push(currentUser);
        }

        const idx = allDisplayedCompanions.findIndex(c => c.id === currentUser.id);
        if (idx !== -1) {
            allDisplayedCompanions[idx] = currentUser;
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
        showToast("Profil erfolgreich hinzugefügt");
        showScreen("list", "PROFILE<br>VERWALTEN");
    }
};

deleteBtn.onclick = () => {
    if (currentUser.isAdmin) return;
    showModal({
        title: "Bist du sicher?",
        text: "Möchtest du dieses Profil wirklich löschen?",
        onYes: () => {
            localCompanions = localCompanions.filter(c => c.id !== currentUser.id);
            allDisplayedCompanions = allDisplayedCompanions.filter(c => c.id !== currentUser.id);
            if (currentUser.id.startsWith("api_")) {
                deletedApiIds.push(currentUser.id);
            }
            showToast("Profil erfolgreich gelöscht");
            showScreen("list", "PROFILE<br>VERWALTEN");
        }
    });
};

fetchAndRenderList();
