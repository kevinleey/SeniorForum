/*import expressJwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

// Create an instance of the expressJwt middleware
const auth = expressJwt({
    // The secret option is set to a function provided by jwks-rsa
    // This function retrieves the RSA signing keys from the JWKS endpoint of your Auth0 domain
    secret: jwksRsa.expressJwtSecret({
        cache: true, // Enable caching of the keys
        rateLimit: true, // Enable rate limiting
        jwksRequestsPerMinute: 5, // Limit the number of requests per minute
        jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,// The JWKS endpoint
    }),
    audience: process.env.API_ID, // The API identifier
    issuer: `https://${process.env.AUTH_DOMAIN}/`, // The Auth0 domain
    algorithms: [process.env.ALGORITHMS], // The algorithms used for signing the tokens
});

// Export the configured expressJwt middleware
// This middleware can be used in your Express.js application to protect routes
// It ensures that only authenticated requests with a valid JWT can access them
export default auth;*/