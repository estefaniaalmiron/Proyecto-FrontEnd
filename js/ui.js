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

  const icono = document.createElement("i");
  icono.classList.add("fa-solid");

  if (texto.includes("Agregaste")) {
    icono.classList.add("fa-circle-check");
  } else if (texto.includes("Eliminaste")) {
    icono.classList.add("fa-trash");
  } else if (texto.includes("vaciado")) {
    icono.classList.add("fa-solid", "fa-broom");
  }

  mensaje.appendChild(icono);

  if (producto) {
    const img = document.createElement("img");
    img.src = producto.img;
    img.alt = producto.nombre;

    const p = document.createElement("p");
    p.innerHTML = `${texto} <strong>${producto.nombre}</strong>`;

    mensaje.appendChild(img);
    mensaje.appendChild(p);
  } else {
    const p = document.createElement("p");
    p.textContent = texto;
    mensaje.appendChild(p);
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
