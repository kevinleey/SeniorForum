import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { imageLinks } from "../constants";
import "../styles/account.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import { selectCurrentUser, setCurrentUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { fetchCurrUser } from "../features/users/userThunks";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchPosts } from "../features/posts/postsThunks";

function Account() {
  const posts = useSelector(selectAllPosts);
  const currentUser = useSelector(selectCurrentUser);
  const { user: auth0User, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*useEffect(() => {
    if (!isLoading && auth0User) {
      dispatch(fetchCurrUser(auth0User));
      dispatch(setCurrentUser(auth0User));
    }
  }, [dispatch, isLoading, auth0User]);

  /*useEffect(() => {
    const getUser = async () => {
      if (!isLoading) {
        try {
          await getAccessTokenSilently();
          if (auth0User) {
            dispatch(fetchCurrUser(auth0User));
            dispatch(setCurrentUser(auth0User));
          }
        } catch (error) {
          navigate("/login");
        }
      }
    };
    getUser();
  }, [dispatch, isLoading, auth0User, getAccessTokenSilently, navigate]);*/

  useEffect(() => {
    if (currentUser) {
      // Fetch the posts again
      dispatch(fetchPosts());
    }
  }, [currentUser, dispatch]);

  if (!currentUser) {
    window.location.href = "http://localhost:3001/login";
    return null;
  }

  const currPosts = posts.filter(
    (post) => post.createdBy._id === currentUser._id,
  );

  const handleClick = () => {
    navigate("/edit-profile");
  };

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">My Account</h1>
        <div id="account-container">
          <div id="image-area">
            <img
              src={imageLinks.USER.USER_PICTURE_LINK}
              alt={imageLinks.USER.USER_PICTURE_TEXT}
            />
            <div id="follow-bar">
              <p>Followers</p>
              <p>Following</p>
            </div>
            <div id="follow-numbers">
              <p>100</p>
              <p>100</p>
            </div>
          </div>
          <div id="main-content">
            <div id="account-header">
              <p>
                {currentUser.firstName} {currentUser.lastName}
              </p>

              <button id="edit-profile-button" onClick={handleClick}>
                Edit Profile
              </button>
            </div>
            <h2 className="bio">Bio:</h2>
            <div id="account-bio">
              <p>{currentUser.bio}</p>
            </div>
            <div id="account-history">
              <div id="account-history-heading">
                <h2>Post History</h2>
              </div>
              <div id="account-history-list">
                <PostList posts={currPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;
