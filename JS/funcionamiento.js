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
//Funcion para mostrar los resultados
function showResult(boxId, valueId, value){
    document.getElementById(valueId).textContent=parseFloat(value.toFixed(4))
    document.getElementById(boxId).classList.add('visible')
}
function calcMoles(){
    const masa = parseFloat(document.getElementById('moles-masa').value);
    const mmolar =parseFloat(document.getElementById('moles-mmolar').value);
    //Validacion
    if(isNaN(masa) || isNaN(mmolar)){
        alert('Por favor ingresa todos los valores.')
    }
    let resultado = masa/mmolar;
    showResult('moles-result', 'moles-value', resultado);
}