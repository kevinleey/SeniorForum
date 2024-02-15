import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Auth0Component = () => {
    // Destructure the necessary functions from the useAuth0 hook
    const {loginWithRedirect, isAuthenticated, getAccessTokenSilently} = useAuth0();
    // Initialize a state variable for the message
    const [message, setMessage] = useState('');

    // Function to handle login, redirects the user to the Auth0 login page
    const handleLogin = () => {
        loginWithRedirect();
    };

    // Function to fetch data from a protected endpoint
    const fetchData = async () => {
        try {
            // Get the access token silently (without redirecting the user)
            const accessToken = await getAccessTokenSilently();
            // Log the access token (for debugging purposes, remove in production)
            console.log('Access Token : ', accessToken);

            // Make a GET request to the protected endpoint, including the access token in the Authorization header
            axios.get('/api/protected-endpoint', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    // If the request is successful, set the message state variable to the response message
                    setMessage(response.data.message);
                })
                .catch((error) => {
                    // If there's an error, log it
                    console.error('Error fetching protected endpoint:', error);
                });

        } catch (error) {
            // If there's an error getting the access token, log it
            console.error('Error getting access token! : ', error);
        }
    };

    return (

        <div>
            {/* If the user is authenticated, show the Fetch Data button, otherwise show the Log in button */}
            {isAuthenticated ? (
                <button onClick={fetchData}>Fetch Data</button>
            ) : (
                <button onClick={handleLogin}>Log in</button>
            )}
            <div>
                <h2>Protected Component</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Auth0Component;