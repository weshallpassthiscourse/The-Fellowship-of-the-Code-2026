// ============================================================================
// WAYBREAD WATCHER - Logik & Datenverwaltung
// ============================================================================

// — API KONFIGURATION —
const API_ACCESS_TOKEN = “pSFsxCdB6y8ymYSVPwVz”;

// — DATEN (Reset beim Neuladen) —
// localCompanions: Nur der Admin Maxwise bleibt nach Reload
// deletedApiIds: Merkt sich gelöschte API-Charaktere (nur diese Session)
// allDisplayedCompanions: Alle angezeigten User (lokal + API)
// currentUser: Der gerade ausgewählte User für Detailansicht
let localCompanions = [
{ id: “admin_maxwise”, name: “Maxwise”, gender: “Männlich”, species: “Hobbit”, ration: “3 Lembas”, fingerprint: true, isAdmin: true }
];
let deletedApiIds = [];
let allDisplayedCompanions = [];
let currentUser = null;
let isEditMode = false;
let currentFingerprintStatus = false;

// — DOM ELEMENTE —
// Screen-Navigation
const screenList    = document.getElementById(“screen-list”);
const screenForm    = document.getElementById(“screen-form”);
const screenDetail  = document.getElementById(“screen-detail”);

// Header & Navigation
const headerTitle   = document.getElementById(“headerTitle”);
const backBtn       = document.getElementById(“backBtn”);

// Listen & Cards
const fellowshipList = document.getElementById(“fellowshipList”);

// Formular-Inputs
const formName      = document.getElementById(“formName”);
const formGender    = document.getElementById(“formGender”);
const formSpecies   = document.getElementById(“formSpecies”);
const formRation    = document.getElementById(“formRation”);
const formFingerprint = document.getElementById(“formFingerprint”);
const fpText        = document.getElementById(“fpText”);
const saveUserBtn   = document.getElementById(“saveUserBtn”);

// Buttons in Detail-Ansicht
const editBtn       = document.getElementById(“editBtn”);
const deleteBtn     = document.getElementById(“deleteBtn”);

// Pop-ups & Modals
const toast         = document.getElementById(“toast”);
const modal         = document.getElementById(“modal”);
const modalTitle    = document.getElementById(“modalTitle”);
const modalText     = document.getElementById(“modalText”);
const modalYesBtn   = document.getElementById(“modalYesBtn”);
const modalNoBtn    = document.getElementById(“modalNoBtn”);

// ============================================================================
// HILFSFUNKTIONEN
// ============================================================================

/**

- Berechnet den täglichen Lembas-Bedarf basierend auf der Spezies
- @param {string} species - Die Spezies des Charakters
- @returns {string} Der Lembas-Bedarf pro Tag
  */
  function calculateRation(species) {
  const map = {
  Hobbit: “3 Lembas”,
  Mensch: “1 Lembas”,
  Zwerg: “1.5 Lembas”,
  Elb: “0.25 Lembas”,
  Maia: “0.5 Lembas”
  };
  return map[species] || “Unbekannt”;
  }

/**

- Generiert das Fingerabdruck-SVG mit dynamischer Färbung
- Ersetzt die dreifache Code-Wiederholung von vorher
- @param {boolean} scanned - Ob der Abdruck erfasst wurde
- @returns {string} HTML mit SVG und Label
  */
  function fingerprintSVG(scanned) {
  const color = scanned ? “#4CAF50” : “#a38a6b”;
  const label = scanned ? “Erfasst” : “Nicht erfasst”;
  return ` <div style="display:flex; flex-direction:column; align-items:center; gap:5px;"> <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/> <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/> <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/> <path d="M2 12a10 10 0 0 1 18-6"/> <path d="M2 16h.01"/> <path d="M21.8 16c.2-2 .131-5.354 0-6"/> <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/> <path d="M8.65 22c.21-.66.45-1.32.57-2"/> <path d="M9 6.8a6 6 0 0 1 9 5.2v2"/> </svg> <span style="color:${color}; font-size:0.95rem; font-weight:bold;">${label}</span> </div>`;
  }

/**

- Zeigt eine kurze Benachrichtigung an
- @param {string} message - Nachricht mit optionalem HTML (z.B. <br>)
- @param {boolean} isError - Ob es eine Fehlermeldung ist (rote Färbung)
  */
  function showToast(message, isError = false) {
  toast.innerHTML = message;
  toast.classList.toggle(“error”, isError);
  toast.classList.add(“show”);
  setTimeout(() => { toast.classList.remove(“show”); }, 3000);
  }

