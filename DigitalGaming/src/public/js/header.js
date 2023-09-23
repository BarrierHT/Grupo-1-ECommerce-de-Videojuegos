let header = document.querySelector('.header-home');
function cambioBg(){
    if(window.scrollY >0 ){
        header.classList.add('scroll');
    }else{
        header.classList.remove('scroll');
    }
}
window.addEventListener('scroll', cambioBg);

const btnOpen = document.querySelector(".user-icon");
const btnClosemodal = document.querySelector(".close-mod-sess");
const modalsession = document.querySelector(".modal-session");

btnOpen.addEventListener('click',() => {
    modalsession.classList.toggle('active');
})

btnClosemodal.addEventListener('click',() => {
    modalsession.classList.toggle('active');
})
