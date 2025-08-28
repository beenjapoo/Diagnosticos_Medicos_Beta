// Base de datos simulada
const database = {
    users: [],
    diagnoses:[]
};

// Elementos del DOM
const Elements = {
    LoginModal: new bootstrap.Modal(document.getElementById('loginModal')),
    registerModal: new bootstrap.Modal(document.getElementById('registerModal')),
    resultCard: document.getElementById('resultCard'),
    diagnosisHistory: document.getElementById('diagnosisHistory'),
    symptomContainer: document.getElementById('symptomContainer'),
    imageUpload: document.getElementById('imageUpload'),
    imagePreview: document.getElementById('imagePreview'),
    urgencyAlert: document.getElementById('urgencyAlert'),
    urgencyText: document.getElementById('urgencyText'),
    diagnosisText: document.getElementById('diagnosisText'),
    recommendationsText: document.getElementById('recommendationsText'),
    prognosisList: document.getElementById('prognosisList'),
    userEmailNav: document.getElementById('userEmailNav'),
};

// Almacenamiento en Local Storage
    // Guardado de datos en localStorage
function saveToLocalStorage(){
    localStorage.setItem('medicaDb', JSON.stringify(database));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}
    // Carga de datos desde localStorage
function loadFromStorage(){
    const dbData = localStorage.getItem('medicaDb');
    const userData = localStorage.getItem('currentUser');

    if (dbData){
        const parsedDB = JSON.parse(dbData);
        database.users = parsedDB.users || [];
        database.diagnoses = parsedDB.diagnoses || [];
    }

    if (userData){
        currentUser = JSON.parse(userData);
    }
    
}