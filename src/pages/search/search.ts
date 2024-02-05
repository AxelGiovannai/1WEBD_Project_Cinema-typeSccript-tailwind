import { TMDB_API_KEY } from '../../auth/auth';

let currentPage = 1;
let isLoading = false;

function searchMovies(query: string, page: number = 1) {
    isLoading = true;
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
                data.results.forEach((movie: any, index: number) => {
                    let movieElement = document.createElement('div');
                    movieElement.innerHTML = `
                        <div id="movie-${index + 1}" class="relative min-w-md max-w-md min-h-0dvh bg-white shadow-md rounded ${currentPage === 1 && index === 0 ? 'mt-10' : ''}">
                            <div class="text-center text-2xl font-bold text-blue-500">
                                <h2 class="px-20 py-5">${movie.title}</h2>
                            </div>
                            <div class="flex justify-center">
                                <img class="w-50-h-50" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" id="moviePoster">
                            </div>
                            <div class="mt-10 text-center mr-10 ml-10 mb-10">
                            <p class="text-lg">${movie.overview.split('.')[0]}.</p>
                            </div>
                            <div class="bg-blue-500 text-white font-bold py-2 ml-32 mr-32 rounded absolute bottom-5 left-0 right-0 mx-4 mb-6 mt-18">
                                <a href="../movie/movie.html?id=${movie.id}">Voir plus</a>
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
