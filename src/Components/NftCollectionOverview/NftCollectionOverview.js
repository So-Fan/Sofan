import React from "react";
import "./NftCollectionOverview.css";
import UtilitiesComponent from "../UtilitiesComponent/UtilitiesComponent";
import { v4 as uuidv4 } from "uuid";

function NftCollectionOverview() {
  const dataBackendNftCollectionOverview = {
    utilities: [
      {
        title: "Meeting with Alexia",
        status: "Indisponible",
        description:
          "At the end of the Vendée Globe 2023, 15/400 of the holders of this NFT will have the chance to meet Alexia Barrier personally at the finish of the coursemaklemlakemazlkmalzkazemlkazemleakazlmekazelmaezkaz",
        date: "July 9th 2023",
      },
      {
        title: "3 online VIP live ",
        status: "Disponible",
        description:
          "Have access with all other members to 3 live important events during the entire competition, at three key times.",
        date: "July 9th / 15th / 28th 2023",
      },
      {
        title: "Alexia Barrier special merch",
        status: "Indisponible",
        description:
          "Receive your new collection t-shirt, signed by Alexia herself at the end of the race. The t-shirts will be sent 1 week after the end of the race.",
        date: "August 7th 2023",
      },
    ],
    moreAboutCollection: [
      {
        description:
          "This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become. This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become.",
      },
    ],
    lastestBids: [
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
    <section className="nft-collection-overview-container">
      <div className="nft-collection-overview-utilities-container">
        <div className="nft-collection-overview-utilities-title">Utilities</div>
        {dataBackendNftCollectionOverview.utilities.map((element) => (
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
          {dataBackendNftCollectionOverview.moreAboutCollection.map(
            (element) => element.description
          )}
        </div>
      </div>
      <div className="nft-collection-overview-latest-bids-container">
        <div className="nft-collection-overview-latest-bids-title">
          Latest bids
        </div>
        <div className="nft-collection-overview-latest-bids-wrap">
          <div className="nft-collection-overview-latest-bids-subwrap">
            <div className="nft-collection-overview-latest-bids-scrolling-container">
              {dataBackendNftCollectionOverview.lastestBids.map((element) => (
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
