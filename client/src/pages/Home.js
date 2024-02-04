import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectAllPosts } from "../features/posts/postsSlice";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const postsStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  return (
    <div>
      <Navbar />
      {posts.map((post, index) => (
        <div key={post._id}>
          <p>
            Post {index + 1} title: {post.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Home;
