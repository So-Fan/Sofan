import React, { useEffect, useState } from "react";
import "./UserOffersReceived.css";
import { redCrossOffers, greenCrossOffers } from "../../data/constants";
const UserOffersReceived = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = [
      {
        nft: {
          image:
            "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Rectangle%20131.png?alt=media&token=f394cf39-6fa3-475a-9f3e-9ac5a63c0027",
          name: "JCVD",
          id: "0",
        },
        price: {
          eth: "0.50",
          eur: "692.04",
        },
        methods: "Mint",
        param: {
          quantity: "1",
        },
        from: "Alexia Barrier",
        to: "Gr3goir3",
        time: "1 hour ago",
      },
      {
        nft: {
          image:
            "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Rectangle%20131.png?alt=media&token=f394cf39-6fa3-475a-9f3e-9ac5a63c0027",
          name: "JCVD",
          id: "0",
        },
        price: {
          eth: "0.50",
          eur: "692.04",
        },
        methods: "Mint",
        param: {
          quantity: "1",
        },
        from: "Alexia Barrier",
        to: "Gr3goir3",
        time: "1 hour ago",
      },
    ];
    setData(data);
  }, []);

  return (
    <>
      <div className="useroffersreceived-component">
        <div className="useroffersreceived-table-container">
          <div>NFT</div>
          <div></div>
          <div>from</div>
          <div className="useroffersreceived-table-container-offer">Offer</div>
          <div></div>
          <div>To</div>
          <div className="useroffersreceived-table-container-date">Date</div>
          <div></div>
          <div></div>
        </div>
        <div className="useroffersreceived-content-container">
          {data?.map((tx) => (
            <div className="useroffersreceived-content-container-wrap">
              <div className="useroffersreceived-content-container-nft-wrap">
                <img src={tx.nft.image} alt="nft" />
                <div className="useroffersreceived-content-container-nft-wrap-info-wrap">
                  <span>{tx.nft.name}</span>
                  <span>#{tx.nft.id}</span>
                </div>
              </div>
              <div></div>
              <div className="useroffersreceived-content-container-from-wrap">
                <span>{tx.from}</span>
              </div>
                <div className="useroffersreceived-content-container-offer-wrap">
                  <span>{tx.price.eth} ETH</span>
                  <span>{tx.price.eur} €</span>
                </div>
              <div></div>
              <div>
                <span>{tx.to}</span>
              </div>
              <div>
                <span className="useroffersreceived-content-container-date">{tx.time}</span>
              </div>
              <div></div>
              <div className="useroffersreceived-content-container-bid">
                <img src={redCrossOffers} alt="refuse bid" />
                <img src={greenCrossOffers} alt="accept bid" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserOffersReceived;
