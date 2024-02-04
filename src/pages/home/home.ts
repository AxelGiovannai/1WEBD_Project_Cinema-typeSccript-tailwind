import '../../style.css';

interface Movie {
    title: string;
    poster_path: string;
    overview: string;
    id: number;
  }


const url = "https://api.themoviedb.org/3/movie/popular?api_key=5f25c2d9763fcaf6baba5ecad2781305";
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies: Movie[] = data.results;
      
      let moviesHTML = '';

      movies.forEach(movie => {
        let overview = movie.overview;
        if (overview.length > 250) {
          overview = overview.substring(0, 250) + '...';
        }

        moviesHTML += `
          <div class="relative max-w-md mx-auto bg-white shadow-md rounded mt-10">
            <div class="mt-8 text-center text-3xl font-bold text-blue-500">
              <h2>${movie.title}</h2>
            </div>
            <div class="flex justify-center mt-8">
              <img class="w-50-h-50" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" id="moviePoster">
            </div>
            <div class="mt-10 text-center mr-10 ml-10 mb-32">
              <p class="text-lg">${overview}</p>
            </div>
            <div class="bg-blue-500 text-white font-bold py-2 ml-32 mr-32 rounded absolute bottom-5 left-0 right-0 mx-4 mb-6 mt-18">
              <a href="../movie/movie.html?id=${movie.id}">Voir plus</a>
            </div>
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
    
