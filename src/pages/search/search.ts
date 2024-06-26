import { TMDB_API_KEY } from '../../auth/auth';

let currentPage = 1;
let isLoading = false;

// Function to search movies based on a query and page number
function searchMovies(query: string, page: number = 1) {
    isLoading = true;
    // Fetch movies from the TMDB API
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let resultsContainer = document.getElementById('search-results');
            if (resultsContainer) {
                // Iterate through the movie results and create HTML elements for each movie
                data.results.forEach((movie: any, index: number) => {
                    let movieElement = document.createElement('div');
                    movieElement.innerHTML = `
                        <div id="movie-${index + 1}" class="relative max-w-md min-h-45em bg-white shadow-md rounded ${currentPage === 1 && index === 0 ? 'mt-10' : ''}">
                            <div class="text-center text-2xl font-bold text-blue-500">
                                <h2 id="titleSearch" class="px-20 py-5">${movie.title}</h2>
                            </div>
                            <div class="flex justify-center">
                                <img class="w-50-h-50" id="moviePoster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" id="moviePoster">
                            </div>
                            <div class="mt-10 text-center mr-10 ml-10 mb-10">
                                <p class="text-lg">${movie.overview.split('.')[0]}.</p>
                            </div>
                            <div>
                                <a class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 ml-32 mr-32 rounded absolute bottom-5 left-0 right-0 mx-4 mb-6 mt-18" href="../movie/movie.html?id=${movie.id}">Voir plus</a>
                            </div>
                            <div class="h-28">
                            </div>
                        </div>
                    `;
                    resultsContainer?.appendChild(movieElement);
                });
            } else {
                console.error('Results container not found.');
            }
            isLoading = false;
        })
        .catch(error => {
            console.error('There was an error with the fetch operation:', error);
            isLoading = false;
        });
}

// Event listener for the search bar input
document.getElementById('search-bar')?.addEventListener('input', (e) => {
    let query = (e.target as HTMLInputElement).value;
    currentPage = 1;
    let resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
        searchMovies(query, currentPage);
    } else {
        console.error('Results container not found.');
    }
});

// Event listener for scrolling to the bottom of the page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (!isLoading) {
            currentPage++;
            let query = (document.getElementById('search-bar') as HTMLInputElement)?.value;
            let resultsContainer = document.getElementById('search-results');
            if (query && resultsContainer) {
                searchMovies(query, currentPage);
            } else {
                console.error('Query or results container not found.');
            }
        }
    }
});
