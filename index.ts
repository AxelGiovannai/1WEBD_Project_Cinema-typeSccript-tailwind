import { TMDB_API_KEY } from './src/auth/auth';

const checkSessionId = () => {
    const sessionId = localStorage.getItem('tmdb_session_id');
    if (sessionId) {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            // Create a parent container
            const container = document.createElement('div');
            container.style.position = 'relative';

            // Hide the login form
            loginForm.style.display = 'none';

            // Replace the login form with the logged section
            const loggedSection = document.createElement('section');
            loggedSection.id = 'Logged';
            loggedSection.innerHTML = `
                <div id="logout" class="screen-h">
                    <form id="logged-form" class="bg-white shadow-md rounded px-32 pb-81 mb-4">
                        <h1 class="text-2xl font-semibold mb-8 mt-12 pt-96 px-20 ">Vous êtes déjà connecté!</h1>
                        <p class="font-semibold mb-8 mt-12 px-20 ">Vous pouvez vous déconnecter en cliquant sur le bouton ci-dessous.</p>
                        <div class="mt-8">
                            <input type="submit" value="Logout" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                        </div>
                    </form>
                </div>
            `;

            // Append the section to the parent container
            container.appendChild(loggedSection);

            // Replace the login form with the parent container
            loginForm.replaceWith(container);
        }
    }
};

// Add CSS styles to make the page fit to the viewport
document.body.style.height = '100vh';
document.body.style.overflow = 'hidden';

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
            checkSessionId();
        }
    } catch (error) {
        console.error('Error during form submission:', error);
    }
});
