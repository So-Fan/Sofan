import React, { useState, useEffect } from "react";
import BannerAndProfilePic from "../../Components/BannerAndProfilePic/BannerAndProfilePic";
import NftCard from "../../Components/NftCard/NftCard";
import ProfileSubMenu from "../../Components/ProfileSubMenu/ProfileSubMenu";
import SortBySelector from "../../Components/SortBySelector/SortBySelector";
import FormulatedOffers from "../../Components/UserProfileComponents/FormulatedOffers/FormulatedOffers";
import ReceivedOffers from "../../Components/UserProfileComponents/ReceivedOffers/ReceivedOffers";
import UserActivity from "../../Components/UserProfileComponents/UserActivity/UserActivity";
import UserNameAndStats from "../../Components/UserProfileComponents/UserNameAndStats/UserNameAndStats";
import UserProfileDescription from "../../Components/UserProfileComponents/UserProfileDescription/UserProfileDescription";
import "./UserProfilePage.css";

function UserProfilePage({
  setIsUSerProfileSeortBySelectorClicked,
  isUSerProfileSeortBySelectorClicked,
}) {
  const [isProfileSubMenuButtonClicked, setIsProfileSubMenuButtonClicked] =
    useState([true, false, false, false]);
  const [dataConcat, setDataConcat] = useState(); // objet de tableau d'objet
  function displayCategory() {
    if (isProfileSubMenuButtonClicked[0] === true) {
      return (
        <>
          <SortBySelector
            setIsUSerProfileSeortBySelectorClicked={
              setIsUSerProfileSeortBySelectorClicked
            }
            isUSerProfileSeortBySelectorClicked={
              isUSerProfileSeortBySelectorClicked
            }
          />
          <NftCard userFrom={dataConcat?.collected} />
        </>
      );
    } else if (isProfileSubMenuButtonClicked[1] === true) {
      return <UserActivity userFrom={dataConcat?.activities} />;
    } else if (isProfileSubMenuButtonClicked[2] === true) {
      return <FormulatedOffers userFrom={dataConcat?.made} />;
    } else if (isProfileSubMenuButtonClicked[3] === true) {
      return <ReceivedOffers userFrom={dataConcat?.received} />;
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
      made: [
        {
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.50009",
          from: "you",
          to: "Gr3goir3",
          status: "Pending",
          date: "5 months ago",
        },
        {
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.50009",
          from: "you",
          to: "Gr3goir3",
          status: "Pending",
          date: "5 months ago",
        },
      ],
      activities: [
        {
          function: "Mint",
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.50009",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
        },
        {
          function: "Mint",
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.50009",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
        },
      ],
      collected : [
        {
          athleteName: "Alexia Barrier",
          nftTitle: "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864"
        },
      ]
    };
    // Pour opti function concatStringFromTo(string, maxLentgth, from0To_NUMBER_, from_NUMBER_toEnd)
    function concatStringFromTo(string) {
      if (string.length > 9) {
        const stringBegin = string.slice(0, 4);
        const stringEnd = string.slice(string.length - 3, string.length);
        const concatString = stringBegin + "..." + stringEnd;
        return concatString;
      } else {
        return string;
      }
    }
    // Boucle pour received
    for (let i = 0; i < data.received.length; i++) {
      let concatReceivedNftTitle;
      let concatReceveidPriceEth;
      if (data.received[i].nftTitle.length > 28) {
        const nftTitleBegin = data.received[i].nftTitle.slice(0, 29);
        const concatNftTitle = nftTitleBegin + "...";
        concatReceivedNftTitle = concatNftTitle;
      } else {
        concatReceivedNftTitle = data.received[i].nftTitle;
      }
      if (data.received[i].nftPriceEth.length > 7) {
        let concatPrice = data.received[i].nftPriceEth.slice(0, 7);
        concatReceveidPriceEth = concatPrice;
      } else {
        concatReceveidPriceEth = data.received[i].nftPriceEth;
      }
      data.received[i].from = concatStringFromTo(data?.received[i]?.from);
      data.received[i].nftTitle = concatReceivedNftTitle;
      data.received[i].to = concatStringFromTo(data.userPageInfo.username);
      data.received[i].nftPriceEth = concatReceveidPriceEth;
    }
    // Boucle pour made
    for (let i = 0; i < data.made.length; i++) {
      let concatReceivedNftTitle;
      let concatReceveidPriceEth;
      if (data.made[i].nftTitle.length > 28) {
        const nftTitleBegin = data.made[i].nftTitle.slice(0, 29);
        const concatNftTitle = nftTitleBegin + "...";
        concatReceivedNftTitle = concatNftTitle;
      } else {
        concatReceivedNftTitle = data.made[i].nftTitle;
      }
      if (data.made[i].nftPriceEth.length > 7) {
        let concatPrice = data.made[i].nftPriceEth.slice(0, 7);
        concatReceveidPriceEth = concatPrice;
      } else {
        concatReceveidPriceEth = data.made[i].nftPriceEth;
      }
      data.made[i].from = concatStringFromTo(data?.made[i]?.from);
      data.made[i].nftTitle = concatReceivedNftTitle;
      data.made[i].to = concatStringFromTo(data.userPageInfo.username);
      data.made[i].nftPriceEth = concatReceveidPriceEth;
    }
    // Boucle pour activities
    for (let i = 0; i < data.activities.length; i++) {
      let concatReceivedNftTitle;
      let concatReceveidPriceEth;
      let concatFunc;
      if (data.activities[i].nftTitle.length > 28) {
        const nftTitleBegin = data.activities[i].nftTitle.slice(0, 29);
        const concatNftTitle = nftTitleBegin + "...";
        concatReceivedNftTitle = concatNftTitle;
      } else {
        concatReceivedNftTitle = data.activities[i].nftTitle;
      }
      if (data.activities[i].nftPriceEth.length > 7) {
        let concatPrice = data.activities[i].nftPriceEth.slice(0, 7);
        concatReceveidPriceEth = concatPrice;
      } else {
        concatReceveidPriceEth = data.activities[i].nftPriceEth;
      }
      if (data.activities[i].function.length > 7) {
        let concatActivitiesFunc = data.activities[i].function.slice(0, 7);
        concatFunc = concatActivitiesFunc;
      } else {
        concatFunc = data.activities[i].function;
      }
      data.activities[i].from = concatStringFromTo(data?.activities[i]?.from);
      data.activities[i].nftTitle = concatReceivedNftTitle;
      data.activities[i].to = concatStringFromTo(data.userPageInfo.username);
      data.activities[i].nftPriceEth = concatReceveidPriceEth;
      data.activities[i].function = concatFunc;
    }
    // Boucle pour Collected NFT
    for (let i = 0; i < data.collected.length; i++) {
      let concatReceivedNftTitle;
      let concatReceveidPriceEth;
      let concatBid;
      if (data.collected[i].nftTitle.length > 58) {
        const nftTitleBegin = data.collected[i].nftTitle.slice(0, 58);
        const concatNftTitle = nftTitleBegin + "...";
        concatReceivedNftTitle = concatNftTitle;
      } else {
        concatReceivedNftTitle = data.collected[i].nftTitle;
      }
      if (data.collected[i].nftPriceEth.length > 7) {
        let concatPrice = data.collected[i].nftPriceEth.slice(0, 7);
        concatReceveidPriceEth = concatPrice;
      } else {
        concatReceveidPriceEth = data.collected[i].nftPriceEth;
      }
      if (data.collected[i].bid.length > 7) {
        let concatCollectedBid = data.collected[i].bid.slice(0,7);
        concatBid = concatCollectedBid;
      } else {
        concatBid = data.collected[i].bid;
      }
      data.collected[i].nftTitle = concatReceivedNftTitle;
      data.collected[i].nftPriceEth = concatReceveidPriceEth;
      data.collected[i].bid = concatBid;
    }
    setDataConcat(data);
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
            <ProfileSubMenu
              isProfileSubMenuButtonClicked={isProfileSubMenuButtonClicked}
              setIsProfileSubMenuButtonClicked={
                setIsProfileSubMenuButtonClicked
              }
            />
            {displayCategory()}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfilePage;
