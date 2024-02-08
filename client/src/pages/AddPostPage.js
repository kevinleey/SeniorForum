import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from 'react-redux';
import { addNewPost } from '../features/posts/postsThunks';
// Import useHistory
import { useNavigate } from 'react-router-dom';

function AddPostForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    // If people type the categories
    //const [categories, setCategories] = useState('');
    //Have to edit once we get the list of categories
    const [selectedCategories, setSelectedCategories] = useState([]);
    const allCategories = ["Housing", "Traveling", "Events", "Other"];
    const navigate = useNavigate();

    //Needed to make check boxes instead of highlighting categories
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
                // Assuming people type in the categories
                //categories: categories.split(',').map((category) => category.trim()),
                //Want to switch this to click categories
                categories: selectedCategories,
                // Assuming postedBy and dateCreated are set on the server side
            };

            await dispatch(addNewPost(newPost));

            // After successfully adding a post, redirect to the home page or any other desired route
            //const navigate = useNavigate();
            //Navigates to Account where they should be able to see their post in the list of posts they have created
            //We can change this if we want it to go somewhere else
            navigate('/Account');

        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <div>
            <Navbar/>
            <h2>Add a new post</h2>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <br/>
            <label>Text:</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)}/>
            <br/>
            {/*This is for highlighting categories*/}
            {/*<label>Select Categories:</label>*/}
            {/*<select*/}
            {/*    multiple*/}
            {/*    value={selectedCategories}*/}
            {/*    onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}*/}
            {/*>*/}
            {/*    {allCategories.map(category => (*/}
            {/*        <option key={category} value={category}>{category}</option>*/}
            {/*    ))}*/}
            {/*</select>*/}
            <label>Select Categories:</label>
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
            <button onClick={handleAddPost}>Add Post</button>
            <Footer/>
        </div>
    );
};

export default AddPostForm;

