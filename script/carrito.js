// window.cargarcarrito = function() {
//     Swal.fire({
//         title: "The producto is a enter in the changuito, nene",
//         icon: "success",
//         draggable: true
//     });
// }

// ----> estado del carrito
let carrito = [];

function actualizarContador() {
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
                <b>${producto.precio}</b>
            </div>
            <button class="eliminar-item" data-index="${index}">✕</button>
        </div>
    `).join('');
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarContador();
    renderizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContador();
    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarContador();
    renderizarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    // click en "Comprar" de cada tarjeta
    const botonesComprar = document.querySelectorAll('.precios button');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            const tarjeta = boton.closest('.tarjetas');
            const producto = {
                nombre: tarjeta.querySelector('h3').textContent.trim(),
                precio: tarjeta.querySelector('.precios b').textContent.trim(),
                imagen: tarjeta.querySelector('.producto').getAttribute('src')
            };
            agregarAlCarrito(producto);
            cargarcarrito();
        });
    });

    // abrir/cerrar el panel al clickear el ícono del carrito
    const carritoNav = document.getElementById('carrito-nav');
    const panelCarrito = document.getElementById('panel-carrito');
    carritoNav.addEventListener('click', (e) => {
        // evitamos que el click en el panel (eliminar/vaciar) cierre y vuelva a abrir
        if (e.target.closest('.panel-carrito') && !e.target.classList.contains('carrito-nav')) {
            if (!e.target.classList.contains('icono-carrito-nav')) return;
        }
        panelCarrito.classList.toggle('activo');
    });

    // eliminar un producto individual (delegación de eventos)
    document.getElementById('lista-carrito').addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-item')) {
            const index = Number(e.target.dataset.index);
            eliminarDelCarrito(index);
        }
    });

    // vaciar todo el carrito
    document.getElementById('vaciar-carrito').addEventListener('click', (e) => {
        e.stopPropagation();
        vaciarCarrito();
    });

    // cerrar el panel si se clickea afuera
    document.addEventListener('click', (e) => {
        if (!carritoNav.contains(e.target)) {
            panelCarrito.classList.remove('activo');
        }
    });
});