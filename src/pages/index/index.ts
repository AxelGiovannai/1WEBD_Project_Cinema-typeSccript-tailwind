document.getElementById('login-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const usernameElement = document.getElementById('username') as HTMLInputElement;
    const passwordElement = document.getElementById('password') as HTMLInputElement;

    let username = '';
    let password = '';

    if (usernameElement && passwordElement) {
        username = usernameElement.value;
        password = passwordElement.value;

 
    } else {
        console.error('Error: username or password element not found');
    }

    // First, get a new request token
    fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=5f25c2d9763fcaf6baba5ecad2781305')
        .then(response => response.json())
        .then(data => {
            const requestToken = data.request_token;

            // Then, validate the login with the request token
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjI1YzJkOTc2M2ZjYWY2YmFiYTVlY2FkMjc4MTMwNSIsInN1YiI6IjY1YjI1Y2Y3MWM2MzI5MDE1MjkzM2MxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lY5XuqkOrFrSTeOER0B3t4b0nfv2_-C8uOwl8N70bkw'
                },
                body: JSON.stringify({ username: username, password: password, request_token: requestToken })
            };

            return fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', options);
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If the request token is validated, create a new session
                const options = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjI1YzJkOTc2M2ZjYWY2YmFiYTVlY2FkMjc4MTMwNSIsInN1YiI6IjY1YjI1Y2Y3MWM2MzI5MDE1MjkzM2MxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lY5XuqkOrFrSTeOER0B3t4b0nfv2_-C8uOwl8N70bkw'
                    },
                    body: JSON.stringify({ request_token: data.request_token })
                };

                return fetch('https://api.themoviedb.org/3/authentication/session/new', options);
            } else {
                throw new Error('Login failed');
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Save the session ID for future API requests
                localStorage.setItem('session_id', data.session_id);

                // Redirect to the movie page
                window.location.href = 'index.html';
            } else {
                alert('Session creation failed');
            }
        })
        .catch(error => console.error('Error:', error));
});