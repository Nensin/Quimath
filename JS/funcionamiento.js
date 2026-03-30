//Modal:Open y Close
function openModal(id){
    document.getElementById('modal-' + id).classList.add('active');
    document.body.style.overflow = 'hidden';
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
    document.getElementById(valueId).textContent=parseFloat(value.toFixed(4))
    document.getElementById(boxId).classList.add('visible')
}
//Funcion Calcular los moles
function calcMoles(){
    const masa = parseFloat(document.getElementById('moles-masa').value);
    const mmolar =parseFloat(document.getElementById('moles-mmolar').value);
    //Validacion
    if(isNaN(masa) || isNaN(mmolar)){
        alert('Por favor ingresa todos los valores.')
        return;
    }
    let resultado = masa/mmolar;
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
//Funcion:Disolucion
function calcDisolucion(){
    const M1 = parseFloat(document.getElementById('dil-m1').value);
    const V1 = parseFloat(document.getElementById('dil-v1').value);
    const M2 = parseFloat(document.getElementById('dil-m2').value);
    const V2 = parseFloat(document.getElementById('dil-v2').value);

    //Constante Target
    const target = document.getElementById('dil-target').value;
    //Procedimiento
    let result;
    let unit = "";
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
const targetSelect=document.getElementById('dig-target');
function updateDisableField(){
    const target = targetSelect.value;
    const allFields =['m1', 'v1', 'm2', 'v2'];
    allFields.forEach(field =>{
        const inputElement = document.getElementById(`dil-${field}`);

        if(target.toLowerCase() === field){
            inputElement.disabled =true;
            inputElement.value = '';
            inputElement.style.opacity= '0.5';
        }else{
            inputElement.disabled = false;
            inputElement.style.opacity= '1';
        }
    });
}
targetSelect.addEventListener('change', updateDisableField);
updateDisableField();
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