import React, { useEffect, useState } from "react";
import "./UserOffersMade.css"
const UserOffersMade = () => {
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
        status: "Pending",
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
        status: "Cancelled",
      },
    ];
    setData(data);
  }, []);

  return (
    <>
      <div className="useroffersmade-component">
        <div className="useroffersmade-table-container">
          <div>NFT</div>
          <div className="useroffersmade-table-container-offer">Offer</div>
          <div></div>
          <div>from</div>
          <div>To</div>
          <div>Status</div>
          <div className="useroffersmade-table-container-date">Date</div>
        </div>
        <div className="useroffersmade-content-container">
          {data?.map((tx) => (
            <div className="useroffersmade-content-container-wrap">
              <div className="useroffersmade-content-container-nft-wrap">
                <img src={tx.nft.image} alt="nft" />
                <div className="useroffersmade-content-container-nft-wrap-info-wrap">
                  <span>{tx.nft.name}</span>
                  <span>#{tx.nft.id}</span>
                </div>
              </div>
              <div className="useroffersmade-content-container-offer-wrap">
                <span>{tx.price.eth} ETH</span>
                <span>{tx.price.eur} €</span>
              </div>
              <div></div>
              <div className="useroffersmade-content-container-from-wrap">
                <span>{tx.from}</span>
              </div>
              <div>
                <span>{tx.to}</span>
              </div>
              <div>
                <span>{tx.status}</span>
              </div>
              <div>
                <span className="useroffersmade-content-container-date">
                  {tx.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserOffersMade;
