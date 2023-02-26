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
    useState(false);
  const [isReceivedOffersClicked, setIsReceivedOffersClicked] = useState(true);
  const [stringOffersReceivedFrom, setstringOffersReceivedFrom] = useState([]);
  const [stringOffersMadeFrom, setStringOffersMadeFrom] = useState();
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
      userPageInfo: {
        username: "Gr3goir3",
        followingAthletes: 145,
        athleteSupporting: 15,
        nftOwned: 159,
      },
      received: [
        {
          from: "DonOfSomething",
          nftTitle: "Explore the World with Alexia",
          nftId: "#393",
          nftPriceEth: "0.50009",
          date: "1 hours ago",
        },
        {
          from: "AlexiaBarrier",
          nftTitle: "Explore the World with Voile",
          nftId: "#394",
          nftPriceEth: "0.80",
          date: "4 years ago",
        },
      ],
      made: [{ from: "you", to: "" }],
    };
    // caractères maximum à concat pour le prix en eth
    function concatStringFromTo(string) {
      if (string.length > 9) {
        const limitedOffersReceivedFromBegin = string.slice(0, 4);
        const limitedOffersReceivedFromEnd = string.slice(
          string.length - 3,
          string.length
        );
        const concatOffersReceivedFrom =
          limitedOffersReceivedFromBegin + "..." + limitedOffersReceivedFromEnd;
        return concatOffersReceivedFrom;
      } else {
        return string;
      }
    }
    function createArray(state, setState, data, arrayConcat, index) {
      let stringFrom;
      let stringTo;
      let stringNftTitle;
      const tempStringFrom = concatStringFromTo(data?.received[index]?.from);
      stringFrom = tempStringFrom;

      const tempStringTo = concatStringFromTo(data.userPageInfo.username);
      stringTo = tempStringTo;
      if (data.received[index].nftTitle.length > 28) {
        const nftTitleBegin = data.received[index].nftTitle.slice(0, 29);
        const concatNftTitle = nftTitleBegin + "...";
        stringNftTitle = concatNftTitle;
      } else {
        stringNftTitle = data.received[index].nftTitle;
      }
      const tempObj = {
        from: stringFrom,
        nftTitle: stringNftTitle,
        to: stringTo,
      };
      return tempObj
    }
    const tempArrayUserProfilePage = [];
    for (let i = 0; i < data.received.length; i++) {
     const tempObjPartial = createArray(
        stringOffersReceivedFrom,
        setstringOffersReceivedFrom,
        data,
        tempArrayUserProfilePage,
        i
      );
      const tempDate = data.received[i].date
      const tempId = data.received[i].nftId
      const tempPriceEth = data.received[i].nftPriceEth
      const tempObjFinal = {
        ...tempObjPartial, date: tempDate, nftId: tempId, priceEth: tempPriceEth
      }

      tempArrayUserProfilePage.push(tempObjFinal)
    }
    setstringOffersReceivedFrom(tempArrayUserProfilePage)
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
