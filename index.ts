import { TMDB_API_KEY } from './src/auth/auth';

document.getElementById('login-form')?.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Fonction pour analyser les données du formulaire
    const getFormData = () => {
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        const username = usernameInput ? usernameInput.value : '';
        const password = passwordInput ? passwordInput.value : '';

        return { username, password };
    };

    // Étape 1 : Créer un request token
    const getRequestToken = async () => {
        const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log('Request Token:', json);
            return json.request_token;
        } catch (error) {
            console.error('Error requesting token:', error);
            throw error;
        }
    };

    // Étape 2 (ajoutée) : Valider le request token avec les identifiants de l'utilisateur
    const validateTokenWithLogin = async (username, password, requestToken) => {
        const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${TMDB_API_KEY}`;
        const body = {
            username: username,
            password: password,
            request_token: requestToken
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const json = await response.json();
            console.log('Token validated:', json);
            return json.success;
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
        }
    };

    // Étape 3 : Créer une session ID
    const createSessionId = async (requestToken) => {
        const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ request_token: requestToken }),
            });
            const json = await response.json();
            if (json.success) {
                console.log('Session ID:', json.session_id);
                // Stocker la session_id dans le localStorage
                localStorage.setItem('tmdb_session_id', json.session_id);
                return json.session_id;
            } else {
                console.error('Failed to create session');
                return null;
            }
        } catch (error) {
            console.error('Error creating session:', error);
            return null;
        }
    };

    try {
        const { username, password } = getFormData();
        const requestToken = await getRequestToken();
        const isTokenValidated = await validateTokenWithLogin(username, password, requestToken);
        if (!isTokenValidated) {
            console.error('Token validation failed');
            return;
        }
        const sessionId = await createSessionId(requestToken);
        if (sessionId) {
            console.log('Session ID saved to localStorage:', sessionId);
        }
    } catch (error) {
        console.error('Error during form submission:', error);
    }
});
