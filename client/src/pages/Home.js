import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import Footer from "../components/Footer";
import { selectCurrentUser, setCurrentUser, resetCurrentUser } from "../features/users/userSlice";
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

 /* useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const getData = async () => {
        if (user && user.sub) {
          let id = user.sub;
          console.log('user.sub: ', id);
          await dispatch(fetchCurrUser(id));
          await dispatch(setCurrentUser());
        }
      }
      getData();
    }
  }, [isLoading, isAuthenticated]);*/

 /* useEffect(() => {
    if (user && user.sub) {
      console.log('user.sub: ', user.sub);
      dispatch(fetchCurrUser(user.sub));
      dispatch(setCurrentUser());
    }
  }, [user]);*/

  useEffect(() => {
    if(!isLoading && isAuthenticated && user) {
      dispatch(fetchCurrUser(user));
    }
  }, [dispatch, isAuthenticated, isLoading, user]);

  /*useEffect(() => {
    console.log("CurrentUser: ", currentUser);
  }, [currentUser]);*/

  const handleLogin = async () => {
    console.log('Logging in...');
    try {
      const token = await getAccessTokenSilently();
      //console.log('Access token:', token);
      await loginWithRedirect();
    } catch (error) {
      //console.log('Error getting access token:', error);
      await loginWithRedirect();
    }
  }

  const handleLogout = async () => {
    console.log('Logging out...');
    await logout({ returnTo: window.location.origin });
    dispatch(resetCurrentUser());
    console.log("CurrentUser: ", currentUser);
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
