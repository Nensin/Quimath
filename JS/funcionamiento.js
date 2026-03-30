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
