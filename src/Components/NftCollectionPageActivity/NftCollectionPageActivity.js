import React from 'react'
import UserActivity from '../UserProfileComponents/UserActivity/UserActivity'

function NftCollectionPageActivity() {
    const dataBackend ={
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
            nftPriceEth: "0.500098484874",
            from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
            to: "Gr3goir3",
            date: "5 months ago",
            nftImg: "https://i.imgur.com/BrRKHpT.png"
          },
        ]
      }
  return (
    <div><UserActivity
    userFrom={dataBackend.activities}
    /></div>
  )
}

export default NftCollectionPageActivity