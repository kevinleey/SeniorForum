import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import SinglePost from "../components/posts/SinglePost";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import {
  selectCommentsByPostId,
  setCurrentPostId,
} from "../features/comments/commentsSlice";
import Error from "../components/Error";
import { ERROR_MESSAGES as error } from "../constants";
import { fetchCommentsForPost } from "../features/comments/commentsThunks";
import Footer from "../components/Footer";

function SinglePostPage() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = useSelector(selectAllPosts);
  const comments = useSelector(selectCommentsByPostId);

  useEffect(() => {
    dispatch(setCurrentPostId(postId));
    dispatch(fetchCommentsForPost(postId));
  }, [dispatch, postId]);

  const post = posts.filter((post) => post._id === postId);

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        {post.length ? (
          <SinglePost post={post[0]} comments={comments} />
        ) : (
          <Error message={error.INVALID_POSTID} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SinglePostPage;
