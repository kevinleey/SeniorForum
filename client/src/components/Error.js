import React from "react";
import { imageLinks } from "../constants";
import "../styles/error.css";

function Error({ message }) {
  return (
    <div id="error-container">
      <img
        id="error-icon"
        src={imageLinks.ERROR.ERROR_PICTURE_LINK}
        alt={imageLinks.ERROR.ERROR_PICTURE_TEXT}
      />
      <h1>Error :(</h1>
      <span>{message}</span>
    </div>
  );
}

export default Error;
