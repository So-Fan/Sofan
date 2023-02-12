import React from "react";
import "./FeedSuggestionTemplate.css";
import { Link } from "react-router-dom";
const FeedSuggestionTemplate = ({ name, type, athleteProfilePicture, id }) => {
  return (
    <Link to={id} className="feedsuggestions-content-container">
      <img src={athleteProfilePicture} alt="athlete profile" />
      <div>
        <span className="feedsuggestions-content-name">{name}</span>
        <span className="feedsuggestions-content-type">{type}</span>
      </div>
    </Link>
  );
};

export default FeedSuggestionTemplate;
