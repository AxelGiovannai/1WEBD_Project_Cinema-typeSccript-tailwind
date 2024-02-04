import { TMDB_API_KEY } from '../../auth/auth';

interface MovieDetails {
  title: string;
  poster_path: string;
  overview: string;
  id: number;
  comments: string;
}

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  const commentsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`;

  Promise.all([fetch(movieUrl), fetch(commentsUrl)])
    .then(([movieResponse, commentsResponse]) => Promise.all([movieResponse.json(), commentsResponse.json()]))
    .then(([movie, comments]) => {
      const movieDetailsHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <p>${movie.overview}</p>
      `;

      const commentsHTML = comments.results.map((comment: any) => `
        <div>
          <h3>${comment.author}</h3>
          <p>${comment.content}</p>
        </div>
      `).join('');

      const movieDetails = document.getElementById('movie-details');
      const commentsContainer = document.getElementById('comments-container');

      if (movieDetails) {
        movieDetails.innerHTML = movieDetailsHTML;
      } else {
        console.error('Element with id "movie-details" not found');
      }

      if (commentsContainer) {
        commentsContainer.innerHTML = commentsHTML;
      } else {
        console.error('Element with id "comments-container" not found');
      }
    })
    .catch(error => console.error(error));
} else {
  console.error('No movie id found in the URL');
}
