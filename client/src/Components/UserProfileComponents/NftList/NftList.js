import React from "react";
import "./NftList.css";
import redCross from "../../../Assets/Image/redcross-offers.svg";
import greenCross from "../../../Assets/Image/greencross-offers.svg";
import { Link } from "react-router-dom";

function NftList({
  activityUserFrom,
  activityUserTo,
  activityUserQuantity,
  offersDisplaySourceTypeClass,
  offersTo,
  offersStatus,
  offersStatusImage,
  offersNftContentClass,
  offersYourOffersPriceClass,
  offersFromClass,
  offersToClass,
  offersStatusClass,
  offersDateClass,
  offersDeclineClass,
  offersAcceptClass,
  receivedFrom,
  nftTitle,
  nftId,
  date,
  priceEth,
  func,
  nftImg,
  // api Data
  nftsFromOwnerImage,
  nftsFromOwnerIdNft,
  nftsFromOwnerNameCollection,
  nftsFromOwnerFloorPrice,
  nftsFromOwnerQuantity,
  // transfer Data Api
  transferNftDataApi,
  nftTransferDate,
  // formulated offers
  isFormulatedOffersSectionActive,
  isReceivedOffersSessionActive,
  isUserActivitySectionActive,
  ethPrice,
  //
  handleAcceptOffersClick,
  handleRejectedOffersClick,
  handleOffersChoice,
  //
  // setDataPopupConfirmation,
}) {
  let ethPricePriceConverted = (
    nftsFromOwnerFloorPrice * ethPrice
  ).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  // console.log(nftsFromOwnerFloorPrice);
  // console.log(handleAcceptOffersClick);
  receivedFrom = "DonOfSomething";
  // receivedTo = "DonOfSomething";
  // console.log(transferNftDataApi.to)
  console.log(nftsFromOwnerImage)
  return (
    // Backend here
    <div className="user-nft-transfer-container">
      <div className={`nft-origin-type ${offersDisplaySourceTypeClass}`}>
        {func}
      </div>
      <Link className={`user-nft-picture-and-title ${offersNftContentClass}`}>
        {nftsFromOwnerImage ? (
          <>
            <img src={nftsFromOwnerImage} alt="nft picture" />
          </>
        ) : (
          <>cs</>
        )}

        <div className="collection-name-nft-id-user-activity">
          <span>{nftsFromOwnerNameCollection}</span>
          <span>#{nftsFromOwnerIdNft}</span>
        </div>
      </Link>
      <div className={`nft-price-user-activity ${offersYourOffersPriceClass}`}>
        <div className="nftc-price-eth-user-activity">
          {ethPricePriceConverted}€
        </div>
        <div className="nft-price-eur-user-activity">
          {nftsFromOwnerFloorPrice} ETH
        </div>
      </div>
      <div className={`nft-quantity-user-activity ${offersFromClass}`}>
        {isFormulatedOffersSectionActive && <>{transferNftDataApi.from}</>}

        {nftsFromOwnerQuantity}
        {receivedFrom}
      </div>
      <div className={`nft-from-user-activity ${offersToClass}`}>
        {isUserActivitySectionActive && <>{transferNftDataApi.from}</>}
        {/* {isFormulatedOffersSectionActive && ( <> */}
        {/* {transferNftDataApi.to} */}
        {/* {offersTo} */}
        {/* </> )} */}

        {isReceivedOffersSessionActive && <>{transferNftDataApi.to}</>}
      </div>
      <div className={`nft-to-user-activity ${offersStatusClass}`}>
        {isUserActivitySectionActive && <> {transferNftDataApi.to}</>}
        {isFormulatedOffersSectionActive && <>Pending {offersStatusImage}</>}
      </div>
      <div className={`nft-date-transfer-user-activity ${offersDateClass}`}>
        {nftTransferDate}
      </div>
      <div className={`nft-decline-received-offers ${offersDeclineClass}`}>
        <img
          // récupérer les données de l'élément cliqué
          onClick={() =>
            handleRejectedOffersClick(
              nftsFromOwnerImage,
              nftsFromOwnerNameCollection,
              nftsFromOwnerIdNft,
              receivedFrom,
              nftTransferDate
            )
          }
          src={redCross}
          alt="CROIX REFUSER"
        />
      </div>
      <div className={`nft-accept-received-offers ${offersAcceptClass}`}>
        <img
          // récupérer les données de l'élément cliqué
          onClick={() =>
            handleAcceptOffersClick(
              nftsFromOwnerImage,
              nftsFromOwnerNameCollection,
              nftsFromOwnerIdNft,
              receivedFrom,
              nftTransferDate
            )
          }
          src={greenCross}
          alt="BOUTON ACCEPTER"
        />
      </div>
    </div>
  );
}

export default NftList;
