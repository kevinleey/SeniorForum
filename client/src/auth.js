/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import auth0 from './components/auth0.js'

const ProtectedComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api/protected-endpoint', {
            headers: {
                Authorization: `Bearer ${auth0.getAccessTokenSilently()}`,
            },
        })
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error('Error fetching protected endpoint:', error);
            });
    }, []);

    return (
        <div>
            <h2>Protected Component</h2>
            <p>{message}</p>
        </div>
    );
}; */
