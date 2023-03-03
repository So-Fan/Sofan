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
        athleteSupporting: 16,
        nftOwned: 159,
        banner: "https://i.imgur.com/sJTNEVk.png",
        profilepicture: "https://i.imgur.com/cCVIcNS.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere tellus vehicula leo iaculis luctus. Ut vulputate elit risus, eget faucibus justo consectetur in."
      },
      received: [
        {
          from: "DonOfSomething",
          nftTitle: "Explore the World with Alexia",
          nftId: "#393",
          nftPriceEth: "0.50009",
          date: "1 hours ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png"
        },
        {
          from: "AlexiaBarrier",
          nftTitle: "Explore the World with Voile",
          nftId: "#394",
          nftPriceEth: "0.80",
          date: "4 years ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png"
        },
      ],
      made: [
        {
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.50009",
          from: "you",
          to: "Alexia Barrier",
          status: "Pending",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png"
        },
        {
          nftTitle: "Explore the World with Voile",
          nftId: "#394",
          nftPriceEth: "0.808447444",
          from: "you",
          to: "Alexia Barrier",
          status: "Pending",
          date: "4 years ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png"
        },
      ],
      activities: [
        {
          function: "Mint",
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.500098484874",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png"
        },
        {
          function: "Mint",
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.50009",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png"
        },
      ],
      collected : [
        {
          athleteName: "Alexia Barrier",
          nftTitle: "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
          nftImg: "https://i.imgur.com/BrRKHpT.png"
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle: "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
          nftImg: "https://i.imgur.com/BrRKHpT.png"
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle: "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864"
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle: "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864"
        },
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
    // console.log(data.userPageInfo.description.length);
    function concatStringFromTo(string, maxLentgth, from0To_NUMBER_, isDotDotDot, isEnd) {
      if (string.length > maxLentgth) {
        const stringBegin = string.slice(0, from0To_NUMBER_);
        const dotDotDot = "..."
        const stringEnd = string.slice(string.length - 3, string.length);
        if (!isDotDotDot && !isEnd) {
          return stringBegin;
        } else if (isDotDotDot && !isEnd) {
          return stringBegin + dotDotDot;
        } else if (isDotDotDot && isEnd) {
          return stringBegin + dotDotDot + stringEnd;
        } else {
          return string;
        }
      } else {
        return string;
      }
    }
    // Boucle pour received
    for (let i = 0; i < data.received.length; i++) {
      data.received[i].from = concatStringFromTo(data?.received[i]?.from, 9, 4, true, true);
      data.received[i].nftTitle = concatStringFromTo(data?.received[i]?.nftTitle, 28, 29, true, false);
      data.received[i].to = concatStringFromTo(data.userPageInfo.username, 9, 4, true, true);
      data.received[i].nftPriceEth = concatStringFromTo(data?.received[i]?.nftPriceEth, 7, 7, false, false);
    }
    // Boucle pour made
    for (let i = 0; i < data.made.length; i++) {
      data.made[i].from = concatStringFromTo(data?.made[i]?.from, 9, 4, true, true);
      data.made[i].nftTitle = concatStringFromTo(data?.made[i]?.nftTitle, 28, 29 , true, false);
      data.made[i].to = concatStringFromTo(data?.made[i].to, 9, 4, true, true);
      data.made[i].nftPriceEth = concatStringFromTo(data?.made[i]?.nftPriceEth, 7, 7, false, false);
    }
    // Boucle pour activities
    for (let i = 0; i < data.activities.length; i++) {
      data.activities[i].from = concatStringFromTo(data?.activities[i]?.from, 9, 4, true, true);
      data.activities[i].nftTitle = concatStringFromTo(data?.activities[i]?.nftTitle, 25, 25, true, false);
      data.activities[i].to = concatStringFromTo(data?.activities[i].to, 9, 4, true, true);
      data.activities[i].nftPriceEth = concatStringFromTo(data?.activities[i]?.nftPriceEth, 7, 7, false, false);
      data.activities[i].function = concatStringFromTo(data?.activities[i]?.function, 7, 7, false, false);
    }
    // Boucle pour Collected NFT
    for (let i = 0; i < data.collected.length; i++) {
      data.collected[i].nftTitle = concatStringFromTo(data?.collected[i]?.nftTitle, 58, 58, true, false);
      data.collected[i].nftPriceEth = concatStringFromTo(data?.collected[i]?.nftPriceEth, 7, 7, false, false);
      data.collected[i].bid = concatStringFromTo(data?.collected[i]?.bid, 7, 7, false, false);
    }

    setDataConcat(data);
  }, []);

  return (
    <>
      <section className="userprofilepage-container">
        <div className="userheader-container">
          <BannerAndProfilePic banner={dataConcat?.userPageInfo.banner} profilePicture={dataConcat?.userPageInfo.profilepicture} />
          <div className="user-content-activity-nft">
            <div className="username-and-stats-component">
              <UserNameAndStats userNameAndStatsObject={dataConcat?.userPageInfo} />
            </div>
            <div className="userprofile-description-component">
              <UserProfileDescription userDescription={dataConcat?.userPageInfo.description} />
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