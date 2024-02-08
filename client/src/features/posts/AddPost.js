import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from './postsThunks';

const AddPostForm = ({ history }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [categories, setCategories] = useState([]);

    const handleAddPost = async () => {
        try {
            const newPost = {
                title,
                text,
                categories: categories.split(',').map((category) => category.trim()),
                // Add other fields as needed based on your server model
            };

            await dispatch(addNewPost(newPost));

            // After successfully adding a post, redirect to the home page or any other desired route
            history.push('/');
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <div>
            <h2>Add a new post</h2>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label>Text:</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <br />
            <label>Categories:</label>
            <input type="text" value={categories} onChange={(e) => setCategories(e.target.value.split(','))} />
            <br />
            <button onClick={handleAddPost}>Add Post</button>
        </div>
    );
};
export default AddPostForm;