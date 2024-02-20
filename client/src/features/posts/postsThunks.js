import { createAsyncThunk } from "@reduxjs/toolkit";
import { postAdded } from "./postsSlice.js";

const fetchPost = createAsyncThunk("posts/fetchPost", async (postId) => {
  const response = await fetch(`/posts/${postId}`);
  const data = await response.json();
  return data;
});

const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("/posts");
  const data = await response.json();
  return data;
});
const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost, { dispatch }) => {
    const response = await fetch("/add-post", {
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

export { fetchPosts, fetchPost, addNewPost };
