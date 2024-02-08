import React from "react";
import "../../styles/post-overview.css";
import CategoryTagBar from "../categories/CategoryTagBar";
import { timeSince } from "../../utility/timeSince";
import { useNavigate } from "react-router-dom";
import UserInfoSmall from "../userInfo/UserInfoSmall";

function PostOverview({ post }) {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div
      className="post-overview-container"
      onClick={() => handlePostClick(post._id)}
    >
      <UserInfoSmall user={post.createdBy} />
      <div className="post-overview-text-container">
        <div id="post-overview-header">
          <h2 id="post-title">{post.title}</h2>
          <span id="author-date-info">
            {timeSince(post.dateCreated)} by {post.createdBy.firstName}{" "}
            {post.createdBy.lastName}
          </span>
        </div>
        <span id="post-text">{post.text}</span>
        <div id="post-overview-footer">
          <div>
            <img
              id="comment-icon"
              src="https://static-00.iconduck.com/assets.00/comment-icon-1024x964-julk98bl.png"
              alt="comment icon"
            />
            <span>
              {post.comments.length}{" "}
              {post.comments.length === 1 ? "Comment" : "Comments"}
            </span>
          </div>
          <CategoryTagBar categories={post.categories} />
        </div>
      </div>
    </div>
  );
}

export default PostOverview;
