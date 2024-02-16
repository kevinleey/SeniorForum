import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;


dotenv.config();

const app = express();
app.use(express.json());

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: '7CEAotFZme2gstjkZWCwTzoKfM9f1OrV',
    issuerBaseURL: 'https://dev-xva3bwyqfub0c5sf.us.auth0.com',
    secret: 'LONG_RANDOM_STRING'
}

app.use(auth(config));

 const PORT = process.env.PORT || 3001;

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9bfewjc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

// find users and print to console
const users = await User.find({});
console.log(users);

app.get('/', (req, res) => {
    res.send(
        req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    )
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.get('/account', requiresAuth(), (req, res) =>
    res.send(`Hello ${req.oidc.user.sub}, this is the account page.`)
);

app.get("/posts", async (req, res) => {
  const allPosts = await Post.find().populate("createdBy").exec();
  return res.status(200).json(allPosts);
});

app.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId).populate("createdBy").exec();
  return res.status(200).json(post);
});
// app.post("/add-post", async (req, res) => {
//   const postId = req.params.postId;
//   const post = await Post.findById(postId).populate("createdBy").exec();
//   return res.status(200).json(post);
// });
app.post("/add-post", async (req, res) => {
    const {title, text, categories, createdBy, dateCreated} = req.body;
    const newPost = new Post({
      title,
      text,
      categories,
        //createdBy: req.params.postId,
        createdBy,
        dateCreated
    });
    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
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

app.get("/users/current", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById("65c1a7acdf0c8cf66fe8023b");
  return res.status(200).json(user);
});

app.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  return res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
