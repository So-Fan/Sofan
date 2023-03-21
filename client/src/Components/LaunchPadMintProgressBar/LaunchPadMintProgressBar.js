import React from "react";
import "./LaunchPadMintProgressBar.css";
function LaunchPadMintProgressBar({nftMintedCalculated,counterNftMinted, totalNftMintable}) {
  return (
    <>
      <div className="launchpad-collection-live-header-right-mint-module-progress-bar-background">
        <div
          style={{ width: `${nftMintedCalculated}%` }}
          className="launchpad-collection-live-header-right-mint-module-progress-bar"
        ></div>
      </div>
      <div className="launchpad-collection-live-header-right-mint-module-total-minted">
        <div className="launchpad-collection-live-header-right-mint-module-total-minted-title">
          Total minted
        </div>
        <div className="launchpad-collection-live-header-right-mint-module-total-minted-number">
          {counterNftMinted} / {totalNftMintable}
        </div>
      </div>
    </>
  );
}

export default LaunchPadMintProgressBar;
