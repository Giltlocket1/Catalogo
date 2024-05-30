class Catalogo {
    #peliculas = [];
    #inputTituloPelicula = document.querySelector('#movieTitle');
    #inputImagenPelicula = document.querySelector('#movieImage');
    #inputDescripcionPelicula = document.querySelector('#movieDescription');
    #inputAnoPelicula = document.querySelector('#movieYear');
    #botonAgregarPelicula = document.querySelector('#addMovieBtn');
    #listaPeliculas = document.querySelector('#movieList');

    constructor() {
        // Configurar el evento para el botón de agregar película
        this.#botonAgregarPelicula.addEventListener('click', () => {
            this.#agregarPelicula(
                this.#inputTituloPelicula.value.trim(),
                this.#inputImagenPelicula.value.trim(),
                this.#inputDescripcionPelicula.value.trim(),
                this.#inputAnoPelicula.value.trim()
            );
        });
    }

    // Método para agregar una película al catálogo
    #agregarPelicula(titulo, imagen, descripcion, ano) {
        let camposValidos = true;
        
        if (!titulo) {
            this.#inputTituloPelicula.classList.add('is-invalid');
            camposValidos = false;
        } else {
            this.#inputTituloPelicula.classList.remove('is-invalid');
        }

        if (!imagen) {
            this.#inputImagenPelicula.classList.add('is-invalid');
            camposValidos = false;
        } else {
            this.#inputImagenPelicula.classList.remove('is-invalid');
        }

        if (!descripcion) {
            this.#inputDescripcionPelicula.classList.add('is-invalid');
            camposValidos = false;
        } else {
            this.#inputDescripcionPelicula.classList.remove('is-invalid');
        }

        if (!ano) {
            this.#inputAnoPelicula.classList.add('is-invalid');
            camposValidos = false;
        } else {
            this.#inputAnoPelicula.classList.remove('is-invalid');
        }

        if (!camposValidos) return;

        this.#peliculas.push({ titulo, imagen, descripcion, ano });
        this.#actualizarLista();
        this.#inputTituloPelicula.value = '';
        this.#inputImagenPelicula.value = '';
        this.#inputDescripcionPelicula.value = '';
        this.#inputAnoPelicula.value = '';
    }

    // Método para eliminar una película del catálogo
    #eliminarPelicula(index) {
        this.#peliculas.splice(index, 1);
        this.#actualizarLista();
    }

    // Método para editar una película en el catálogo
    #editarPelicula(index) {
        const nuevaTitulo = prompt("Editar título de la película:", this.#peliculas[index].titulo);
        const nuevaImagen = prompt("Editar URL de la imagen de la película:", this.#peliculas[index].imagen);
        const nuevaDescripcion = prompt("Editar descripción de la película:", this.#peliculas[index].descripcion);
        const nuevoAno = prompt("Editar año de la película:", this.#peliculas[index].ano);
        
        if (nuevaTitulo !== null && nuevaTitulo.trim() !== "" && nuevaImagen !== null && nuevaImagen.trim() !== "" && nuevaDescripcion !== null && nuevaDescripcion.trim() !== "" && nuevoAno !== null && nuevoAno.trim() !== "") {
            this.#peliculas[index] = { titulo: nuevaTitulo.trim(), imagen: nuevaImagen.trim(), descripcion: nuevaDescripcion.trim(), ano: nuevoAno.trim() };
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

        const titulo = document.createElement('span');
        titulo.innerHTML = `<strong>${pelicula.titulo}</strong><br><small>${pelicula.descripcion}</small><br><em>${pelicula.ano}</em>`;

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
        botonEditar.className = 'btn btn-secondary btn-sm';
        botonEditar.textContent = 'Editar';
        botonEditar.onclick = () => this.#editarPelicula(index);

        return botonEditar;
    }
}

// Crear una instancia de la clase Catalogo cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new Catalogo();
});
