import React from "react";
import NftCollectionHeader from "../../Components/NftCollectionHeader/NftCollectionHeader";
import "./Test.css";
const Test = () => {
  // Les 4 dernieres stats proviennent d'Opensea
  const data = {
    collections: [
      {
        athleteName: "Alexia Barrier",
        collectionName: "Explore the world with Alexia Barrier",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere tellus vehicula leo iaculis luctus. Ut vulputate elit risus, eget faucibus justo consectetur in.",
        banner: "https://i.imgur.com/6ozImSk.png",
        profilePicture: "https://i.imgur.com/grRujbB.png",
        socials: {
          discord: "https://discord.com",
          twitter: "https://twitter.com",
          instagram: "https://instagram.com",
        },
        floorPrice: "0.3",
        AveragePrice: "0.91",
        Owners: "7291",
        Volume: "19234",
      },
    ],
  };
  return (
    <>
      <NftCollectionHeader collectionInfo={data.collections[0]} />
    </>
  );
};

export default Test;
