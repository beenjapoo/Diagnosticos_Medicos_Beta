// Funciones de autenticación
function login() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    
    if (!email || !password) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    const user = database.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        elements.loginModal.hide();
        updateUI();
        saveToLocalStorage();
    } else {
        alert('Credenciales incorrectas');
    }
}

function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    if (database.users.some(u => u.email === email)) {
        alert('Este correo electrónico ya está registrado');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
    };
    
    database.users.push(newUser);
    currentUser = newUser;
    elements.registerModal.hide();
    updateUI();
    saveToLocalStorage();
    
    alert('Cuenta creada exitosamente');
}

function logout() {
    currentUser = null;
    elements.loginModal.show();
    saveToLocalStorage();
}

function showRegister() {
    elements.loginModal.hide();
    elements.registerModal.show();
}

function showLogin() {
    elements.registerModal.hide();
    elements.loginModal.show();
}