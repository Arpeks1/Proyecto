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
                <b>${producto.precio}</b>
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

document.addEventListener('DOMContentLoaded', () => {
    const botonesFav = document.querySelectorAll('.fav-btn');
    botonesFav.forEach(boton => {
        boton.addEventListener('click', () => {
            const tarjeta = boton.closest('.tarjetas');
            const producto = {
                nombre: tarjeta.querySelector('h3').textContent.trim(),
                precio: tarjeta.querySelector('.precios b').textContent.trim(),
                imagen: tarjeta.querySelector('.producto').getAttribute('src')
            };

            const yaEsFavorito = boton.classList.contains('activo');
            if (yaEsFavorito) {
                const index = favoritos.findIndex(p => p.nombre === producto.nombre);
                if (index !== -1) eliminarDeFavoritos(index);
                boton.classList.remove('activo');
            } else {
                agregarAFavoritos(producto);
                boton.classList.add('activo');
            }
        });
    });

    const favoritosNav = document.getElementById('favoritos-nav');
    const panelFavoritos = document.getElementById('panel-favoritos');
    favoritosNav.addEventListener('click', () => {
        panelFavoritos.classList.toggle('activo');
    });

    document.getElementById('lista-favoritos').addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-item')) {
            e.stopPropagation();
            const index = Number(e.target.dataset.index);
            eliminarDeFavoritos(index);

            const nombreEliminado = e.target.closest('.item-carrito').querySelector('p').textContent.trim();
            document.querySelectorAll('.tarjetas').forEach(tarjeta => {
                const nombreTarjeta = tarjeta.querySelector('h3').textContent.trim();
                if (nombreTarjeta === nombreEliminado) {
                    const btn = tarjeta.querySelector('.fav-btn');
                    btn.classList.remove('activo');
                }
            });
        }
    });

    document.getElementById('vaciar-favoritos').addEventListener('click', (e) => {
        e.stopPropagation();
        vaciarFavoritos();
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.classList.remove('activo');
        });
    });

    panelFavoritos.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!favoritosNav.contains(e.target)) {
            panelFavoritos.classList.remove('activo');
        }
    });
});