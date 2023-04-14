import React, { useState } from "react";
import DataTitles from "../DataTitles/DataTitles";
import NftList from "../NftList/NftList";
import "./FormulatedOffers.css";
import { v4 as uuidv4 } from "uuid";
function FormulatedOffers({
  userFrom,
  nftsFromOwner,
  transferNftDataApi,
  ethPrice,

}) {
  // Backend here
  const [currentStatusOffers, setCurrentStatusOffers] = useState({
    validate: false,
    pending: true,
    cancelled: false,
  });

  const nftTransferDate = [];
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

  // Boucle pour concat UserActivity des données API - FROM
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    transferNftDataApi.transfers[i].from = concatStringFromTo(
      transferNftDataApi?.transfers[i]?.from, 
      7,
      7,
      false,
      false
    );
  }
  // Boucle pour concat UserActivity des données API - TO
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    transferNftDataApi.transfers[i].to = concatStringFromTo(
      transferNftDataApi?.transfers[i]?.to,
      7,
      7,
      false,
      false
    );
  }

  function displayCurrentOffersStatus() {
    // Backend here --> User can make offer from the platform directly
    if (currentStatusOffers.validate === true) {
      return "formulated-offers-status-validate";
    } else if (currentStatusOffers.pending === true) {
      return "formulated-offers-status-pending";
    } else if (currentStatusOffers.cancelled === true) {
      return "formulated-offers-status-cancelled";
    }
  }
  // Boucle pour convertir les dates
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    const dateString =
      transferNftDataApi?.transfers[i]?.metadata?.blockTimestamp;
    const date = new Date(Date.parse(dateString));

    // Formater la date
    const formattedDate = date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    // console.log(formattedDate);
    nftTransferDate.push(formattedDate);
  }
  // console.log(nftsFromOwner)
  // Inverser l'ordre du tableau
  const reversedNftsFromOwner = nftsFromOwner.slice().reverse();
  return (
    <>
      <section className="formulated-offers-user-container">
        <DataTitles
          yourOffersTitle="Your Offers"
          offersFromTitle="From"
          offersToTitle="To"
          offersStatusTitle="Status"
          offersNftTitleClass="formulated-offers-nft-title"
          yourOffersTitleClass="formulated-offers-your-offers-title"
          offersFromTitleClass="formulated-offers-from-title"
          offersToTitleClass="formulated-offers-to-title"
          offersStatusTitleClass="formulated-offers-status-title"
          offersDateTitleClass="formulated-offers-date-title"
        />
        <div className="nft-list-formulated-offer-container">
          {reversedNftsFromOwner?.map((user, index, apiNftData) => (
            <NftList
              key={uuidv4()}
              isFormulatedOffersSectionActive={true}
              offersDisplaySourceTypeClass="formulated-offers-display-source-type"
              receivedFrom={user.from}
              offersTo={user.to}
              nftTitle={user.nftTitle}
              nftId={user.nftId}
              nftImg={user.nftImg}
              priceEth={user.nftPriceEth}
              date={user.date}
              // offersStatus={user.status}
              offersStatus={true}
              //
              nftsFromOwnerImage={apiNftData[index]?.media[0]?.gateway}
              nftsFromOwnerNameCollection={apiNftData[index]?.contract?.name}
              nftsFromOwnerIdNft={apiNftData[index]?.tokenId}
              nftsFromOwnerFloorPrice={
                apiNftData[index]?.contract?.openSea?.floorPrice
              }
              ethPrice={ethPrice}
              //
              transferNftDataApi={transferNftDataApi.transfers[index]}
              nftTransferDate={nftTransferDate[index]}
              //
              offersStatusImage={
                <>
                  <div className={displayCurrentOffersStatus()}></div>
                </>
              }
              offersNftContentClass="formulated-offers-nft-picture-and-title"
              offersYourOffersPriceClass="formulated-offers-your-offers-price"
              offersFromClass="formulated-offers-from"
              offersToClass="formulated-offers-to"
              offersStatusClass="formulated-offers-status"
              offersDateClass="formulated-offers-date"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default FormulatedOffers;