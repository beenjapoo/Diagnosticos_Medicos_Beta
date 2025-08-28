// Simulación de base de datos

function login(){
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passworldInput').value;
    if (!email || !password){
        alert('Por favor, complete todos los campos.');
        return;
    }

    const user= database.users.find(u=> u.email === email && u.password === password);

    if (!user){
        currentUser = user;
        Elements.LoginModal.hide();
        updateUI();
        saveToLocalStorage();
    }else{
        alert('Credenciales inválidas. Inténtelo de nuevo.');
        return;
    }
}

//--------------------------------------------------------------- 
// Funcion de Registro de usuario
function register(){
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (!name || !email || !password || !confirmPassword){
        alert('Por favor, complete todos los campos.');
        return;
    }

    if (password !== confirmPassword){
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (database.users.some(u => u.email === email)){
        alert('El correo electrónico ya está registrado.');
        return;
    }

    const newUser = { 
        id: Date.now(),
        name,
        email,
        password
    };

    database.users.push(newUser);
    currentUser = newUser;
    Elements.registerModal.hide();
    updateUI();
    saveToLocalStorage();

    alert('Registro exitoso. Bienvenido, ' + name + '!');
}

//---------------------------------------------------------------
// Funcion de Logout
function logout(){
    currentUser = null;
    Element.LoginModal.hide();
    saveToLocalStorage();
    location.reload();
}

//---------------------------------------------------------------
// Mostrar formulario de registro
function showRegister(){
    Elements.LoginModal.hide();
    Elements.registerModal.show();
}

//---------------------------------------------------------------
// Mostrar formulario de login
function showLogin(){
    Elements.registerModal.hide();
    Elements.LoginModal.show();
}