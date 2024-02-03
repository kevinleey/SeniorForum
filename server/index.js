import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import User from "./models/User.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9bfewjc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

// find users and print to console
const users = await User.find({});
console.log(users);

// test server endpoint
app.get("/test", (req, res) => {
  res.send("Hello world! - from Express");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
