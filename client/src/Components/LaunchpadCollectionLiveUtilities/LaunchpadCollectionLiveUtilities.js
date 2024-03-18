import React from "react";
import UtilitiesComponent from "../UtilitiesComponent/UtilitiesComponent";
import "./LaunchpadCollectionLiveUtilities.css";
import { v4 as uuidv4 } from "uuid";
function LaunchpadCollectionLiveUtilities({ utilitiesArray, loggedInUser }) {
  
  return (
    <section className="launchpad-collection-live-utilities-container">
      <div className="launchpad-collection-live-utilities-title">Utilité</div>
      {utilitiesArray && utilitiesArray.length > 0 ? (
        utilitiesArray.map((utility) => (
          <UtilitiesComponent
            key={uuidv4()}
            utility={utility}
            loggedInUser={loggedInUser.isLogged}
            unilityId={utility.id}
            utilityTitle={utility?.title}
            utilityStatus={utility?.claimed_status}
            utilityDescription={utility?.description}
            utilityDate={utility?.date ? new Date(utility.date.seconds * 1000).toDateString() : 'N/A'}
            launchpadCollectionLiveUtilities={true}
          />
        ))
      ) : (
        <p>Pas d'Utilité disponibles pour le moment.</p>
      )}
    </section>
  );
}

export default LaunchpadCollectionLiveUtilities;
