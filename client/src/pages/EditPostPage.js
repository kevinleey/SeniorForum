import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { imageLinks, POST_CATEGORIES } from "../constants";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { selectAllPosts } from "../features/posts/postsSlice";
import { editPost } from "../features/posts/postsThunks";
import { selectUserById } from "../features/users/userSlice";
import { POST_VALIDATION as PV } from "../constants";
import "../styles/new-post-page.css";

const {
  POST_TITLE_MAXCHAR: titleMaxChar,
  POST_TITLE_BLANK_TEXT: titleBlankText,
  POST_TITLE_EXCEED_TEXT: titleExceedText,
  POST_BODY_MAXCHAR: bodyMaxChar,
  POST_BODY_BLANK_TEXT: bodyBlankText,
  POST_BODY_EXCEED_TEXT: bodyExceedText,
} = PV;

function EditPostForm() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = useSelector(selectAllPosts);
  const navigate = useNavigate();

  const post = posts.find((post) => post._id === postId);
  const userId = post.createdBy._id;
  const user = useSelector((state) => selectUserById(state, userId));

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [selectedCategories, setSelectedCategories] = useState(post.categories);
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

  const handleEditPost = async (e) => {
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
      const updatePost = {
        _id: postId,
        title,
        text,
        categories: selectedCategories,
        createdBy: user._id,
        dateCreated: post.dateCreated,
        comments: post.comments,
      };

      // await dispatch(editPost(updatePost));
      await dispatch(editPost({ postId, updatePost }));

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">Edit post</h1>
        <div id="add-post-container">
          <div id="image-area">
            <img
              src={
                user.picture ? user.picture : imageLinks.USER.USER_PICTURE_LINK
              }
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
              onClick={() => handleEditPost()}
            >
              Edit Post
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditPostForm;
