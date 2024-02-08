import React from "react";
import { imageLinks } from "../../constants";
import "../../styles/user-image.css";

function UserImage() {
  return (
    <img
      id="user-image"
      src={imageLinks.USER.USER_PICTURE_LINK}
      alt={imageLinks.USER.USER_PICTURE_TEXT}
    />
  );
}

export default UserImage;
