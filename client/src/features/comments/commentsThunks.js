import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentAdded } from "./commentsSlice";
import { selectUserById } from "../users/userSlice";

const fetchCommentsForPost = createAsyncThunk(
  "comments/fetchCommentsForPosts",
  async (postId) => {
    const response = await fetch(`/posts/${postId}/comments`);
    const data = await response.json();
    return data;
  },
);

const addNewComment = createAsyncThunk(
  "comments/addNewComment",
  async (newComment, { dispatch, getState }) => {
    const state = getState();
    const user = selectUserById(state, newComment.createdBy);

    const response = await fetch("/add-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    const commentWithUsername = {
      ...newComment,
      createdBy: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    dispatch(commentAdded(commentWithUsername));

    const data = await response.json();
    return data;
  },
);

export { fetchCommentsForPost, addNewComment };
