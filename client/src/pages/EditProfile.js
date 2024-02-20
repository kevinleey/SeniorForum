import React, {useState, useEffect} from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { imageLinks } from "../constants";
import "../styles/edit-profile.css";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import {selectAllUsers, selectCurrentUser, setCurrentUser} from "../features/users/userSlice";
import { fetchCurrUser } from "../features/users/userThunks";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/account.css";
import "../styles/edit-profile.css";



function EditProfile() {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const { user: auth0User, isLoading } = useAuth0();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    //add more as needed

    useEffect(() => {
        // Check if the Auth0 user data is loaded and if the user is authenticated
        if(!isLoading && auth0User) {
            // If the user is authenticated, dispatch an action to fetch the current user's data
            dispatch(fetchCurrUser(auth0User));
            // Also, dispatch an action to set the current user's data in the Redux store
            dispatch(setCurrentUser(auth0User));
        }//the effect will run again if any of these values change
        if(currentUser){
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setBio(currentUser.bio);

        }
    }, [dispatch, isLoading, auth0User]);

    /*const handleSubmit = (event) => {
        event.preventDefault();
        // Send a request to the server to update the user's data
        // You'll need to implement this
    }*/

    const handleSubmit = async ( event) => {
        event.preventDefault();

        const updatedUser = {
            firstName,
            lastName,
            bio,
        };

        try {
            const response = await fetch('/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),

            });

            if (response.ok){
                dispatch(setCurrentUser(updatedUser));
            } else {
                console.error('HTTP error! status: ${response.status}');
            }
        } catch(error) {
            console.error('An error occurred while updating the user profile', error);
        }
    }

    if(!currentUser){
        return (
            <div id='page-overview'>
                <Navbar />
                <div id="page-container">
                    <h1 id="not-logged">Hmmm, you are not logged in. You don't belong here...</h1>
                </div>
            </div>
        )
    }
    return (
        <div id='page-overview'>
            <Navbar />
            <div id="page-container">
                <h1>Edit Profile Page</h1>
                <div id="edit-profile-container">

                    <form onSubmit={handleSubmit}>
                        <div id="form-container">
                            <label>
                                First Name:
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            </label>
                            <label>
                                Last Name:
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            </label>
                            <label>
                                Bio:
                                <textarea value={bio} onChange={(e) => setBio(e.target.value)}/>
                            </label>
                        </div>
                        {/* Add more fields as needed */}
                        <input type="submit" value="Save"/>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditProfile;