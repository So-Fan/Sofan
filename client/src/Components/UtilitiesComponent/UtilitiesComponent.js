import React, { useState, useEffect, useMemo } from "react";
import meetingsLogo from "../../Assets/Image/meetings-logo.svg";
//import liveLogo from "../../Assets/Image/live-logo.svg";
//import merchLogo from "../../Assets/Image/merch-logo.svg";
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
  Timestamp,
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
  collectionNameApi,
  currentTokenIdOwner,
}) {
  const [status, setStatus] = useState();
  const [isUtiliyClicked, setIsUtiliyClicked] = useState(false);
  const { contractAddress } = useParams();
  const [isUtilityClaimed, setIsUtilityClaimed] = useState(false); // Fetch url info
  const [claimedUserEmail, setClaimedUserEmail] = useState(null);

  const location = useLocation();
  const segments = location.pathname.split("/");
  const pageName = segments[1];
  const nftId = segments[3];

  //TODO: A changer pour un nft holder de l'athleth
  const [isloggedUserNftHolder, setIsloggedUserNftHolder] = useState(true);
  const [isClaimConfirmed, setIsClaimConfirmed] = useState(false);
  // console.log("loggedInUser --> ",loggedInUser)
  // console.log("collectionOwner --> ",collectionOwner)
  function displayStatusColor() {
    if (utilityStatus === "Disponible") {
      setStatus(true);
    } else if (utilityStatus === "Indisponible") {
      setStatus(false);
    }
  }

  console.log("currentTokenIdOwner --> ", currentTokenIdOwner);
  //   console.log(utilityStatus)
  useEffect(() => {
    const test = () => displayStatusColor();
    test();
  });

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
          // await updateDoc(utilityDocRef, {
          //   claimed_status: false,
          //   claimed_user_id: deleteField(),
          // });
          console.log("Utility disclaimed successfully!");
        } else {
          // Claim the utility
          await updateDoc(utilityDocRef, {
            claimed_status: true,
            claimed_user_id: loggedInUser?.id,
          });
          console.log("Utility claimed successfully!");
        }

        // Now, send the emails
        const sendEmails = async () => {
          const claimedDate = new Date(); // Or the date you get from the claim
          const formatter = new Intl.DateTimeFormat("fr-FR", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          });
          const formatter2 = new Intl.DateTimeFormat("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "2-digit",
          });
          const formattedDate = formatter.format(claimedDate);
          const formattedUtilityDate = formatter2.format(new Date(utilityDate));

          const userFunctionUrl =
            "https://us-central1-sofan-app.cloudfunctions.net/sendUserClaimUtilityEmail";
          const userEmailData = {
            email: loggedInUser?.email, // assuming this is the user's email
            display_name: loggedInUser?.display_name, // or however you get the user's display name
            nftId: nftId,
            athleteName: collectionOwner?.display_name, // Replace with actual data
            claimed_date: formattedDate, // or format claimed_date as needed
            collectionName: collectionNameApi,
            title: utilityTitle,
            description: utilityDescription,
            utility_date: formattedUtilityDate,
          };

          const athleteFunctionUrl =
            "https://us-central1-sofan-app.cloudfunctions.net/sendAthleteClaimUtilityEmail";
          const athleteEmailData = {
            athleteEmail: collectionOwner?.email, // assuming this is the athlete's email
            athleteName: collectionOwner?.display_name, // replace with actual data
            userName: loggedInUser.display_name, // user who claimed the utility
            nftId: nftId,
            collectionName: collectionNameApi,
            title: utilityTitle,
            description: utilityDescription,
            claimed_date: formattedDate,
          };
          console.log(athleteEmailData);
          try {
            // Send email to the user
            const userResponse = await fetch(userFunctionUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userEmailData),
            });
            if (userResponse.ok) {
              console.log("Email sent to user successfully!");
            } else {
              console.error(
                "Failed to send email to user",
                await userResponse.text()
              );
            }

            // Send email to the athlete
            const athleteResponse = await fetch(athleteFunctionUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(athleteEmailData),
            });
            console.log(athleteResponse);
            if (athleteResponse.ok) {
              console.log("Email sent to athlete successfully!");
            } else {
              console.error(
                "Failed to send email to athlete",
                await athleteResponse.text()
              );
            }
          } catch (error) {
            console.error("Error sending emails:", error);
          }
        };

        // Call the sendEmails function
        sendEmails();
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
        claimed_status: true,
      };

      try {
        // Add the new document to 'claimed_nft_utility' collection
        await addDoc(
          collection(db, "claimed_nft_utility"),
          newClaimedNFTUtility
        );
        console.log("New utility claim recorded in claimed_nft_utility.");
        setIsClaimConfirmed(true);
      } catch (err) {
        console.error("Error creating document in claimed_nft_utility: ", err);
      }
    }

    //setIsUtiliyClicked(false);
  };

  useEffect(() => {
    if (pageName === "nftsingle") {
      const checkIfUtilityIsClaimed = async () => {
        const q = query(
          collection(db, "claimed_nft_utility"),
          where("nft_id", "==", nftId),
          where("nft_collection_address", "==", contractAddress),
          where("utility_id", "==", utilityId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming there's only one document that matches the criteria
          const docData = querySnapshot.docs[0].data();
          setIsUtilityClaimed(true);
          setClaimedUserEmail(docData.claimed_user_email); // Set the claimed user's email
        } else {
          setIsUtilityClaimed(false);
          setClaimedUserEmail(null); // Reset if no document is found
        }
      };

      checkIfUtilityIsClaimed();
    }
  }, [pageName, nftId, contractAddress, utilityId, isClaimConfirmed]);

  const handleCheckNFTPageType = () => {
    if (pageName === "nftsingle") {
      setIsUtiliyClicked(true);
    }
    verifyUserIsHolder();
  };
  function verifyUserIsHolder() {
    if (currentTokenIdOwner?.id === loggedInUser?.id) {
      // console.log("il est holder");
      setIsloggedUserNftHolder(true);
    } else {
      // console.log("c'est un imposteur");
      setIsloggedUserNftHolder(false);
    }
  }
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
              {isUtilityClaimed ? "Réclamé" : ""}
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
            // setIsloggedUserNftHolder={setIsloggedUserNftHolder}
            setIsClaimConfirmed={setIsClaimConfirmed}
            isClaimConfirmed={isClaimConfirmed}
            isUtilityClaimed={isUtilityClaimed}
            claimedUserEmail={claimedUserEmail}
          />
        </Modal>
      )}
    </>
  );
}

export default UtilitiesComponent;
