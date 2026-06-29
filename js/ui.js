export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.textContent = total;
  }
};

export const mostrarMensaje = (texto, producto = null) => {
  const mensaje = document.createElement("div");
  mensaje.classList.add("mensaje-toast");

  if (producto) {
    mensaje.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}" />
      <p>${texto} <strong>${producto.nombre}</strong></p>
    `;
  } else {
    mensaje.textContent = texto;
  }

  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 2000);
};

export const formatearPrecio = (precio) => {
  return precio.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });
};
