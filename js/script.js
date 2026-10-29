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

// Abre WhatsApp con un mensaje que incluye el nombre del producto consultado.
function consultarPorWhatsApp(nombreProducto) {
  if (!NUMERO_WHATSAPP) {
    mostrarAviso(
      "Configura el número autorizado de WhatsApp en js/script.js para habilitar las consultas.",
    );
    return;
  }
  const texto = `Hola, quisiera más información sobre ${nombreProducto}.`;
  // Codifica espacios y tildes para que el mensaje se pueda usar dentro de una dirección web.
  const enlace = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
  window.open(enlace, "_blank", "noopener,noreferrer");
}

function mostrarAviso(texto) {
  const aviso = document.getElementById("avisoWhatsApp");
  aviso.textContent = texto;
  aviso.classList.add("show");
  // Después de unos segundos, oculta el aviso quitando la clase que lo muestra.
  window.setTimeout(() => aviso.classList.remove("show"), 4200);
}

// Los eventos conectan los clics del usuario con las funciones anteriores.
document.querySelectorAll(".filter-btn").forEach((boton) => {
  boton.addEventListener("click", () => filtrarProductos(boton.dataset.filter));
});

document.querySelectorAll(".btn-whatsapp").forEach((boton) => {
  boton.addEventListener("click", () =>
    consultarPorWhatsApp(boton.dataset.producto),
  );
});

document
  .querySelector("[data-whatsapp-general]")
  .addEventListener("click", (evento) => {
    evento.preventDefault();
    consultarPorWhatsApp("un producto de Café Aurora");
  });

// Bootstrap puede dejar abierto el desplegable tras navegar; aquí se cierra al elegir una sección.
document.querySelectorAll("#menuPrincipal .nav-link").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    const menu = document.getElementById("menuPrincipal");
    if (menu.classList.contains("show"))
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});