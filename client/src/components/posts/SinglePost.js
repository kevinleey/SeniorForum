import React from "react";
import Contribution from "./Contribution";
import { timeSince } from "../../utility/timeSince";
import "../../styles/single-post.css";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";

function SinglePost({ post, comments }) {
  const commentsStatus = useSelector((state) => state.comments.status);

  return (
    <div id="single-post-container">
      <div id="single-post-header">
        <h1 className="page-title">{post.title}</h1>
        <h3>
          {timeSince(post.dateCreated)} by {post.createdBy.firstName}{" "}
          {post.createdBy.lastName}
        </h3>
      </div>
      <Contribution contribution={post} />
      <div id="single-post-comments-container">
        <h2>Comments</h2>
        {commentsStatus === "succeeded" ? (
          comments.map((comment) => <Contribution contribution={comment} />)
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default SinglePost;
