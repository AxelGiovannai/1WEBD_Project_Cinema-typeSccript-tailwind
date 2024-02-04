import '../../style.css';

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
          <div class="mb-4 mt-4 ml-4 mr-4 text-center text-2xl font-bold text-blue-500">
            <h2>${movie.title}</h2>
            </div>
            <div class="flex justify-center">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" id="moviePoster">
            </div>
            <div class="mt-8">
            <p class="flex justify-center text-lg">${movie.overview}</p>
            </div>
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