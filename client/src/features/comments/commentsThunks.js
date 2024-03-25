import { createAsyncThunk } from "@reduxjs/toolkit";
import {commentAdded, commentUpdated} from "./commentsSlice";
import { selectUserById } from "../users/userSlice";
import emailjs from "emailjs-com";
import { selectPostByID } from "../posts/postsSlice";

const fetchCommentsForPost = createAsyncThunk(
  "comments/fetchCommentsForPosts",
  async (postId) => {
    const response = await fetch(`/posts/${postId}/comments`);
    const data = await response.json();
    return data;
  },
);

function emailPostOwner(emailParameters) {
  emailjs
    .send(
      "service_3xoay2e",
      "template_u60rcfn",
      emailParameters,
      "44bqoB6IrCJS_FDWY",
    )
    .then(function (res) {
      console.log("success", res.status);
    })
    .catch(function (error) {
      console.error("Failed", error);
    });
}
const addComment = createAsyncThunk(
  "comments/addComment",
  async (newComment, { dispatch, getState }) => {
    const state = getState();
    const user = selectUserById(state, newComment.createdBy);
    const postInfo = selectPostByID(state, newComment.postId);

    const response = await fetch(`/posts/${newComment.postId}/comments`, {
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
        _id: user._id,
      },
    };

    dispatch(commentAdded(commentWithUsername));
    const postTitle = postInfo.title;
    const authorName = postInfo.createdBy.firstName;
    const authorEmail = postInfo.createdBy.email;

    emailPostOwner({
      reply_to: authorEmail,
      to_name: authorName,
      message: postTitle,
    });

    const data = await response.json();
    return data;
  },
);

const editComment = createAsyncThunk(
  "comments/editComment",
  async (comment, { dispatch }) => {
    const { postId, commentId } = comment;
    const response = await fetch(`/posts/${postId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const data = await response.json();
    console.log("I HATE TOMATOES");
    dispatch(commentUpdated(data));
  },
);

export { fetchCommentsForPost, addComment, editComment };
