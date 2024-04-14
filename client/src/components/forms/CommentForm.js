import React, { useState } from "react";
import "../../styles/comment-form.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/users/userSlice";
import { COMMENTS_RESOURCES as CR } from "../../constants";
import { COMMENTS_VALIDATION as CV } from "../../constants";
import { selectCurrentPostId } from "../../features/comments/commentsSlice";
import {
  addComment,
  editComment,
} from "../../features/comments/commentsThunks";

const {
  COMMENTS_ADD: addText,
  COMMENTS_EDIT: editText,
  COMMENTS_AUTHOR_PREFIX: authorPrefixText,
} = CR;
const {
  COMMENTS_MAXCHAR: maxChar,
  COMMENTS_BLANK_TEXT: blankText,
  COMMENTS_EXCEED_TEXT: exceedText,
} = CV;

function CommentForm({ existingComment, onSubmitSuccess }) {
  const currentUser = useSelector(selectCurrentUser);
  const isBanned = currentUser && currentUser.banned;
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const postId = useSelector(selectCurrentPostId);
  const [commentData, setCommentData] = useState(existingComment?.text || "");
  const [numChar, setNumChar] = useState(existingComment?.text.length || 0);
  const [error, setError] = useState("");

  const placeholderString = `${authorPrefixText}${user.firstName} ${user.lastName}`;
  const numCharString = `${numChar}/${maxChar}`;

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCommentData(value);
    setNumChar(value.length);

    if (value.length > maxChar) {
      setError(exceedText);
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentData.trim() === "") {
      setError(blankText);
      return;
    }

    if (commentData.length > maxChar) {
      setError(exceedText);
      return;
    }

    try {
      if (existingComment) {
        const updatedComment = {
          text: commentData,
          commentId: existingComment._id,
          postId,
        };

        await dispatch(editComment(updatedComment));
        onSubmitSuccess();
      } else {
        const newComment = {
          text: commentData,
          createdBy: user._id,
          dateCreated: new Date().toISOString(),
          postId,
        };

        await dispatch(addComment(newComment));
        setCommentData("");
        setNumChar(0);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <textarea
        className={`input-text-field ${error ? "invalid-input" : ""}`}
        value={commentData}
        onChange={handleInputChange}
        name="comment"
        placeholder={isBanned? "Cannot comment while banned" : placeholderString}
        disabled={isBanned}
      />
      <div className="input-form-footer">
        <div>
          <span className={`char-remaining ${error && "error-message"}`}>
            {numCharString}
          </span>
          {error && <span className="error-message">{error}</span>}
        </div>
        <button type="submit" className="submit-button" disabled={isBanned}>
          {existingComment ? editText : addText}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
