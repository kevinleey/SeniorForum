import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsThunks.js";
import { addNewComment } from "../comments/commentsThunks";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    postAdded: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        const postId = action.payload.postId;
        const commentId = action.payload._id;
        const postToUpdate = state.posts.find(post => post._id === postId);
        postToUpdate.comments.push(commentId);
      })
  },
});

export const { addPost, removePost, postAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
