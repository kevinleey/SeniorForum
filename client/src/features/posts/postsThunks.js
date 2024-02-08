import { createAsyncThunk } from "@reduxjs/toolkit";

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
const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
  const response = await fetch("/posts", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  const data = await response.json();
  return data;
});

// Export all thunks for use in the slice or components
export { fetchPosts, fetchPost, addNewPost };

