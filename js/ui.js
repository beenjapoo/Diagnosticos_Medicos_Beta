// Funciones de UI
//      Actualizar UI según estado de la aplicación
function updateUI(){
    if (currentUser){
        Elements.userEmailNav.textContent = currentUser.email;
        updateDiagnosisHistory();
    }
}

function updateDiagnosisHistory(){
    if (!currentUser) return;
    
    const userDiagnoses = database.diagnoses.filter(d => d.userId === currentUser.id);

    if (userDiagnoses.length === 0){
        Elements.diagnosisHistory.innerHTML =
        '<p class="text-center text-muted">No hay diagnostico previos </p>';
        return;
    }

    Element.diagnosisHistory.innerHTML = '';

    // Ordenar por fecha descendente
    userDiagnoses.sort((a, b) => new Date(b.date)-new Date(a.data));

    userDiagnoses-forEach(diagnosis => {
        const diagnosisElement=document.createElement('div');
        diagnosisElement.className = 'card mb-2',
        diagnosisElement.innerHTML = 
            '<div class="card-body p-3"><div class="d-flex justify-content-between"><h6 class="card-title mb-1">${diagnosis.condition}</h6><small class="text-muted">${new Date(diagnosis.date).toLocaleDateString}</small></div><p class="card-text mb-1"><small>Urgencia: <span class="badge ${getUrgencyBadgeClass(diagnosis.urgency)}">${diagnosis.urgency}</span></small></p><p class="card-text"><small>${diagnosis.symptoms.length} síntoma(s)</small></p></div>';
        Element.diagnosisHistory.appendChild(diagnosisElement);
    });
}

//      Obtener clase de badge según urgencia
function getUrgencyBadegeClass(urgency){
    switch(urgency){
        case "Critica": return "bg-danger";
        case "Alta": return "bg-warning text-dark";
        case "Media": return "bg-info text-dark";
        case "Baja": return "bg-success";
        default: return "bg-secondary";
    }
}

// mostrar resultado del diagnóstico

function showDiagnosisResult(result){
    // Configurar alerta de urgencia
    Elements.urgencyAlert.classList.remove('hidden','alert-danger','alert-warning','alert-info','alert-success');

    switch(result.urgency){
        case "Critica":
            Elements.urgencyAlert.classList.add('alert-danger');
            Elements.urgencyText.textContent = 'Critica';
            break;
        case "Alta":
            Elements.urgencyAlert.classList.add('alert-warning');
            Elements.urgencyText.textContent = 'Alta';
            break;
        case "Media":
            Elements.urgencyAlert.classList.add('alert-info');
            Elements.urgencyText.textContent = 'Media';
            break;
        case "Baja":
            Elements.urgencyAlert.classList.add('alert-success');
            Elements.urgencyText.textContent = 'Baja';
            break;
        default:
            Elements.urgencyAlert.classList.add('alert-secondary');
            Elements.urgencyText.textContent = 'Desconocida';
    }

    Elements.urgencyText.textContent = 'Nivel de Urgencia: ${result.urgency}';

    // Mostrar diagnóstico y recomendaciones
    Elements.diagnosisText.textContent = result.condition;
    Elements.recommendationsText.textContent = result.recommendations;

    // Mostrar pronóstico
    Elements.prognosisList.innerHTML = '';
    result.prognosis.forEach(item => {
        const li = document.createElement('li');
        li.textContent = p;
        elements.prognosisList.appendChild(li);
    });

    // Mostrar tarjeta de resultado
    Elements.resultCard.classList.remove('hidden');
}