import React, { useState, useEffect } from "react";
import "./FeedSuggestions.css";
import { Link } from "react-router-dom";
import DataSuggestions from "./fakedata/dataSuggestions.json";
import FeedSuggestionTemplate from "./FeedSuggestionTemplate/FeedSuggestionTemplate";
import { db } from "../../Configs/firebase";
import { query, where, collection, getDocs, limit } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const FeedSuggestions = ({
  handleAthleteSuggestionClick,
  suggestionsAthletes,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [displaySuggestComponent, setDisplaySuggestComponent] = useState("");

  return (
    <div
      style={{ display: displaySuggestComponent }}
      className="feedsuggestions-component"
    >
      <div className="feedlaunchpad-header-container">
        <span className="feedlaunchpad-header-title">Suggestions</span>
        <Link
          onClick={handleAthleteSuggestionClick}
          // to="/Launchpad"
          className="feedlaunchpad-header-button feedlaunchpad-header-button-suggestion"
        >
          Voir plus
        </Link>
      </div>
      {suggestionsAthletes.map((suggestion) => (
        <FeedSuggestionTemplate
          key={uuidv4()}
          name={suggestion.display_name}
          type={suggestion.sport}
          athleteProfilePicture={suggestion.profile_avatar}
          id={suggestion.id}
        />
      ))}
    </div>
  );
};

export default FeedSuggestions;
