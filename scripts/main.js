const tienda = document.querySelector(".store");
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const cartItem = document.querySelector("#cart-item")
let data;

totalCarrito()
function renderTienda(){
    fetch("./scripts/productos.json")
    .then((respuesta) => respuesta.json())
    .then((productos) => {
        data = productos
        data.forEach((item) => {
            tienda.innerHTML += `
            <div class="card col-lg-4 m-2 mx-auto text-center" style="width: 16rem;">
                <img src="${item.img}" class="card-img-top" alt="Zapatillas Jordan">
                <div class="card-body d-flex flex-column justify-content-center">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">Talle: ${item.talle}</p>
                    <button id="item-${item.id}" class="btn btn-primary">Agregar al carrito</button>
                </div>
            </div>`
        })
        funcionalidadBotones(data)
    })
    .catch((error) => {
        console.log("Ocurrio un error: " + error)
    })

}



function funcionalidadBotones(data){
    data.forEach((prod) => {
        document.getElementById(`item-${prod.id}`).addEventListener("click", () => {
            agregarAlCarrito(prod)
        })
    })
}


function agregarAlCarrito(prod){
    let existe = carrito.some((element) => element.id === prod.id)
    if (existe === false){
        let aux = {
            ...prod
        };
        aux.cantidad = 1;
        carrito.push(aux);
    } else{
        let prodBuscado = carrito.find((element) => element.id === prod.id);
        prodBuscado.cantidad++;
    }
    renderCarrito()
    totalCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function totalCarrito(){
    let total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    cartItem.textContent = total;
}

renderTienda()