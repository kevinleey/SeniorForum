import { createSlice } from "@reduxjs/toolkit";
import { editPost, fetchPosts } from "./postsThunks.js";
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
    postUpdated: (state, action) => {
      const { id, title, text, dateCreated, comments, categories, createdBy } =
        action.payload;
      const existingPostIndex = state.posts.findIndex((post) => post.id === id);

      if (existingPostIndex !== -1) {
        // Create a new copy of the existing post object with updated values
        const updatedPost = {
          ...state.posts[existingPostIndex],
          title,
          text,
          dateCreated,
          comments,
          categories,
          createdBy,
        };

        // Create a new array with the updated post object at the correct index
        const updatedPosts = [...state.posts];
        updatedPosts[existingPostIndex] = updatedPost;

        return {
          ...state,
          posts: updatedPosts,
        };
      }

      return state;
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
        const postToUpdate = state.posts.find((post) => post._id === postId);
        postToUpdate.comments.push(commentId);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { addPost, removePost, postAdded, postUpdated } =
  postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
