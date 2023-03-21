import React from "react";
import "./NftCollectionLatestsBids.css"
import { v4 as uuidv4 } from "uuid";
function NftCollectionLatestsBids({latestBidsArray, bidsSectionDeleteSpace}) {
  return (
    <div style={bidsSectionDeleteSpace && {marginTop: "0px"}} className="nft-collection-overview-latest-bids-container">
      <div className="nft-collection-overview-latest-bids-title">
        Latests bids
      </div>
      <div className="nft-collection-overview-latest-bids-wrap">
        <div className="nft-collection-overview-latest-bids-subwrap">
          <div className="nft-collection-overview-latest-bids-scrolling-container">
            {latestBidsArray.map((element) => (
              <div key={uuidv4()} className="nft-collection-overview-bids">
                <div className="nft-collection-overview-bids-profile-pic">
                  <img
                    src={element.profilePicture}
                    alt="photo de profile enchères nft"
                  />
                </div>
                <div className="nft-collection-overview-bids-username-date-price-container">
                  <div className="nft-collection-overview-bids-username-and-date-container">
                    <div className="nft-collection-overview-bids-username">
                      {element.userName}
                    </div>
                    <div className="nft-collection-overview-bids-date">
                      {element.date}{" "}
                    </div>
                  </div>
                  <div className="nft-collection-overview-bids-price">
                    <div className="nft-collection-overview-bids-price-eth">
                      {element.priceEth} ETH
                    </div>
                    <div className="nft-collection-overview-bids-price-eur">
                      € {element.priceEur}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="nft-collection-overview-bids-buy-button">Buy Now</div>
        </div>
      </div>
    </div>
  );
}

export default NftCollectionLatestsBids;
