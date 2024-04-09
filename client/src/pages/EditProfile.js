import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import "../styles/edit-profile.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "../features/users/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/account.css";
import "../styles/edit-profile.css";
import { useNavigate } from "react-router-dom";
import { EDIT_PROFILE_VALIDATION } from "../constants";
import validator from "validator";
import axios from "axios";

const {
  FIRST_NAME_MAXCHAR: maxFirstNameChar,
  FIRST_NAME_BLANK_TEXT: firstNameBlankText,
  FIRST_NAME_EXCEED_TEXT: firstNameExceedText,
  LAST_NAME_MAXCHAR: maxLastNameChar,
  LAST_NAME_BLANK_TEXT: lastNameBlankText,
  LAST_NAME_EXCEED_TEXT: lastNameExceedText,
  BIO_MAXCHAR: maxBioChar,
  //BIO_BLANK_TEXT: bioBlankText,
  BIO_EXCEED_TEXT: bioExceedText,
} = EDIT_PROFILE_VALIDATION;

function EditProfile() {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useAuth0();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const [firstNameCharCount, setFirstNameCharCount] = useState(0);
  const [lastNameCharCount, setLastNameCharCount] = useState(0);
  const [bioCharCount, setBioCharCount] = useState(0);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [bioError, setBioError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setBio(currentUser.bio);

      if(currentUser.firstName) {
        setFirstNameCharCount(currentUser.firstName.length);
      }

      if(currentUser.lastName) {
        setLastNameCharCount(currentUser.lastName.length);
      }

        if(currentUser.bio) {
          setBioCharCount(currentUser.bio.length);
        }

    }
  }, [dispatch, isLoading, user, currentUser]);

  const handleFirstNameChange = (e) => {
    const { value } = e.target;
    setFirstName(value);
    setFirstNameCharCount(value.length);

    if (value.length > maxFirstNameChar) {
      setFirstNameError(firstNameExceedText);
    } else if (value.length === 0) {
      setFirstNameError(firstNameBlankText);
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    const { value } = e.target;
    setLastName(value);
    setLastNameCharCount(value.length);

    if (value.length > maxLastNameChar) {
      setLastNameError(lastNameExceedText);
    } else if (value.length === 0) {
      setLastNameError(lastNameBlankText);
    } else {
      setLastNameError("");
    }
  };

  const handleBioChange = (e) => {
    const { value } = e.target;
    setBio(value);
    setBioCharCount(value.length);

    if (value.length > maxBioChar) {
      setBioError(bioExceedText);
    } else {
      setBioError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sanitizedFirstName = validator.escape(firstName);
    const sanitizedLastName = validator.escape(lastName);
    const sanitizedBio = bio ? validator.escape(bio) : "";

    console.log("Sanitized first name:", sanitizedFirstName);
    console.log("Sanitized last name:", sanitizedLastName);
    console.log("Sanitized bio:", sanitizedBio);

    if (sanitizedFirstName.trim() === "") {
      setFirstNameError(firstNameBlankText);
      return;
    }

    if (sanitizedLastName.trim() === "") {
      setLastNameError(lastNameBlankText);
      return;
    }

    if (sanitizedFirstName.length > maxFirstNameChar) {
      setFirstNameError(firstNameExceedText);
      return;
    }

    if (sanitizedLastName.length > maxLastNameChar) {
      setLastNameError(lastNameExceedText);
      return;
    }

    if (sanitizedBio.length > maxBioChar) {
      setBioError(bioExceedText);
      return;
    }

    const updatedUser = {
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      bio: sanitizedBio,
    };

    try {
      const response = await axios.put(`/users/me/${user.sub}`, updatedUser);

      if (response.status === 200) {
        dispatch(setCurrentUser(response.data));
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      } else {
        console.error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred while updating the user profile", error);
    }
  };

  const handleClick = () => {
    navigate("/account");
  };

  if (!currentUser) {
    return (
      <div id="page-overview">
        <Navbar />
        <div id="page-container">
          <h1 id="not-logged">
            You are not logged in. You don't belong here...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div id="page-overview">
      <Navbar />
      <div id="page-container">

        <h1>Edit Profile Page</h1>
        <br/>
        {!currentUser.firstName || !currentUser.lastName ? <h2>Welcome to the forum! Please update your first and last name to continue.</h2> : null}

        <div id="edit-profile-container">

          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              id="bi-arrow-left"
              viewBox="0 0 16 16"
              onClick={handleClick}
          >
            <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>

          <form onSubmit={handleSubmit}>
            <div id="form-container">
              <label>
                First Name:
                <div className="input-form">
                  <input
                    type="text"
                    value={firstName}
                    //onChange={(e) => setFirstName(e.target.value)}
                    onChange={handleFirstNameChange}
                  />
                  <span
                    className={`char-remaining ${firstNameError && "error-message"}`}
                  >
                    {firstNameCharCount}/{maxFirstNameChar}
                  </span>
                </div>
                {firstNameError && (
                  <span className="error-message">{firstNameError}</span>
                )}
              </label>

              <label>
                Last Name:
                <div className="input-form">
                  <input
                    type="text"
                    value={lastName}
                    //onChange={(e) => setLastName(e.target.value)}
                    onChange={handleLastNameChange}
                  />
                  <span
                    className={`char-remaining ${lastNameError && "error-message"}`}
                  >
                    {lastNameCharCount}/{maxLastNameChar}
                  </span>
                </div>
                {lastNameError && (
                  <span className="error-message">{lastNameError}</span>
                )}
              </label>

              <label>
                Bio:
                <div className="input-form">
                  <textarea
                    value={bio}
                    //onChange={(e) => setBio(e.target.value)}
                    onChange={handleBioChange}
                  />
                  <span
                    className={`char-remaining ${bioError && "error-message"}`}
                  >
                    {bioCharCount}/{maxBioChar}
                  </span>
                </div>
                {bioError && <span className="error-message">{bioError}</span>}
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
