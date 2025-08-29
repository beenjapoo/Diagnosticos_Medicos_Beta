// Funciones de diagnóstico
function addSymptomInput() {
    const newSymptom = document.createElement('div');
    newSymptom.className = 'row symptom-input';
    newSymptom.innerHTML = `
        <div class="col-md-6">
            <input type="text" class="form-control symptom-name" placeholder="Nombre del síntoma">
        </div>
        <div class="col-md-3">
            <select class="form-select symptom-severity">
                <option value="1">Leve</option>
                <option value="2" selected>Moderado</option>
                <option value="3">Severo</option>
            </select>
        </div>
        <div class="col-md-3">
            <div class="input-group">
                <input type="number" class="form-control symptom-duration" placeholder="Días" value="1" min="1">
                <span class="input-group-text">días</span>
            </div>
        </div>
    `;
    elements.symptomsContainer.appendChild(newSymptom);
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            elements.imagePreview.src = event.target.result;
            elements.imagePreview.classList.remove('hidden');
            elements.imagePlaceholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function performDiagnosis() {
    // Recopilar síntomas
    const symptoms = [];
    const symptomInputs = elements.symptomsContainer.querySelectorAll('.symptom-input');
    
    symptomInputs.forEach(input => {
        const name = input.querySelector('.symptom-name').value;
        const severity = input.querySelector('.symptom-severity').value;
        const duration = input.querySelector('.symptom-duration').value;
        
        if (name) {
            symptoms.push({
                name,
                severity: parseInt(severity),
                duration: parseInt(duration)
            });
        }
    });
    
    if (symptoms.length === 0) {
        alert('Por favor, ingrese al menos un síntoma');
        return;
    }
    
    // Recopilar otros datos
    const age = parseInt(document.getElementById('ageInput').value);
    const conditions = document.getElementById('conditionsInput').value.split(',').map(c => c.trim()).filter(c => c);
    const hasImage = elements.imagePreview.src && !elements.imagePreview.classList.contains('hidden');
    const isUrgent = document.getElementById('urgentCheck').checked;
    
    // Simular proceso de diagnóstico
    const diagnosisResult = generateDiagnosis(symptoms, age, conditions, hasImage, isUrgent);
    currentDiagnosis = diagnosisResult;
    
    // Mostrar resultados
    showDiagnosisResult(diagnosisResult);
}

function generateDiagnosis(symptoms, age, conditions, hasImage, isUrgent) {
    // Algoritmo simulado de diagnóstico
    const severityScore = symptoms.reduce((sum, symptom) => sum + (symptom.severity * symptom.duration), 0) / symptoms.length;
    const ageFactor = 1 + (Math.max(0, age - 40) / 100); // Mayores de 40 tienen mayor riesgo
    
    let condition, recommendations, urgency;
    
    // Determinar condición basada en síntomas (simulado)
    if (symptoms.some(s => s.name.toLowerCase().includes('dolor cabeza')) && symptoms.some(s => s.name.toLowerCase().includes('visión'))) {
        condition = "Posible migraña o cefalea tensional";
        recommendations = "Descanse en una habitación oscura, manténgase hidratado y considere tomar analgésicos de venta libre. Evite luces brillantes y ruidos fuertes.";
    } else if (symptoms.some(s => s.name.toLowerCase().includes('fiebre')) && symptoms.some(s => s.name.toLowerCase().includes('garganta'))) {
        condition = "Posible infección viral o bacteriana";
        recommendations = "Descanse, manténgase hidratado y controle la fiebre con medicamentos de venta libre. Si la fiebre persiste por más de 3 días, consulte a un médico.";
    } else if (symptoms.some(s => s.name.toLowerCase().includes('erupción'))) {
        condition = hasImage ? "Dermatitis o reacción alérgica (confirmado por imagen)" : "Posible dermatitis o reacción alérgica";
        recommendations = "Evite rascarse el área afectada. Aplique una compresa fría y considere usar crema de hidrocortisona. Identifique y evite posibles alérgenos.";
    } else {
        condition = "Síntomas generales que requieren evaluación";
        recommendations = "Monitoree sus síntomas, descanse y manténgase hidratado. Si los síntomas empeoran o persisten, consulte a un profesional de la salud.";
    }
    
    // Determinar urgencia
    if (isUrgent || severityScore > 7) {
        urgency = "Crítica";
    } else if (severityScore > 5) {
        urgency = "Alta";
    } else if (severityScore > 3) {
        urgency = "Media";
    } else {
        urgency = "Baja";
    }
    
    // Generar pronóstico
    const prognosis = [];
    prognosis.push("A corto plazo (24-48 horas): " + 
        (severityScore > 5 ? "Los síntomas pueden empeorar sin tratamiento adecuado" : 
        "Los síntomas probablemente se mantendrán estables o mejorarán levemente"));
        
    prognosis.push("A medio plazo (3-7 días): " + 
        (severityScore > 5 ? "Se espera mejoría con el tratamiento adecuado" : 
        "Mejoría significativa esperada con autocuidado"));
        
    prognosis.push("A largo plazo (1-2 semanas): " + 
        "Resolución completa de los síntomas si se siguen las recomendaciones");
    
    return {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        condition,
        recommendations,
        urgency,
        prognosis,
        symptoms: [...symptoms],
        age,
        conditions,
        hasImage
    };
}

function saveDiagnosis() {
    if (!currentDiagnosis || !currentUser) return;
    
    // Guardar diagnóstico en la base de datos
    const diagnosisToSave = {
        ...currentDiagnosis,
        userId: currentUser.id
    };
    
    database.diagnoses.push(diagnosisToSave);
    saveToLocalStorage();
    updateDiagnosisHistory();
    
    alert('Diagnóstico guardado exitosamente');
}

function newDiagnosis() {
    // Limpiar formulario
    elements.symptomsContainer.innerHTML = '';
    addSymptomInput();
    
    document.getElementById('ageInput').value = '35';
    document.getElementById('conditionsInput').value = '';
    document.getElementById('urgentCheck').checked = false;
    
    elements.imagePreview.src = '';
    elements.imagePreview.classList.add('hidden');
    elements.imagePlaceholder.classList.remove('hidden');
    elements.imageUpload.value = '';
    
    elements.resultCard.classList.add('hidden');
    
    currentDiagnosis = null;
}