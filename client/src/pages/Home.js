import React from "react";
import Navbar from "../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import Footer from "../components/Footer";

function Home() {
  const posts = useSelector(selectAllPosts);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Welcome John, here are some recent posts.</h2>
        <PostList posts={posts} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
