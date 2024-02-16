import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import PostList from "../components/posts/PostList";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import { useParams } from "react-router-dom";
import "../styles/category.css";

function Category() {
  const posts = useSelector(selectAllPosts);
  const { categoryTitle } = useParams();
  console.log("Category Title: ", categoryTitle);
  const categoryPosts = posts.filter(
    (post) => post.categories.includes(categoryTitle) === true,
  );
  console.log("Category Posts: ", categoryPosts);

  return (
    <div id="page-background">
      <Navbar />
      <div className="page-container">
        <div id="posts-box">
          <h1 className="page-title">{categoryTitle}</h1>
          <PostList posts={categoryPosts} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Category;
