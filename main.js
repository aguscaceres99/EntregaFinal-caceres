document.addEventListener("DOMContentLoaded", function () {
  // Inicializar variables
  let saldo = 1000;
  let productosDisponibles = {
    producto_a: 50,
    producto_b: 30,
    producto_c: 20,
  };
  let carrito = {};

  // Función para actualizar el saldo en la página
  function actualizarSaldo() {
    document.getElementById("saldo").innerText = saldo;
  }

  // Función para mostrar los productos disponibles en la página
  function mostrarProductos() {
    const listaProductos = document.getElementById("productos");
    listaProductos.innerHTML = "<h2>Productos disponibles:</h2>";

    for (const producto in productosDisponibles) {
      const item = document.createElement("li");
      item.innerText = producto + " - $" + productosDisponibles[producto];
      listaProductos.appendChild(item);
    }
  }

  // Función para agregar un producto al carrito
  function agregarAlCarrito() {
    const productoInput = document.getElementById("productoInput").value.toLowerCase(); // Convertir a minúsculas
    const precio = productosDisponibles[productoInput];

    if (precio === undefined) {
      alert("Producto no válido. Por favor, elige un producto de la lista.");
      return;
    }

    if (saldo >= precio) {
      saldo -= precio;

      if (carrito[productoInput]) {
        carrito[productoInput]++;
      } else {
        carrito[productoInput] = 1;
      }

      actualizarSaldo();
      actualizarCarrito();
    } else {
      alert("No tienes suficiente saldo para comprar ese producto.");
    }
  }

  // Función para actualizar el carrito en la página
  function actualizarCarrito() {
    const listaCarrito = document.getElementById("carrito");
    listaCarrito.innerHTML = "<h2>Carrito de Compras:</h2>";

    for (const producto in carrito) {
      const item = document.createElement("li");
      item.innerText = producto + " x" + carrito[producto];
      listaCarrito.appendChild(item);
    }
  }

  // Función para finalizar la compra
  function finalizarCompra() {
    let resumenCompra = "Resumen de compra:\n";

    for (const producto in carrito) {
      resumenCompra += producto + ": " + carrito[producto] + " unidades\n";
    }

    resumenCompra += "Saldo restante: $" + saldo + "\n¡Gracias por tu compra!";
    alert(resumenCompra);
  }

  // Agregar event listeners a los botones
  document.getElementById("agregarAlCarrito").addEventListener("click", agregarAlCarrito);
  document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);

  // Inicializar la página
  actualizarSaldo();
  mostrarProductos();
});