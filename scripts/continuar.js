const continuarCompra = document.querySelector('.continuar-compra');


function renderContinuarCompra(){
    let salida = "";

    if (carrito.length > 0) {
        salida += `<table class="table tabla-continuar table-striped">
        <thead>
            <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Producto</th>
                <th scope="col">Talle</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
            </tr>
        </thead>`;
    
        carrito.forEach(producto => {
            salida += `<tr>
            <td><img src="${producto.img}" alt="${producto.nombre}" width="80" /></td>
            <td>${producto.nombre}</td>
            <td>${producto.talle}</td>
            <td>${producto.cantidad} X $${producto.precio}</td>
            <td>$${producto.cantidad * producto.precio}</td>
            </tr>`;
        })
    
        salida += `<tr>
        <td colspan="3">Total a Pagar</td>
        <td>$${carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)}</td>
        <td>&nbsp;</td>
        </tr>`;
        salida += `</table>`;
    } else {
        salida = `<div class="alert alert-danger alerta-compra m-5 mx-auto" role="alert">
                    <p>No se agregaron Productos en el Carrito!</p>
                </div>`
    }
    
    continuarCompra.innerHTML = salida;
}

renderContinuarCompra()

class Cliente {
    constructor(nombre,correo){
        this.nombre = nombre;
        this.correo = correo;
    }
};

const arrayClientes = [];

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e)=>{
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    e.preventDefault()
    if (carrito.length == 0){
    } else{
        if (nombre.value != "" && correo.value != ""){
            formulario.innerHTML = `<div class="alert alert-success text-center alerta-compra" role="alert my-200px">La compra se ha realizado correctamente!</div>`;
            carrito.length = [];
            localStorage.removeItem('carrito');
        }
    }
    renderContinuarCompra();
});