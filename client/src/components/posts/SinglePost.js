import React from "react";
import Contribution from "./Contribution";
import { timeSince } from "../../utility/timeSince";
import "../../styles/single-post.css";

function SinglePost({ post, comments }) {
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
        <h2>Comments {}</h2>
        {comments.map((comment) => (
          <Contribution contribution={comment} />
        ))}
      </div>
    </div>
  );
}

export default SinglePost;
