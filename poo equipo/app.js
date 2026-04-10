// ================== CLASE ==================
class Producto {
    constructor(nombre, cantidad, precio, imagen) {
        this._nombre = nombre;
        this._cantidad = cantidad;
        this._precio = precio;
        this._imagen = imagen;
    }

    // GETTERS
    get nombre() { return this._nombre; }
    get cantidad() { return this._cantidad; }
    get precio() { return this._precio; }
    get imagen() { return this._imagen; }

    get subtotal() {
        return this._cantidad * this._precio;
    }

    // SETTERS (encapsulamiento real)
    set cantidad(nuevaCantidad) {
        if (nuevaCantidad >= 0) {
            this._cantidad = nuevaCantidad;
        }
    }

    set precio(nuevoPrecio) {
        if (nuevoPrecio > 0) {
            this._precio = nuevoPrecio;
        }
    }

    set imagen(nuevaImagen) {
        this._imagen = nuevaImagen;
    }
}

// ================== DATOS ==================
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ================== GUARDAR ==================
function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ================== AGREGAR PRODUCTO ==================
function agregarProducto() {

    let nombre = document.getElementById("nombre").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let precio = parseFloat(document.getElementById("precio").value);
    let imagen = document.getElementById("imagen").value;

    if (!nombre || cantidad <= 0 || precio <= 0) {
        alert("Datos inválidos");
        return;
    }

    let producto = new Producto(nombre, cantidad, precio, imagen);

    productos.push(producto);
    guardarProductos();
    mostrarInventario();

    // limpiar
    document.getElementById("nombre").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("imagen").value = "";
}

// ================== MOSTRAR INVENTARIO ==================
function mostrarInventario() {

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    productos.forEach((p, i) => {
        lista.innerHTML += `
        <li>
        <b>${p._nombre}</b><br>
        Cantidad: ${p._cantidad}<br>
        Precio: $${p._precio}<br>
        <img src="${p._imagen}" width="60"><br>

        <input type="number" id="cant${i}" placeholder="Cantidad">
        <button onclick="agregarCarrito(${i})">Agregar</button>
        </li>
        <hr>
        `;
    });
}

// ================== AGREGAR AL CARRITO ==================
function agregarCarrito(index) {

    let cantidad = parseInt(document.getElementById("cant" + index).value);

    if (!cantidad || cantidad <= 0) {
        alert("Cantidad inválida");
        return;
    }

    if (cantidad > productos[index]._cantidad) {
        alert("No hay suficiente stock");
        return;
    }

    let producto = productos[index];

    carrito.push({
        nombre: producto._nombre,
        cantidad: cantidad,
        precio: producto._precio,
        subtotal: cantidad * producto._precio
    });

    guardarCarrito();
    mostrarCarrito();
}

// ================== MOSTRAR CARRITO ==================
function mostrarCarrito() {

    let lista = document.getElementById("carritoLista");
    let total = 0;

    lista.innerHTML = "";

    carrito.forEach(p => {
        total += p.subtotal;

        lista.innerHTML += `
        <li>
        ${p.nombre} - ${p.cantidad} = $${p.subtotal}
        </li>
        `;
    });

    document.getElementById("total").innerText = "Total: $" + total;
}

// ================== VENDER ==================
function vender() {

    if (carrito.length === 0) {
        alert("Carrito vacío");
        return;
    }

    generarTicket();

    carrito.forEach(item => {
        let producto = productos.find(p => p._nombre === item.nombre);

        if (producto) {
            producto.cantidad = producto._cantidad - item.cantidad; // usando setter
        }
    });

    guardarProductos();

    carrito = [];
    guardarCarrito();

    mostrarInventario();
    mostrarCarrito();

    alert("Venta realizada correctamente");
}

// ================== TICKET ==================
function generarTicket() {

    let ventana = window.open("", "", "width=400,height=600");

    let contenido = "<h2>Ticket de Venta</h2><hr>";
    let total = 0;

    carrito.forEach(p => {
        contenido += `<p>${p.nombre} x${p.cantidad} = $${p.subtotal}</p>`;
        total += p.subtotal;
    });

    contenido += `<hr><h3>Total: $${total}</h3>`;

    ventana.document.write(contenido);
    ventana.document.close();
    ventana.print();
}

// ================== INICIO ==================
mostrarInventario();
mostrarCarrito();