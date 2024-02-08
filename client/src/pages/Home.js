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
      <div className="container">
        <h2>Welcome John, here are some recent posts.</h2>
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
