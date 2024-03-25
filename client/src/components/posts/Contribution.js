import React, { useState } from "react";
import "../../styles/contribution.css";
import { timeSince } from "../../utility/timeSince";
import UserImage from "../userInfo/UserImage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/users/userSlice";
import CommentForm from "../forms/CommentForm";
import { COMMENTS_RESOURCES } from "../../constants";

function Contribution({ contribution, isComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const { createdBy } = contribution;
  const userProfileURI = `/profile/${createdBy._id}`;
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const willShowEditButton = currentUser._id === createdBy._id && isComment;

  const handleToggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleUsernameClick = (event) => {
    navigate(userProfileURI);
  };

  return (
    <div className="cont-container">
      <UserImage user={createdBy} />
      <div className="cont-text-container">
        <div className="cont-text-header">
          <span className="cont-text-username" onClick={handleUsernameClick}>
            {createdBy.firstName} {createdBy.lastName}
          </span>
          <div className="cont-text-right">
            {willShowEditButton && !isEditing && (
              <span className="cont-text-edit" onClick={handleToggleEditing}>
                {COMMENTS_RESOURCES.COMMENTS_EDIT}
              </span>
            )}
            {willShowEditButton && isEditing && (
              <span className="cont-text-edit" onClick={handleToggleEditing}>
                {COMMENTS_RESOURCES.COMMENTS_CANCEL}
              </span>
            )}
            <span className="cont-text-date-info">
              {timeSince(contribution.dateCreated)}
            </span>
          </div>
        </div>
        {isEditing ? (
          <CommentForm
            existingComment={contribution}
            onSubmitSuccess={handleToggleEditing}
          />
        ) : (
          <p className="cont-text-content">{contribution.text}</p>
        )}
      </div>
    </div>
  );
}

export default Contribution;
