let contador = 0;

window.agregarfavorito = function () {
    contador++;
    document.getElementById('fav').innerText = contador;
}