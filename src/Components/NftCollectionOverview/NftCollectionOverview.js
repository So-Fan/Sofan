import React from "react";
import "./NftCollectionOverview.css";
import UtilitiesComponent from "../UtilitiesComponent/UtilitiesComponent";
import { v4 as uuidv4 } from "uuid";

function NftCollectionOverview({
  utilitiesArray,
  moreAboutCollectionArray,
  latestBidsArray,
}) {
  return (
    <section className="nft-collection-overview-container">
      <div className="nft-collection-overview-utilities-container">
        <div className="nft-collection-overview-utilities-title">Utilities</div>
        {utilitiesArray.map((element) => (
          <UtilitiesComponent
            key={uuidv4()}
            utilitiesTitle={element.title}
            utilitiesStatus={element.status}
            utilitiesDescription={element.description}
            utilitiesDate={element.date}
          />
        ))}
      </div>
      <div className="nft-collection-overview-price-evolution-container">
        <div className="nft-collection-overview-price-evolution-title">
          Price evolution
        </div>
        <div className="nft-collection-overview-price-evolution-chart"></div>
      </div>
      <div className="nft-collection-overview-more-about-collection-container">
        <div className="nft-collection-overview-more-about-collection-title">
          More about this collection
        </div>
        <div className="nft-collection-overview-more-about-collection-description">
          {moreAboutCollectionArray.map((element) => element.description)}
        </div>
      </div>
      <div className="nft-collection-overview-latest-bids-container">
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
            <div className="nft-collection-overview-bids-buy-button">
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NftCollectionOverview;
