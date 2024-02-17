import React from "react";
import { imageLinks } from "../../constants";
import "../../styles/user-image.css";
import { useNavigate } from "react-router-dom";

function UserImage({ user }) {
  const userProfileURI = `/profile/${user._id}`;
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.stopPropagation();
    navigate(userProfileURI);
  }

  return (
    <img
        onClick={handleClick}
        id="user-image"
        src={imageLinks.USER.USER_PICTURE_LINK}
        alt={imageLinks.USER.USER_PICTURE_TEXT}
    />
  );
}

export default UserImage;
