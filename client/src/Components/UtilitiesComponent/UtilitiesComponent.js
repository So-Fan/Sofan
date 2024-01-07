import React, { useState, useEffect, useMemo } from "react";
import meetingsLogo from "../../Assets/Image/meetings-logo.svg";
import liveLogo from "../../Assets/Image/live-logo.svg";
import merchLogo from "../../Assets/Image/merch-logo.svg";
import { useLocation, useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import "./UtilitiesComponent.css";
import UtilityClaimModal from "./UtilityClaimPopUp/UtilityClaimModal";
import { db } from "../../Configs/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  collection,
  deleteField,
  addDoc,
  Timestamp
} from "firebase/firestore";

function UtilitiesComponent({
  utility,
  loggedInUser,
  utilityId,
  utilityTitle,
  utilityStatus,
  utilityDescription,
  utilityDate,
  launchpadCollectionLiveUtilities,
  collectionOwner,
}) {
  const [status, setStatus] = useState();
  const [isUtiliyClicked, setIsUtiliyClicked] = useState(false);
  const { contractAddress } = useParams();

  // Fetch url info
  const location = useLocation();
  const segments = location.pathname.split("/");
  const pageName = segments[1];
  const nftId = segments[3];

  // A changer pour un nft holder de l'athleth
  const [isloggedUserNftHolder, setIsloggedUserNftHolder] = useState(true);
  const [isClaimConfirmed, setIsClaimConfirmed] = useState(false);

  function displayStatusColor() {
    if (utilityStatus === "Disponible") {
      setStatus(true);
    } else if (utilityStatus === "Indisponible") {
      setStatus(false);
    }
  }

  console.log(utilityStatus);

  //   console.log(utilityStatus)
  useEffect(() => {
    const test = () => displayStatusColor();
    test();
  }, []);

  const handleClaimClick = async (e) => {
    e.preventDefault();
    //console.log(utility.id, "claimed by", loggedInUser.display_name);

    // Query to find the document with the specific contractAddress field
    const querySnapshot = await getDocs(
      query(
        collection(db, "nft_collections"),
        where("collection_address", "==", contractAddress)
      )
    );

    if (querySnapshot.empty) {
      console.error("No matching documents.");
      return;
    }

    let docId;
    querySnapshot.forEach((documentSnapshot) => {
      docId = documentSnapshot.id;
    });

    // Now that we have the docId, we can update the sub-collection
    const utilityDocRef = doc(
      db,
      "nft_collections",
      docId,
      "utilities",
      utility.id
    );

    // Fetch the document to check if it exists
    const docSnap = await getDoc(utilityDocRef);

    if (docSnap.exists()) {
      try {
        if (
          utility.claimed_status &&
          utility.claimed_user_id === loggedInUser?.id
        ) {
          // Disclaim the utility if it is already claimed by the logged-in user
          await updateDoc(utilityDocRef, {
            claimed_status: false,
            claimed_user_id: deleteField(),
          });
          console.log("Utility disclaimed successfully!");
        } else {
          // Claim the utility
          await updateDoc(utilityDocRef, {
            claimed_status: true,
            claimed_user_id: loggedInUser?.id,
          });
          console.log("Utility claimed successfully!");
        }
      } catch (err) {
        console.error("Error updating document: ", err);
      }
    } else {
      console.error("No such document to update!");
    }

    // add in claimed Utiliy COllection
    // This goes after the existing logic for claiming or disclaiming utilities.
    // Ensure this runs only if the loggedInUser is present and a utility has been claimed or updated.
    if (loggedInUser && docSnap.exists()) {
      // Prepare the new document data
      const newClaimedNFTUtility = {
        athlete_email: collectionOwner.email, // from provided variable mappings
        claimed_user_email: loggedInUser.email, // from provided variable mappings
        nft_collection_address: contractAddress, // from provided variable mappings
        nft_id: nftId, // from provided variable mappings
        utility_id: utilityId, // from provided variable mappings
        claimed_date: Timestamp.now(), // current date and time
      };

      try {
        // Add the new document to 'claimed_nft_utility' collection
        await addDoc(
          collection(db, "claimed_nft_utility"),
          newClaimedNFTUtility
        );
        console.log("New utility claim recorded in claimed_nft_utility.");
      } catch (err) {
        console.error("Error creating document in claimed_nft_utility: ", err);
      }
    }

    setIsClaimConfirmed(true);
    //setIsUtiliyClicked(false);
  };

  const handleCheckNFTPageType = () => {
    if (pageName === "nftsingle") {
      setIsUtiliyClicked(true);
    }
  };

  const modalStyle = useMemo(() => ({ top: "20px", right: "20px" }), []);

  // console.log(status);
  return (
    <>
      <div
        onClick={handleCheckNFTPageType}
        className="nft-collection-overview-utilities-one-container"
      >
        <div className="nft-collection-overview-utilities-one-wrap">
          <div className="nft-collection-overview-utilities-one-header">
            <div className="nft-collection-overview-one-header-logo">
              <img src={meetingsLogo} alt="logo contrepartie rencontre fan" />
            </div>
            <div className="nft-collection-overview-one-header-title">
              {utilityTitle}
            </div>
            {launchpadCollectionLiveUtilities ? (
              <></>
            ) : (
              <>
                <div className="nft-collection-overview-one-header-status">
                  <div
                    className={
                      status
                        ? "nft-collectin-overview-one-header-status-color-available"
                        : "nft-collectin-overview-one-header-status-color-unavailable"
                    }
                  ></div>
                  <div className="nft-collection-overview-one-header-status-text">
                    {utilityStatus}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="nft-collection-overview-utilities-one-description">
            {utilityDescription}
          </div>
          <div className="nft-collection-overview-utilities-one-date">
            Date de l'utilité: {utilityDate}{" "}
            <span style={{ color: "red", marginLeft: 10 }}>
              {utility?.claimed_status &&
              utility?.claimed_user_id &&
              utility?.claimed_user_id === loggedInUser?.id
                ? "Réclamé"
                : ""}
            </span>
          </div>
        </div>
      </div>
      {isUtiliyClicked && (
        <Modal
          style={modalStyle}
          setState={setIsUtiliyClicked}
          dynamicPositionPopUpMargin={`${window.scrollY}px`}
        >
          <UtilityClaimModal
            utility={utility}
            loggedInUser={loggedInUser}
            isUtiliyClicked={isUtiliyClicked}
            handleClaimClick={handleClaimClick}
            isloggedUserNftHolder={isloggedUserNftHolder}
            setIsloggedUserNftHolder={setIsloggedUserNftHolder}
            setIsClaimConfirmed={setIsClaimConfirmed}
            isClaimConfirmed={isClaimConfirmed}
          />
        </Modal>
      )}
    </>
  );
}

export default UtilitiesComponent;
