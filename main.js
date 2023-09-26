document.addEventListener("DOMContentLoaded", function () {
    // Inicializar variables
    var saldo = 1000;
    var productosDisponibles = {
      productoA: 400,
      productoB: 600,
      productoC: 300,
    };
    var carrito = {};
  
    // Función para actualizar el saldo en la página
    function actualizarSaldo() {
      document.getElementById("saldo").innerText = saldo;
    }
  
    // Función para mostrar los productos disponibles en la página
    function mostrarProductos() {
      var listaProductos = document.getElementById("productos");
      listaProductos.innerHTML = "<h2>Productos disponibles:</h2>";
  
      for (var producto in productosDisponibles) {
        var item = document.createElement("li");
        item.innerText = producto + " - $" + productosDisponibles[producto];
        listaProductos.appendChild(item);
      }
    }
  
    // Función para agregar un producto al carrito
    function agregarAlCarrito() {
      var productoInput = document.getElementById("productoInput").value;
      var precio = productosDisponibles[productoInput];
  
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
      var listaCarrito = document.getElementById("carrito");
      listaCarrito.innerHTML = "<h2>Carrito de Compras:</h2>";
  
      for (var producto in carrito) {
        var item = document.createElement("li");
        item.innerText = producto + " x" + carrito[producto];
        listaCarrito.appendChild(item);
      }
    }
  
    // Función para finalizar la compra
    function finalizarCompra() {
      var resumenCompra = "Resumen de compra:\n";
  
      for (var producto in carrito) {
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