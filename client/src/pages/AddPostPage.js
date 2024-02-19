import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import {useDispatch, useSelector} from 'react-redux';
import { addNewPost } from '../features/posts/postsThunks';
import { useNavigate } from 'react-router-dom';
import {selectCurrentUser} from "../features/users/userSlice";
import {POST_CATEGORIES} from "../constants";
import "../styles/navbar.css";
import "../styles/new-post-page.css";

function AddPostForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const allCategories = [POST_CATEGORIES.CATEGORY_1.CATEGORY_TITLE, POST_CATEGORIES.CATEGORY_2.CATEGORY_TITLE, POST_CATEGORIES.CATEGORY_3.CATEGORY_TITLE, POST_CATEGORIES.CATEGORY_5.CATEGORY_TITLE, POST_CATEGORIES.CATEGORY_6.CATEGORY_TITLE, POST_CATEGORIES.CATEGORY_LAST.CATEGORY_TITLE];
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
                dateCreated: new Date()
            };

            await dispatch(addNewPost(newPost));

            navigate('/Account');
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <div>
            <Navbar/>
            <newPostTitle>Add a new post</newPostTitle>
            <h2>Title:</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <br/>
            <h2>Text:</h2>
            <textarea value={text} onChange={(e) => setText(e.target.value)}/>
            <br/>
            <h2>Select Categories:</h2>
            <div>
                {allCategories.map((category) => (
                    <label key={category}>
                        <input
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
            <button onClick={() => handleAddPost()}>Add Post</button>

            <Footer/>
        </div>
    );
};

export default AddPostForm;

