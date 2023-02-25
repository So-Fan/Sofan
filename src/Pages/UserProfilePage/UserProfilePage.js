import React, { useState, useEffect } from "react";
import BannerAndProfilePic from "../../Components/BannerAndProfilePic/BannerAndProfilePic";
import FormulatedOffers from "../../Components/UserProfileComponents/FormulatedOffers/FormulatedOffers";
import ReceivedOffers from "../../Components/UserProfileComponents/ReceivedOffers/ReceivedOffers";
import UserActivity from "../../Components/UserProfileComponents/UserActivity/UserActivity";
import UserNameAndStats from "../../Components/UserProfileComponents/UserNameAndStats/UserNameAndStats";
import UserProfileDescription from "../../Components/UserProfileComponents/UserProfileDescription/UserProfileDescription";
import "./UserProfilePage.css";

function UserProfilePage() {
  const [isNftCollectedClicked, setIsNftCollectedClicked] = useState(false);
  const [isActivityClicked, setIsActivityClicked] = useState(false);
  const [isFormulatedOffersClicked, setIsFormulatedOffersClicked] =
    useState(true);
  const [isReceivedOffersClicked, setIsReceivedOffersClicked] = useState(false);
  const [stringOffersReceivedFrom, setstringOffersReceivedFrom] = useState();
  const [stringOffersMadeFrom, setStringOffersMadeFrom] = useState()
  const stateCategory = [
    isNftCollectedClicked,
    isActivityClicked,
    isFormulatedOffersClicked,
    isReceivedOffersClicked,
  ];
  function displayCategory() {
    if (stateCategory[0] === true) {
      return "NFT Collectés";
    } else if (stateCategory[1] === true) {
      return <UserActivity />;
    } else if (stateCategory[2] === true) {
      return <FormulatedOffers userFrom={stringOffersMadeFrom} />;
    } else if (stateCategory[3] === true) {
      return <ReceivedOffers userFrom={stringOffersReceivedFrom} />;
    }
  }
  useEffect(() => {
    const data = {
      received: [{ from: "DonOfSomething", to: "" }],
      made: [{ from: "you", to: "" }],
    };
    // limited string length offers received from
    if (data.received[0].from.length > 9) {
      const limitedOffersReceivedFromBegin = data.received[0].from.slice(0, 4);
      const limitedOffersReceivedFromEnd = data.received[0].from.slice(
        data.received[0].from.length - 3,
        data.received[0].from.length
      );
      const concatOffersReceivedFrom =
        limitedOffersReceivedFromBegin + "..." + limitedOffersReceivedFromEnd;
      setstringOffersReceivedFrom(concatOffersReceivedFrom);
    } else {
      setstringOffersReceivedFrom(data.received[0].from);
    }
    // limited string length offers made from
    if (data.made[0].from.length > 9) {
      const limitedOffersMadeFromBegin = data.made[0].from.slice(0, 4);
      const limitedOffersMadeFromEnd = data.made[0].from.slice(
        data.made[0].from.length - 3,
        data.made[0].from.length
      );
      const concatOffersMadeFrom = limitedOffersMadeFromBegin + "..." + limitedOffersMadeFromEnd
      setStringOffersMadeFrom(concatOffersMadeFrom)
    } else {
      setStringOffersMadeFrom(data.made[0].from)
    }
  }, []);
  return (
    <>
      <section className="userprofilepage-container">
        <div className="userheader-container">
          <BannerAndProfilePic />
          <div className="user-content-activity-nft">
            <div className="username-and-stats-component">
              <UserNameAndStats />
            </div>
            <div className="userprofile-description-component">
              <UserProfileDescription />
            </div>
            {displayCategory()}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfilePage;
