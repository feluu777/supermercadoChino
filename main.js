document.addEventListener("DOMContentLoaded", () => {
  const productos = [
    // FRUTAS
    { nombre: "Pera", categoria: "frutasYVerduras", img: "imgs/pera.jpg" },
    { nombre: "Manzana", categoria: "frutasYVerduras", img: "imgs/manzana.jpg" },
    { nombre: "Banana", categoria: "frutasYVerduras", img: "imgs/banana.jpg" },

    // LÁCTEOS
    { nombre: "Queso Cheddar", categoria: "lacteos", img: "imgs/cheddar.jpg" },
    { nombre: "Yogurt", categoria: "lacteos", img: "imgs/yogurt.jpg" },
    { nombre: "Manteca", categoria: "lacteos", img: "imgs/manteca.jpg" },

    // CARNES Y PESCADOS
    { nombre: "Salmón", categoria: "carnesYPescados", img: "imgs/salmon.jpg" },
    { nombre: "Vacío", categoria: "carnesYPescados", img: "imgs/vacio.jpg" },
    { nombre: "Peceto", categoria: "carnesYPescados", img: "imgs/peceto.jpg" },

    // BEBIDAS
    { nombre: "Manaos de Uva", categoria: "bebidas", img: "imgs/manaosUva.jpg" },
    { nombre: "Cerveza", categoria: "bebidas", img: "imgs/cerveza.jpg" },
    { nombre: "Chocolatada", categoria: "bebidas", img: "imgs/chocolatad.jpg" },

    // PANADERÍA
    { nombre: "Medialuna", categoria: "panaderia", img: "imgs/medialuna.jpg" },
    { nombre: "Chipá", categoria: "panaderia", img: "imgs/chipa.jpg" },
    { nombre: "Donas", categoria: "panaderia", img: "imgs/donas.jpg" },

    // LIMPIEZA
    { nombre: "Detergente", categoria: "limpieza", img: "imgs/detergente.jpg" },
    { nombre: "Escoba", categoria: "limpieza", img: "imgs/escoba.png" },
    { nombre: "Esponja", categoria: "limpieza", img: "imgs/esponja.jpg" }
  ];

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const botones = document.querySelectorAll(".buttons-categorias button");
  const contenedor = document.querySelector("#contenedor-productos");
  document.querySelector('[data-categoria="todos"]').click();

  botones.forEach(button => {
    button.addEventListener("click", () => {
      botones.forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      const categoria = button.dataset.categoria;

      const filtrados =
        categoria === "todos"
          ? productos
          : productos.filter(p => p.categoria === categoria);

      contenedor.innerHTML = "";
      filtrados.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("producto");

        const img = document.createElement("img");
        img.src = p.img;

        const nombre = document.createElement("p");
        nombre.textContent = p.nombre;

        const btnCarrito = document.createElement("button");
        btnCarrito.textContent = "Agregar al carrito";
        btnCarrito.classList.add("btn-carrito");
        btnCarrito.addEventListener("click", () => agregarAlCarrito(p.nombre));

        div.appendChild(img);
        div.appendChild(nombre);
        div.appendChild(btnCarrito);
        contenedor.appendChild(div);
      });
    });
  });

  document.querySelector('[data-categoria="todos"]').click();

  const buscador = document.getElementById("buscador");

  buscador.addEventListener("input", () => {
    const valorBuscador = buscador.value.toLowerCase();
    let productosFiltrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(valorBuscador)
    );

    contenedor.innerHTML = "";
    if (productosFiltrados.length === 0) {
      const mensaje = document.createElement("p");
      mensaje.textContent = "No se encontraron productos.";
      mensaje.classList.add("mensaje-no-productos");
      contenedor.appendChild(mensaje);
    } else {
      productosFiltrados.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        const img = document.createElement("img");
        img.src = producto.img;

        const nombre = document.createElement("p");
        nombre.textContent = producto.nombre;

        div.appendChild(img);
        div.appendChild(nombre);
        contenedor.appendChild(div);
      });
    }
  });

  function agregarAlCarrito(nombre) {
    const producto = productos.find(producto => producto.nombre === nombre);
    const productoEnCarrito = carrito.find(producto => producto.nombre === nombre);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  const btnAbrirCarrito = document.getElementById("abrir-carrito");
  btnAbrirCarrito.addEventListener("click", abrirSidenavCarrito);

  function abrirSidenavCarrito() {
    document.getElementById("sidenav-carrito").classList.add("abierto");
    document.getElementById("overlay-carrito").classList.add("abierto");
    btnAbrirCarrito.style.display = "none";
    renderizarCarrito();
  }

  window.cerrarSidenavCarrito = function() {
    document.getElementById("sidenav-carrito").classList.remove("abierto");
    document.getElementById("overlay-carrito").classList.remove("abierto");
    btnAbrirCarrito.style.display = "block";
  }

  function renderizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";

    if (carrito.length === 0) {
      lista.innerHTML = "<li>El carrito está vacío.</li>";
      return;
    } else {
      carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} x${producto.cantidad}`;
        lista.appendChild(li);
      });
    }
  }
});
