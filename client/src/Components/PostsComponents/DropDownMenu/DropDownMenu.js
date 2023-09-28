import React, { useEffect, useState } from "react";
import "./DropDownMenu.css";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../Configs/firebase";
import useUserCollection from "../../../contexts/UserContext/useUserCollection";
function DropDownMenu({
  dropdownStates,
  id,
  handleClickCopyPostLink,
  fullPagePostPageStyle,
  postCreatorId,
  loggedInUserId,
  // dropDownStatesFullPagePostModal,
  fullPagePostModalStyle,
  userType,
  userId,
  isPostsCommentsDisplay,
  commentId,
  postId,
  isHeadOfPostDisplay,
}) {
  const { loggedInUser } = useUserCollection();
  // console.log(loggedInUser, "loggedInUser")
  // const { loggedInUser } = useUserCollection();
  async function handleDeleteComments() {
    try {
      // Créer une référence vers le commentaire que vous souhaitez supprimer
      const commentRef = doc(
        db,
        `feed_post/${postId}/post_comments/${commentId}`
      );

      // Mettre à jour le champ 'status' en le mettant à false
      await updateDoc(commentRef, {
        status: false,
      });

      console.log("Le status a bien été passé à false");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
    }
  }
  async function handleDeletePosts(e) {
    try {
      // Créer une référence vers le commentaire que vous souhaitez supprimer
      const postRef = doc(db, `feed_post/${id}`);

      // Mettre à jour le champ 'status' en le mettant à false
      await updateDoc(postRef, {
        status: false,
      });

      console.log("Le status a bien été passé à false");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
    }
  }
  // console.log(loggedInUser?.account_type, "loggedInUser");
  // console.log(postCreatorId, "postCreatorId");
  
  return (
    <>
      <section
        id={id}
        style={
          fullPagePostPageStyle
            ? { top: "25%", right: "12.5%" }
            : fullPagePostModalStyle
            ? { top: "9%", right: "2%" }
            : dropdownStates && id && dropdownStates[id]
            ? {
                top: "95%",
                right: "-15%",
                width: "90px",
                fontSize: "12px",
                height: "80px",
              }
            : { top: "7%", right: "5%" }
        }
        className={
          fullPagePostPageStyle
            ? "dropdown-menu-container-fullpagepost-page"
            : "dropdown-menu-container"
        }
      >
        <ul id={id}>
          {isPostsCommentsDisplay ? (
            <>
              {(() => {
                // console.log(userId, "userId");
                // console.log(loggedInUserId, "loggedInUserId");
                if (
                  userId === loggedInUserId ||
                  loggedInUser?.account_type === "admin" ||
                  postCreatorId === loggedInUserId
                ) {
                  return (
                    <>
                      <li onClick={handleDeleteComments}>Supprimer</li>
                      <div className="separation-line-dropdown-menu"></div>
                    </>
                  );
                }
              })()}
            </>
          ) : (
            <>
              {(() => {
                if (
                  postCreatorId === loggedInUserId ||
                  loggedInUser?.account_type === "admin"
                ) {
                  return (
                    <>
                      <li onClick={handleDeletePosts}>Supprimer</li>
                      <div className="separation-line-dropdown-menu"></div>
                    </>
                  );
                }
              })()}
            </>
          )}
          {isPostsCommentsDisplay ? (
            <>
              <li onClick={() => handleClickCopyPostLink(userId, userType)}>
                Copier le lien
              </li>
            </>
          ) : (
            <>
              <li onClick={() => handleClickCopyPostLink(id)}>
                Copier le lien
              </li>
            </>
          )}
          <div className="separation-line-dropdown-menu"></div>
          <a
            target="blank"
            href={
              isHeadOfPostDisplay
                ? `/athleteprofile/${postCreatorId}`
                : userType === "athlete"
                ? `/athleteprofile/${userId}`
                : `/userprofile/${userId}`
            }
          >
            <li>Voir le profil</li>
          </a>
        </ul>
      </section>
    </>
  );
}

export default DropDownMenu;
