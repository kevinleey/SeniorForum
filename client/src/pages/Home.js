import React, { useEffect, useState } from "react";
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
  const { isLoading } = useAuth0();
  const [sortType, setSortType] = useState("recent");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (currentUser && (!currentUser.firstName || !currentUser.lastName)) {
      navigate("/edit-profile");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser && currentUser.banned) {
      if (!localStorage.getItem("bannedMessageShown")) {
        alert(
          "You are currently banned. You may still view content, but you may not post or comment.",
        );
        localStorage.setItem("bannedMessageShown", true);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    return () => {
      if (!currentUser) {
        localStorage.removeItem("bannedMessageShown");
      }
    };
  }, [currentUser]);

  if (isLoading) {
    return <Spinner />;
  }

  const sortPosts = (e) => {
    setSortType(e.target.value);
  };

  const searchPosts = (e) => {
    let tmp = e.target.value;
    tmp = tmp.replace(/\$/g, "");
    tmp = tmp.replace(/<script>/g, "");
    setSearchValue(tmp);
  };

  let sortedPosts = [...posts];

  if (sortType === "recent") {
    sortedPosts.sort(
      (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated),
    );
  } else if (sortType === "oldest") {
    sortedPosts.sort(
      (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated),
    );
  } else if (sortType === "popular") {
    sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
  }

  if (searchValue) {
    sortedPosts = sortedPosts.filter((post) =>
      post.createdBy.firstName
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    );
  }

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

          {currentUser && (
            <input
              type="search"
              id="home-post-search"
              placeholder="Search Users"
              onChange={(e) => searchPosts(e)}
            />
          )}
          {currentUser && (
            <select id="sorting-dropdown" onChange={(e) => sortPosts(e)}>
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Popular</option>
            </select>
          )}
        </div>

        {currentUser && currentUser.banned && (
          <h2 style={{ color: "#900f0f", paddingBottom: "10px" }}>
            You are currently banned. Please contact an admin for more
            information.
          </h2>
        )}

        <PostList posts={sortedPosts} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
