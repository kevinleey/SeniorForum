import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import Footer from "../components/Footer";
import { selectCurrentUser, setCurrentUser } from "../features/users/userSlice";
import { fetchCurrUser } from "../features/users/userThunks";
import "../styles/home.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Home() {
  const posts = useSelector(selectAllPosts);
  const [sortedPosts, setSortedPosts] = useState(posts);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const selectSort = document.getElementById("sorting-dropdown");
  // const { user: auth0User, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { isLoading } = useAuth0();
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (currentUser && (!currentUser.firstName || !currentUser.lastName)) {
      navigate("/edit-profile");
    }
  }, [currentUser, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  const sortPosts = (e) => {
    // const value = e.target.value;
    // console.log(value);
    // let sortedPosts;
    // if (value === "popular") {
    //   sortedPosts = [...posts].sort((a, b) => b.comments.length - a.comments.length);
    // } else {
    //   sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // }
    // dispatch()
  };

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <div id="page-title">
          <h1 className="page-header">
            {/*isAuthenticated ? 'You are authenticated! ' : 'You are not authenticated! '*/}
            {currentUser
              ? `Welcome ${currentUser.firstName}, here are some recent posts.`
              : "Welcome, here are some recent posts. Login to join the community!"}
          </h1>
          {error && <div>Error: {error}</div>}
          <select id="sorting-dropdown" onChange={(e) => sortPosts(e)}>
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        <PostList posts={posts}/>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
