// Funciones de UI
function updateUI() {
    if (currentUser) {
        elements.userEmailNav.textContent = currentUser.email;
        updateDiagnosisHistory();
    }
}

function updateDiagnosisHistory() {
    if (!currentUser) return;
    
    const userDiagnoses = database.diagnoses.filter(d => d.userId === currentUser.id);
    
    if (userDiagnoses.length === 0) {
        elements.diagnosisHistory.innerHTML = '<p class="text-center text-muted">No hay diagnósticos previos</p>';
        return;
    }
    
    elements.diagnosisHistory.innerHTML = '';
    
    // Ordenar diagnósticos por fecha (más recientes primero)
    userDiagnoses.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    userDiagnoses.forEach(diagnosis => {
        const diagnosisElement = document.createElement('div');
        diagnosisElement.className = 'card mb-2';
        diagnosisElement.innerHTML = `
            <div class="card-body p-3">
                <div class="d-flex justify-content-between">
                    <h6 class="card-title mb-1">${diagnosis.condition}</h6>
                    <small class="text-muted">${new Date(diagnosis.date).toLocaleDateString()}</small>
                </div>
                <p class="card-text mb-1"><small>Urgencia: <span class="badge ${getUrgencyBadgeClass(diagnosis.urgency)}">${diagnosis.urgency}</span></small></p>
                <p class="card-text"><small>${diagnosis.symptoms.length} síntoma(s)</small></p>
            </div>
        `;
        elements.diagnosisHistory.appendChild(diagnosisElement);
    });
}

function getUrgencyBadgeClass(urgency) {
    switch(urgency) {
        case "Crítica": return "bg-danger";
        case "Alta": return "bg-warning";
        case "Media": return "bg-info";
        case "Baja": return "bg-success";
        default: return "bg-secondary";
    }
}

function showDiagnosisResult(result) {
    // Configurar alerta de urgencia
    elements.urgencyAlert.classList.remove('hidden', 'alert-danger', 'alert-warning', 'alert-info', 'alert-success');
    
    switch(result.urgency) {
        case "Crítica":
            elements.urgencyAlert.classList.add('alert-danger');
            break;
        case "Alta":
            elements.urgencyAlert.classList.add('alert-warning');
            break;
        case "Media":
            elements.urgencyAlert.classList.add('alert-info');
            break;
        case "Baja":
            elements.urgencyAlert.classList.add('alert-success');
            break;
    }
    
    elements.urgencyText.textContent = `Nivel de urgencia: ${result.urgency}`;
    
    // Llenar información de diagnóstico
    elements.diagnosisText.textContent = result.condition;
    elements.recommendationsText.textContent = result.recommendations;
    
    // Llenar pronóstico
    elements.prognosisList.innerHTML = '';
    result.prognosis.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        elements.prognosisList.appendChild(li);
    });
    
    // Mostrar tarjeta de resultados
    elements.resultCard.classList.remove('hidden');
}