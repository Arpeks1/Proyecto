window.cargarcarrito = function() {
    Swal.fire({
        title: "The producto is a enter in the changuito, nene",
        icon: "success",
        draggable: true
    });
}

// ----> estado del carrito
let carrito = [];

function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = carrito.length;
    }
}

function renderizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    if (!lista) return;

    if (carrito.length === 0) {
        lista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío</p>`;
        return;
    }

    lista.innerHTML = carrito.map((producto, index) => `
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

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarContadorCarrito();
    renderizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContadorCarrito();
    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarContadorCarrito();
    renderizarCarrito();
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

document.addEventListener('DOMContentLoaded', () => {
    const carritoNav = document.getElementById('carrito-nav');
    const panelCarrito = document.getElementById('panel-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const vaciarBtn = document.getElementById('vaciar-carrito');

    // abrir/cerrar el panel al clickear el icono del carrito
    if (carritoNav && panelCarrito) {
        carritoNav.addEventListener('click', () => {
            panelCarrito.classList.toggle('activo');
        });

        // que el click DENTRO del panel no lo cierre
        panelCarrito.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // cerrar el panel si se clickea afuera
        document.addEventListener('click', (e) => {
            if (!carritoNav.contains(e.target)) {
                panelCarrito.classList.remove('activo');
            }
        });
    }

    // eliminar un producto individual del carrito (delegacion de eventos)
    if (listaCarrito) {
        listaCarrito.addEventListener('click', (e) => {
            if (e.target.classList.contains('eliminar-item')) {
                e.stopPropagation();
                const index = Number(e.target.dataset.index);
                eliminarDelCarrito(index);
            }
        });
    }

    // vaciar todo el carrito
    if (vaciarBtn) {
        vaciarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            vaciarCarrito();
        });
    }

    // click en "agregar al carrito" de cualquier producto.
    // Usa delegacion sobre document porque las tarjetas se regeneran
    // enteras cada vez que se filtra o busca en Productos.html
    document.addEventListener('click', (e) => {
        const boton = e.target.closest('.btn-comprar');
        if (!boton) return;

        const tarjeta = boton.closest('.Tarjetas');
        if (!tarjeta) return;

        const producto = extraerProductoDeTarjeta(tarjeta);
        agregarAlCarrito(producto);
        cargarcarrito();
    });
});