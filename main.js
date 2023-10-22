// Variables para el saldo y el carrito
let saldo = 1000;
let carrito = {};

// Base de datos de productos disponibles como un array de objetos
let productosDisponibles = [
    { nombre: "Producto A", precio: 50 },
    { nombre: "Producto B", precio: 30 },
    { nombre: "Producto C", precio: 20 },
];

// Referencias a elementos HTML
const saldoElement = document.getElementById("saldo");
const productosElement = document.getElementById("productos");
const carritoElement = document.getElementById("carrito");
const productoInput = document.getElementById("productoInput");
const agregarAlCarritoButton = document.getElementById("agregarAlCarrito");
const finalizarCompraButton = document.getElementById("finalizarCompra");

// Función para actualizar el saldo en la página
function actualizarSaldo() {
    saldoElement.textContent = saldo;
}

// Función para mostrar los productos disponibles en la página
function mostrarProductos() {
    productosElement.innerHTML = "<h2>Productos disponibles:</h2>";

    productosDisponibles.forEach((producto, index) => {
        const item = document.createElement("li");
        item.innerText = `${producto.nombre} - $${producto.precio}`;
        productosElement.appendChild(item);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito() {
    const nombreProducto = productoInput.value;
    const productoEncontrado = productosDisponibles.find((producto) => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());

    if (!productoEncontrado) {
        alert("Producto no válido. Por favor, elige un producto de la lista.");
        return;
    }

    const precio = productoEncontrado.precio;

    if (saldo >= precio) {
        saldo -= precio;

        if (carrito[nombreProducto]) {
            carrito[nombreProducto]++;
        } else {
            carrito[nombreProducto] = 1;
        }

        actualizarSaldo();
        actualizarCarrito();
    } else {
        alert("No tienes suficiente saldo para comprar ese producto.");
    }
}

// Función para actualizar el carrito en la página
function actualizarCarrito() {
    carritoElement.innerHTML = "<h2>Carrito de Compras:</h2>";

    for (const nombreProducto in carrito) {
        const item = document.createElement("li");
        item.innerText = `${nombreProducto} x${carrito[nombreProducto]}`;
        carritoElement.appendChild(item);
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    let resumenCompra = "Resumen de compra:\n";

    for (const nombreProducto in carrito) {
        resumenCompra += `${nombreProducto}: ${carrito[nombreProducto]} unidades\n`;
    }

    resumenCompra += `Saldo restante: $${saldo}\n¡Gracias por tu compra!`;
    alert(resumenCompra);
}
// Agregar event listener al botón "Agregar al carrito"
document.getElementById("agregarAlCarrito").addEventListener("click", function () {
  agregarAlCarrito();
});

// Agregar event listener al botón "Finalizar compra"
document.getElementById("finalizarCompra").addEventListener("click", function () {
  finalizarCompra();
});

// Asocia eventos y funciones de respuesta
agregarAlCarritoButton.addEventListener("click", agregarAlCarrito);
finalizarCompraButton.addEventListener("click", finalizarCompra);
function limpiarElCarrito() {
    // Devolver los productos al saldo
    for (const nombreProducto in carrito) {
        saldo += productosDisponibles.find(producto => producto.nombre === nombreProducto).precio * carrito[nombreProducto];
    }

    // Limpiar el carrito
    carrito = {};

    // Actualizar el saldo y el carrito en la página
    actualizarSaldo();
    actualizarCarrito();

    // Notificar al usuario
    mostrarMensaje("El carrito ha sido limpiado.");
}
const limpiarCarritoButton = document.getElementById("limpiarCarrito");
limpiarCarritoButton.addEventListener("click", limpiarElCarrito);
function mostrarMensaje(mensaje) {
    const notificacion = document.getElementById("notificacion");
    notificacion.textContent = mensaje;
}

localStorage.setItem("saldo", saldo);

// Recupera el saldo del localStorage (si existe)
const saldoGuardado = localStorage.getItem("saldo");
if (saldoGuardado) {
    saldo = parseFloat(saldoGuardado);
    actualizarSaldo();
}

// Almacenar el carrito en el localStorage
localStorage.setItem("carrito", JSON.stringify(carrito));

// Recuperar el carrito del localStorage al cargar la página
const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
}

// Asociar eventos a los botones
agregarAlCarritoButton.addEventListener("click", agregarAlCarrito);
finalizarCompraButton.addEventListener("click", finalizarCompra);
limpiarCarritoButton.addEventListener("click", limpiarElCarrito);

// Función para mostrar mensajes en el área de notificación
function mostrarMensaje(mensaje) {
    const notificacion = document.getElementById("notificacion");
    notificacion.textContent = mensaje;
}