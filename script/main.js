import { DB } from "./DB.js";

function TraerDatos(Datos) {

    let Contenedor = document.querySelector ('.contenedor')
    Contenedor.innerHTML = "";

    Datos.forEach(i => {
        let ContenedorAux = document.createElement('div')
        ContenedorAux.className = 'Tarjetas'

        ContenedorAux.innerHTML =
            `
            <h1>${i.Nombre}</h1>
            <h2>$${i.Precio}</h2>
            <h3>Cantidad: ${i.Stock}</h3>
            <p>${i.Descripcion}</p>
            <img src="${i.Imagen}" alt="img">
             ${i.Stock<17 ? '<span style=color:red>Stock Bajo</span>' : ""}
            <button class="btn btn-primary" onclick="cargarcarrito()"> agrega al carrito </button>

        `
        Contenedor.appendChild(ContenedorAux)
    });

}

TraerDatos(DB)


// --> Tomamos el input de HTML con el ID(#)Filtro
let Filtro = document.querySelector('#Filtro')
let Contenedor = document.querySelector('.contenedor')
/* Agregamos un evento al input, cada vez que se escriba una tecla, se ejecuta la función */
Filtro.addEventListener('keyup', function () {
    // --> Evitamos que se ejecute el evento por defecto del input
    let Filtros = DB.filter(i => i.Nombre.toLowerCase().includes(Filtro.value.toLowerCase()))
    // --> Llamamos a la función TraerDatos y le pasamos el resultado del filtro como argumento
    if (Filtros.length > 0) {
        TraerDatos(Filtros)
    }
    else {
        Contenedor.innerHTML = `<p>Producto no Encontrado</p>`
    }

})

// ----> filtros
const borrarfiltros = document.getElementById("todo")
const FiltroPinturas = document.getElementById("pinturas")
const FiltroMiniatura = document.getElementById("miniatura")
const FiltroExtra = document.getElementById("extra")
const FiltroRopa = document.getElementById("ropa")
const FiltroPinturas = document.getElementById("pinturas")
const FiltroLibro = document.getElementById("libro")



// ----> filtrar
const FiltrarDatos = (parametro) => {

    let Filtros = DB.filter(i => i.Nombre.toLowerCase().includes(parametro))

    if (Filtros.length > 0) {
        TraerDatos(Filtros)
    }
    else {
        Contenedor.innerHTML = `<p>Producto no Encontrado</p>`
    }
}

borrarfiltros.addEventListener("click", () => {
    FiltrarDatos("")

})

FiltroPinturas.addEventListener("click", () => {
    FiltrarDatos("pinturas")
})

FiltroMiniatura.addEventListener("click", () => {
    FiltrarDatos("miniatura")
})

FiltroFigura.addEventListener("click", () => {
    FiltrarDatos("figura")
})

FiltroExtra.addEventListener("click", () => {
    FiltrarDatos("extra")
})

FiltroLibro.addEventListener("click", () => {
    FiltrarDatos("libro")
})

FiltroRopa.addEventListener("click", () => {
    FiltrarDatos("ropa")
})

