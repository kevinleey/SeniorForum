import { createAsyncThunk } from "@reduxjs/toolkit";
import { postAdded, postDeleted, postUpdated } from "./postsSlice.js";

const fetchPostById = createAsyncThunk("posts/fetchPost", async (postId) => {
  const response = await fetch(`/posts/${postId}`);
  const data = await response.json();
  return data;
});

const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("/posts");
  const data = await response.json();
  return data;
});

const addPost = createAsyncThunk(
  "posts/addPost",
  async (newPost, { dispatch }) => {
    const response = await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    dispatch(postAdded(data));
    return data;
  },
);

const editPost = createAsyncThunk(
  "posts/editPost",
  async (post, { dispatch }) => {
    const { postId, updatePost } = post;
    const response = await fetch(`/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePost),
    });
    const data = await response.json();
    dispatch(postUpdated(data));
    return data;
  },
);

const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { dispatch }) => {
    const response = await fetch(`/posts/delete/${postId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    dispatch(postDeleted(postId));
    return data;
  },
);

export { fetchPosts, fetchPostById, addPost, editPost, deletePost };
