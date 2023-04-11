import React, { useState, useEffect } from "react";
import "./FeedSuggestions.css";
import { Link } from "react-router-dom";
import DataSuggestions from "./fakedata/dataSuggestions.json";
import FeedSuggestionTemplate from "./FeedSuggestionTemplate/FeedSuggestionTemplate";
import { db } from "../../Configs/firebase";
import { collection, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const FeedSuggestions = ({handleAthleteSuggestionClick}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [displaySuggestComponent, setDisplaySuggestComponent] = useState("")
  const suggestionCollectionRef = collection(db, "feed_suggestion");
  useEffect(() => {
    const getSuggestions = async () => {
      const data = await getDocs(suggestionCollectionRef);

      setSuggestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getSuggestions();
  }, []);
  
  useEffect(() => {
if (suggestions.length === 0) {
  setDisplaySuggestComponent("none")
} else if (suggestions.length >= 1 ){
  setDisplaySuggestComponent("")
}
  }, [suggestions])
  

  return (
    <div style={{display: displaySuggestComponent}} className="feedsuggestions-component">
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
      {suggestions.map((suggestion) => (
        <FeedSuggestionTemplate
          key={uuidv4()}
          name={suggestion.name}
          type={suggestion.type}
          athleteProfilePicture={suggestion.avatar}
          id={suggestion.id}
        />
      ))}
    </div>
  );
};

export default FeedSuggestions;
