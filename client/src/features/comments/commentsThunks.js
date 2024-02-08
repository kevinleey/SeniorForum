import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchCommentsForPost = createAsyncThunk(
  "comments/fetchCommentsForPosts",
  async (postId) => {
    const response = await fetch(`/posts/${postId}/comments`);
    const data = await response.json();
    return data;
  },
);

export default fetchCommentsForPost;
