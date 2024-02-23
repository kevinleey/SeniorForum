import React from "react";
import Contribution from "./Contribution";
import { timeSince } from "../../utility/timeSince";
import "../../styles/single-post.css";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import CommentForm from "../forms/CommentForm";

function SinglePost({ post, comments }) {
  const commentsStatus = useSelector((state) => state.comments.status);
  const numComments = comments.length;

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
        {commentsStatus === "succeeded" && (
          <h2 id="comments-title">Comments ({numComments})</h2>
        )}
        {commentsStatus === "succeeded" ? (
          comments.map((comment) => <Contribution contribution={comment} />)
        ) : (
          <Spinner />
        )}
        <CommentForm/>
      </div>
    </div>
  );
}

export default SinglePost;
