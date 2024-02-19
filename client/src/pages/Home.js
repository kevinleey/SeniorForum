import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import UserList from "../components/users/userList";
import Footer from "../components/Footer";
import {selectAllUsers, selectCurrentUser, setCurrentUser} from "../features/users/userSlice";
import { fetchCurrUser } from "../features/users/userThunks";
import "../styles/home.css";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { user: auth0User, isLoading } = useAuth0();

  useEffect(() => {
      // Check if the Auth0 user data is loaded and if the user is authenticated
      if(!isLoading && auth0User) {
          // If the user is authenticated, dispatch an action to fetch the current user's data
          dispatch(fetchCurrUser(auth0User));
          // Also, dispatch an action to set the current user's data in the Redux store
          dispatch(setCurrentUser(auth0User));
      }//the effect will run again if any of these values change
  }, [dispatch, isLoading, auth0User]);

  return (
      <div id="page-overview">
          <Navbar/>
          <div className="page-container">
              <div id="posts-box">
                  <h1 className="page-title">
                      {currentUser ? `Welcome ${currentUser.nickname}, here are some recent posts.` : "Welcome, here are some recent posts. Login to join the community!"}
                  </h1>
                  <PostList posts={posts}/>
              </div>
          </div>

      <div className="user-list-container">
        <h2>Current Users:</h2>
        <UserList users={users} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
