import React from "react";
import "../../styles/navbar.css";
import "../../styles/category-box.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../features/posts/postsSlice";

function CategoryBox(props) {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryTitle) => {
    navigate(`/categories/${categoryTitle}`);
  };
  const posts = useSelector(selectAllPosts);
  const categoryPosts = posts.filter(
    (post) => post.categories.includes(props.category.CATEGORY_TITLE) === true,
  );

  return (
    <div
      id="box-container"
      onClick={() => handleCategoryClick(props.category.CATEGORY_TITLE)}
    >
      <div id="content-container">
        <img src={require("../../images/couple.jpg")} alt="Announcements" />
        <div id="category-title">
          <h3>{props.category.CATEGORY_TITLE}</h3>
        </div>
      </div>
      <div id="thread-count">
        <h3>Threads Posted: {categoryPosts.length}</h3>
      </div>
    </div>
  );
}

export default CategoryBox;
