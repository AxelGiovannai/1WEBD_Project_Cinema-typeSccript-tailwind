import { TMDB_API_KEY } from '../../auth/auth';

interface MovieDetails {
    title: string;
    poster_path: string;
    overview: string;
    id: number;
  }
  

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  
  if (movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  
    fetch(url)
      .then(response => response.json())
      .then((movie: MovieDetails) => {
        const movieDetailsHTML = `
          <h2>${movie.title}</h2>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <p>${movie.overview}</p>
        `;
  
        const movieDetails = document.getElementById('movie-details');
        if (movieDetails) {
          movieDetails.innerHTML = movieDetailsHTML;
        } else {
          console.error('Element with id "movie-details" not found');
        }
      })
      .catch(error => console.error(error));
  } else {
    console.error('No movie id found in the URL');
  }