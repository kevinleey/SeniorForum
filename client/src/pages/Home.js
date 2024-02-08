import React from "react";
import Navbar from "../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import UserList from "../components/users/userList";
import Footer from "../components/Footer";
import {selectAllUsers} from "../features/users/userSlice";

function Home() {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);


  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">
          Welcome John, here are some recent posts.
        </h1>
        <PostList posts={posts} />
      </div>

        <div className ="user-list-container">
            <h2>Current Users:</h2>
            <UserList users={users} />
        </div>
      <Footer />
    </div>
  );
}

export default Home;
