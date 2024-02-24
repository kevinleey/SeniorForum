import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { POST_CATEGORIES } from "../constants";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import React, { useState } from "react";
import {selectAllPosts} from "../features/posts/postsSlice";
import { editPost } from "../features/posts/postsThunks";
import { selectUserById } from "../features/users/userSlice";
import "../styles/new-post-page.css";

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

  const handleEditPost = async () => {
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
      await dispatch(editPost({postId, updatePost}));

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">Edit Post</h1>
        <h2 className="add-post-subtitle">Title:</h2>
        <input
          className="add-post-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br/>
        <h2 className="add-post-subtitle">Text:</h2>
        <textarea
          className="add-post-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br/>
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
        <br/>
        <button
          className="add-post-submit-button"
          onClick={() => handleEditPost()}
        >
          Edit Post
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default EditPostForm;