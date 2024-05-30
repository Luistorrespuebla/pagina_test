document.addEventListener('DOMContentLoaded', () => {
    const catalogElement = document.getElementById('catalog');
    const movieForm = document.getElementById('movieForm');
    const movieIdInput = document.getElementById('movieId');
    const titleInput = document.getElementById('title');
    const yearInput = document.getElementById('year');

    const images = ['img/a.jpeg', 'img/b.jpeg', 'img/c.jpeg','img/d.jpeg', 'img/e.jpeg', 'img/f.jpeg', 'img/g.jpeg', 
    'img/h.jpeg', 'img/i.jpeg', 'img/j.jpeg', 'img/k.jpeg', 'img/l.jpeg', 'img/m.jpeg'];

    class catalogoPeliculas {
        #movies = [];

        addMovie(title, year) {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            const movie = { id: Date.now().toString(), title, year, image: randomImage };
            this.#movies.push(movie);
            this.displayMovies();
        }

        editMovie(id, title, year) {
            const movieIndex = this.#movies.findIndex(movie => movie.id === id);
            if (movieIndex > -1) {
                this.#movies[movieIndex].title = title;
                this.#movies[movieIndex].year = year;
                this.displayMovies();
            }
        }

        deleteMovie(id) {
            this.#movies = this.#movies.filter(movie => movie.id !== id);
            this.displayMovies();
        }

        getMovie(id) {
            return this.#movies.find(movie => movie.id === id);
        }

        displayMovies() {
            catalogElement.innerHTML = '';
            this.#movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('card');
                movieElement.innerHTML = `
                    <strong>${movie.title}</strong>
                    <p>${movie.year}</p>
                    <img src="${movie.image}" alt="${movie.title}">
                    <div class="actions">
                        <button type="button" class="btn btn-primary" onclick="editMovie('${movie.id}')">Editar</button>
                        <button type="button" class="btn btn-primary" onclick="deleteMovie('${movie.id}')">Eliminar</button>
                    </div>
                `;
                catalogElement.appendChild(movieElement);
            });
        }
    }

    const catalog = new catalogoPeliculas();

    movieForm.addEventListener('submit', event => {
        event.preventDefault();
        const id = movieIdInput.value;
        const title = titleInput.value;
        const year = yearInput.value;

        if (id) {
            catalog.editMovie(id, title, year);
        } else {
            catalog.addMovie(title, year);
        }

        movieForm.reset();
        movieIdInput.value = '';
    });

    window.editMovie = (id) => {
        const movie = catalog.getMovie(id);
        if (movie) {
            movieIdInput.value = movie.id;
            titleInput.value = movie.title;
            yearInput.value = movie.year;
        }
    };

    window.deleteMovie = (id) => {
        catalog.deleteMovie(id);
    };
});
