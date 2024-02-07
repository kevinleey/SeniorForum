import React from "react";
import { imageLinks } from "../../constants";
import { Link } from "react-router-dom";
import "../../styles/user-info-small.css";

function UserInfoSmall({ user }) {
  const userProfileURI = `/profile/${user._id}`;
  const handleProfileClick = (event) => {
    event.stopPropagation(); // Prevents the click event from propagating to the parent div
  };

  return (
    <div className="user-info-small">
      <img
        id="user-image"
        src={imageLinks.USER.USER_PICTURE_LINK}
        alt={imageLinks.USER.USER_PICTURE_TEXT}
      />
      <Link to={userProfileURI} className="user-name" onClick={handleProfileClick}>
        {user.firstName}
      </Link>
    </div>
  );
}

export default UserInfoSmall;
