// ----> estado de favoritos
let favoritos = [];

function actualizarContadorFavoritos() {
    const contador = document.getElementById('contador-favoritos');
    if (contador) {
        contador.textContent = favoritos.length;
    }
}

function renderizarFavoritos() {
    const lista = document.getElementById('lista-favoritos');
    if (!lista) return;

    if (favoritos.length === 0) {
        lista.innerHTML = `<p class="carrito-vacio">No tenés favoritos guardados</p>`;
        return;
    }

    lista.innerHTML = favoritos.map((producto, index) => `
        <div class="item-carrito">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="info-item">
                <p>${producto.nombre}</p>
                <b>$${producto.precio}</b>
            </div>
            <button class="eliminar-item" data-index="${index}">✕</button>
        </div>
    `).join('');
}

function agregarAFavoritos(producto) {
    favoritos.push(producto);
    actualizarContadorFavoritos();
    renderizarFavoritos();
}

function eliminarDeFavoritos(index) {
    favoritos.splice(index, 1);
    actualizarContadorFavoritos();
    renderizarFavoritos();
}

function vaciarFavoritos() {
    favoritos = [];
    actualizarContadorFavoritos();
    renderizarFavoritos();
}

// saca nombre/precio/imagen/id de la tarjeta de producto (generada por main.js)
function extraerProductoDeTarjeta(tarjeta) {
    return {
        id: tarjeta.dataset.id,
        nombre: tarjeta.querySelector('h1').textContent.trim(),
        precio: tarjeta.querySelector('h2').textContent.replace('$', '').trim(),
        imagen: tarjeta.querySelector('img.producto').getAttribute('src')
    };
}

// vuelve a marcar en pantalla (corazon a color) los productos que ya son
// favoritos. Se llama despues de cada TraerDatos en main.js, porque el
// filtro/busqueda regenera las tarjetas desde cero y pierden la clase 'activo'
window.marcarFavoritosEnPantalla = function () {
    document.querySelectorAll('.fav-btn').forEach(boton => {
        const tarjeta = boton.closest('.Tarjetas');
        if (!tarjeta) return;
        const esFavorito = favoritos.some(p => p.id === tarjeta.dataset.id);
        boton.classList.toggle('activo', esFavorito);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const favoritosNav = document.getElementById('favoritos-nav');
    const panelFavoritos = document.getElementById('panel-favoritos');
    const listaFavoritos = document.getElementById('lista-favoritos');
    const vaciarBtn = document.getElementById('vaciar-favoritos');

    // abrir/cerrar el panel al clickear el icono de favoritos
    if (favoritosNav && panelFavoritos) {
        favoritosNav.addEventListener('click', () => {
            panelFavoritos.classList.toggle('activo');
        });

        // que el click DENTRO del panel no lo cierre
        panelFavoritos.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // cerrar el panel si se clickea afuera
        document.addEventListener('click', (e) => {
            if (!favoritosNav.contains(e.target)) {
                panelFavoritos.classList.remove('activo');
            }
        });
    }

    // eliminar un favorito individual (delegacion de eventos)
    if (listaFavoritos) {
        listaFavoritos.addEventListener('click', (e) => {
            if (e.target.classList.contains('eliminar-item')) {
                e.stopPropagation();
                const index = Number(e.target.dataset.index);
                eliminarDeFavoritos(index);
                window.marcarFavoritosEnPantalla();
            }
        });
    }

    // vaciar todos los favoritos
    if (vaciarBtn) {
        vaciarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            vaciarFavoritos();
            window.marcarFavoritosEnPantalla();
        });
    }

    // click en el corazon de cualquier producto.
    // Usa delegacion sobre document porque las tarjetas se regeneran
    // enteras cada vez que se filtra o busca en Productos.html
    document.addEventListener('click', (e) => {
        const boton = e.target.closest('.fav-btn');
        if (!boton) return;

        const tarjeta = boton.closest('.Tarjetas');
        if (!tarjeta) return;

        const producto = extraerProductoDeTarjeta(tarjeta);
        const index = favoritos.findIndex(p => p.id === producto.id);

        if (index !== -1) {
            eliminarDeFavoritos(index);
            boton.classList.remove('activo');
        } else {
            agregarAFavoritos(producto);
            boton.classList.add('activo');
        }
    });
});