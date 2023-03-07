import React from "react";
import "./NftCollectionMoreAboutAthlete.css";
function NftCollectionMoreAboutAthlete() {
  const backendDataNftCollection = {
    moreAbout: [
      {
        picture:"https://img.20mn.fr/Y3a30zR7TLqF2hdlobUm2w/648x360_nicoise-alexia-barrier-boucle-vendee-globe-111-jours-17-heures-8-minutes-dimanche-28-fevrier.jpg",
        sportTitle: "Skipper",
        fullName: "Alexia Barrier",
        description:
          "Alexia Barrier is a French professional sailor and skipper. She has competed in several sailing races, including the Solitaire du Figaro and the Vendée Globe. She is the first woman to have completed the Vendée Globe solo non-stop race, finishing in 16th place. She is also the founder of the Sail & Help association, which promotes environmental protection and education through sailing.",
        fansNumber: "",
      },
    ],
  };
  return (
    <section className="nft-collection-more-about-athlete">
      <div className="nft-collection-more-about-athlete-picture-container">
        <img src={backendDataNftCollection.moreAbout[0].picture} alt="photo athlete" />
      </div>
    </section>
  );
}

export default NftCollectionMoreAboutAthlete;
