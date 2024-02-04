import {TMDB_Tokken_Session} from './src/auth/auth';

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
                Authorization: `Bearer ${TMDB_Tokken_Session}`,
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
                Authorization: `Bearer ${TMDB_Tokken_Session}`,
            },
            body: JSON.stringify({
                username,
                password,
                request_token: requestToken,
            }),
            console: console.log('options')
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