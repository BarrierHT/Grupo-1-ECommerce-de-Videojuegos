const boton = document.querySelector(".btn-menu");
const slidemenu = document.querySelector(".menu-lat");
const botoncerrar = document.querySelector(".close")

boton.addEventListener('click', () => {
    console.log(slidemenu.classList.toggle('activo'));
})
botoncerrar.addEventListener('click', ()=>{
    slidemenu.classList.toggle('activo')
} )
