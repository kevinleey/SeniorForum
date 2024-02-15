import {expressjwt} from "express-jwt";
import jwksRsa from 'jwks-rsa';

const { jwt } = expressjwt;

const auth = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: process.env.API_ID,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: [process.env.ALGORITHMS],
});

export default auth;