import React, { useState } from "react";
import "./NftCollectionMoreAboutAthlete.css";

function NftCollectionMoreAboutAthlete() {
//   const [isExpanded, setIsExpanded] = useState(true);

  const backendDataNftCollection = {
    moreAbout: [
      {
        picture: "https://i.imgur.com/Z7rHdVv.png",
        sportTitle: "Skipper",
        fullName: "Alexia Barrier",
        description:
          "Alexia Barrier is a French professional sailor and skipper. She has competed in several sailing races, including the Solitaire du Figaro and the Vendée Globe. She is the first woman to have completed the Vendée Globe solo non-stop race, finishing in 16th place. She is also the founder of the Sail & Help association, which promotes environmental protection and education through sailing.",
        fansNumber: "",
      },
    ],
  };

//   const handleToggle = () => {
//     setIsExpanded((prevState) => !prevState);
//   };

  return (
    <section className="nft-collection-more-about-athlete-container">
      <div
        className="nft-collection-more-about-athlete-wrap"
      >
        <div className="nft-collection-more-about-athlete-picture-container">
          <img
            src={backendDataNftCollection.moreAbout[0].picture}
            alt="photo athlete"
          />
        </div>
        <div className="nft-collection-more-about-presentation-container">
          {/* <h2>{backendDataNftCollection.moreAbout[0].fullName}</h2> */}
          {/* <p>{backendDataNftCollection.moreAbout[0].description}</p> */}
        </div>
      </div>
      {/* <button onClick={handleToggle}>
        {isExpanded ? "Show less" : "Show more"}
      </button> */}
    </section>
  );
}

export default NftCollectionMoreAboutAthlete;
