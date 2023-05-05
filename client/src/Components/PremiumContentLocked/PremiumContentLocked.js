import React from "react";
import "./PremiumContentLocked.css";
import lockerLogo from "../../Assets/Image/lockerlogo.svg";
function PremiumContentLocked() {
  return (
    <div className="premium-content-locked-container">
      <div className="premium-content-locked-locker-logo">
        <img src={lockerLogo} alt="locker logo premium content" />
      </div>
      <div className="premium-content-locked-cta-premium-content">
        Buy an NFT to unlock the premium content from this athlete
      </div>
      <a href="/nftsingle">
        <button className="premium-content-locked-button">See NFT</button>
      </a>
    </div>
  );
}

export default PremiumContentLocked;
