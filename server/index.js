import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9bfewjc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

// find users and print to console
const users = await User.find({});
console.log(users);

app.get("/posts", async (req, res) => {
  const allPosts = await Post.find().populate("createdBy").exec();
  return res.status(200).json(allPosts);
});

app.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId).populate("createdBy").exec();
  return res.status(200).json(post);
});

app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ postId }).populate("createdBy").exec();
  return res.status(200).json(comments);
});

app.get("/users", async (req, res) => {
    const allUsers = await User.find({});
    return res.status(200).json(allUsers);
});

app.get("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    return res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
