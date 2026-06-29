import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();

  const existe = carrito.find((p) => p.id === producto.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Agregaste:", producto);
};

export const aumentarCantidad = (indice) => {
  const carrito = obtenerCarrito();
  carrito[indice].cantidad += 1;
  guardarCarrito(carrito);
  actualizarContador(carrito);
};

export const disminuirCantidad = (indice) => {
  const carrito = obtenerCarrito();
  if (carrito[indice].cantidad > 1) {
    carrito[indice].cantidad -= 1;
    guardarCarrito(carrito);
    actualizarContador(carrito);
  }
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  const producto = carrito[indice];

  if (producto.cantidad > 1) {
    producto.cantidad -= 1;
  } else {
    carrito.splice(indice, 1);
  }

  const productoParaToast = {
    ...producto,
    img: `../${producto.img}`,
  };

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Eliminaste:", productoParaToast);
};
export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContador([]);
  mostrarMensaje("Carrito vaciado");
};
