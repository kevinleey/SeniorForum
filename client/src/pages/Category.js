import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import PostList from "../components/posts/PostList";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import { useParams } from "react-router-dom";
import "../styles/category.css";

function Category() {
  const posts = useSelector(selectAllPosts);
  const { categoryTitle } = useParams();
  const categoryPosts = posts.filter(
    (post) => post.categories.includes(categoryTitle) === true,
  );
  const [sortType, setSortType] = useState("recent");
  const [searchValue, setSearchValue] = useState("");

  const sortPosts = (e) => {
    setSortType(e.target.value);
  };

  const searchPosts = (e) => {
    let tmp = e.target.value;
    tmp = tmp.replace(/\$/g, "");
    tmp = tmp.replace(/<script>/g, "");
    setSearchValue(tmp);
  };

  let sortedPosts = [...categoryPosts];

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
      post.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <div id="page-title">
          <h1 className="page-header">{categoryTitle}</h1>
          <input
            type="search"
            id="category-post-search"
            placeholder="Search Post Titles"
            onChange={(e) => searchPosts(e)}
          />
          <select id="sorting-dropdown" onChange={(e) => sortPosts(e)}>
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        <PostList posts={sortedPosts} />
      </div>
      <Footer />
    </div>
  );
}

export default Category;
