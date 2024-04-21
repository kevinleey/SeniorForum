import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import Contribution from "./Contribution";
import { timeSince } from "../../utility/timeSince";
import "../../styles/single-post.css";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import CommentForm from "../forms/CommentForm";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchCurrUser } from "../../features/users/userThunks";
import {
  setCurrentUser,
  selectCurrentUser,
} from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../features/posts/postsThunks";
import UserImage from "../userInfo/UserImage";
import { COMMENTS_RESOURCES } from "../../constants";

function SinglePost({ post, comments }) {
  const commentsStatus = useSelector((state) => state.comments.status);
  const numComments = comments.length;
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { user: auth0User, isLoading, loginWithRedirect } = useAuth0();

  if (!currentUser) {
    loginWithRedirect();
    return null;
  }

  const handleEditPage = () => {
    navigate(`/edit-post/${post._id}`);
  };

  const handleYesClick = async () => {
    try {
      await dispatch(deletePost(post._id));
      navigate(`/account`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div id="single-post-container">
      <div id="single-post-header">
        <div id="header-left">
          <h1 className="page-title">{post.title}</h1>
        </div>
        <div id="header-right">
          <div id="edit-button-main">
            {(currentUser._id === post.createdBy._id ||
              currentUser.role === "Admin") && (
              <div id="button-overview">
                <h2>Edit Post</h2>
                <div id="dropdown">
                  <div onClick={handleEditPage} id="edit-button">
                    <p id="edit-link">Edit Post</p>
                  </div>
                  <div id="edit-button">
                    <Popup
                      trigger={
                        <p className="delete-post-button"> Delete Post </p>
                      }
                      modal
                    >
                      {(close) => (
                        <div id="popup-window">
                          <div id="main-popup-content">
                            <h2>Are you sure you want to delete this post?</h2>
                            <div id="del-buttons">
                              <button onClick={handleYesClick} id="yes-button">
                                Yes, delete this post
                              </button>
                              <button
                                onClick={() => {
                                  close();
                                }}
                                id="no-button"
                              >
                                No, don't delete this post
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                </div>
              </div>
            )}
          </div>
          <h3 id="time-since">
            {timeSince(post.dateCreated)} by {post.createdBy.firstName}{" "}
            {post.createdBy.lastName}
          </h3>
        </div>
      </div>
      <Contribution contribution={post} isComment={false} />
      <div id="single-post-comments-container">
        {commentsStatus === "succeeded" && (
          <h2 id="comments-title">Comments ({numComments})</h2>
        )}
        {commentsStatus === "succeeded" ? (
          comments.map((comment) => (
            <Contribution contribution={comment} isComment={true} />
          ))
        ) : (
          <Spinner />
        )}
        <div className="comment-form-container">
          <h2 id="comment-form-header">{COMMENTS_RESOURCES.COMMENTS_TITLE}</h2>
          <div className="comment-form">
            <UserImage user={currentUser} />
            <div className="input-form-container">
              <CommentForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
