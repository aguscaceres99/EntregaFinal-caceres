// Variables para el saldo y el carrito
let saldo = 1000;
let carrito = {};

// Base de datos de productos disponibles como un array de objetos
let productosDisponibles = [
    { nombre: "Producto A", precio: 800 },
    { nombre: "Producto B", precio: 150 },
    { nombre: "Producto C", precio: 50 },
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
        Swal.fire("Error", "Producto no válido. Por favor, elige un producto de la lista.", "error");
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
        Swal.fire("Error", "No tienes suficiente saldo para comprar ese producto.", "error");
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
    Swal.fire("Resumen de Compra", resumenCompra, "success");
}

// Asociar eventos a los botones
agregarAlCarritoButton.addEventListener("click", agregarAlCarrito);
finalizarCompraButton.addEventListener("click", finalizarCompra);

// Función para mostrar mensajes en el área de notificación
function mostrarMensaje(mensaje) {
    const notificacion = document.getElementById("notificacion");
    notificacion.textContent = mensaje;
}

// Función para limpiar el carrito
function limpiarElCarrito() {
    if (Object.keys(carrito).length > 0) {
        // Devolver los productos al saldo
        for (const nombreProducto in carrito) {
            const cantidad = carrito[nombreProducto];
            const precioProducto = productosDisponibles.find(producto => producto.nombre === nombreProducto).precio;
            saldo += cantidad * precioProducto;
        }

        // Limpiar el carrito
        carrito = {};
        
        // Actualizar el saldo y el carrito en la página
        actualizarSaldo();
        actualizarCarrito();

        // Notificar al usuario
        mostrarMensaje("El carrito ha sido limpiado.");
    }
}

// Asociar evento al botón "Limpiar Carrito"
const limpiarCarritoButton = document.getElementById("limpiarCarrito");
limpiarCarritoButton.addEventListener("click", limpiarElCarrito);

// Remover la llamada a limpiarElCarrito al cargar la página
// limpiarElCarrito(); // Elimina esta línea

// Recuperar el carrito del localStorage al cargar la página
const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
}

// Restablecer el valor de saldo solo si no hay un valor guardado en el localStorage
if (!localStorage.getItem("saldo")) {
    saldo = 1000;
    actualizarSaldo();
}

// Al cargar la página, verificar si el carrito está vacío y mostrar un mensaje en consecuencia
if (Object.keys(carrito).length === 0) {
    mostrarMensaje("El carrito está vacío.");
}

// URL de la API de ejemplo
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// Función para cargar datos desde la API
async function cargarDatosDesdeAPI() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('No se pudo cargar los datos desde la API.');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamar a la función para cargar datos desde la API
cargarDatosDesdeAPI();