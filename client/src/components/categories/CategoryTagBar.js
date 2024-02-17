import React from "react";
import "../../styles/category-tag-bar.css";
import { useNavigate } from "react-router-dom";

function CategoryTagBar({ categories }) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.stopPropagation();
    const category = event.target.innerText;
    console.log("Category clicked: ", category);
    navigate(`/categories/${category}`);
  };

  return (
    <div>
      {categories.length ? (
        categories.map((category) => (
          <div className="category-tag" onClick={handleClick}>{category}</div>
        ))
      ) : (
        <span id="no-category-text">No category specified</span>
      )}
    </div>
  );
}

export default CategoryTagBar;
