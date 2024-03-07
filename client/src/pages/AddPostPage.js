import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/posts/postsThunks";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../features/users/userSlice";
import {imageLinks, POST_CATEGORIES} from "../constants";
import "../styles/navbar.css";
import "../styles/new-post-page.css";
//import PostList from "../components/posts/PostList";


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
        <Navbar/>
        <div id="page-container">
          <h1 className="page-title">Add a new post</h1>
          <div id="add-post-container">
            <div id="image-area">
              <img
                  src={imageLinks.USER.USER_PICTURE_LINK}
                  alt={imageLinks.USER.USER_PICTURE_TEXT}
              />
            </div>


            <div id="main-content">
              <br/>
              <h2 className="title">Post Title</h2>
              <div id="post-title-heading">
                <input
                    className="add-post-input-title"
                    type="text"
                    value={title}
                    placeholder="Input your post title"
                    onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <br/>
              <br/>
              <div id="post-title-heading">
                <h2>Post Text</h2>
              </div>
              <div id="post-title-heading">
                 <textarea
                     className="add-post-input-text"
                     placeholder="Input your post text"
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                 />
              </div>
              <br/>
              <br/>
              <div id="post-title-heading">
                <h2>Select Categories</h2>
              </div>
              <div>
                {allCategories.map((category) => (
                    <label className="add-post-category-label" key={category}>
                      <input
                          className="add-post-category"
                          type="checkbox"
                          value={category}
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCheckboxChange(category)}
                      />
                      {category}
                    </label>
                ))}
              </div>
              <br/>
              <button
                  className="add-post-submit-button"
                  onClick={() => handleAddPost()}
              >
                Add Post
              </button>
            </div>
          </div>
        </div>


        <Footer/>
      </div>
  )
      ;
}


export default AddPostForm;