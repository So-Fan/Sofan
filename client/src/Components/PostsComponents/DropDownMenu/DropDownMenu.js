import React, { useEffect } from "react";
import "./DropDownMenu.css";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../Configs/firebase";
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
  isHeadOfPostDisplay
}) {
  async function handleDeleteComments(e) {
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
  console.log(userType)
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
              {userId === loggedInUserId && (
                <>
                  <li onClick={handleDeleteComments}>Supprimer</li>
                  <div className="separation-line-dropdown-menu"></div>
                </>
              )}
            </>
          ) : (
            <>
              {postCreatorId === loggedInUserId && (
                <>
                  <li onClick={handleDeletePosts}>Supprimer</li>
                  <div className="separation-line-dropdown-menu"></div>
                </>
              )}
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