/**

- Zeigt ein Bestätigungs-Modal
- Der Callback wird nur aufgerufen wenn “Ja” geklickt wird
- @param {object} config - {title, text, onYes: callback}
  */
  function showModal({ title, text = “”, onYes }) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.style.display = “flex”;
  modalYesBtn.onclick = () => {
  modal.style.display = “none”;
  onYes();
  };
  modalNoBtn.onclick  = () => {
  modal.style.display = “none”;
  };
  }

/**

- Navigiert zwischen den Screens (Liste, Formular, Detailansicht)
- @param {string} screenName - “list”, “form” oder “detail”
- @param {string} title - Der neue Header-Titel (kann <br> enthalten)
  */
  function showScreen(screenName, title) {
  // Alle Screens ausblenden
  screenList.classList.remove(“active”);
  screenForm.classList.remove(“active”);
  screenDetail.classList.remove(“active”);
  
  // Gewünschten Screen aktivieren
  if (screenName === “list”) {
  screenList.classList.add(“active”);
  backBtn.style.display = “none”;
  renderCards();
  } else if (screenName === “form”) {
  screenForm.classList.add(“active”);
  backBtn.style.display = “block”;
  } else if (screenName === “detail”) {
  screenDetail.classList.add(“active”);
  backBtn.style.display = “block”;
  }
  
  // Header aktualisieren
  headerTitle.innerHTML = title;
  }

/**

- Setzt die Fingerabdruck-Box auf den Standardzustand zurück
- (nicht gescannt, Symbol+Text zurückgesetzt)
  */
  function resetFingerprintBox() {
  currentFingerprintStatus = false;
  formFingerprint.classList.remove(“scanned”);
  fpText.textContent = “Zum erfassen Finger anlegen”;
  }

/**

- Markiert die Fingerabdruck-Box als gescannt (z.B. beim Bearbeiten)
  */
  function setFingerprintBoxScanned() {
  currentFingerprintStatus = true;
  formFingerprint.classList.add(“scanned”);
  fpText.textContent = “Finger erneut anlegen, um Abdruck zu ändern”;
  }

// ============================================================================
// API & LISTENDARSTELLUNG
// ============================================================================

