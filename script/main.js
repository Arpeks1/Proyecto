import { DB } from "./DB.js";

function TraerDatos(Datos) {

    let Contenedor = document.querySelector ('.contenedor')
    Contenedor.innerHTML = "";

    Datos.forEach(i => {
        let ContenedorAux = document.createElement('div')
        ContenedorAux.className = 'Tarjetas'
        ContenedorAux.dataset.id = i.ID

        ContenedorAux.innerHTML =
            `
            <button class="fav-btn"><img src="../src/iconos/corazon.png" alt="favorito"></button>
            <h1>${i.Nombre}</h1>
            <h2>$${i.Precio}</h2>
            <h3>Cantidad: ${i.Stock}</h3>
            <p>${i.Descripcion}</p>
            <img src="${i.Imagen}" alt="img" class="producto">
             ${i.Stock<17 ? '<span style=color:red>Stock Bajo</span>' : ""}
            <button class="btn-comprar"><img src="../src/iconos/carrito.png" alt="" class="carrito"><p>agrega al carrito</p></button>

        `
        Contenedor.appendChild(ContenedorAux)
    });

    // vuelve a marcar los corazones de los productos que ya son favoritos
    // (hace falta porque las tarjetas se regeneran enteras cada vez que se filtra)
    if (typeof window.marcarFavoritosEnPantalla === 'function') {
        window.marcarFavoritosEnPantalla();
    }

}

TraerDatos(DB)


// --> Tomamos el input de HTML con el ID(#)Filtro
let Filtro = document.querySelector('#Filtro')
let Contenedor = document.querySelector('.contenedor')

// se muestra cuando ningun producto matchea el filtro/busqueda
function mostrarNoEncontrado() {
    Contenedor.innerHTML = `<img id="Falta" src="../src/banners/nothing.png" alt="Producto no encontrado">`
}

/* Agregamos un evento al input, cada vez que se escriba una tecla, se ejecuta la función */
Filtro.addEventListener('keyup', function () {
    // --> Evitamos que se ejecute el evento por defecto del input
    let texto = Filtro.value.toLowerCase()
    let Filtros = DB.filter(i =>
        i.Nombre.toLowerCase().includes(texto) ||
        i.Descripcion.toLowerCase().includes(texto)
    )
    // --> Llamamos a la función TraerDatos y le pasamos el resultado del filtro como argumento
    if (Filtros.length > 0) {
        TraerDatos(Filtros)
    }
    else {
        mostrarNoEncontrado()
    }

})

// ----> filtros
const borrarfiltros = document.getElementById("todo")

const filtrosCategoria = [
    { el: document.getElementById("pinturas"), palabra: "pinturas" },
    { el: document.getElementById("miniatura"), palabra: "miniatura" },
    { el: document.getElementById("figura"), palabra: "figura" },
    { el: document.getElementById("extra"), palabra: "extra" },
    { el: document.getElementById("ropa"), palabra: "ropa" },
    { el: document.getElementById("libro"), palabra: "libro" },
]

// ----> filtrar (mira TODOS los checkbox marcados, no solo el que tocaste)
const FiltrarDatos = () => {

    const palabrasActivas = filtrosCategoria
        .filter(f => f.el.checked)
        .map(f => f.palabra)

    // si no hay ningun checkbox marcado, mostramos todo (como si hubieras apretado "Borrar Filtros")
    if (palabrasActivas.length === 0) {
        TraerDatos(DB)
        return
    }

    let Filtros = DB.filter(i =>
        palabrasActivas.some(palabra => i.Nombre.toLowerCase().includes(palabra))
    )

    if (Filtros.length > 0) {
        TraerDatos(Filtros)
    }
    else {
        mostrarNoEncontrado()
    }
}

borrarfiltros.addEventListener("click", () => {
    filtrosCategoria.forEach(f => f.el.checked = false)
    TraerDatos(DB)
})

filtrosCategoria.forEach(f => {
    f.el.addEventListener("change", FiltrarDatos)
})