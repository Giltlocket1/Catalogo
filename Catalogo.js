class Catalogo {
    #peliculas = [];
    #inputTituloPelicula = document.querySelector('#movieTitle');
    #inputImagenPelicula = document.querySelector('#movieImage');
    #botonAgregarPelicula = document.querySelector('#addMovieBtn');
    #listaPeliculas = document.querySelector('#movieList');

    constructor() {
        // Configurar el evento para el botón de agregar película
        this.#botonAgregarPelicula.addEventListener('click', () => {
            this.#agregarPelicula(this.#inputTituloPelicula.value.trim(), this.#inputImagenPelicula.value.trim());
            this.#inputTituloPelicula.value = '';
            this.#inputImagenPelicula.value = '';
        });
    }

    // Método para agregar una película al catálogo
    #agregarPelicula(titulo, imagen) {
        if (!titulo || !imagen) {
            if (!titulo) {
                this.#inputTituloPelicula.classList.add('is-invalid');
            }
            if (!imagen) {
                this.#inputImagenPelicula.classList.add('is-invalid');
            }
            return; // No agregar la película si faltan campos
        }

        // Limpiar clases de error si los campos están llenos
        this.#inputTituloPelicula.classList.remove('is-invalid');
        this.#inputImagenPelicula.classList.remove('is-invalid');

        this.#peliculas.push({ titulo, imagen });
        this.#actualizarLista();
        // Limpiar campos después de agregar la película
        this.#inputTituloPelicula.value = '';
        this.#inputImagenPelicula.value = '';
    }
    // Método para eliminar una película del catálogo
    #eliminarPelicula(index) {
        this.#peliculas.splice(index, 1);
        this.#actualizarLista();
    }

    // Método para editar una película en el catálogo
    #editarPelicula(index) {
        const nuevoTitulo = prompt("Editar título de la película:", this.#peliculas[index].titulo);
        const nuevaImagen = prompt("Editar URL de la imagen de la película:", this.#peliculas[index].imagen);
        if (nuevoTitulo !== null && nuevoTitulo.trim() !== "" && nuevaImagen !== null && nuevaImagen.trim() !== "") {
            this.#peliculas[index] = { titulo: nuevoTitulo.trim(), imagen: nuevaImagen.trim() };
            this.#actualizarLista();
        }
    }

    // Método para actualizar la lista de películas en la página
    #actualizarLista() {
        this.#listaPeliculas.innerHTML = '';
        this.#peliculas.map((pelicula, index) => {
            const elementoLista = this.#crearElementoLista(pelicula, index);
            this.#listaPeliculas.appendChild(elementoLista);
        });
    }

    // Método para crear un elemento de lista para cada película
    #crearElementoLista(pelicula, index) {
        const elementoLista = document.createElement('li');
        elementoLista.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const contenedorDetalles = document.createElement('div');
        contenedorDetalles.className = 'd-flex align-items-center';

        const imagen = document.createElement('img');
        imagen.src = pelicula.imagen;
        imagen.alt = pelicula.titulo;
        imagen.className = 'img-thumbnail me-3';
        imagen.style.width = '100px';

        const titulo = document.createElement('span');
        titulo.textContent = pelicula.titulo;

        contenedorDetalles.appendChild(imagen);
        contenedorDetalles.appendChild(titulo);

        const contenedorBotones = document.createElement('div');

        const botonEditar = this.#crearBotonEditar(index);
        contenedorBotones.appendChild(botonEditar);

        const botonEliminar = this.#crearBotonEliminar(index);
        contenedorBotones.appendChild(botonEliminar);

        elementoLista.appendChild(contenedorDetalles);
        elementoLista.appendChild(contenedorBotones);

        return elementoLista;
    }

    // Método para crear un botón de eliminar para cada película
    #crearBotonEliminar(index) {
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btn btn-danger btn-sm me-2';
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => this.#eliminarPelicula(index);

        return botonEliminar;
    }

    // Método para crear un botón de editar para cada película
    #crearBotonEditar(index) {
        const botonEditar = document.createElement('button');
        botonEditar.className = 'btn btn-warning btn-sm me-2';
        botonEditar.textContent = 'Editar';
        botonEditar.onclick = () => this.#editarPelicula(index);

        return botonEditar;
    }
}

// Crear una instancia del catálogo cuando el contenido de la página esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new Catalogo();
});
