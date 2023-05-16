import React, {useState} from "react";
import "./SportsFavSelect.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";

function SportsFavSelect() {
    function handleSelectSportsClick() {
        
    }
  return (
    <>
      <div className="signup-user-sports-fav-select-wrap">
        <div className="signup-user-sports-fav-select-previous-step">
          <img src={previousArrow} alt="Etape précédente" />
        </div>
        <div className="signup-user-sports-fav-select-title">
          Sélectionnez vos sports favoris
        </div>
        <div className="signup-user-sports-fav-select-description">
          Pick the sports you're most passionate about, as this will help you
          connect with like-minded individuals and enhance your experience
          within our community
        </div>
        <div className="signup-user-sports-fav-select-sports-list-container">
    <div className="signup-user-sports-fav-select-sports-selection">Tennis</div>
        <div className="signup-user-sports-fav-select-sports-selection">Tennis</div>
        <div className="signup-user-sports-fav-select-sports-selection">Tennis</div>
        <div className="signup-user-sports-fav-select-sports-selection">Tennis</div>
        <div className="signup-user-sports-fav-select-sports-selection">Tennis</div>
        <div className="signup-user-sports-fav-select-sports-selection">Tennis</div>
        <div className="signup-user-sports-fav-select-sports-selection">Voile</div>
        <div className="signup-user-sports-fav-select-sports-selection">Voile</div>
        <div className="signup-user-sports-fav-select-sports-selection">Voile</div>
        <div className="signup-user-sports-fav-select-sports-selection">Voile</div>
        <div className="signup-user-sports-fav-select-sports-selection">Voile</div>
        <div className="signup-user-sports-fav-select-sports-selection">Voile</div>
        <div className="signup-user-sports-fav-select-sports-selection">Voile</div>
        <div className="signup-user-sports-fav-select-sports-selection">Voile</div>
        </div>
      </div>
    </>
  );
}

export default SportsFavSelect;
