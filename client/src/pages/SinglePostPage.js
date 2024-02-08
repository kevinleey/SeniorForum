import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import SinglePost from "../components/posts/SinglePost";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import {
  selectCommentsByPostId,
} from "../features/comments/commentsSlice";
import Error from "../components/Error";
import { ERROR_MESSAGES as error } from "../constants";
import fetchCommentsForPost from "../features/comments/commentsThunks";

function SinglePostPage() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = useSelector(selectAllPosts);
  const comments = useSelector(selectCommentsByPostId);

  useEffect(() => {
    dispatch(fetchCommentsForPost(postId));
  }, [dispatch, postId]);

  const post = posts.filter((post) => post._id === postId);

  return (
    <div>
      <Navbar />
      <div className="page-container">
        {post.length ? (
          <SinglePost post={post[0]} comments={comments} />
        ) : (
          <Error message={error.INVALID_POSTID} />
        )}
      </div>
    </div>
  );
}

export default SinglePostPage;
