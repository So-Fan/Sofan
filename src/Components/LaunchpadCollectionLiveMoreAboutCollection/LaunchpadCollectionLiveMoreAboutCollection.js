import React from "react";
import MoreAboutThisCollection from "../MoreAboutThisCollection/MoreAboutThisCollection";
import "./LaunchpadCollectionLiveMoreAboutCollection.css";

function LaunchpadCollectionLiveMoreAboutCollection({moreAboutCollectionArray
}) {
  const dataBackend = {
  };
  return (
    <section>
      <MoreAboutThisCollection 
      moreAboutCollectionArray={moreAboutCollectionArray}
      />
    </section>
  );
}

export default LaunchpadCollectionLiveMoreAboutCollection;
