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
     if(isNaN(moles) || isNaN(litros)){
        alert('Por favor ingrese todos los valores.')
        return;
     }
    let result = moles/litros;
    showResult('molaridad-result','molaridad-value',result)
}