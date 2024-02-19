import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import Footer from "../components/Footer";
import {
  selectCurrentUser,
  setCurrentUser,
} from "../features/users/userSlice";
import { fetchCurrUser } from "../features/users/userThunks";
import "../styles/home.css";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const posts = useSelector(selectAllPosts);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { user: auth0User, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && auth0User) {
      dispatch(fetchCurrUser(auth0User));
      dispatch(setCurrentUser(auth0User));
    }
  }, [dispatch, isLoading, auth0User]);

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">
          {currentUser
            ? `Welcome ${currentUser.firstName}, here are some recent posts.`
            : "Welcome, here are some recent posts. Login to join the community!"}
        </h1>
        <PostList posts={posts} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
