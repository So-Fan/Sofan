import React from 'react'
import "./NftCollectionPageHeader.css"
import Checkmark from "../../Assets/Image/checkmark_profile.svg";
import Discord from "../../Assets/Image/discord.svg";
import Twitter from "../../Assets/Image/twitter.svg";
import Instagram from "../../Assets/Image/instagram.svg";
const NftCollectionPageHeader = ({collectionInfo, collectionFloorPriceApiData, ethPrice, hidePrice}) => {
  // let floorPriceEur = collectionFloorPriceApiData * ethPrice
  let floorPriceEur = (collectionFloorPriceApiData * ethPrice).toLocaleString('fr-FR', { maximumFractionDigits: 2 });
  return (
    <div className="nftcollectionheader-component">
      <div className="nftcollectionheader-bannerandprofilepicture-wrap">
        <img src={collectionInfo?.banner} alt="banner" />
        <div className="nftcollectionheader-profilepciture-wrap">
          <img
            src={collectionInfo?.profilePicture}
            alt="profile"
          />
        </div>
      </div>
      <div className="nftcollectionheader-content-container">
        <div className="nftcollectionheader-content-wrap">
          <span className="nftcollectionheader-content-wrap-sport">
            by {collectionInfo?.athleteName}
          </span>
          <div className="nftcollectionheader-content-wrap-namestatssocial-wrap">
            <div className="nftcollectionheader-content-wrap-namestatssocial-wrap-namestats">
              <span className="nftcollectionheader-content-wrap-namestatssocial-wrap-namestats-title">
                {collectionInfo?.collectionName}
                <img src={Checkmark} alt="Checkmark" />
              </span> 
            </div>
            <div className="nftcollectionheader-content-wrap-namestatssocial-wrap-social-container">
              {/* <div className="nftcollectionheader-content-wrap-namestatssocial-wrap-social-container-social">
                <a
                  href={collectionInfo?.socials.discord}
                  target="_blank"
                >
                  <img src={Discord} alt="Discord" />
                </a>
                <a
                  href={collectionInfo?.socials.twitter}
                  target="_blank"
                >
                  <img src={Twitter} alt="Twitter" />
                </a>
                <a
                  href={collectionInfo?.socials.instagram}
                  target="_blank"
                >
                  <img src={Instagram} alt="Instagram" />
                </a>
              </div> */}
            </div>
          </div>
          <div className="nftcollectionheader-content-container-descriptionn">
            {collectionInfo?.description}
          </div>
          <div className='nftcollectionheader-content-wrap-stats-container'>
            {hidePrice ? <></>: 
            <>
            <div className='nftcollectionheader-content-wrap-stats-wrap nftcollectionheader-content-wrap-stats-wrap-1'>
                <span className='nftcollectionheader-content-wrap-stats-wrap-value'>{floorPriceEur}€</span>
                <span className='nftcollectionheader-content-wrap-stats-wrap-name'>Floor price</span>
            </div>
            <div className='nftcollectionheader-content-wrap-stats-wrap nftcollectionheader-content-wrap-stats-wrap-2'>
                <span className='nftcollectionheader-content-wrap-stats-wrap-value'>{collectionInfo?.AveragePrice} ETH</span>
                <span className='nftcollectionheader-content-wrap-stats-wrap-name'>Average price</span>
            </div>
            </>}
            
            <div className='nftcollectionheader-content-wrap-stats-wrap nftcollectionheader-content-wrap-stats-wrap-3'>
                <span className='nftcollectionheader-content-wrap-stats-wrap-value'>{collectionInfo?.Owners}</span>
                <span className='nftcollectionheader-content-wrap-stats-wrap-name'>Owners</span>
            </div>
            {hidePrice ? <></>: <>
            <div className='nftcollectionheader-content-wrap-stats-wrap'>
                <span className='nftcollectionheader-content-wrap-stats-wrap-value'>{collectionInfo?.Volume} ETH</span>
                <span className='nftcollectionheader-content-wrap-stats-wrap-name'>Total Volume</span>
            </div>
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftCollectionPageHeader

// const AthleteProfileHeaderPalmaresButton = {
//     backgroundColor: "#F6D463",
//     border: "1px solid #F6D463",
//     width: "105px",
//     height: "39px",
//     borderRadius: "5px",
//     fontFamily: "Britanica-Black",
//     fontSize: "16px",
//   };
//   const AthleteProfileHeaderFanButton = {
//     backgroundColor: "#F6D463",
//     border: "1px solid #F6D463",
//     width: "135px",
//     height: "39px",
//     borderRadius: "5px",
//     fontFamily: "Britanica-Black",
//     fontSize: "16px",
//   };
//   const AthleteProfileHeaderFollowButton = {
//     backgroundColor: "#FFFFFF",
//     border: "1px solid #000000",
//     width: "85px",
//     height: "39px",
//     borderRadius: "5px",
//     fontFamily: "Britanica-Black",
//     fontSize: "16px",
//   };