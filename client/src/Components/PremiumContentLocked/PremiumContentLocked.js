import React from "react";
import { Link } from "react-router-dom";
import "./PremiumContentLocked.css";
import lockerLogo from "../../Assets/Image/lockerlogo.svg";
function PremiumContentLocked({postCreatorId}) {
  return (
    <div className="premium-content-locked-container">
      <div className="premium-content-locked-locker-logo">
        <img src={lockerLogo} alt="locker logo premium content" />
      </div>
      <div className="premium-content-locked-cta-premium-content">
        Acheter le NFT pour débloquer le contenu premium de cet athlète.
      </div>
        <Link to={`/nftsingle/${postCreatorId}`}>
        <button className="premium-content-locked-button">Voir le NFT</button>
        </Link>
    </div>
  );
}

export default PremiumContentLocked;
