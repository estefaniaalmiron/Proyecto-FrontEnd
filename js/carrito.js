import { obtenerCarrito } from "./storage.js";
import {
  eliminarProducto,
  vaciarCarrito,
  aumentarCantidad,
  disminuirCantidad,
} from "./funcionesCarrito.js";
import { actualizarContador, mostrarMensaje, formatearPrecio } from "./ui.js";

const calcularTotal = (carrito) => {
  return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
};

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");
  const totalEl = document.getElementById("total-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  const aside = document.querySelector(".resumen-carrito");

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");

    const icono = document.createElement("i");
    icono.classList.add("fa-solid", "fa-face-sad-tear");
    const texto = document.createElement("span");
    texto.textContent = " Tu carrito está vacío  ";
    mensaje.appendChild(icono);
    mensaje.appendChild(texto);

    contenedor.appendChild(mensaje);
    totalEl.textContent = formatearPrecio(0);
    aside.style.display = "none";
    return;
  }

  aside.style.display = "flex";

  carrito.forEach((producto, index) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card-carrito");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const info = document.createElement("div");
    info.classList.add("card-carrito-info");

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const precioUnit = document.createElement("p");
    precioUnit.textContent = `Precio: ${formatearPrecio(producto.precio)}`;

    const divCantidad = document.createElement("div");
    divCantidad.classList.add("card-carrito-cantidad");

    const btnMenos = document.createElement("button");
    btnMenos.classList.add("btn", "btn-cantidad");
    btnMenos.textContent = "-";
    btnMenos.addEventListener("click", () => {
      disminuirCantidad(index);
      renderizarCarrito();
    });

    const spanCantidad = document.createElement("span");
    spanCantidad.textContent = producto.cantidad;

    const btnMas = document.createElement("button");
    btnMas.classList.add("btn", "btn-cantidad");
    btnMas.textContent = "+";
    btnMas.addEventListener("click", () => {
      aumentarCantidad(index);
      renderizarCarrito();
    });

    const subtotal = document.createElement("p");
    subtotal.classList.add("card-carrito-subtotal");
    subtotal.textContent = `Subtotal: ${formatearPrecio(producto.precio * producto.cantidad)}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito();
    });

    divCantidad.appendChild(btnMenos);
    divCantidad.appendChild(spanCantidad);
    divCantidad.appendChild(btnMas);

    info.appendChild(nombre);
    info.appendChild(precioUnit);
    info.appendChild(divCantidad);
    info.appendChild(subtotal);
    info.appendChild(btnEliminar);

    tarjeta.appendChild(img);
    tarjeta.appendChild(info);

    contenedor.appendChild(tarjeta);
  });

  totalEl.textContent = formatearPrecio(calcularTotal(carrito));

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn", "btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
