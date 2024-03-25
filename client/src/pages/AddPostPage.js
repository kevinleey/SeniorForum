import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/posts/postsThunks";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../features/users/userSlice";
import {
  imageLinks,
  POST_CATEGORIES,
  POST_VALIDATION as PV,
} from "../constants";
import "../styles/navbar.css";
import "../styles/new-post-page.css";
//import PostList from "../components/posts/PostList";

const {
  POST_TITLE_MAXCHAR: titleMaxChar,
  POST_TITLE_BLANK_TEXT: titleBlankText,
  POST_TITLE_EXCEED_TEXT: titleExceedText,
  POST_BODY_MAXCHAR: bodyMaxChar,
  POST_BODY_BLANK_TEXT: bodyBlankText,
  POST_BODY_EXCEED_TEXT: bodyExceedText,
} = PV;

function AddPostForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [titleErr, setTitleErr] = useState("");
  const [bodyErr, setBodyErr] = useState("");
  const [numTitleChar, setNumTitleChar] = useState(title.length);
  const [numBodyChar, setNumBodyChar] = useState(text.length);

  const numTitleCharString = `${numTitleChar}/${titleMaxChar}`;
  const numBodyCharString = `${numBodyChar}/${bodyMaxChar}`;

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

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setNumTitleChar(value.length);
    setTitle(value);
    if (value.length > titleMaxChar) {
      setTitleErr(titleExceedText);
    } else {
      setTitleErr("");
    }
  };

  const handleBodyChange = (e) => {
    const { value } = e.target;
    setNumBodyChar(value.length);
    setText(value);
    if (value.length > bodyMaxChar) {
      setBodyErr(bodyExceedText);
    } else {
      setBodyErr("");
    }
  };

  const handleAddPost = async () => {
    let err = false;

    if (title.length > titleMaxChar || title.trim() === "") {
      setTitleErr(
        title.length > titleMaxChar ? titleExceedText : titleBlankText,
      );
      err = true;
    }

    if (text.length > bodyMaxChar || text.trim() === "") {
      setBodyErr(text.length > bodyMaxChar ? bodyExceedText : bodyBlankText);
      err = true;
    }

    if (err) {
      return;
    }

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
        <div id="add-post-container">
          <div id="image-area">
            <img
              src={imageLinks.USER.USER_PICTURE_LINK}
              alt={imageLinks.USER.USER_PICTURE_TEXT}
            />
          </div>

          <div id="main-content">
            <br />
            <h2 className="title">Post Title</h2>
            <div id="post-title-heading">
              <input
                className={`add-post-input-title ${titleErr ? "invalid-input" : ""}`}
                type="text"
                value={title}
                placeholder="Input your post title"
                onChange={(e) => handleTitleChange(e)}
              />
              <span className={`char-remaining ${titleErr && "error-message"}`}>
                {numTitleCharString}
              </span>
              {titleErr && (
                <span className="title-error-message">{titleErr}</span>
              )}
            </div>
            <br />
            <br />
            <div id="post-title-heading">
              <h2>Post Text</h2>
            </div>
            <div id="post-title-heading">
              <textarea
                className={`add-post-input-text ${bodyErr ? "invalid-input" : ""}`}
                placeholder="Input your post text"
                value={text}
                onChange={(e) => handleBodyChange(e)}
              />
              <span className={`char-remaining ${bodyErr && "error-message"}`}>
                {numBodyCharString}
              </span>
              {bodyErr && <span className="body-error-message">{bodyErr}</span>}
            </div>
            <br />
            <br />
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
            <br />
            <button
              className="add-post-submit-button"
              onClick={() => handleAddPost()}
            >
              Add Post
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AddPostForm;
