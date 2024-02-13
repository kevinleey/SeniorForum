import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { imageLinks } from "../constants";
import "../styles/account.css";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import { selectCurrentUser } from "../features/users/userSlice";

function Account() {
  const posts = useSelector(selectAllPosts);
  const currUser = useSelector(selectCurrentUser);
  const currPosts = posts.filter((post) => post.createdBy._id === currUser._id);

  return (
    <div id="page-overview">
      <Navbar />
      <div className="page-container">
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
                {currUser.firstName} {currUser.lastName}
              </p>
            </div>
            <h2 className="bio">Bio:</h2>
            <div id="account-bio">
              <p>
                I am a caregiver for my mother who has dementia. I am looking
                for advice on how to handle her mood swings.
              </p>
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
