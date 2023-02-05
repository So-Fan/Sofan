import React from "react";
import Carroussel from "./Carroussel/Carroussel";
import "./FavAthlete.css";
const FavAthlete = () => {
  return (
    <div className="favAthlete-container">
      <div className="favAthlete-horizontal"></div>
      <div className="favAthlete-wrap">
        <div className="favAthlete-subwrap">
          <span>Vos sportifs préférés</span>
          <a href="/favathlete-details"> Voir plus</a>
        </div>
        <Carroussel />
      </div>
      <div className="favAthlete-horizontal"></div>
    </div>
  );
};

export default FavAthlete;
