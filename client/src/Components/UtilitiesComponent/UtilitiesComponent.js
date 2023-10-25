import React, { useState, useEffect, useMemo } from "react";
import meetingsLogo from "../../Assets/Image/meetings-logo.svg";
import liveLogo from "../../Assets/Image/live-logo.svg";
import merchLogo from "../../Assets/Image/merch-logo.svg";
import { useParams } from "react-router-dom";
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
} from "firebase/firestore";

function UtilitiesComponent({
  utility,
  loggedInUser,
  unilityId,
  utilityTitle,
  utilityStatus,
  utilityDescription,
  utilityDate,
  launchpadCollectionLiveUtilities,
}) {
  const [status, setStatus] = useState();
  const [isUtiliyClicked, setIsUtiliyClicked] = useState(false);
  const { collectionAddress } = useParams();

  function displayStatusColor() {
    if (utilityStatus === "Disponible") {
      setStatus(true);
    } else if (utilityStatus === "Indisponible") {
      setStatus(false);
    }
  }

  //   console.log(utilityStatus)
  useEffect(() => {
    const test = () => displayStatusColor();
    test();
  }, []);

  const handleClaimClick = async (e) => {
    e.preventDefault();
    //console.log(utility.id, "claimed by", loggedInUser.display_name);

    // Query to find the document with the specific collectionAddress field
    const querySnapshot = await getDocs(
      query(
        collection(db, "nft_collections"),
        where("collection_address", "==", collectionAddress)
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
          utility.claimed_user_id === loggedInUser.id
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
            claimed_user_id: loggedInUser.id,
          });
          console.log("Utility claimed successfully!");
        }
      } catch (err) {
        console.error("Error updating document: ", err);
      }
    } else {
      console.error("No such document to update!");
    }

    setIsUtiliyClicked(false);
  };

  const modalStyle = useMemo(() => ({ top: "20px", right: "20px" }), []);

  // console.log(status);
  return (
    <>
      <div
        onClick={() => setIsUtiliyClicked(true)}
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
              {utility.claimed_status ? "Réclamé" : ""}
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
          />
        </Modal>
      )}
    </>
  );
}

export default UtilitiesComponent;
