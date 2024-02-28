import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/posts/postsThunks";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../features/users/userSlice";
import { POST_CATEGORIES } from "../constants";
import "../styles/navbar.css";
import "../styles/new-post-page.css";

function AddPostForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const allCategories = [];
  for (let category in POST_CATEGORIES) {
    allCategories.push(POST_CATEGORIES[category].CATEGORY_TITLE);
  }
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((selected) => selected !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };
  const handleAddPost = async () => {
    try {
      const newPost = {
        title,
        text,
        categories: selectedCategories,
        createdBy: user._id,
        dateCreated: new Date(),
      };

      await dispatch(addPost(newPost));

      navigate("/account");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">Add a new post</h1>
        <h2 className="add-post-subtitle">Title:</h2>
        <input
          className="add-post-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <h2 className="add-post-subtitle">Text:</h2>
        <textarea
          className="add-post-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <h2 className="add-post-subtitle">Select Categories:</h2>
        <div>
          {allCategories.map((category) => (
            <label className="add-post-category-label" key={category}>
              <input
                className="add-post-input"
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
        <br />
        <button
          className="add-post-submit-button"
          onClick={() => handleAddPost()}
        >
          Add Post
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default AddPostForm;
