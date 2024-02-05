import React from "react";
import "../../styles/categoryTagBar.css";

function CategoryTagBar({ categories }) {
  return (
    <div>
      {categories.length ? (
        categories.map((category) => (
          <div className="category-tag">{category}</div>
        ))
      ) : (
        <span id="no-category-text">No category specified</span>
      )}
    </div>
  );
}

export default CategoryTagBar;
