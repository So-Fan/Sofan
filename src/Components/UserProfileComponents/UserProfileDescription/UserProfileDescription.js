import React from "react";
import "./UserProfileDescription.css";
function UserProfileDescription({userDescription}) {
  return (
    <div className="user-description-container">
      {userDescription}
    </div>
  );
}

export default UserProfileDescription;
