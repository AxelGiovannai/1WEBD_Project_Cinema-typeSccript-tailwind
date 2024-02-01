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
                data.results.forEach((movie: any) => {
                    let movieElement = document.createElement('div');
                    movieElement.innerHTML = `
                        <h2>${movie.title}</h2>
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                        <a href="../movie/movie.html?id=${movie.id}">Find out more</a>
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
