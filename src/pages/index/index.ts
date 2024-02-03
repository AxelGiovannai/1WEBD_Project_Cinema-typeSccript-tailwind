
        const API_KEY = process.env.API_KEY;
        const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

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

            fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    const requestToken = data.request_token;

                    const options = {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'content-type': 'application/json',
                            Authorization: `Bearer ${ACCESS_TOKEN}`
                        },
                        body: JSON.stringify({ username: username, password: password, request_token: requestToken })
                    };

                    return fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', options);
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const options = {
                            method: 'POST',
                            headers: {
                                accept: 'application/json',
                                'content-type': 'application/json',
                                Authorization: `Bearer ${ACCESS_TOKEN}`
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
                        localStorage.setItem('session_id', data.session_id);
                        window.location.href = 'index.html';
                    } else {
                        alert('Session creation failed');
                    }
                })
                .catch(error => console.error('Error:', error));
    });