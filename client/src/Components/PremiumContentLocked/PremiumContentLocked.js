import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PremiumContentLocked.css";
import lockerLogo from "../../Assets/Image/lockerlogo.svg";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../Configs/firebase";
function PremiumContentLocked({ postCreatorId }) {
  const [displayName, setDisplayName] = useState(null);
  const getPostCreatorDisplayName = async (uid) => {
    try {
      if (!uid) {
        console.log("UID is undefined or null");
        return null;
      }

      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data().display_name; // Retourne uniquement le champ "display_name"
      } else {
        console.log("No such user!");
        return null;
      }
    } catch (error) {
      console.log("Error getting user data:", error);
    }
  };
  useEffect(() => {
    const fetchDisplayName = async () => {
      const name = await getPostCreatorDisplayName(postCreatorId);
      setDisplayName(name);
    };

    fetchDisplayName();
  }, [postCreatorId]);
  return (
    <div className="premium-content-locked-container">
      <div className="premium-content-locked-locker-logo">
        <img src={lockerLogo} alt="locker logo premium content" />
      </div>
      <div className="premium-content-locked-cta-premium-content">
        Acheter le NFT pour débloquer le contenu premium de{" "}
        <Link style={{textDecoration:"none"}} to={`/athleteprofile/${postCreatorId}/#nftcollections`}>
          <span className="premium-content-locked-cta-premium-content-display-name">
            {displayName}
          </span>
          
        </Link>
      </div>
      <Link to={`/athleteprofile/${postCreatorId}/#nftcollections`}>
        <button className="premium-content-locked-button">Voir le NFT</button>
      </Link>
    </div>
  );
}

export default PremiumContentLocked;
