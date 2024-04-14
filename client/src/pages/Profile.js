import React, {useState} from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { imageLinks } from "../constants";
import "../styles/account.css";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import { useParams } from "react-router-dom";
import { selectUserById } from "../features/users/userSlice";

function Profile() {
  const posts = useSelector(selectAllPosts);
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  const userPosts = posts.filter((post) => post.createdBy._id === userId);
  const [sortType, setSortType] = useState("recent");
  const [searchValue, setSearchValue] = useState("");

  const sortPosts = (e) => {
    setSortType(e.target.value);
  }

  const searchPosts = (e) => {
    let tmp = e.target.value;
    tmp = tmp.replace(/\$/g, "");
    tmp = tmp.replace(/<script>/g, "");
    setSearchValue(tmp);
  }

  let sortedPosts = [...userPosts];

  if (sortType === "recent") {
    sortedPosts.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
  }
  else if (sortType === "oldest") {
    sortedPosts.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
  }
  else if (sortType === "popular") {
    sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
  }

  if (searchValue) {
    sortedPosts = sortedPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));
  }

  return (
    <div id="page-overview">
      <Navbar />
      <div id="page-container">
        <div id="account-container">
          <div id="image-area">
            <img
              src={user.picture ? user.picture : imageLinks.USER.USER_PICTURE_LINK}
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
                {user.firstName} {user.lastName}
              </p>
            </div>
            <h2 className="bio">Bio:</h2>
            <div id="account-bio">
              <p>
                {user.bio}
              </p>
            </div>
            <div id="account-history">
              <div id="account-history-heading">
                <h2>Post History</h2>
                <input type="search" id="account-post-search" placeholder="Search Post Titles"
                       onChange={(e) => searchPosts(e)}/>
                <select id="sorting-dropdown" onChange={(e) => sortPosts(e)}>
                  <option value="recent">Recent</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
              <div id="account-history-list">
                <PostList posts={sortedPosts}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Profile;
