import React from "react";
import MoreAboutThisCollection from "../MoreAboutThisCollection/MoreAboutThisCollection";
import "./LaunchpadCollectionLiveMoreAboutCollection.css";

function LaunchpadCollectionLiveMoreAboutCollection({moreAboutCollectionArray, knowMoreAboutCollection
}) {
  const dataBackend = {
  };
  return (
    <section>
      <MoreAboutThisCollection 
      moreAboutCollectionArray={moreAboutCollectionArray}
      knowMoreAboutCollection={knowMoreAboutCollection}
      />
    </section>
  );
}

export default LaunchpadCollectionLiveMoreAboutCollection;
