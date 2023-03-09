import React, { useState } from "react";
import NftCollectionHeader from "../../Components/NftCollectionHeader/NftCollectionHeader";
import NftCollectionHistory from "../../Components/NftCollectionHistory/NftCollectionHistory";
import NftCollectionMoreAboutAthlete from "../../Components/NftCollectionMoreAboutAthlete/NftCollectionMoreAboutAthlete";
import NftCollectionMoreAboutNft from "../../Components/NftCollectionMoreAboutNft/NftCollectionMoreAboutNft";
import NftCollectionOverview from "../../Components/NftCollectionOverview/NftCollectionOverview";
import NftCollectionProperties from "../../Components/NftCollectionProperties/NftCollectionProperties";
import NftCollectionSubMenu from "../../Components/NftCollectionSubMenu/NftCollectionSubMenu";
import "./NftSingle.css";
const NftSingle = () => {
  const [isSubMenuClicked, setIsSubMenuClicked] = useState([
    true,
    false,
    false,
    false,
  ]);

  function handleClickSubMenuButton(e) {
    if (e.target.innerHTML === "Overview") {
      setIsSubMenuClicked([true, false, false, false]);
      return <NftCollectionOverview />;
    } else if (e.target.innerHTML === "Properties") {
      setIsSubMenuClicked([false, true, false, false]);
      return;
    } else if (e.target.innerHTML === "Bids") {
      setIsSubMenuClicked([false, false, true, false]);
      return;
    } else if (e.target.innerHTML === "Activity") {
      setIsSubMenuClicked([false, false, false, true]);
      return;
    }
  }

  return (
    <section className="nft-single-collection-page-container">
      <NftCollectionHeader />
      <div className="nft-single-collection-page-left-container">
        <div className="nft-single-collection-page-submenu-container">
          <NftCollectionSubMenu
            handleClickSubMenuButton={handleClickSubMenuButton}
            isSubMenuClicked={isSubMenuClicked}
          />
        </div>
        {isSubMenuClicked[0] && <NftCollectionOverview />}
        {isSubMenuClicked[1] && <NftCollectionProperties />}
        {isSubMenuClicked[3] && <NftCollectionHistory />}
        <div className="nft-single-collection-page-more-about-athlete-container">
          <NftCollectionMoreAboutAthlete />
        </div>
          <NftCollectionMoreAboutNft/>
      </div>
    </section>
  );
};

export default NftSingle;
