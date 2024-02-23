import { createSlice } from "@reduxjs/toolkit";
import { fetchCommentsForPost } from "./commentsThunks";

const initialState = {
  currentPostId: "",
  comments: [],
  status: "idle",
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setCurrentPostId: (state, action) => {
      state.currentPostId = action.payload;
    },
    commentAdded: (state, action) => {
      state.comments.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsForPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsForPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchCommentsForPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPostId, commentAdded } = commentsSlice.actions;

export default commentsSlice.reducer;

export const selectCommentsByPostId = (state) => state.comments.comments;

export const selectCurrentPostId = (state) => state.comments.currentPostId;
