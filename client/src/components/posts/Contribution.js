import React from "react";
import "../../styles/contribution.css";
import { timeSince } from "../../utility/timeSince";
import UserImage from "../userInfo/UserImage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Contribution({ contribution }) {
  const { createdBy } = contribution;
  const userProfileURI = `/profile/${createdBy._id}`;
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate(userProfileURI);
  };

  return (
    <div className="cont-container">
      <UserImage user={createdBy} />
      <div className="cont-text-container">
        <div className="cont-text-header">
          <span className="cont-text-username" onClick={handleClick}>
            {createdBy.firstName} {createdBy.lastName}
          </span>
          <span className="cont-text-edit">
            <Link id="edit-post-link" to={`/edit-post/${contribution._id}`}>Edit Post</Link>
          </span>
          <span className="cont-text-date-info-">
            {timeSince(contribution.dateCreated)}
          </span>
        </div>
        <p className="cont-text-content">{contribution.text}</p>
      </div>
    </div>
  );
}

export default Contribution;
