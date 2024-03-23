import React, { useEffect } from "react";
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
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const error = useSelector((state) => state.users.error);

    /*useEffect(() => {
      const getData = async () => {
        if (!isLoading && isAuthenticated) {
          await dispatch(fetchCurrUser());
          await dispatch(setCurrentUser());
        }
      }
      getData();
      console.log('Current user:', currentUser)
    }, isLoading, isAuthenticated, user);*/

  useEffect(() => {
    if(!isLoading) {
      console.log('Current User: ', currentUser);
    }
  }, [isLoading, currentUser]);

  const handleLogin = async () => {
    console.log('Logging in...');
    await loginWithRedirect();
  }

  const handleLogout = async () => {
    console.log('Logging out...');
    await logout({ returnTo: window.location.origin });
  }

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <button onClick = {handleLogin}>Login</button>
        <button onClick = {handleLogout}>Logout</button>
        <h1 className="page-title">
          {isAuthenticated ? 'You are authenticated! ' : 'You are not authenticated! '}
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
