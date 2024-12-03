const carritoDeCompras = JSON.parse(localStorage.getItem("lista-compras")) || [];
const cardBody = document.querySelector(".card-body");
const cardFooter = document.querySelector(".card-footer");
const btnComprar = document.querySelector(".btn-agregar-producto");
const btnLimpiarCarrito = document.querySelector(".btn-limpiar-carrito");
const btnVolver = document.querySelector("#btnVolver");

const divProducto = (producto) => {
    /* Creo los divs contenedores y los uno según correspondan */
    const divContenedor = document.createElement("div");
    divContenedor.classList.add(...["producto", "mt-3"]);
    
    const divProductoDescripcion = document.createElement("div");
    divProductoDescripcion.classList.add("producto-descripcion");

    const divProductoImagen = document.createElement("div");
    divProductoImagen.classList.add("producto-image");

    divContenedor.appendChild(divProductoDescripcion); // 1ero
    divContenedor.appendChild(divProductoImagen); // 2do

    /* Creo los 'p' que iran anclados al divProductoDescripcion y los uno */
    const pDescProducto = document.createElement("p");
    pDescProducto.textContent = `(x${producto.cantidad}) ${producto.nombre}`;
    pDescProducto.classList.add("font-semibold");

    const pPrecioProducto = document.createElement("p");
    pPrecioProducto.textContent = "Precio: ";
    pPrecioProducto.classList.add(...["mt-5", "font-semibold", "text-l"]);

    const spanPrecioProducto = document.createElement("span");
    spanPrecioProducto.classList.add("text-green-700");
    spanPrecioProducto.textContent = `$${producto.precio*producto.cantidad}`;

    pPrecioProducto.appendChild(spanPrecioProducto);

    divProductoDescripcion.appendChild(pDescProducto);
    divProductoDescripcion.appendChild(pPrecioProducto);

    /* Creo el elemento 'img' que contendrá la imagen de referencia de los productos agregados */
    const imgProducto = document.createElement("img");
    imgProducto.src = `./img${producto.imgSrc}`;
    imgProducto.classList.add("tiny-image");
    imgProducto.alt = producto.nombre;

    divProductoImagen.appendChild(imgProducto);

    /* Finalmente devuelvo el contenedor con todo el div armado

        Para una vista a modo de ejemplo de lo que
        se uniría al html sería algo como esto:
        <div class="producto">
            <div class="producto-descripcion">
                <p class="font-semibold">(x1) Mate rústico c/ bombilla</p>
                <p class="mt-5 font-semibold text-l">Precio: <span class="text-green-700">$47599</span></p>
            </div>
            <div class="producto-image">
                <img src="./img/mate-rustico.webp" alt="productoEjemplo" class="tiny-image">
            </div>
        </div>
    */
    return divContenedor;
}

const pPrecioTotalProductos = (lista) => {
    const pTotal = document.createElement("p");
    pTotal.classList.add("font-semibold");

    let total = 0;
    lista.forEach((producto) => {
        total += (producto.precio * producto.cantidad)
    });
    pTotal.textContent = `Total: $${total}`;
    return pTotal;
}

const sinProductos = () => {
    const textNoProductos = document.createElement("p");
    textNoProductos.textContent = "¡Carrito vacío!";
    textNoProductos.classList.add(...["text-center", "text-l", "font-semibold"]);
    return textNoProductos;
}

if (carritoDeCompras.length > 0){
    console.log("Lista de productos:");
    carritoDeCompras.forEach((producto) => {
        console.log(`Producto: ${producto.nombre}\nPrecio: $${producto.precio}\nImgUrl: ${producto.imgSrc}\nCantidad: ${producto.cantidad}`);
        cardBody.appendChild(divProducto(producto));
    });
    cardFooter.appendChild(pPrecioTotalProductos(carritoDeCompras));
} else{
    console.log("¡Lista de compras vacío!");
    cardBody.appendChild(sinProductos());
    btnComprar.classList.add("hidden");
    btnLimpiarCarrito.classList.add("hidden");
}

btnVolver.addEventListener("click", () => {
    window.location.href = "./index.html";
});

btnLimpiarCarrito.addEventListener("click", () => {
    /*
        ¡RECOMIENDO PREGUNTAR ANTES DE ELIMINAR!
        
        CON UN CONFIRM O LO QUE SE PREFIERA
    */
    carritoDeCompras.length = 0;
    localStorage.setItem("lista-compras", JSON.stringify(carritoDeCompras));
    alert("Carrito de compras eliminado");
    window.location.href = "./compra.html";
});

btnComprar.addEventListener("click", () =>{
    alert("Aca redigir a la página con la información de pago (formulario para enviar a FormSpree)");
})