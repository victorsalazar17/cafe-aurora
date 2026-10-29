// Número de WhatsApp.
const NUMERO_WHATSAPP = "573242483479";

// Filtra las tarjetas por la categoría y mantiene actualizado el estado accesible del botón.
function filtrarProductos(categoria) {
  // data-category en cada tarjeta permite comparar su categoría con el filtro elegido.
  const productos = document.querySelectorAll(".producto-item");
  productos.forEach((producto) => {
    const coincide =
      categoria === "todos" || producto.dataset.category === categoria;
    producto.hidden = !coincide;
  });

  // También actualiza la apariencia y el estado accesible de los botones.
  document.querySelectorAll(".filter-btn").forEach((boton) => {
    const seleccionado = boton.dataset.filter === categoria;
    boton.classList.toggle("active", seleccionado);
    boton.setAttribute("aria-pressed", String(seleccionado));
  });
}

// Los eventos conectan los clics del usuario con las funciones anteriores.
document.querySelectorAll(".filter-btn").forEach((boton) => {
  boton.addEventListener("click", () => filtrarProductos(boton.dataset.filter));
});