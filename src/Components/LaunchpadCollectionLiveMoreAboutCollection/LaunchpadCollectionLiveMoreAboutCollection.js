import React from "react";
import MoreAboutThisCollection from "../MoreAboutThisCollection/MoreAboutThisCollection";
import NftCollectionMoreAboutNft from "../NftCollectionMoreAboutNft/NftCollectionMoreAboutNft";
import "./LaunchpadCollectionLiveMoreAboutCollection.css";

function LaunchpadCollectionLiveMoreAboutCollection() {
  const dataBackend = {
    moreAboutThisCollection: [
      {
        description:
          "This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become. This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become.",
      },
    ],
  };
  return (
    <section>
      <MoreAboutThisCollection 
      moreAboutCollectionArray={dataBackend.moreAboutThisCollection}
      />
    </section>
  );
}

export default LaunchpadCollectionLiveMoreAboutCollection;
