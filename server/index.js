import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import pkg from "express-openid-connect";
const { auth, requiresAuth } = pkg;
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import cors from 'cors';
import axios from 'axios';
import User from "./models/User.js";


const PORT = process.env.SERVER_PORT || 3001;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
app.use(cors({ origin: ['http://localhost:3000', 'https://dev-xva3bwyqfub0c5sf.us.auth0.com'] }));

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: process.env.AUTH_CLIENT_ID, //"7CEAotFZme2gstjkZWCwTzoKfM9f1OrV",
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,  //"https://dev-xva3bwyqfub0c5sf.us.auth0.com/",
  secret: process.env.AUTH_SECRET       //"jAifA-5yGNbcpOJPgv0ZZRgNkdGhzsmafoe_CRasvctssfpVgWFQ6GfHG_kW6BZA",
};

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9bfewjc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);


app.use(auth(config));
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

/*app.post("/auth0-proxy", async (req, res) => {
  try {
    // Make a request to Auth0 server
    const response = await fetch("https://dev-xva3bwyqfub0c5sf.us.auth0.com/authorize", {
      method: req.method,
      headers: {
        // Forward request headers
        ...req.headers,
        // Add any additional headers needed by Auth0
        // Example: Authorization header with Auth0 access token
      },
    });

    // Parse response body as JSON
    const data = await response.json();

    // Add CORS headers to allow requests from frontend origin
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Send the response back to the frontend
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error: " });
  }
});*/

/*app.get("/admin-page", (req, res) => {
  if(req.user && req.user.role === 'Admin') {
    res.send("Welcome to the admin page");
  } else {
    res.status(401).send("Unauthorized");
  }
});*/

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
