import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import "../styles/edit-profile.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "../features/users/userSlice";
import { fetchCurrUser } from "../features/users/userThunks";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/account.css";
import "../styles/edit-profile.css";
import {useNavigate} from "react-router-dom";

function EditProfile() {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const { user: auth0User, isLoading } = useAuth0();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  //add more as needed

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Check if the Auth0 user data is loaded and if the user is authenticated
    if (!isLoading && auth0User) {
      // If the user is authenticated, dispatch an action to fetch the current user's data
      dispatch(fetchCurrUser(auth0User));
      // Also, dispatch an action to set the current user's data in the Redux store
      dispatch(setCurrentUser(auth0User));
    } //the effect will run again if any of these values change
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setBio(currentUser.bio);
    }
  }, [dispatch, isLoading, auth0User, currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUser = {
      firstName,
      lastName,
      bio,
    };

        try {
            const response = await fetch('/users/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok){
                const updatedUserData = await response.json();
                dispatch(setCurrentUser(updatedUserData));
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 2000);
                //alert("Your changes have been saved :)")'
            } else {
                console.error('HTTP error! status: ${response.status}');
            }
        } catch(error) {
            console.error('An error occurred while updating the user profile', error);
        }
    }

    const handleClick = () => {
        navigate("/account");
    };

    if(!currentUser){
        return (
            <div id='page-overview'>
                <Navbar />
                <div id="page-container">
                    <h1 id="not-logged">You are not logged in. You don't belong here...</h1>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                         id="bi-arrow-left" viewBox="0 0 16 16" onClick={handleClick}>
                        <path fillRule="evenodd"
                              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
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
                        <div id="save-changes">
                            {showMessage && <p>Your changes have been saved :)</p>}
                            <input id="button" type="submit" value="Save"/>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default EditProfile;
