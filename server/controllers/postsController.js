import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";
// import sanitize from "express-mongo-sanitize";
// import app from "../index.js";

// app.use(
//   sanitize({
//       onSanitize: ({ req, key }) => {
//         console.warn(`This request[${key}] is sanitized`, req);
//       }
//     }
//   ));

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

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = Post.findById(postId);

    if (!post) return res.status(404).send("Post not found");
    else {
      await post.deleteOne();
      return res.status(204).send();
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
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

const editComment = async (req, res) => {
  const commentId = req.params.id;
  const { text } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true },
    );
    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error editing comment:", error);
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = Comment.findById(commentId);

    if (!comment) return res.status(404).send("Comment not found");
    else {
      await comment.deleteOne();
      return res.status(204).send();
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

export const postsController = {
  getAllPosts,
  getPostById,
  addPost,
  editPost,
  deletePost,
  getCommentsByPostId,
  addComment,
  editComment,
};
