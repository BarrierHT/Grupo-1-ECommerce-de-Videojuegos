const inputImagen = document.getElementById('imagen');
const miniaturaDiv = document.getElementById('miniatura');

inputImagen.addEventListener('change', function () {
  const archivo = inputImagen.files[0];
  if (archivo) {
    const reader = new FileReader();
    reader.onload = function (e) {
      miniaturaDiv.style.backgroundImage = `url(${e.target.result})`;
      miniaturaDiv.style.display = "block";
    };
    reader.readAsDataURL(archivo);
  } else {
    miniaturaDiv.style.backgroundImage = 'none';
  }
});
