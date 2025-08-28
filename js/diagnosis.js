// Funciones de Diagnóstico
//      Añadir campo de síntoma
function addSymptomInput(){
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
    Element.symptomContainer.appendChild(newSymptom);  
}

//----------------------------------------------------------------
//      Funcion para manejar la subida de imagen
function handleImageUpload(e){
    const file = e.target.files[0];
    if (file){
        const reader = new FileReader();
        reader.onload = function(event){
            Elements.imagePreview.src = event.target.result;
            Elements.imagePreview.classList.remove('hidden');
            Elements.imagePlaceholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

//----------------------------------------------------------------
//      Realizar diagnóstico

function performDiagnosis(){
    // Recopilar síntomas
    const symptom = []
    const symptomInputs = Elements.symptomContainer.querySelectorAll('.symptom-input');

    symptomInputs.forEach(input => {
        const name =input.querySelector('.symptom-name').value;
        const severity = input.querySelector('.symptom-severity').value;
        const duration = input.querySelector('.symptom-duration').value;

        if(name){
            symptom.push({ 
                name, 
                severity: parseInt(severity), 
                duration: parseInt(duration)
            });
        }
    });

    if (symptom.length === 0){
        alert('Por favor, ingrese al menos un síntoma.');
        return;
    }

    // Recopliar otros datos
    const age = parseInt(document.getElementById('ageInput').value);
    const conditions = document.getElementById('conditionsInput').value.split(',').map(c =>c.trim()).filter(c => c);
    const hasImage = Elements.imagePreview.src && !Elements.imagePreview.classList.contains('hidden');
    const isUrgent = document.getElementById('urgentCheck').checked

    // Simular proceso de diagnóstico
    const diagnosisResult = generateDiagnosis(symptom, age, conditions, hasImage, isUrgent);
        currentDiagnosis = diagnosisResult;
    // Mostrar resultado
    showDiagnosisResult(diagnosisResult);
}

//----------------------------------------------------------------
//      Mostrar resultado del diagnóstico
function generateDiagnosis(symptoms, age, conditions, hasImage, isUrgent){
    // Algoritmo de diagnóstico
    const severityScore = symptoms.reduce((sum,symptom)=> sum + 
    (symptom.severity * symptom.duration),0)/symptoms.length;

    const ageFactor = 1+ (Math.max(0,age - 40)/100) //Mayores de 40 años tienen mayor riesgos

    let condition, recommendations, urgency;

    // Determinar condición basada en síntomas (simulado)
    if (symptoms.some(s => s.name.toLowerCase().includes('dolor  de cabeza')) && symptoms.some(s => s.name.toLowerCase().includes('vision'))){
        condition = "Posible migraña o cefalea tensional";
        recommendations = "Descansar en un lugar oscuro, tomar analgésicos de venta libre, evitar desencadenantes conocidos y mantengase en habitaciones oscuras.";
    } else if (symptoms.some(s => s.name.toLowerCase().includes('fiebre'))&& symptoms.some(s => s.name.toLowerCase().includes('tos'))){
        condition = "Posible infección respiratoria";
        recommendations = "Mantenerse hidratado, descansar, usar medicamentos para reducir la fiebre y consultar a un médico si los síntomas empeoran.";
    } else if (symptoms.some(s => s.name.toLowerCase().includes('erupcion'))){
        condition = hasImage ? "Posible reacción alérgica o infección cutánea" : "Posible reacción alérgica";
        recommendations = "Evitar el alérgeno conocido, usar cremas tópicas para aliviar la picazón y consultar a un dermatólogo si la erupción persiste.";
    } else {
        condition = "Condición no identificada";
        recommendations = "Monitorear los síntomas y consultar a un profesional de la salud para una evaluación más detallada.";
    }

    // Determinar urgencia
    if (isUrgent || severityScore > 7 * ageFactor){
        urgency = "Crítica";
    } else if (severityScore > 5 * ageFactor){
        urgency = "Alta";
    } else if (severityScore > 3 * ageFactor){
        urgency = "Moderada";
    } else {
        urgency = "Baja";
    }
     
    // Generar pronóstico simulado
    const prognosis = [];
    prognosis.push ("A corto plazo (24-48 horas): "+
        severityScore > 5 ? "Monitorear síntomas, posible empeoramiento." : "Probable mejoría con cuidados en casa.");
    prognosis.push ("A mediano plazo (3-7 días):"+
        (severityScore > 5 ? "Se espera recuperación con tratamiento médico." : "Recuperación completa esperada.")
    );
    prognosis.push ("A largo plazo (1-4 semanas):"+
        "Resolución completa esperada, seguimiento si es necesario."
    );

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

//----------------------------------------------------------------
//      guardar diagnóstico en la "base de datos"
function saveDiagnosis(){
    if (!currentDiagnosis || currentUser ) return;

    // Guardar diagnóstico en la "base de datos"
    const diagnosisToSave = {
        ...currentDiagnosis,
        userId: currentUser.id
    };

    database.diagnoses.pusch(diagnosisToSave);
    saveToLocalStorage();
    updateDiagnosisHistory();

    alert('Diagnostico guardado exitosamente.');
}

//----------------------------------------------------------------
//      Limpiar y reiniciar formulario para nuevo diagnóstico
function newDiagnosis(){
    // Limpiar formulario
    elements.symptomsContainer.innerHTML='',
    addSymptomInput();

    document.getElementById,('ageInput').valueOf='';
    document.getElementById('conditionsInput').value='';
    document.getElementById('urgentCheck').checked=false;

    elements.imagePreview.src='';
    elements.imagePreview.classList.add('hidden');
    elements.imagePlaceholder.classList.remove('hidden');
    elements.imageUpload.value='';

    elements.resultCard.classList.add('hidden'),

    currentDiagnosis = null;
}
