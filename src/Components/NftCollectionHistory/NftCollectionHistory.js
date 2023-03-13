import React from "react";
import "./NftCollectionHistory.css";
import { v4 as uuidv4 } from "uuid";
function NftCollectionHistory() {
    // concat string length
  const dataBackendNftCollectionHistory = {
    history: [
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "3 weeks ago ",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
        {
          profilePicture: "https://i.imgur.com/cCVIcNS.png",
          userName: "DonOfSomething",
          date: "3 weeks ago ",
          priceEth: 0.91,
          priceEur: 1267.53,
        },
        {
          profilePicture: "https://i.imgur.com/cCVIcNS.png",
          userName: "DonOfSomething",
          date: "3 weeks ago ",
          priceEth: 0.91,
          priceEur: 1267.53,
        },
        {
          profilePicture: "https://i.imgur.com/cCVIcNS.png",
          userName: "DonOfSomething",
          date: "3 weeks ago ",
          priceEth: 0.91,
          priceEur: 1267.53,
        },
        {
          profilePicture: "https://i.imgur.com/cCVIcNS.png",
          userName: "DonOfSomething",
          date: "3 weeks ago ",
          priceEth: 0.91,
          priceEur: 1267.53,
        },
        {
          profilePicture: "https://i.imgur.com/cCVIcNS.png",
          userName: "DonOfSomething",
          date: "3 weeks ago ",
          priceEth: 0.91,
          priceEur: 1267.53,
        },
        {
          profilePicture: "https://i.imgur.com/cCVIcNS.png",
          userName: "DonOfSomething",
          date: "3 weeks ago ",
          priceEth: 0.91,
          priceEur: 1267.53,
        },
    ],
  };
  return (
    <section className="nft-collection-history-container">
      <div className="nft-collection-history-wrap">
        {dataBackendNftCollectionHistory.history.map((element) => (
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
                  € {element.priceEur}
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
