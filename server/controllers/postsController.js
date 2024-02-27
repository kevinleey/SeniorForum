import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";

const getAllPosts = async (req, res) => {
  const allPosts = await Post.find().populate("createdBy").exec();
  return res.status(200).json(allPosts);
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId).populate("createdBy").exec();
  return res.status(200).json(post);
};

const addPost = async (req, res) => {
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
};

const editPost = async (req, res) => {
  const postId = req.params.id;
  const { title, text, categories, createdBy, dateCreated } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { title, text, categories, createdBy, dateCreated },
    { new: true },
  );
  return res.status(200).json(updatedPost);
};

const getCommentsByPostId = async (req, res) => {
  const postId = new mongoose.Types.ObjectId(req.params.id);
  const comments = await Comment.find({ postId }).populate("createdBy").exec();
  return res.status(200).json(comments);
};

const addComment = async (req, res) => {
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
};

export const postsController = {
  getAllPosts,
  getPostById,
  addPost,
  editPost,
  getCommentsByPostId,
  addComment
};