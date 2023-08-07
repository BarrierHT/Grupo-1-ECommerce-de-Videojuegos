let header = document.querySelector('.header-home');
function cambioBg(){
    if(window.scrollY >0 ){
        header.classList.add('scroll');
    }else{
        header.classList.remove('scroll');
    }
}
window.addEventListener('scroll', cambioBg);
//FuNciON PArA El DESPLEGABLE DEL NAV
let catNav = document.querySelector('.categ-nav');
let desplegable = document.querySelector('.despcat');
function mostrarDes(){
    desplegable.classList.add('mostrar');
    console.log('mostrando')
}
function noMostrar(){
    desplegable.classList.remove('mostrar');
}
catNav.addEventListener('mouseover', mostrarDes);
catNav.addEventListener('mouseout', noMostrar);