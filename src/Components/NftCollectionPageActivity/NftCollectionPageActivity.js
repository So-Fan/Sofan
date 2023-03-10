import React, { useState, useEffect } from "react";
import UserActivity from "../UserProfileComponents/UserActivity/UserActivity";

function NftCollectionPageActivity() {
  const [dataConcat, setDataConcat] = useState();

  useEffect(() => {
    const dataBackend = {
      activities: [
        {
          function: "Buy",
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
          nftPriceEth: "0.500098484874",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
      ],
    };
    function concatStringFromTo(
      string,
      maxLength,
      from0To_NUMBER_,
      isDotDotDot,
      isEnd
    ) {
      if (string.length > maxLength) {
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

    for (let i = 0; i < dataBackend.activities.length; i++) {
      dataBackend.activities[i].from = concatStringFromTo(
        dataBackend?.activities[i]?.from,
        9,
        4,
        true,
        true
      );
      dataBackend.activities[i].nftTitle = concatStringFromTo(
        dataBackend?.activities[i]?.nftTitle,
        25,
        25,
        true,
        false
      );
      dataBackend.activities[i].to = concatStringFromTo(
        dataBackend?.activities[i].to,
        9,
        4,
        true,
        true
      );
      dataBackend.activities[i].nftPriceEth = concatStringFromTo(
        dataBackend?.activities[i]?.nftPriceEth,
        7,
        7,
        false,
        false
      );
      dataBackend.activities[i].function = concatStringFromTo(
        dataBackend?.activities[i]?.function,
        7,
        8,
        false,
        false
      );
    }

    setDataConcat(dataBackend);
  }, []);

  return (
    <div>
      <UserActivity userFrom={dataConcat?.activities} />
    </div>
  );
}

export default NftCollectionPageActivity;
