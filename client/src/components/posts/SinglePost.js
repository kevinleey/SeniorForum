import React, { useEffect } from "react";
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

function SinglePost({ post, comments }) {
  const commentsStatus = useSelector((state) => state.comments.status);
  const numComments = comments.length;
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { user: auth0User, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && auth0User) {
      dispatch(fetchCurrUser(auth0User));
      dispatch(setCurrentUser(auth0User));
    }
  }, [dispatch, isLoading, auth0User]);

  if (!currentUser) {
    window.location.href = "http://localhost:3001/login";
    return null;
  }

  const handleEditPage = () => {
    navigate(`/edit-post/${post._id}`);
  }

  const handleDropDown = () => {
    const dropdown = document.getElementById("dropdown");
    if (dropdown.style.visibility === "hidden") {
      dropdown.style.visibility = "visible";
      dropdown.style.transform = "translateY(0)";
    }
    else {
      dropdown.style.visibility = "hidden";
    }
  }

  const handleDelClick = (event) => {
    event.stopPropagation();
    const popup = document.getElementById("popup-window");
    if (popup.style.display === "none") {
      popup.style.display = "block";
    }
    else {
      popup.style.display = "none";
    }
  }

  const handleYesClick = async () => {
    try {
      await dispatch(deletePost(post._id));
      navigate(`/account`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  const handleNoClick = () => {
    const popup = document.getElementById("popup-window");
    popup.style.display = "none";
  }

  return (
    <div id="single-post-container">
      <div id="single-post-header">
        <div id="header-left">
          <h1 className="page-title">{post.title}</h1>
        </div>
        <div id="header-right">
          <div id="edit-button">
            {currentUser._id === post.createdBy._id && (
              <div onClick={handleDropDown} id="button-overview">
                <h2>Edit Post</h2>
                <div id="dropdown">
                  <div onClick={handleEditPage} id="edit-button">
                    <p id="edit-link">Edit Post</p>
                  </div>
                  <div id="edit-button">
                    <p onClick={handleDelClick} id="delete-post-button">Delete Post</p>
                  </div>
                  <div id="popup-window">
                    <div id="main-popup-content">
                      <h2>Are you sure you want to delete this post?</h2>
                      <div id="del-buttons">
                        <button onClick={handleYesClick} id="yes-button">Yes, delete this post</button>
                        <button onClick={handleNoClick} id="no-button">No, don't delete this post</button>
                      </div>
                    </div>
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
      <Contribution contribution={post} />
      <div id="single-post-comments-container">
        {commentsStatus === "succeeded" && (
          <h2 id="comments-title">Comments ({numComments})</h2>
        )}
        {commentsStatus === "succeeded" ? (
          comments.map((comment) => <Contribution contribution={comment} />)
        ) : (
          <Spinner />
        )}
        <CommentForm />
      </div>
    </div>
  );
}

export default SinglePost;
