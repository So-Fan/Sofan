import React, { useState, useEffect } from "react";
import AthleteProfileEvent from "../../Components/AthleteProfileEvent/AthleteProfileEvent";
import AthleteProfileHeader from "../../Components/AthleteProfileHeader/AthleteProfileHeader";
import AthleteProfileNFTCollection from "../../Components/AthleteProfileNFTCollection/AthleteProfileNFTCollection";
import NftCard from "../../Components/NftCard/NftCard";
import ProfileSubMenu from "../../Components/ProfileSubMenu/ProfileSubMenu";
import SortBySelector from "../../Components/SortBySelector/SortBySelector";
import FormulatedOffers from "../../Components/UserProfileComponents/FormulatedOffers/FormulatedOffers";
import ReceivedOffers from "../../Components/UserProfileComponents/ReceivedOffers/ReceivedOffers";
import UserActivity from "../../Components/UserProfileComponents/UserActivity/UserActivity";
import "./AthleteProfilePage.css";
const AthleteProfilePage = ({
  setIsUSerProfileSeortBySelectorClicked,
  isUSerProfileSeortBySelectorClicked,
  profileSubMenuOffresClicked,
  setProfileSubMenuOffresClicked,
}) => {
  const [isAthleteProfileSubMenuClicked, setIsAthleteProfileSubMenuClicked] =
    useState([false, false, false, false, true, false, false]);
  const [dataConcat, setDataConcat] = useState();
  const displayAthleteProfileSubMenu = () => {
    if (isAthleteProfileSubMenuClicked[4] === true) {
      return "Feed Component";
    } else if (isAthleteProfileSubMenuClicked[5] === true) {
      return <AthleteProfileNFTCollection dataCollections={dataConcat?.collections} />;
    } else if (isAthleteProfileSubMenuClicked[6] === true) {
      return <AthleteProfileEvent dataEvents={dataConcat?.events} />;
    } else if (isAthleteProfileSubMenuClicked[0] === true) {
      return (
        <div>
          <SortBySelector
            setIsUSerProfileSeortBySelectorClicked={
              setIsUSerProfileSeortBySelectorClicked
            }
            isUSerProfileSeortBySelectorClicked={
              isUSerProfileSeortBySelectorClicked
            }
          />
          <NftCard userFrom={dataConcat?.collected} />
        </div>
      );
    } else if (isAthleteProfileSubMenuClicked[1] === true) {
      return <UserActivity userFrom={dataConcat?.activities} />;
    } else if (isAthleteProfileSubMenuClicked[2] === true) {
      return <div className="athleteprofilepage-formulatedoffers-wrap"><FormulatedOffers userFrom={dataConcat?.made} /></div>;
    } else if (isAthleteProfileSubMenuClicked[3] === true) {
      return <div className="athleteprofilepage-formulatedoffers-wrap"><ReceivedOffers userFrom={dataConcat?.received} /></div>;
    }
  };

  useEffect(() => {
    const data = {
      userPageInfo: {
        username: "Romain Attanasio",
        fan: "150",
        followers: "300",
        nftAvailable: "138",
        sport: "Skipper",
        socials: {
          discord: "https://discord.com",
          twitter: "https://twitter.com",
          instagram: "https://instagram.com",
        },
        banner: "https://i.imgur.com/6ozImSk.png",
        profilePicture: "https://i.imgur.com/StsunkC.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere tellus vehicula leo iaculis luctus. Ut vulputate elit risus, eget faucibus justo consectetur in.",
      },
      received: [
        {
          from: "DonOfSomething",
          nftTitle: "Explore the World with Alexia",
          nftId: "#393",
          nftPriceEth: "0.50009",
          date: "1 hours ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          from: "AlexiaBarrier",
          nftTitle: "Explore the World with Voile",
          nftId: "#394",
          nftPriceEth: "0.80",
          date: "4 years ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
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
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          nftTitle: "Explore the World with Voile",
          nftId: "#394",
          nftPriceEth: "0.808447444",
          from: "you",
          to: "Alexia Barrier",
          status: "Pending",
          date: "4 years ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
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
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          function: "Mint",
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.50009",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
      ],
      collected: [
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
        },
      ],
      collections: [
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
      ],
      events: [
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
      ],
    };
    function concatStringFromTo(
      string,
      maxLentgth,
      from0To_NUMBER_,
      isDotDotDot,
      isEnd
    ) {
      if (string.length > maxLentgth) {
        const stringBegin = string.slice(0, from0To_NUMBER_);
        const dotDotDot = "...";
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
      data.received[i].from = concatStringFromTo(
        data?.received[i]?.from,
        9,
        4,
        true,
        true
      );
      data.received[i].nftTitle = concatStringFromTo(
        data?.received[i]?.nftTitle,
        28,
        29,
        true,
        false
      );
      data.received[i].to = concatStringFromTo(
        data.userPageInfo.username,
        9,
        4,
        true,
        true
      );
      data.received[i].nftPriceEth = concatStringFromTo(
        data?.received[i]?.nftPriceEth,
        7,
        7,
        false,
        false
      );
    }
    // Boucle pour made
    for (let i = 0; i < data.made.length; i++) {
      data.made[i].from = concatStringFromTo(
        data?.made[i]?.from,
        9,
        4,
        true,
        true
      );
      data.made[i].nftTitle = concatStringFromTo(
        data?.made[i]?.nftTitle,
        28,
        29,
        true,
        false
      );
      data.made[i].to = concatStringFromTo(data?.made[i].to, 9, 4, true, true);
      data.made[i].nftPriceEth = concatStringFromTo(
        data?.made[i]?.nftPriceEth,
        7,
        7,
        false,
        false
      );
    }
    // Boucle pour activities
    for (let i = 0; i < data.activities.length; i++) {
      data.activities[i].from = concatStringFromTo(
        data?.activities[i]?.from,
        9,
        4,
        true,
        true
      );
      data.activities[i].nftTitle = concatStringFromTo(
        data?.activities[i]?.nftTitle,
        25,
        25,
        true,
        false
      );
      data.activities[i].to = concatStringFromTo(
        data?.activities[i].to,
        9,
        4,
        true,
        true
      );
      data.activities[i].nftPriceEth = concatStringFromTo(
        data?.activities[i]?.nftPriceEth,
        7,
        7,
        false,
        false
      );
      data.activities[i].function = concatStringFromTo(
        data?.activities[i]?.function,
        7,
        7,
        false,
        false
      );
    }
    // Boucle pour Collected NFT
    for (let i = 0; i < data.collected.length; i++) {
      data.collected[i].nftTitle = concatStringFromTo(
        data?.collected[i]?.nftTitle,
        58,
        58,
        true,
        false
      );
      data.collected[i].nftPriceEth = concatStringFromTo(
        data?.collected[i]?.nftPriceEth,
        7,
        7,
        false,
        false
      );
      data.collected[i].bid = concatStringFromTo(
        data?.collected[i]?.bid,
        7,
        7,
        false,
        false
      );
    }

    setDataConcat(data);
  }, []);
  return (
    <div className="athleteprofilepage-component">
      <AthleteProfileHeader userInfo={dataConcat?.userPageInfo} />

      <div className="athleteprofilepage-profilesubmenu-wrap">
        <ProfileSubMenu
          isPageAthlete={true}
          isProfileSubMenuButtonClicked={isAthleteProfileSubMenuClicked}
          setIsProfileSubMenuButtonClicked={setIsAthleteProfileSubMenuClicked}
          profileSubMenuOffresClicked={profileSubMenuOffresClicked}
          setProfileSubMenuOffresClicked={setProfileSubMenuOffresClicked}
        />
      </div>
      {displayAthleteProfileSubMenu()}
    </div>
  );
};

export default AthleteProfilePage;
