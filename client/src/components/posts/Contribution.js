import React from "react";
import "../../styles/contribution.css";
import { timeSince } from "../../utility/timeSince";
import UserImage from "../userInfo/UserImage";

function Contribution({ contribution }) {
  const { createdBy } = contribution;

  return (
    <div className="cont-container">
      <UserImage />
      <div className="cont-text-container">
        <div className="cont-text-header">
          <span className="cont-text-username">
            {createdBy.firstName} {createdBy.lastName}
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
