import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Auth0Component = () => {
    const {loginWithRedirect, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [message, setMessage] = useState('');

    const handleLogin = () => {
        loginWithRedirect();
    };

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            // Now that we have the access token, we can use it to make a request to the API
            console.log('Access Token : ', accessToken);

            axios.get('/api/protected-endpoint', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    setMessage(response.data.message);
                })
                .catch((error) => {
                    console.error('Error fetching protected endpoint:', error);
                });

            return accessToken;

            //perform API request using token
            //...
        } catch (error) {
            console.error('Error getting access token! : ', error);
        }
    };

    return (
        <div>
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