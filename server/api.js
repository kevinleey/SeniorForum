import express from "express";
//import routerModule from "router";
import auth from "./auth.js";

const router = express.Router();

// Define a route for '/protected-endpoint'
// This route is protected by the 'auth' middleware
// Only requests with a valid JWT will be able to access this route
router.get('/protected-endpoint', auth, (req, res) => {
    //handle logic here

    // Send a response back to the client
    // In this case, we're just sending a JSON object with a message
    res.json({ message: "Authenticated endpoint reached!" });
});

// Export the router object
// This allows other modules to use the routes defined in this module
export default router;