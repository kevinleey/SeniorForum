import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import pkg from "express-openid-connect";
const { auth, requiresAuth } = pkg;

const PORT = process.env.PORT || 3001;
dotenv.config();

const app = express();
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: process.env.AUTH_CLIENT_ID, //'7CEAotFZme2gstjkZWCwTzoKfM9f1OrV',
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL, //'https://dev-xva3bwyqfub0c5sf.us.auth0.com'
  secret: "LONG_RANDOM_STRING",
};

app.use(auth(config));

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9bfewjc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), async (req, res) => {
  let auth0Id = req.oidc.user.sub;
  auth0Id = auth0Id.replace("auth0|", "");
  const user = await User.findById(auth0Id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(user);
});

app.put("/profile", requiresAuth(), async (req, res) => {
  ///MIGHT NEED TO CHANGE REQUIRESAUTH
  let auth0UserId = req.oidc.user.sub;
  auth0UserId = auth0UserId.replace("auth0|", "");
  const user = await User.findById(auth0UserId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(auth0UserId, req.body, {
    new: true,
  });
  res.send(updatedUser);
});

app.get("/account", requiresAuth(), (req, res) =>
  res.send(`Hello ${req.oidc.user.sub}, this is the account page.`),
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

app.post("/add-post", async (req, res) => {
  const { title, text, categories, createdBy, dateCreated } = req.body;
  const newPost = new Post({
    title,
    text,
    categories,
    createdBy,
    dateCreated,
  });
  const savedPost = await newPost.save();
  return res.status(201).json(savedPost);
});

app.get("/posts/:postId/comments", async (req, res) => {
  const postId = new mongoose.Types.ObjectId(req.params.postId);
  const comments = await Comment.find({ postId }).populate("createdBy").exec();
  return res.status(200).json(comments);
});

app.post("/add-comment", async (req, res) => {
  const { text, createdBy, dateCreated, postId } = req.body;
  const newComment = new Comment({
    text,
    createdBy,
    dateCreated,
    postId: new mongoose.Types.ObjectId(postId),
  });

  const savedComment = await newComment.save();

  await Post.updateOne(
    { _id: postId },
    { $push: { comments: savedComment._id } },
  );

  return res.status(201).json(savedComment);
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
