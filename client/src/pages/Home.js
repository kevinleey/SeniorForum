import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import Footer from "../components/Footer";
import { selectCurrentUser } from "../features/users/userSlice";
import "../styles/home.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Home() {
  const posts = useSelector(selectAllPosts);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const {  isLoading } = useAuth0();
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if(currentUser && (!currentUser.firstName || !currentUser.lastName)) {
      navigate("/edit-profile");
    }
  }, [currentUser, navigate]);

  if(isLoading) {
    return <Spinner />;
  }

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">
          {/*isAuthenticated ? 'You are authenticated! ' : 'You are not authenticated! '*/}
          {currentUser
            ? `Welcome ${currentUser.firstName}, here are some recent posts.`
            : "Welcome, here are some recent posts. Login to join the community!"}
        </h1>
        {error && <div>Error: {error}</div>}
        <PostList posts={posts} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
