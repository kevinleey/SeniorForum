import React from "react";
import { imageLinks } from "../../constants";
import "../../styles/user-image.css";

function UserImage({ user }) {
  return (
    <img
      id="user-image"
      src={user.picture ? user.picture : imageLinks.USER.USER_PICTURE_LINK}
      alt={imageLinks.USER.USER_PICTURE_TEXT}
    />
  );
}

export default UserImage;