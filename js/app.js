//      Estado de la aplicación
let currentUser = null;
let currentDiagnosis = null;

//      Inicialización
document.addEventListener('DOMContentLoaded', function(){
    // Cargar datos de localStorage
    loadfromLocalStorage();

    // Mostrar modal de login si no hay usuario
    if (!currentUser) {
        Element.loginModal.style.display = 'block';
    } else {
        updateUI();
    }
setupEventListeners()
});

 // Configurar eventos Listeners
    function setupEventListeners(){
        document.getElementById('loginBtn').addEventListener('click', Login);
        document.getElementById('registerBtn').addEventListener('click', Register);
        document.getElementById('logoutBtn').addEventListener('click', Logout);
        document.getElementById('showRegister').addEventListener('click', showRegister);
        document.getElementById('showLogin').addEventListener('click', showLogin);

    // Diagnostico
    document.getElementById('addSymptomBtn').addEventListener('click', addSymptomInput);
    document.getElementById('diagnoseBtn').addEventListener('click', performDiagnosis);
    document.getElementById('saveDiagnosisBtn').addEventListener('click', saveDiagnosis);
    document.getElementById('newDiagnosisBtn').addEventListener('click', newDiagnosis);

    // Subida de imagen
    Element.imagePlaceholder.addEventListener('click', () => Element.imageUpload.click());
    Element.imageUpload.addEventListener('change', handleImageUpload);

    }
