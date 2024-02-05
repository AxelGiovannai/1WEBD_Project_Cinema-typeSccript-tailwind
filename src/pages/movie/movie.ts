import { TMDB_API_KEY } from '../../auth/auth';
import { createVoteBar } from '../../../script/rating'; // Replace '../../script/rating' with the correct file path '../../components/rating'

const sessionId = localStorage.getItem('tmdb_session_id');

interface MovieDetails {
  title: string;
  poster_path: string;
  overview: string;
  id: number;
  original_title: string;
  vote_average: number;
  vote_count: number;
}

interface MovieReview {
  author: string;
  content: string;
  id: string;
  url: string;
}

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

console.log('movieId:', movieId);


if (movieId) {
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`;
  const vote_count = fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`).then(response => response.json()).then(data => data.vote_count);
  console.log('vote_count:', vote_count);


  fetch(movieUrl)
    .then(response => response.json())
    .then((movie: MovieDetails) => {
      const movieDetailsHTML = `
        <div class="max-w-full bg-white pt-10 mb">
          <div class="relative max-w-2xl mx-auto bg-white shadow-md rounded mt-0">
            <h2 id="movieTitle" class="text-center bg-gray-400/90 flex-inline text-white text-4xl py-5 my-10 rounded-sm">${movie.original_title}</h2>
          </div>
          <div class="flex justify-center align-middle items-center pt-5">
            <img src="https://image.tmdb.org/t/p/w400${movie.poster_path}" alt="${movie.title}">
          </div>
          <div class="mt-16 text-center mr-10 ml-10 mx-20">
            <p class="text-center text-md text-pretty font-bold mb-10">${movie.overview}</p>
          </div>
          <div class="flex justify-center text-center">
            <div class="flex items-center text-xl">
              <p class="text-center text-2xl text-blue-500 font-bold">Rating:</p>
              <div class="mb-5">${createVoteBar(movie.vote_average)}
              </div>
            </div>
          </div>
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
      let reviewsHTML = '<h3 class=" px-10 py-4 font-bold text-center max-w-50 bg-blue-100 text-black text-2xl shadow-lg mb-20">Reviews</h3>';

      if (reviews.length) {
        reviews.forEach(review => {
          reviewsHTML += `
            <div class="review">
              <div id="reviews" class="text-center border-separate bg-white my-5 py-5 shadow-xl border border-blue-200 rounded">
              <p class=" text-center flex-col text-xl mb-10"><strong>${review.author}</strong></p> 
              <div class="flex justify-center text-center">
              <p class=" px-5 text-pretty mx-22 min-w-80">${review.content}</p>
              </div>
              <div class="flex justify-center text-center">
              <p class="text-center text-blue-500 font-bold"></p>
              </div>
            </div>
          `;
        });
      } else {
        reviewsHTML += '<p class=" text-center justify-center bg-slate-50 text-black snap-center font-extralight decoration-dashed text-2xl">La section commentraire est vide...</p>';
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
const addMovieRating = (movieId: string, rating: number) => {
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
};


  
document.getElementById('rating-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const ratingInput = document.getElementById('rating') as HTMLInputElement;
  if (ratingInput) {
    const rating = Number(ratingInput.value);
    if (movieId) {
      addMovieRating(movieId, rating);
      const ratingUpdated = document.getElementById('rating-updated');
      if (ratingUpdated) {
        ratingUpdated.textContent = 'Votre vote a été enregistré. Merci !';
        const vote_count = fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`).then(response => response.json()).then(data => data.vote_count);
        console.log('vote_count:', vote_count);
      }
    } else {
      console.error('No movie id found');
    }
  }
});
