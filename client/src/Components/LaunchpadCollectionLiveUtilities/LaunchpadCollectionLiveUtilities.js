import React from "react";
import UtilitiesComponent from "../UtilitiesComponent/UtilitiesComponent";
import "./LaunchpadCollectionLiveUtilities.css";
import { v4 as uuidv4 } from "uuid";
function LaunchpadCollectionLiveUtilities({
  utilitiesArray
}) {


  return (
    <section className="launchpad-collection-live-utilities-container">
      <div className="launchpad-collection-live-utilities-title">Utilities</div>
   {utilitiesArray.map((element) => (
          <UtilitiesComponent
            key={uuidv4()}
            utilitiesTitle={element.title}
            utilitiesStatus={element.status}
            utilitiesDescription={element.description}
            utilitiesDate={element.date}
            launchpadCollectionLiveUtilities={true}
          />
        ))}
    </section>
  );
}

export default LaunchpadCollectionLiveUtilities;
