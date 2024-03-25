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
    commentUpdated: (state, action) => {
      const { postId, _id, text } = action.payload;
      const commentIndex = state.comments.findIndex(
        (comment) => comment.postId === postId && comment._id === _id,
      );

      if (commentIndex !== -1) {
        state.comments[commentIndex].text = text;
      }
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

export const { setCurrentPostId, commentAdded, commentUpdated } =
  commentsSlice.actions;

export default commentsSlice.reducer;

export const selectCommentsByPostId = (state) => state.comments.comments;

export const selectCurrentPostId = (state) => state.comments.currentPostId;
