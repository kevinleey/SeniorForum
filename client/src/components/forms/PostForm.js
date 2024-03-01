import React, { useState } from "react";
import "../../styles/post-form.css";
import UserImage from "../userInfo/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/users/userSlice";
import { POST_RESOURCES as CR } from "../../constants";
import { POST_VALIDATION as CV } from "../../constants";
//import { selectCurrentPostId } from "../../features/comments/commentsSlice";
import { addPost } from "../../features/comments/postsThunks";

const {
    POST_TITLE: title,
    POST_ADD: addText,
    POST_AUTHOR_PREFIX: authorPrefixText,
} = CR;

const {
    POST_TEXT_MAXCHAR: maxChar,
    POST_TITLE_MAXCHAR: maxChar,
    POST_BLANK_TITLE: blankText,
    POST_BLANK_TEXT: blankText,
    POST_EXCEED_TITLE: exceedTitle,
    POST_EXCEED_TEXT: exceedText,
} = CV;

function PostForm() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    //const postId = useSelector(selectCurrentPostId);
    const [postData, setPostData] = useState("");
    const [numChar, setNumChar] = useState(0);
    const [error, setError] = useState("");

    //const placeholderString = `${authorPrefixText}${user.firstName} ${user.lastName}`;
    const placeholderString = `${authorPrefixText}`;
    const numCharString = `${numChar}/${maxChar}`;

    const handleInputChange = (e) => {
        const { value } = e.target;
        setPostData(value);
        setNumChar(value.length);

        if (value.length > maxChar) {
            setError(exceedText);
        } else {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (postData.trim() === "") {
            setError(blankText);
            return;
        }

        if (postData.length > maxChar) {
            setError(exceedText);
            return;
        }

        try {
            const newPost = {
                text: postData,
                createdBy: user._id,
                dateCreated: new Date().toISOString(),
                //postId,
            };

            await dispatch(addPost(newPost));
            setPostData("");
            setNumChar(0);
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    return (
        <div className="post-form-container">
            <h2 id="post-form-header">{title}</h2>
            <div className="post-form">
                <UserImage user={user} />
                <form className="input-form" onSubmit={handleSubmit}>
          <textarea
              className={`input-text-field ${error ? "invalid-input" : ""}`}
              value={postData}
              onChange={handleInputChange}
              name="post"
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