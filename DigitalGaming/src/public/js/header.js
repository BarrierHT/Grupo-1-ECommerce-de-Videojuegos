let header = document.querySelector('.header-home');
function cambioBg(){
    if(window.scrollY >0 ){
        header.classList.add('scroll');
    }else{
        header.classList.remove('scroll');
    }
}
window.addEventListener('scroll', cambioBg);