import '../src/style.css';

interface Movie {
    title: string;
    poster_path: string;
    overview: string;
    id: number;
  }


const url = "https://api.themoviedb.org/3/trending/movie/week?api_key=5f25c2d9763fcaf6baba5ecad2781305";
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies: Movie[] = data.results;
      let moviesHTML = '';
  
      movies.forEach(movie => {
        moviesHTML += `
          <div class=" " >
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.overview}</p>
            <a href="../movie/movie.html?id=${movie.id}">Voir plus</a>
          </div>
        `;
      });
  
      const moviesList = document.getElementById('movies-list');
      if (moviesList) {
        moviesList.innerHTML = moviesHTML;
      } else {
        console.error('Element with id "movies-list" not found');
      }
    })
    .catch(error => console.error(error));