import React from "react";
import Navbar from "../components/navbar/Navbar";
import SinglePost from "../components/posts/SinglePost";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import Error from "../components/Error";
import { ERROR_MESSAGES as error } from "../constants";

function SinglePostPage() {
  const { postId } = useParams();
  const posts = useSelector(selectAllPosts);

  const post = posts.filter((post) => post._id === postId);

  return (
    <div>
      <Navbar />
      <div className="container">
        {post.length ? (
          <SinglePost post={post[0]} />
        ) : (
          <Error message={error.INVALID_POSTID} />
        )}
      </div>
    </div>
  );
}

export default SinglePostPage;
