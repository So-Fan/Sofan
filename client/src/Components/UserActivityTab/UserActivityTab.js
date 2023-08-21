import React, { useEffect, useState } from "react";
import "./UserActivityTab.css";
const UserActivityTab = () => {
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
      <div className="useractivitytab-component">
        <div className="useractivitytab-table-container">
          <div></div>
          <div>NFT</div>
          <div>Price</div>
          <div>Quantity</div>
          <div></div>
          <div>from</div>
          <div>To</div>
          <div></div>
          <div>Date</div>
        </div>
        <div className="useractivitytab-content-container">
          {data?.map((tx) => (
            <div className="useractivitytab-content-container-wrap">
              <div className="useractivitytab-content-container-methods-wrap">
                <span>{tx.methods}</span>
              </div>
              <div className="useractivitytab-content-container-nft-wrap">
                <img src={tx.nft.image} alt="nft" />
                <div className="useractivitytab-content-container-nft-wrap-info-wrap">
                  <span>{tx.nft.name}</span>
                  <span>#{tx.nft.id}</span>
                </div>
              </div>
              <div className="useractivitytab-content-container-price-container">
                <div className="useractivitytab-content-container-price-wrap">
                  <span>{tx.price.eth} ETH</span>
                  <span>{tx.price.eur} €</span>
                </div>
              </div>
              <div className="useractivitytab-content-container-qty-wrap">
                <span>{tx.param.quantity}</span>
              </div>
              <div></div>
              <div className="useractivitytab-content-container-from-wrap">
                <span>{tx.from}</span>
              </div>
              <div>
                <span>{tx.to}</span>
              </div>
              <div></div>
              <div>
                <span>{tx.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserActivityTab;
