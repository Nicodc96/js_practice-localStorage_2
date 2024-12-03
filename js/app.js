const carritoDeCompras = JSON.parse(localStorage.getItem("lista-compras")) || [];
// import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.14.4/src/sweetalert2.js';

if (carritoDeCompras.length > 0){
    console.log("Lista de productos:");
    carritoDeCompras.forEach((producto) => {
        console.log(`Producto: ${producto.nombre}\nPrecio: $${producto.precio}\nImgUrl: ${producto.imgSrc}\nCantidad: ${producto.cantidad}`);
    })
} else{
    console.log("¡Lista de compras vacío!");
}

const crearObjetoProducto = (nombre, precio, strImagen) => new Object({
    nombre: nombre,
    precio: precio,
    imgSrc: strImagen,
    cantidad: 1
});


window.addEventListener("click", (e) => {
    if (e.target.matches(".btn-agregar-producto")){
        const cardActual = e.target.parentNode.parentNode;
        const divAgregado = e.target.nextElementSibling;
        divAgregado.style.opacity = 1;
        setTimeout(() => {
            divAgregado.style.opacity = 0;
        }, 2000);
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
        
        localStorage.setItem("lista-compras", JSON.stringify(carritoDeCompras));
        
        // Nombre del producto
        // cardActual.children[0].firstElementChild.textContent
        // Precio
        // Number(cardActual.children[1].lastElementChild.textContent.split("$")[1])
        // url imagen
        // cardActual.children[1].firstElementChild.children[0].src.split("img")[1]
    }
});

document.querySelector("#btnCarrito").addEventListener("click", () => {
    window.location.href = "./compra.html";
})