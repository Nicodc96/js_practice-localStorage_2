const carritoDeCompras = JSON.parse(localStorage.getItem("lista-compras")) || []; // Refencia a la lista del localStorage

/* 
    Esto es sólo para la consola, y para tener una guía.
    Cuando se tenga que entregar, se debe eliminar.
*/
if (carritoDeCompras.length > 0){
    console.log("Lista de productos:");
    carritoDeCompras.forEach((producto) => {
        console.log(`Producto: ${producto.nombre}\nPrecio: $${producto.precio}\nImgUrl: ${producto.imgSrc}\nCantidad: ${producto.cantidad}`);
    })
} else{
    console.log("¡Lista de compras vacío!");
}

// -----------------------------------------------------

/* 
    Creo un objeto que tenga atributos nombre, precio, un string que guarda
    el nombre de la imagen local para usar como 'src' en <img> más tarde.
    Además le agrego un atributo cantidad = 1 para aclarar que se agrega un
    producto del seleccionado.
*/
const crearObjetoProducto = (nombre, precio, strImagen) => new Object({
    nombre: nombre,
    precio: precio,
    imgSrc: strImagen,
    cantidad: 1
});

window.addEventListener("click", (e) => {
    // El e.target.matches() sirve para encontrar el primer elemento del DOM que tenga la class="btn-agregar-producto"
    if (e.target.matches(".btn-agregar-producto")){
        /*
            Lo que guardo en cardActual es una referencia.
            Básicamente cuando hago click en el botón 'Agregar' de
            alguna de las cards, me guardo la referencia del
            <div class="card"> en cual hice click.

            Es libre de investigar más acerca de 
            - parentNode
        */
        const cardActual = e.target.parentNode.parentNode;
        /*
            Esto es la referencia al <div class="added">
            que tiene un SVG y un texto que le indica al
            usuario que se agregó un producto de ese
            tipo al carrito

            Es libre de investigar más acerca de:
            - nextElementSibling
        */
        const divAgregado = e.target.nextElementSibling;
        /*
            Esto es lo que simula el efecto de aparecer y
            desaparecer el "¡Agregado!" al agregar un
            producto del tipo seleccionado

            Es libre de investigar más acerca de:
            - setTimeOut()
        */
        divAgregado.style.opacity = 1;
        setTimeout(() => {
            divAgregado.style.opacity = 0;
        }, 2000);

        /*
            Primero verifico si la lista de compras del localStorage no
            está vacío. Si está vacío o no existe un producto del tipo
            que se quiere agregar en la lista, hago un push a la lista
            del carrito de compras (de la línea 1) utilizando una
            función que desarrollé llamado crearObjetoProducto() (línea 24)

            Si existe en la lista (lo verifico por el nombre), no vuelvo a
            agregar un elemento igual con cantidad = 1. En su lugar, busco el
            elemento en la lista, y le sumo +1 a su atributo propiedad.

            Finalmente uso una bandera (flag) para indicar que existe ese
            producto en la lista y no se debe agregar uno nuevo luego.
        */
        let existente = false;
        if (carritoDeCompras.length > 0){
            carritoDeCompras.forEach((producto) => {
                if (producto.nombre == cardActual.children[0].firstElementChild.textContent){
                    producto.cantidad += 1;
                    existente = true;
                }
            });
        }    
        if (!existente){
            carritoDeCompras.push(crearObjetoProducto(cardActual.children[0].firstElementChild.textContent,
                Number(cardActual.children[1].lastElementChild.textContent.split("$")[1]),
                cardActual.children[1].firstElementChild.children[0].src.split("img")[1]
            ));
        }    
        
        // Finalmente, guardo en el localStorage los cambios realizados
        localStorage.setItem("lista-compras", JSON.stringify(carritoDeCompras));
        
        // Nombre del producto
        // cardActual.children[0].firstElementChild.textContent
        // Precio
        // Number(cardActual.children[1].lastElementChild.textContent.split("$")[1])
        // url imagen
        // cardActual.children[1].firstElementChild.children[0].src.split("img")[1]
    }
});

// Acá redirijo a la página del carrtito de compras al hacer click en el botón 'Ir al carrito'
document.querySelector("#btnCarrito").addEventListener("click", () => {
    window.location.href = "./compra.html";
})