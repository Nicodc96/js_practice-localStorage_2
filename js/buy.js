const carritoDeCompras = JSON.parse(localStorage.getItem("lista-compras")) || []; // Lista del localStorage
const cardBody = document.querySelector(".card-body"); // Referencia al div class="card-body"
const cardFooter = document.querySelector(".card-footer"); // Referencia al div class="card-footer"
const btnComprar = document.querySelector(".btn-agregar-producto"); // Referencia al boton 'Comprar'
const btnLimpiarCarrito = document.querySelector(".btn-limpiar-carrito"); // Referencia al boton 'Limpiar carrito'
const btnVolver = document.querySelector("#btnVolver"); // Referencia al botón 'Volver a productos'

const divProducto = (producto) => {
    /* Creo los divs contenedores y los uno según correspondan */
    const divContenedor = document.createElement("div");
    /*
        Lo que hago acá al momento de agregar un estilo CSS
        al elemento del DOM que acabo de crear es utilizar,
        en primer lugar, la función add() del array del tipo
        DOMTokenList (investigar más si se desea) para agregar
        estilos al escribirlos como string.
        Luego, utilizo el 'spread operator' (investigar más si
        se desea) para desarmar un array de strings donde cada
        elemento del array es 1 estilo diferente.
        
        Esto hace que mi div quede así:
        <div class="producto mt-3"></div>
    */
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
    // Acá multiplico precio del producto * cantidad que se hayan solicitado
    spanPrecioProducto.textContent = `$${producto.precio*producto.cantidad}`;

    pPrecioProducto.appendChild(spanPrecioProducto);

    divProductoDescripcion.appendChild(pDescProducto);
    divProductoDescripcion.appendChild(pPrecioProducto);

    /* Creo el elemento 'img' que contendrá la imagen de referencia de los productos agregados */
    const imgProducto = document.createElement("img");
    // Acá utilizo el nombre de la imagen que guardé en mi objeto producto
    imgProducto.src = `./img${producto.imgSrc}`;
    imgProducto.classList.add("tiny-image");
    imgProducto.alt = producto.nombre; // Agrego un 'alt' (importante para las <img>)

    divProductoImagen.appendChild(imgProducto);

    /* 
        Finalmente devuelvo el contenedor con todo el div armado.
        Para una vista a modo de ejemplo de lo que
        se uniría al <div class='card-body'> sería algo como esto:

        <div class="producto">
            <div class="producto-descripcion">
                <p class="font-semibold">(x1) Mate rústico c/ bombilla</p>
                <p class="mt-5 font-semibold text-l">Precio: <span class="text-green-700">$47599</span></p>
            </div>
            <div class="producto-image">
                <img src="./img/mate-rustico.webp" alt="productoEjemplo" class="tiny-image">
            </div>
        </div>

        Por cada producto distinto que se haya agregado al localStorage
    */
    return divContenedor;
}

/*
    Acá simplemente creo un elemento 'p' para
    calcular el precio total de todos los
    productos y devolver algo como:
    <p class="font-semibold">Total: $5000</p>
*/
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

/*
    En caso de que no existan productos en el array
    del localStorage, lo que hago es crear un 'p'
    que mostrará el mensaje '¡Carrito vacío!'.
*/
const sinProductos = () => {
    const textNoProductos = document.createElement("p");
    textNoProductos.textContent = "¡Carrito vacío!";
    textNoProductos.classList.add(...["text-center", "text-l", "font-semibold"]);
    return textNoProductos;
}

/*
    Acá muestro, en compra.html, los productos
    y sus respectivas cantidades y precios en el
    <div class="card-body">. Cada producto distinto
    será un nuevo <div class="producto"> y se unirá
    uno abajo del otro.

    Utilizo funciones para realizar esta lógica, que
    no es más que delegación de tareas y para que se
    vea más claramente el proceso. Cada appendChild()
    recibe un Element.

    Finalmente y a modo de detalle, utilizo la class de CSS
    de Tailwind '.hidden' para ocultar los botones de
    'Comprar' y 'Limpiar carrito' cuando este se encuentre
    vacío.
*/
if (carritoDeCompras.length > 0){
    carritoDeCompras.forEach((producto) => {
        cardBody.appendChild(divProducto(producto));
    });
    cardFooter.appendChild(pPrecioTotalProductos(carritoDeCompras));
} else{
    cardBody.appendChild(sinProductos());
    btnComprar.classList.add("hidden");
    btnLimpiarCarrito.classList.add("hidden");
}

// Redirección al index
btnVolver.addEventListener("click", () => {
    window.location.href = "./index.html";
});

/*
    Al hacer click en el botón 'Limpiar Carrito'
    lo que hago es agarrar mi lista de productos
    del localStorage y setar su tamaño (lenght)
    a 0. Esto, en JS, es una forma de vacíar el
    array (¡MAGIA!).
    Finalmente guardo la nueva lista vacía en el
    localStorage dando a entender que se limpió.
*/
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

/*
    Botón de comprar, utilizar para redigirse a
    otra página o sección que contendrá el formulario
    a completar y para enviar a FormSpree.
*/
btnComprar.addEventListener("click", () =>{
    alert("Aca redigir a la página con la información de pago (formulario para enviar a FormSpree)");
})