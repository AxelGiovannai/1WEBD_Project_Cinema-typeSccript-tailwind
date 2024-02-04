

document.getElementById('login-form')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    // Function to parse form data
    const getFormData = () => {
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        const username = usernameInput.value;
        const password = passwordInput.value;

        return { username, password };
    };

    // Step 1: Create a request token
    const getRequestToken = async () => {
        const url = 'https://api.themoviedb.org/3/authentication/token/new';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjI1YzJkOTc2M2ZjYWY2YmFiYTVlY2FkMjc4MTMwNSIsInN1YiI6IjY1YjI1Y2Y3MWM2MzI5MDE1MjkzM2MxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lY5XuqkOrFrSTeOER0B3t4b0nfv2_-C8uOwl8N70bkw', // Replace with your API key
            },
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            console.log('Request Token:', json);
            return json.request_token;
        } catch (error) {
            console.error('Error requesting token:', error);
            throw error;
        }
    };

    // Step 2: Ask the user for permission
    const askForPermission = (requestToken: string) => {
        const authenticateUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
        console.log('Authenticate URL:', authenticateUrl);
        // Redirect the user to authenticateUrl or use it as needed
    };

    // Step 3: Create a session ID
    const createSessionId = async (username: string, password: string, requestToken: string) => {
        const url = 'https://api.themoviedb.org/3/authentication/token/validate_with_login';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjI1YzJkOTc2M2ZjYWY2YmFiYTVlY2FkMjc4MTMwNSIsInN1YiI6IjY1YjI1Y2Y3MWM2MzI5MDE1MjkzM2MxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lY5XuqkOrFrSTeOER0B3t4b0nfv2_-C8uOwl8N70bkw', // Replace with your API key
            },
            body: JSON.stringify({
                username,
                password,
                request_token: requestToken,
            }),
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            console.log('Session ID:', json);
            return json.session_id;
        } catch (error) {
            console.error('Error creating session ID:', error);
            throw error;
        }
    };

    // Event listener for form submission


        try {
            const requestToken = await getRequestToken();
            askForPermission(requestToken);
            // Retrieve username and password from the form
            const { username, password } = getFormData();
            const sessionId = await createSessionId(username, password, requestToken);
            console.log('Final Session ID:', sessionId);
        } catch (error) {
            console.error('Error during form submission:', error);
        }
});