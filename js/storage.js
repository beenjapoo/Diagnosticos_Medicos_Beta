// Base de datos simulada
const database = {
    users: [],
    diagnoses: []
};

// Elementos del DOM
const elements = {
    loginModal: new bootstrap.Modal(document.getElementById('loginModal')),
    registerModal: new bootstrap.Modal(document.getElementById('registerModal')),
    resultCard: document.getElementById('resultCard'),
    diagnosisHistory: document.getElementById('diagnosisHistory'),
    symptomsContainer: document.getElementById('symptomsContainer'),
    imageUpload: document.getElementById('imageUpload'),
    imagePlaceholder: document.getElementById('imagePlaceholder'),
    imagePreview: document.getElementById('imagePreview'),
    urgencyAlert: document.getElementById('urgencyAlert'),
    urgencyText: document.getElementById('urgencyText'),
    diagnosisText: document.getElementById('diagnosisText'),
    recommendationsText: document.getElementById('recommendationsText'),
    prognosisList: document.getElementById('prognosisList'),
    userEmailNav: document.getElementById('userEmailNav')
};

// Almacenamiento local
function saveToLocalStorage() {
    localStorage.setItem('medicalDb', JSON.stringify(database));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function loadFromLocalStorage() {
    const dbData = localStorage.getItem('medicalDb');
    const userData = localStorage.getItem('currentUser');
    
    if (dbData) {
        const parsedDb = JSON.parse(dbData);
        database.users = parsedDb.users || [];
        database.diagnoses = parsedDb.diagnoses || [];
    }
    
    if (userData) {
        currentUser = JSON.parse(userData);
    }
}