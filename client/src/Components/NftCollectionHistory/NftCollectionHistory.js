import React from "react";
import "./NftCollectionHistory.css";
import { v4 as uuidv4 } from "uuid";
function NftCollectionHistory({history, ethPrice}) {
  
  return (
    <section className="nft-collection-history-container">
      <div className="nft-collection-history-wrap">
        {history.map((element) => (
          <div key={uuidv4()} className="nft-collection-history-bids">
            <div className="nft-collection-history-bids-profile-pic">
              <img
                src={element.profilePicture}
                alt="photo de profile enchères nft"
              />
            </div>
            <div className="nft-collection-history-bids-username-date-price-container">
              <div className="nft-collection-history-bids-username-and-date-container">
                <div className="nft-collection-history-bids-username">
                  {element.userName}
                </div>
                <div className="nft-collection-history-bids-date">
                  {element.date}
                </div>
              </div>
              <div className="nft-collection-history-bids-buy">acheter</div>
              <div className="nft-collection-history-bids-price">
                <div className="nft-collection-history-bids-price-eth">
                  {element.priceEth} ETH
                </div>
                <div className="nft-collection-history-bids-price-eur">
                  € {(element.priceEth * ethPrice).toLocaleString('fr-FR', {maximumFractionDigits: 3})}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NftCollectionHistory;
