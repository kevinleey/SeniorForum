import React from "react";
import { Link } from "react-router-dom";
import UserImage from "./UserImage";
import "../../styles/user-info-small.css";

function UserInfoSmall({ user }) {
  const userProfileURI = `/profile/${user._id}`;
  const handleProfileClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="user-info-small">
      <UserImage user={user} />
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
