import React, { useState } from "react";
import "../../styles/comment-form.css";
import UserImage from "../userInfo/UserImage";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/users/userSlice";
import { COMMENTS_RESOURCES as CR } from "../../constants";
import { COMMENTS_VALIDATION as CV } from "../../constants";

const {
  COMMENTS_TITLE: title,
  COMMENTS_ADD: addText,
  COMMENTS_AUTHOR_PREFIX: authorPrefixText,
} = CR;
const {
  COMMENTS_MAXCHAR: maxChar,
  COMMENTS_BLANK_TEXT: blankText,
  COMMENTS_EXCEED_TEXT: exceedText,
} = CV;

function CommentForm() {
  const user = useSelector(selectCurrentUser);
  const [commentData, setCommentData] = useState("");
  const [numChar, setNumChar] = useState(0);
  const [error, setError] = useState("");

  const placeholderString = `${authorPrefixText} ${user.firstName} ${user.lastName}`;
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentData.trim() === "") {
      setError(blankText);
      return;
    }

    if (commentData.length > 300) {
      setError(exceedText);
      return;
    }
  };

  return (
    <div className="comment-form-container">
      <h2 id="comment-form-header">{title}</h2>
      <div className="comment-form">
        <UserImage />
        <form className="input-form" onSubmit={handleSubmit}>
          <textarea
            className={`input-text-field ${error ? "invalid-input" : ""}`}
            value={commentData}
            onChange={handleInputChange}
            name="comment"
            placeholder={placeholderString}
          />
          <div className="input-form-footer">
            <div>
              <span className={`char-remaining ${error && "error-message"}`}>
                {numCharString}
              </span>
              {error && <span className="error-message">{error}</span>}
            </div>
            <button type="submit" className="submit-button">
              {addText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
