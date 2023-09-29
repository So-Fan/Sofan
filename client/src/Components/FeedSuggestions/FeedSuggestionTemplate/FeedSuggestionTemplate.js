import React from "react";
import "./FeedSuggestionTemplate.css";
import { Link } from "react-router-dom";
const FeedSuggestionTemplate = ({ name, type, athleteProfilePicture, id }) => {
  return (
    <Link to={`/athleteprofile/${id}`} className="feedsuggestions-content-container">
      <img className="feedsuggestions-content-avatar" src={athleteProfilePicture} alt="athlete profile" />
      <div>
        <span className="feedsuggestions-content-name">{name}</span>
        <span className="feedsuggestions-content-type">{type}</span>
      </div>
    </Link>
  );
};

export default FeedSuggestionTemplate;