/**

- Lädt Charaktere von der LOTR API und merged sie mit lokalen Daten
- Gelöschte API-Charaktere werden nicht erneut geladen
  */
  async function fetchAndRenderList() {
  try {
  const namesToFetch = [
  “Legolas”, “Gandalf”, “Aragorn II Elessar”, “Gimli”, “Boromir”,
  “Meriadoc Brandybuck”, “Frodo Baggins”, “Samwise Gamgee”, “Peregrin Took”
  ];
  
  ```
   // Parallel alle API-Anfragen stellen
   const results = await Promise.all(
       namesToFetch.map(name =>
           fetch(`https://the-one-api.dev/v2/character?name=${name}`, {
               headers: { 'Authorization': `Bearer ${API_ACCESS_TOKEN}` }
           }).then(res => res.ok ? res.json() : null)
       )
   );
  
   const apiCompanions = [];
  
   // API-Ergebnisse verarbeiten und in lokal nutzbare Struktur umwandeln
   results.forEach(data => {
       if (!data?.docs?.length) return;
       const char = data.docs[0];
  
       // Geschlecht: API hat "male", "female", etc. -> Deutsche Begriffe
       const g = char.gender?.toLowerCase() || "";
       const mappedGender = g.includes("female") ? "Weiblich" : g.includes("male") ? "Männlich" : "Unbekannt";
  
       // Spezies: API hat unterschiedliche Namensmuster
       const raceMap = { Elf: "Elb", Dwarf: "Zwerg" };
       let mappedSpecies = "Unbekannt";
       if (char.race) {
           if (raceMap[char.race]) mappedSpecies = raceMap[char.race];
           else if (char.race.includes("Human"))  mappedSpecies = "Mensch";
           else if (char.race.includes("Hobbit")) mappedSpecies = "Hobbit";
           else if (char.race.includes("Maia") || char.race.includes("Wizard")) mappedSpecies = "Maia";
       }
  
       // Namen kürzen: "Aragorn II Elessar" -> "Aragorn"
       const displayName = char.name.split(" ")[0];
       const charId = "api_" + displayName;
  
       // Nur hinzufügen wenn nicht gelöscht und nicht schon lokal vorhanden
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
   });
  
   // Lokale + API-Charaktere zusammenführen
   allDisplayedCompanions = [...localCompanions, ...apiCompanions];
   renderCards();
  ```
  
  } catch (error) {
  console.error(“API Fehler:”, error);
  // Fallback: Nur lokale Charaktere anzeigen
  allDisplayedCompanions = […localCompanions];
  renderCards();
  }
  }

/**

- Zeichnet alle User-Cards in der Listenansicht
- Sortiert: Admin oben, dann alphabetisch
  */
  function renderCards() {
  fellowshipList.innerHTML = “”;
  
  // Sortierung: Admin immer zuerst, dann alphabetisch nach Name
  allDisplayedCompanions.sort((a, b) => {
  if (a.isAdmin) return -1;
  if (b.isAdmin) return 1;
  return a.name.localeCompare(b.name);
  });
  
  // Jede Person als Card rendern
  allDisplayedCompanions.forEach(user => {
  const card = document.createElement(“div”);
  card.className = “user-card”;
  card.innerHTML = ` <div class="user-card-info"> ${user.isAdmin ? '<div class="admin-badge">ADMIN</div>' : ''} <div>NAME: ${user.name}</div> <div>SPEZIES: ${user.species}</div> </div>`;
  card.onclick = () => openUserDetails(user);
  fellowshipList.appendChild(card);
  });
  }

// ============================================================================
// DETAILANSICHT
// ============================================================================

/**

- Definiert welche Felder in der Detailansicht gezeigt werden
- Diese Struktur macht es einfach neue Felder hinzuzufügen
  */
  const detailFields = [
  { label: “Name”,                  key: “name” },
  { label: “Geschlecht”,            key: “gender” },
  { label: “Spezies”,               key: “species” },
  { label: “Lembas-Bedarf pro Tag”, key: “ration”, highlight: true },
  ];

/**

- Öffnet die Detailansicht für einen User
- BUG FIX: Wenn ein API-Charakter bearbeitet wurde, wird allDisplayedCompanions aktualisiert
- @param {object} user - Der anzuzeigende User
  */
  function openUserDetails(user) {
  currentUser = user;
  
  // Detailfelder dynamisch aus dem Array rendern
  const detailHTML = detailFields
  .map(f => `<div class="detail-label">${f.label}:</div> <div class="detail-value ${f.highlight ? 'highlight' : ''}">${user[f.key]}</div>`)
  .join(””) + `<div class="detail-label">Fingerabdruck:</div> <div class="detail-value" id="viewFingerprint">${fingerprintSVG(user.fingerprint)}</div>`;
  
  document.getElementById(“detailInfo”).innerHTML = detailHTML;
  
  // Löschen-Button nur zeigen wenn nicht Admin
  deleteBtn.style.display = user.isAdmin ? “none” : “block”;
  
  showScreen(“detail”, “PROFIL<br>DETAILS”);
  }

// ============================================================================
// NAVIGATION (Zurück-Button)
// ============================================================================

/**

- Zurück-Button: Im Formular fragen ob wirklich verwerfen
- In Detail/Liste: Einfach zurück zur Liste
  */
  backBtn.onclick = () => {
  if (screenForm.classList.contains(“active”)) {
  // Im Formular: Bestätigungsmodal zeigen
  showModal({
  title: isEditMode ? “Änderung verwerfen?” : “Neues Profil verwerfen?”,
  onYes: () => {
  if (isEditMode) {
  showToast(“Änderung verworfen”);
  showScreen(“detail”, “PROFIL<br>DETAILS”);
  } else {
  showToast(“Profil verworfen”);
  showScreen(“list”, “PROFILE<br>VERWALTEN”);
  }
  }
  });
  } else {
  // Von Detail/Liste zurück zur Liste
  showScreen(“list”, “PROFILE<br>VERWALTEN”);
  }
  };

// ============================================================================
// NEUES PROFIL ANLEGEN
// ============================================================================

/**

- “Neues Profil” Button -> Formular mit leerem State
  */
  document.getElementById(“goToAddBtn”).onclick = () => {
  isEditMode = false;
  // Alle Felder leeren
  formName.value = formGender.value = formSpecies.value = formRation.value = “”;
  resetFingerprintBox();
  saveUserBtn.textContent = “PROFIL SPEICHERN”;
  showScreen(“form”, “NEUES<br>PROFIL”);
  };

// ============================================================================
// PROFIL BEARBEITEN
// ============================================================================

/**

- “Bearbeiten” Button in Detail-Ansicht
- Lädt den aktuellen User ins Formular
  */
  editBtn.onclick = () => {
  isEditMode = true;
  formName.value    = currentUser.name;
  formGender.value  = currentUser.gender;
  formSpecies.value = currentUser.species;
  formRation.value  = currentUser.ration;
  currentUser.fingerprint ? setFingerprintBoxScanned() : resetFingerprintBox();
  saveUserBtn.textContent = “ÄNDERUNG SPEICHERN”;
  showScreen(“form”, “PROFIL<br>BEARBEITEN”);
  };

/**

- Spezies-Änderung -> Lembas-Bedarf automatisch berechnen
- BUG FIX: Wenn “– Wählen –” gewählt wird, Feld leeren
  */
  formSpecies.addEventListener(“change”, function () {
  formRation.value = this.value ? calculateRation(this.value) : “”;
  });

/**

- Fingerabdruck-Box anklicken -> Simuliert Scan
- Ändert das Aussehen und setzt den Status
  */
  formFingerprint.onclick = () => {
  currentFingerprintStatus = true;
  formFingerprint.classList.add(“scanned”);
  fpText.textContent = “Gescannt”;
  };

/**

- Speicher-Button für Neues Profil oder Bearbeitung
- Validiert zuerst alle Felder
  */
  saveUserBtn.onclick = () => {
  // Felder validieren
  const missingFields = [];
  if (!formName.value.trim())      missingFields.push(“Name”);
  if (!formGender.value)           missingFields.push(“Geschlecht”);
  if (!formSpecies.value)          missingFields.push(“Spezies”);
  if (!currentFingerprintStatus)   missingFields.push(“Fingerabdruck”);
  
  if (missingFields.length > 0) {
  const aktion = isEditMode ? “geändert” : “angelegt”;
  showToast(
  `Fehler: Profil konnte nicht ${aktion} werden.<br><br>` +
  `<span style="font-size:0.9rem; font-weight:normal;">Es fehlt: ${missingFields.join(", ")}</span>`,
  true
  );
  return;
  }
  
  if (isEditMode) {
  // Bearbeitungsmodus: Aktuellen User updaten
  currentUser.name        = formName.value;
  currentUser.gender      = formGender.value;
  currentUser.species     = formSpecies.value;
  currentUser.ration      = formRation.value;
  currentUser.fingerprint = currentFingerprintStatus;
  
  ```
   // Falls es ein API-Charakter war, zur lokalen Liste hinzufügen
   if (!localCompanions.some(c => c.id === currentUser.id)) {
       localCompanions.push(currentUser);
   }
  
   // BUG FIX: allDisplayedCompanions auch aktualisieren (nicht nur lokalCompanions)
   const idx = allDisplayedCompanions.findIndex(c => c.id === currentUser.id);
   if (idx !== -1) {
       allDisplayedCompanions[idx] = currentUser;
   }
  
   showToast("Profil erfolgreich bearbeitet");
   openUserDetails(currentUser);
  ```
  
  } else {
  // Neu-Modus: Neuen User erstellen und hinzufügen
  const newUser = {
  id: “local_” + Date.now(),
  name: formName.value,
  gender: formGender.value,
  species: formSpecies.value,
  ration: formRation.value,
  fingerprint: currentFingerprintStatus,
  isAdmin: false
  };
  localCompanions.push(newUser);
  allDisplayedCompanions.push(newUser);
  showToast(“Profil erfolgreich angelegt”);
  showScreen(“list”, “PROFILE<br>VERWALTEN”);
  }
  };

// ============================================================================
// PROFIL LÖSCHEN
// ============================================================================

/**

- “Löschen” Button in Detail-Ansicht
- Nur wenn nicht Admin
  */
  deleteBtn.onclick = () => {
  if (currentUser.isAdmin) return; // Admin darf nicht gelöscht werden
  showModal({
  title: “Bist du sicher?”,
  text: “Möchtest du dieses Profil wirklich löschen?”,
  onYes: () => {
  // Aus localCompanions löschen
  localCompanions = localCompanions.filter(c => c.id !== currentUser.id);
  
  ```
       // Aus allDisplayedCompanions löschen
       allDisplayedCompanions = allDisplayedCompanions.filter(c => c.id !== currentUser.id);
  
       // Wenn API-Charakter: Als gelöscht merken (nicht erneut laden)
       if (currentUser.id.startsWith("api_")) {
           deletedApiIds.push(currentUser.id);
       }
  
       showToast("Profil erfolgreich gelöscht");
       showScreen("list", "PROFILE<br>VERWALTEN");
   }
  ```
  
  });
  };

// ============================================================================
// APP STARTEN
// ============================================================================
fetchAndRenderList();
