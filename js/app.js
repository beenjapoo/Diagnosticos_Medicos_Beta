// Estado de la aplicación
let currentUser = null;
let currentDiagnosis = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de localStorage
    loadFromLocalStorage();
    
    // Mostrar modal de login si no hay usuario autenticado
    if (!currentUser) {
        elements.loginModal.show();
    } else {
        updateUI();
    }
    
    // Configurar event listeners
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Botones de autenticación
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('registerBtn').addEventListener('click', register);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('showRegister').addEventListener('click', showRegister);
    document.getElementById('showLogin').addEventListener('click', showLogin);
    
    // Diagnóstico
    document.getElementById('addSymptomBtn').addEventListener('click', addSymptomInput);
    document.getElementById('diagnoseBtn').addEventListener('click', performDiagnosis);
    document.getElementById('saveDiagnosisBtn').addEventListener('click', saveDiagnosis);
    document.getElementById('newDiagnosisBtn').addEventListener('click', newDiagnosis);
    
    // Subida de imagen
    elements.imagePlaceholder.addEventListener('click', () => elements.imageUpload.click());
    elements.imageUpload.addEventListener('change', handleImageUpload);
}