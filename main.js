document.addEventListener("DOMContentLoaded", () =>{
const productos = [
  //FRUTAS
  { nombre: "Pera", categoria: "frutasYVerduras", img:"imgs/pera.jpg"},
  { nombre: "Manzana", categoria: "frutasYVerduras", img:"imgs/manzana.jpg" },
  { nombre: "Banana", categoria: "frutasYVerduras", img:"imgs/banana.jpg" },

  //LÁCTEOS
  { nombre: "Queso Cheddar", categoria: "lacteos", img:"imgs/cheddar.jpg" },
  { nombre: "Yogurt", categoria: "lacteos", img:"imgs/yogurt.jpg" },
  { nombre: "Manteca", categoria: "lacteos", img:"imgs/manteca.jpg" },

  //CARNES Y PESCADOS
  { nombre: "Salmón", categoria: "carnesYPescados", img:"imgs/salmon.jpg" },
  { nombre: "Vacío", categoria: "carnesYPescados", img:"imgs/vacio.jpg" },
  { nombre: "Peceto", categoria: "carnesYPescados", img:"imgs/peceto.jpg" },

  //BEBIDAS
  { nombre: "Manaos de Uva", categoria: "bebidas", img:"imgs/manaosUva.jpg"  },
  { nombre: "Cerveza", categoria: "bebidas", img:"imgs/cerveza.jpg" },
  { nombre: "Chocolatada", categoria: "bebidas", img:"imgs/chocolatad.jpg" },

  //PANADERÍA
  { nombre: "Medialuna", categoria: "panaderia", img:"imgs/medialuna.jpg" },
  { nombre: "Chipá", categoria: "panaderia", img:"imgs/chipa.jpg" },
  { nombre: "Donas", categoria: "panaderia", img:"imgs/donas.jpg" },

  //LIMPIEZA
  { nombre: "Detergente", categoria: "limpieza", img:"imgs/detergente.jpg" },
  { nombre: "Escoba", categoria: "limpieza", img:"imgs/escoba.png" },
  { nombre: "Esponja", categoria: "limpieza", img:"imgs/esponja.jpg" }
];




// Seleccionamos botones y contenedor
const botones = document.querySelectorAll(".buttons-categorias button");
const contenedor = document.querySelector("#contenedor-productos");
document.querySelector('[data-categoria="todos"]').click();

// Escuchar clicks
botones.forEach(button => {
  button.addEventListener("click", () => {
    // Manejo de clase "active"
    botones.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    // Obtener categoría
    const categoria = button.dataset.categoria;

    // Filtrar productos
    const filtrados =
      categoria === "todos"
        ? productos
        : productos.filter(p => p.categoria === categoria);

    // Renderizar productos en el contenedor
    contenedor.innerHTML = "";
    filtrados.forEach(p => {
  const div = document.createElement("div");
  div.classList.add("producto");

  const img = document.createElement("img");
  img.src = p.img;

  const nombre = document.createElement("p");
  nombre.textContent = p.nombre;

  div.appendChild(img);
  div.appendChild(nombre);
  contenedor.appendChild(div);
});
  });
});
  document.querySelector('[data-categoria="todos"]').click();
})

