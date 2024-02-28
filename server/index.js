import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import pkg from "express-openid-connect";
const { auth } = pkg;
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const PORT = process.env.SERVER_PORT || 3001;
dotenv.config();

const app = express();
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  secret: "LONG_RANDOM_STRING",
};

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9bfewjc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

app.use(auth(config));
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
