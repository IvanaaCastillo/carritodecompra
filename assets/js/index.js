// Clase producto con los atributos nombre y precio
function Producto(nombre, precio) {
    this.nombre = nombre
    this.precio = precio
}

// Clase carrito con atributo para agregar productos 
function Carrito() {
    this.productos = []


// Método para agregar productos al carrito
    this.agregarProductos = function(producto, cantidad) {
        let productoEncontrado = false

        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].producto.nombre === producto.nombre) {
                this.productos[i].cantidad += cantidad;
                productoEncontrado = true
                break;
            }
        }

    if (!productoEncontrado) {
        this.productos.push({
            producto: producto,
            cantidad: cantidad
        })
    }
    alert(`Se han agregado ${cantidad} unidades de ${producto.nombre} al carrito.`);
}

// Método para calcular el total de compra
    this.calcularTotal = function() {
        return this.productos.reduce((acumulador, item) => {
            return acumulador + item.producto.precio * item.cantidad;
        }, 0)
    }

// Método para finalizar la compra
    this.finalizarCompra = function() {
        if (this.productos.length === 0) {
            alert("El carrito se encuentra vacío.");
        } else {
            const total = this.calcularTotal();
            let detalles = "Detalles de la compra:\n";

            this.productos.forEach((item) => {
                detalles += `${item.producto.nombre} - $${item.producto.precio} x ${item.cantidad} unidades = $${item.producto.precio * item.cantidad}\n`;
            });

            detalles += `Total de la compra: $${total}`;
            alert(detalles); // Usar alert para mostrar los detalles de la compra

            this.productos = [];
            alert("La compra ha sido realizada. ¡Gracias por su compra!");
        }
    }

// Método para mostrar los detalles de la compra
    this.mostrarDetalles = function() {
        if (this.productos.length === 0) {
            alert("No hay productos en el carrito.")
        } else {
            let detalles = "Detalles de la compra:\n"
            this.productos.forEach((item, index) => {
                detalles += `${index + 1}. ${item.producto.nombre} - $${item.producto.precio} x ${item.cantidad} unidades = $${item.producto.precio * item.cantidad}\n`;
            });
            alert(detalles)
        }
    }
}

// Función para validar la elección del usuario
const validarOpcionUsuario = (eleccion) => {
    if (isNaN(eleccion)) {
        alert("Por favor ingresa un número válido")
        return false
    }

    if (eleccion < 1 || eleccion > 6) {
        alert("Por favor ingresa un número dentro de los rangos ofrecidos")
        return false
    }

    return true
}

// Productos disponibles
const productosDisponibles = [
    new Producto('Leche', 1000),
    new Producto('Pan de molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azúcar', 1300)
];

// Creación de carrito
const carrito = new Carrito();
alert('Bienvenido a la tienda XXXXX.')

// Función principal para interactuar con el usuario
let confirmacion = true

while (confirmacion) {
    const eleccionUsuario = prompt(`
        Por favor, escoge alguno de nuestros productos disponibles: 
        1. Leche $1000
        2. Pan de molde $2000
        3. Queso $1200
        4. Mermelada $890
        5. Azúcar $1300
        6. Salir
    `)

    const eleccion = parseInt(eleccionUsuario)
    
    if (!validarOpcionUsuario(eleccion)) {
        continue
    }

    if (eleccion === 6) {
        const salir = confirm("¿Estás seguro que deseas salir?")
        if (salir) {
            confirmacion = false;
            alert("¡Gracias por su compra!");
        }
    } else {
        const productoSeleccionado = productosDisponibles[eleccion - 1];
        const cantidad = parseInt(prompt("Ingresa el número de productos que deseas agregar al carrito: "))
        
        if (cantidad >= 1) {
            carrito.agregarProductos(productoSeleccionado, cantidad)
        } else {
            alert("Por favor ingresa la cantidad de unidades")
        }
    }

// Mostrar detalles y finalizar compra solo si el usuario decide seguir comprando
    if (!confirmacion) {
        carrito.mostrarDetalles()
        carrito.finalizarCompra()
    } else {
        confirmacion = confirm("¿Deseas seguir agregando productos al carrito?")
    }
}
