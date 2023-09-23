const boton = document.querySelector(".btn-menu");
const slidemenu = document.querySelector(".menu-lat");
const botoncerrar = document.querySelector(".close")
const spanlat2 = document.querySelector(".span-lat-2");
const spanlat = document.querySelector(".span-lat");

boton.addEventListener('click', () => {
    slidemenu.classList.toggle('activo');
    spanlat.classList.toggle('animate');
    spanlat2.classList.toggle('animate');
})
botoncerrar.addEventListener('click', ()=>{
    slidemenu.classList.toggle('activo')
    spanlat.classList.toggle('animate');
    spanlat2.classList.toggle('animate');
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