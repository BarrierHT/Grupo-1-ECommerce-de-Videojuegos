const boton = document.querySelector(".btn-menu");
const slidemenu = document.querySelector(".menu-lat");
const botoncerrar = document.querySelector(".close")

boton.addEventListener('click', () => {
    slidemenu.classList.toggle('activo');
})
botoncerrar.addEventListener('click', ()=>{
    slidemenu.classList.toggle('activo')
} )
document.addEventListener("DOMContentLoaded", function () {
    const home = document.querySelectorAll(".home-navigate");
    home.forEach(div => {
        div.addEventListener("click", function () {
            window.location.href = "/";
        });
    });
});

let links = document.querySelectorAll('.link');
links.forEach(link => {
    link.addEventListener('click', () => {
      const endpoint = link.getAttribute('data-endpoint');
      window.location.href = endpoint;
    });
});