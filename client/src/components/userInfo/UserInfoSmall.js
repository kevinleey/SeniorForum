import React from "react";
import { Link } from "react-router-dom";
import UserImage from "./UserImage";
import "../../styles/user-info-small.css";

function UserInfoSmall({ user }) {
  const userProfileURI = `/profile/${user._id}`;
  const handleProfileClick = (event) => {
    event.stopPropagation(); // Prevents the click event from propagating to the parent div
  };

  return (
    <div className="user-info-small">
      <UserImage />
      <Link
        to={userProfileURI}
        className="user-name"
        onClick={handleProfileClick}
      >
        {user.firstName}
      </Link>
    </div>
  );
}

export default UserInfoSmall;
