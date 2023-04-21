
const vaciar = document.querySelector("#boton-vaciar");
const cart = document.querySelector("#cart");
const precioTotal = document.querySelector('#precio-total')

vaciar.addEventListener('click', () => {
    vaciarCart()
})


renderCarrito()

function renderCarrito(){
    cart.innerHTML = '';
    carrito.forEach((prod) => {
        cart.innerHTML += `
        <div class="carrito-box">
            <div>
                <img src="${prod.img}" class="img-carrito"></img>
            </div>
            <div>
                <p>Producto: ${prod.nombre}</p>
                <p>Precio: $${prod.precio}</p>
                <div class="d-flex justify-content-between">
                <p>Talle: ${prod.talle}</p>
                <p>Cantidad: ${prod.cantidad}</p>
                </div>
                <button class="btn-sm btn-danger" onclick="eliminarDelCarrito(${prod.id})">Quitar</button>
            </div>
        </div>
        <hr>`
    })
    if (carrito.length == 0){
        cart.innerHTML = `<div class="alert alert-danger text-center" role="alert">No agregaste nada!</div>`
    }
    precioTotal.innerText = `$${carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)}`
    totalCarrito();
}


function eliminarDelCarrito(id){
    const prodId = id;
    carrito = carrito.filter((prod) => prod.id !== prodId);
    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderCarrito();
    renderContinuarCompra();
}

function vaciarCart(){
    carrito.length = [];
    localStorage.removeItem('carrito')
    cart.innerHTML = '';
    renderCarrito();
    renderContinuarCompra();
}