//Modal:Open y Close
function openModal(id){
    document.getElementById('modal-' + id).classList.add('active');
    document.body.style.overflow = 'hidden';

    //Crea los field para Mm y Fe
    if(id === 'masa-molar'){
        const container = document.getElementById('mm-elementos');
        container.innerHTML = ''; // limpia los campos anteriores
        addElementoMm();          // agrega uno fresco
    }
    if(id === 'empirica'){
        const container = document.getElementById('fe-elementos');
        container.innerHTML = ''; // limpia los campos anteriores
        addElementofe();          // agrega uno fresco
    }
}
function closeModal(id){
    document.getElementById('modal-' + id).classList.remove('active')
    document.body.style.overflow = '';
}
document.querySelectorAll('.overlay').forEach(overlay =>{
    overlay.addEventListener('click', (e) =>{
        if(e.target===overlay){
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
/*--------------------------------*/

//Permite que con enter se active el boton de calcular
document.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter'){
        const modalAbierto = document.querySelector('.overlay.active');
        if(!modalAbierto) return;

        const boton = modalAbierto.querySelector('.btn-calc:last-of-type');
        boton.click();
    }
});


//Funcion para mostrar los resultados
function showResult(boxId, valueId, value){
    document.getElementById(valueId).textContent=parseFloat(value.toFixed(8))
    document.getElementById(boxId).classList.add('visible')
}

//Funcion para cambiar de modos en Modal:Moles//
function switchModo(modo){
    // Cambia los botones del switch
    document.getElementById('btn-gramos').classList.toggle('active', modo === 'gramos');
    document.getElementById('btn-moles').classList.toggle('active', modo === 'moles');
  
    // Cambia el label del input según el modo
    if(modo === 'gramos'){
      document.getElementById('moles-masa-label').textContent = 'Masa del compuesto (g)';
    } else {
      document.getElementById('moles-masa-label').textContent = 'Moles (mol)';
    }
  
    // Limpia el resultado al cambiar
    document.getElementById('moles-result').classList.remove('visible');
  }


//---------------Funciones para calculos--------------------//
//Funcion Calcular los moles
function calcMoles(){
    const masa = parseFloat(document.getElementById('moles-masa').value);
    const mmolar =parseFloat(document.getElementById('moles-mmolar').value);
    const modo = document.getElementById('btn-gramos').classList.contains('active')? 'gramos' : 'moles';

    //Validacion
    if(isNaN(masa) || isNaN(mmolar)){
        alert('Por favor ingresa todos los valores.')
        return;
    }
    let resultado = masa/mmolar;
    if(modo === 'gramos'){
        resultado = masa / mmolar   // g → mol
    }else{
        resultado = masa * mmolar   // mol → g
    }

    document.getElementById('moles-unit').textContent = modo === 'gramos' ? 'mol' : 'g';
    showResult('moles-result', 'moles-value', resultado);
}
//Funcion para Calcular la Molaridad
function calcMolaridad(){
    const moles =parseFloat( document.getElementById('mola-moles').value);
    const litros = parseFloat(document.getElementById('mola-vol').value);
    //Valadacion
     if(isNaN(moles) || isNaN(litros)){
        alert('Por favor ingrese todos los valores.')
        return;
     }
    //Procedimiento
    let result = moles/litros;
    //Muestra resultado
    showResult('molaridad-result','molaridad-value',result)
}
/*-----Funcion:Disolucion---------*/
function calcDisolucion(){
    const M1 = parseFloat(document.getElementById('dil-m1').value);
    const V1 = parseFloat(document.getElementById('dil-v1').value);
    const M2 = parseFloat(document.getElementById('dil-m2').value);
    const V2 = parseFloat(document.getElementById('dil-v2').value);

    //Constante Target
    const target = document.getElementById('dil-target').value;
    //Validacion
    if(target=== 'M1' &&(isNaN(V1)|| isNaN(M2)||isNaN(V2))){
        alert('Por favor ingrese todos los valores.')
        return;
    }else if(target=== 'V1' &&(isNaN(M1)|| isNaN(M2)||isNaN(V2))){
        alert('Por favor ingrese todos los valores.')
        return;
    }else if(target==='M2' &&(isNaN(M1)|| isNaN(V1)||isNaN(V2))){
        alert('Por favor ingrese todos los valores.')
        return;
    }else if(target==='V2' &&(isNaN(M1)|| isNaN(V1)||isNaN(M2))){
        alert('Por favor ingrese todos los valores.')
        return;
    }
    //Procedimiento
    let result;
    let unit = "";
    //Verifica la opcion, realiza el calculo y asigna la unidad
    if(target==='M1'){
        result = (M2 * V2)/V1;
        unit= "M";
    }else if(target ==='V1'){
        result=(M2*V2)/M1
        unit= "L";
    }else if(target ==='M2'){
        result=(M1*V1)/V2
        unit= "M";
    }else if(target ==='V2'){
        result=(M1*V1)/M2
        unit= "L";
    }
    showResult('disolucion-result','disolucion-value', result)
    document.getElementById('disolucion-unit').textContent = unit;

}
//Funcion:Disolucion:bloquear la opcion elegida
const targetSelect= document.getElementById('dil-target');
function updateDisabledField() {
    const target = targetSelect.value;
    const allFields = ['m1', 'v1', 'm2', 'v2'];    
    allFields.forEach(field => {
        const inputElement = document.getElementById(`dil-${field}`);
        // Si el campo coincide con el target (ignorando mayúsculas/minúsculas)
        if(target.toLowerCase() === field) {
            inputElement.disabled = true; //Lo bloqueamos
            inputElement.value = '';    //Lo vaciamos
            inputElement.style.opacity = '0.5';//Lo hacemos ver desabilitado
        }else{
            inputElement.disabled = false; //lo habilitamos
            inputElement.style.opacity= '1';// Restauramos su aspecto
        }
    });
}
targetSelect.addEventListener('change', updateDisabledField);
updateDisabledField();
/*--------------------------------*/

//Funcion: Masa Molar: crear los elementos
function addElementoMm(){
    const container = document.getElementById('mm-elementos');
    const div = document.createElement('div');
    div.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;';

    div.innerHTML = `
    <div class ="field">
        <label>Masa atomica</label>
        <input type="number" step="any" class="mm-peso" placeholder="ej. 12g C" min="0"/>
    </div>
    <div class="field">
        <label>Cantidad del elemento</label>
        <input type="number" step="any" class="mm-cantidad" placeholder="ej. '2' H en H₂O" min="1"/>
    </div>
    <button class="btn-eliminar" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}
//Funcion: Masa Molar
function calcMasaMolar(){
    const matomica=document.querySelectorAll('.mm-peso');
    const cantidades=document.querySelectorAll('.mm-cantidad');
    //Validacion
    if(matomica.length === 0){
        alert('Agrega al menos un elemento')
        return;
    }
    let total = 0;

    for(let i = 0; i < matomica.length; i++){
        const masas = parseFloat(matomica[i].value);
        const cantidad =parseFloat(cantidades[i].value)

        //Validacion
        if(isNaN(masas) || isNaN(cantidad)){
            alert('Por favor ingresa todos los valores.')
            return;
        }

        total += masas * cantidad;
    }
    showResult('masa-molar-result','masa-molar-value', total);

}
/*--------------------------------*/

//Funcion Porciento de masa
function calcPorciento(){
    const Masaelemento = parseFloat(document.getElementById('pct-elemento').value);
    const MmolarComp = parseFloat(document.getElementById('pct-compuesto').value);
    //Validacion
    if(isNaN(Masaelemento) || isNaN(MmolarComp)){
        alert('Por favor ingrese todos los valores')
        return;
    }
    //Procedimiento
    let result = (Masaelemento/MmolarComp) * 100;
    showResult('porciento-result','porciento-value',result)
}
//Funcion Formula Empirica: crear los elementos
function addElementofe(){
    const container = document.getElementById('fe-elementos');
    const div = document.createElement('div');
    div.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;';

    div.innerHTML = `
    <div class="field">
        <label>Símbolo</label>
        <input type="text" class="fe-simbolo" placeholder="ej. N" maxlength="2"/>
    </div>
    <div class ="field">
        <label>Gramos del elemento</label>
        <input type="number" step="any" class="cantidad-g" placeholder="ej. 0.483g N" min="0"/>
    </div>
    <div class="field">
        <label>Masa atomica del elem.</label>
        <input type="number" step="any" class="masa-atomica" placeholder="ej. 14g N" min="1"/>
    </div>
    <button class="btn-eliminar" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}
//Funcion para calcular los enteros
function aEnteros(ratios){
   /*es lo mismo que: 
    let multiplicados = [];
    for(let i = 0; i < ratios.length; i++){
    multiplicados.push(ratios[i] * factor);}
*/
    for(let factor = 1; factor <=8; factor++){
        const multiplicados = ratios.map(x => x * factor);

        const todosEnteros = multiplicados.every(n => Math.abs(n - Math.round(n)) < 0.08);
        if(todosEnteros){
            return multiplicados.map(n=> Math.round(n));
        }
    }
    return ratios.map(r => Math.round(r));
}
//Funcion: Formula Empirica
function calcEmpirica(){
    const cantidades = document.querySelectorAll('.cantidad-g');
    const matomica = document.querySelectorAll('.masa-atomica');

    //Validacion: que haya al menos un elemento
    if(cantidades.length === 0){
        alert('Agrega al menos un elemento.');
        return;
    }

    //Array que guarda los moles de cada elemento
    let moles = [];

    //Bucle que valida los inputs Y calcula los moles (gramos / masa atomica)
    for(let i = 0; i < cantidades.length; i++){
        const gramos = parseFloat(cantidades[i].value);
        const masa = parseFloat(matomica[i].value);

        //Validacion: que cada campo este lleno
        if(isNaN(gramos) || isNaN(masa)){
            alert('Por favor ingresa todos los valores.');
            return;
        }

        moles.push(gramos / masa);
    }

    //Busca el valor mas pequeño en el array moles
    const molMin = Math.min(...moles);

    //Array que guardara la division de todos por el minimo
    let ratios = [];

    //Bucle que recorre el array moles dividiendo por el mol mas pequeño y lo almacena en ratios
    for(let i = 0; i < moles.length; i++){
        ratios.push(moles[i] / molMin);
    }

    //Convierte los ratios a enteros usando la funcion aEnteros
    let enteros = aEnteros(ratios);

    const simbolos = document.querySelectorAll('.fe-simbolo');
    let formula = '';

    //Construye el string de la formula empirica
    for(let i = 0; i < enteros.length; i++){
        const simbolo = simbolos[i].value || '?';
        const subindice = enteros[i];

        //Subindice == 1 no se escribe en quimica
        if(subindice === 1){
            formula += simbolo;
        } else {
            formula += simbolo + subindice;
        }
    }

    //Muestra el resultado
    document.getElementById('empirica-value').textContent = formula;
    document.getElementById('empirica-result').classList.add('visible');
}
//----------------------------------------------------------//
