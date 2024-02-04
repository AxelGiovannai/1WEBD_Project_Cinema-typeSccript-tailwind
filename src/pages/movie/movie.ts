import { TMDB_API_KEY } from '../../auth/auth';

interface MovieDetails {
  title: string;
  poster_path: string;
  overview: string;
  id: number;
}

interface MovieReview {
  author: string;
  content: string;
  id: string;
  url: string;
}

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`;

  fetch(movieUrl)
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

  // Fetch reviews for the movie
  fetch(reviewsUrl)
    .then(response => response.json())
    .then(data => {
      const reviews = data.results as MovieReview[];
      let reviewsHTML = '<h3>Reviews</h3>';

      if (reviews.length) {
        reviews.forEach(review => {
          reviewsHTML += `
            <div class="review">
              <p><strong>${review.author}</strong>: ${review.content}</p>
            </div>
          `;
        });
      } else {
        reviewsHTML += '<p>No reviews available.</p>';
      }

      const reviewsElement = document.getElementById('movie-reviews');
      if (reviewsElement) {
        reviewsElement.innerHTML = reviewsHTML;
      } else {
        console.error('Element with id "movie-reviews" not found');
      }
    })
    .catch(error => console.error('Error fetching reviews:', error));
} else {
  console.error('No movie id found in the URL');
}
/*const addMovieRating = (movieId, rating) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${TMDB_API_KEY}&session_id=${sessionId}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value: rating,
    }),
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error posting rating:', error));
};*/