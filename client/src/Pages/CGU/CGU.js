import React, { useEffect } from "react";
import "./CGU.css";

function CGU() {
  useEffect(() => {
    // Désactiver le scroll au chargement
    window.scrollTo(0, 0);
    // Réactiver le scroll
  }, []);
  return (
    <div className="cgu-page-container">
      {/* <div className="cgu-title">Conditions Générales d'Utilisation</div> */}
      <iframe src="https://docs.google.com/document/d/e/2PACX-1vSwzQla10bfSCB1l2DgNkyoyAA6D6FVE42xNXfurMSzH9Zzt--thw5uwIZQ1s6vYRkNJJX1S4C4O33r/pub?embedded=true"></iframe>
    </div>
  );
}

export default CGU;
